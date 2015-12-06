/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  DelegateCommand
} from 'phosphor-command';

import {
  Menu, MenuBar, MenuItem
} from 'phosphor-menus';

import {
  Message
} from 'phosphor-messaging';

import {
  TabPanel
} from 'phosphor-tabs';

import {
  ResizeMessage, Widget
} from 'phosphor-widget';

import './index.css';


/**
 * A widget which hosts a CodeMirror editor.
 */
class CodeMirrorWidget extends Widget {

  constructor(config?: CodeMirror.EditorConfiguration) {
    super();
    this.addClass('CodeMirrorWidget');
    this._editor = CodeMirror(this.node, config);
  }

  get editor(): CodeMirror.Editor {
    return this._editor;
  }

  loadTarget(target: string): void {
    var doc = this._editor.getDoc();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', target);
    xhr.onreadystatechange = () => doc.setValue(xhr.responseText);
    xhr.send();
  }

  protected onAfterAttach(msg: Message): void {
    this._editor.refresh();
  }

  protected onResize(msg: ResizeMessage): void {
    if (msg.width < 0 || msg.height < 0) {
      this._editor.refresh();
    } else {
      this._editor.setSize(msg.width, msg.height);
    }
  }

  private _editor: CodeMirror.Editor;
}


/**
 * A command which logs its arguments to the log span.
 */
const logCmd = new DelegateCommand(args => {
  var node = document.getElementById('log-span');
  node.textContent = args;
});


/**
 * A simple disabled command.
 */
const disabledCmd = new DelegateCommand(() => { });
disabledCmd.enabled = false;


/**
 * A command which toggles its state when executed.
 */
const saveOnExitCmd = new DelegateCommand(() => {
  logCmd.execute('Save On Exit');
  saveOnExitCmd.checked = !saveOnExitCmd.checked;
});


/**
 * Create the example menu bar.
 */
function createMenuBar(): MenuBar {
  let fileMenu = new Menu([
    new MenuItem({
      text: 'New File',
      shortcut: 'Ctrl+N',
      command: logCmd,
      commandArgs: 'New File'
    }),
    new MenuItem({
      text: 'Open File',
      shortcut: 'Ctrl+O',
      command: logCmd,
      commandArgs: 'Open File'
    }),
    new MenuItem({
      text: 'Save File',
      shortcut: 'Ctrl+S',
      command: logCmd,
      commandArgs: 'Save File'
    }),
    new MenuItem({
      text: 'Save As...',
      shortcut: 'Ctrl+Shift+S',
      command: disabledCmd
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Close File',
      shortcut: 'Ctrl+W',
      command: logCmd,
      commandArgs: 'Close File'
    }),
    new MenuItem({
      text: 'Close All',
      command: logCmd,
      commandArgs: 'Close All'
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'More...',
      submenu: new Menu([
        new MenuItem({
          text: 'One',
          command: logCmd,
          commandArgs: 'One'
        }),
        new MenuItem({
          text: 'Two',
          command: logCmd,
          commandArgs: 'Two'
        }),
        new MenuItem({
          text: 'Three',
          command: logCmd,
          commandArgs: 'Three'
        }),
        new MenuItem({
          text: 'Four',
          command: logCmd,
          commandArgs: 'Four'
        })
      ])
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Exit',
      command: logCmd,
      commandArgs: 'Exit'
    })
  ]);

  let editMenu = new Menu([
    new MenuItem({
      text: '&Undo',
      icon: 'fa fa-undo',
      shortcut: 'Ctrl+Z',
      command: logCmd,
      commandArgs: 'Undo'
    }),
    new MenuItem({
      text: '&Repeat',
      icon: 'fa fa-repeat',
      shortcut: 'Ctrl+Y',
      command: disabledCmd
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: '&Copy',
      icon: 'fa fa-copy',
      shortcut: 'Ctrl+C',
      command: logCmd,
      commandArgs: 'Copy'
    }),
    new MenuItem({
      text: 'Cu&t',
      icon: 'fa fa-cut',
      shortcut: 'Ctrl+X',
      command: logCmd,
      commandArgs: 'Cut'
    }),
    new MenuItem({
      text: '&Paste',
      icon: 'fa fa-paste',
      shortcut: 'Ctrl+V',
      command: logCmd,
      commandArgs: 'Paste'
    })
  ]);

  let findMenu = new Menu([
    new MenuItem({
      text: 'Find...',
      shortcut: 'Ctrl+F',
      command: logCmd,
      commandArgs: 'Find...'
    }),
    new MenuItem({
      text: 'Find Next',
      shortcut: 'F3',
      command: logCmd,
      commandArgs: 'Find Next'
    }),
    new MenuItem({
      text: 'Find Previous',
      shortcut: 'Shift+F3',
      command: logCmd,
      commandArgs: 'Find Previous'
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Replace...',
      shortcut: 'Ctrl+H',
      command: logCmd,
      commandArgs: 'Replace...'
    }),
    new MenuItem({
      text: 'Replace Next',
      shortcut: 'Ctrl+Shift+H',
      command: logCmd,
      commandArgs: 'Replace Next'
    })
  ]);

  let helpMenu = new Menu([
    new MenuItem({
      text: 'Documentation',
      command: logCmd,
      commandArgs: 'Documentation'
    }),
    new MenuItem({
      text: 'About',
      command: logCmd,
      commandArgs: 'About'
    })
  ]);

  return new MenuBar([
    new MenuItem({
      text: 'File',
      submenu: fileMenu
    }),
    new MenuItem({
      text: 'Edit',
      submenu: editMenu
    }),
    new MenuItem({
      text: 'Find',
      submenu: findMenu
    }),
    new MenuItem({
      text: 'View',
      type: MenuItem.Submenu
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Help',
      submenu: helpMenu
    })
  ]);
}


/**
 * Create the example context menu.
 */
function createContextMenu(): Menu {
  return new Menu([
    new MenuItem({
      text: '&Copy',
      icon: 'fa fa-copy',
      shortcut: 'Ctrl+C',
      command: logCmd,
      commandArgs: 'Copy'
    }),
    new MenuItem({
      text: 'Cu&t',
      icon: 'fa fa-cut',
      shortcut: 'Ctrl+X',
      command: logCmd,
      commandArgs: 'Cut'
    }),
    new MenuItem({
      text: '&Paste',
      icon: 'fa fa-paste',
      shortcut: 'Ctrl+V',
      command: logCmd,
      commandArgs: 'Paste'
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: '&New Tab',
      command: logCmd,
      commandArgs: 'New Tab'
    }),
    new MenuItem({
      text: '&Close Tab',
      command: logCmd,
      commandArgs: 'Close Tab'
    }),
    new MenuItem({
      type: MenuItem.Check,
      text: '&Save On Exit',
      command: saveOnExitCmd
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Task Manager',
      command: disabledCmd
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'More...',
      submenu: new Menu([
        new MenuItem({
          text: 'One',
          command: logCmd,
          commandArgs: 'One'
        }),
        new MenuItem({
          text: 'Two',
          command: logCmd,
          commandArgs: 'Two'
        }),
        new MenuItem({
          text: 'Three',
          command: logCmd,
          commandArgs: 'Three'
        }),
        new MenuItem({
          text: 'Four',
          command: logCmd,
          commandArgs: 'Four'
        })
      ])
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Close',
      icon: 'fa fa-close',
      command: logCmd,
      commandArgs: 'Close'
    })
  ]);
}


/**
 * The main application entry point.
 */
function main(): void {
  var contextArea = new Widget();
  contextArea.addClass('ContextArea');
  contextArea.node.innerHTML = (
    '<h2>Notice the menu bar at the top of the document.</h2>' +
    '<h2>Right click this panel for a context menu.</h2>' +
    '<h3>Clicked Item: <span id="log-span"></span></h3>'
  );
  contextArea.title.text = 'Demo';

  var cmSource = new CodeMirrorWidget({
    mode: 'text/javascript',
    lineNumbers: true,
    tabSize: 2,
  });
  cmSource.loadTarget('./index.ts');
  cmSource.title.text = 'Source';

  var cmCss = new CodeMirrorWidget({
    mode: 'text/css',
    lineNumbers: true,
    tabSize: 2,
  });
  cmCss.loadTarget('./index.css');
  cmCss.title.text = 'CSS';

  var contextMenu = createContextMenu();
  contextArea.node.addEventListener('contextmenu', (event: MouseEvent) => {
    event.preventDefault();
    var x = event.clientX;
    var y = event.clientY;
    contextMenu.popup(x, y);
  });

  var menuBar = createMenuBar();

  var panel = new TabPanel();
  panel.id = 'main';
  panel.widgets.assign([contextArea, cmSource, cmCss]);

  Widget.attach(menuBar, document.body);
  Widget.attach(panel, document.body);

  window.onresize = () => panel.update();
}


window.onload = main;

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

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
 * A handler which logs the item text to the log span.
 */
function logHandler(item: MenuItem): void {
  var node = document.getElementById('log-span');
  node.textContent = item.text.replace(/&/g, '');
}


/**
 * A handler which toggles the item state when executed.
 */
function saveOnExitHandler(item: MenuItem): void {
  logHandler(item);
  item.checked = !item.checked;
}


/**
 * Create the example menu bar.
 */
function createMenuBar(): MenuBar {
  let fileMenu = new Menu([
    new MenuItem({
      text: 'New File',
      shortcut: 'Ctrl+N',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Open File',
      shortcut: 'Ctrl+O',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Save File',
      shortcut: 'Ctrl+S',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Save As...',
      shortcut: 'Ctrl+Shift+S',
      disabled: true
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Close File',
      shortcut: 'Ctrl+W',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Close All',
      handler: logHandler
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'More...',
      submenu: new Menu([
        new MenuItem({
          text: 'One',
          handler: logHandler
        }),
        new MenuItem({
          text: 'Two',
          handler: logHandler
        }),
        new MenuItem({
          text: 'Three',
          handler: logHandler
        }),
        new MenuItem({
          text: 'Four',
          handler: logHandler
        })
      ])
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Exit',
      handler: logHandler
    })
  ]);

  let editMenu = new Menu([
    new MenuItem({
      text: '&Undo',
      icon: 'fa fa-undo',
      shortcut: 'Ctrl+Z',
      handler: logHandler
    }),
    new MenuItem({
      text: '&Repeat',
      icon: 'fa fa-repeat',
      shortcut: 'Ctrl+Y',
      disabled: true
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: '&Copy',
      icon: 'fa fa-copy',
      shortcut: 'Ctrl+C',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Cu&t',
      icon: 'fa fa-cut',
      shortcut: 'Ctrl+X',
      handler: logHandler
    }),
    new MenuItem({
      text: '&Paste',
      icon: 'fa fa-paste',
      shortcut: 'Ctrl+V',
      handler: logHandler
    })
  ]);

  let findMenu = new Menu([
    new MenuItem({
      text: 'Find...',
      shortcut: 'Ctrl+F',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Find Next',
      shortcut: 'F3',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Find Previous',
      shortcut: 'Shift+F3',
      handler: logHandler
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Replace...',
      shortcut: 'Ctrl+H',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Replace Next',
      shortcut: 'Ctrl+Shift+H',
      handler: logHandler
    })
  ]);

  let helpMenu = new Menu([
    new MenuItem({
      text: 'Documentation',
      handler: logHandler
    }),
    new MenuItem({
      text: 'About',
      handler: logHandler
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
      handler: logHandler
    }),
    new MenuItem({
      text: 'Cu&t',
      icon: 'fa fa-cut',
      shortcut: 'Ctrl+X',
      handler: logHandler
    }),
    new MenuItem({
      text: '&Paste',
      icon: 'fa fa-paste',
      shortcut: 'Ctrl+V',
      handler: logHandler
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: '&New Tab',
      handler: logHandler
    }),
    new MenuItem({
      text: '&Close Tab',
      handler: logHandler
    }),
    new MenuItem({
      type: MenuItem.Check,
      text: '&Save On Exit',
      handler: saveOnExitHandler
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Task Manager',
      disabled: true
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'More...',
      submenu: new Menu([
        new MenuItem({
          text: 'One',
          handler: logHandler
        }),
        new MenuItem({
          text: 'Two',
          handler: logHandler
        }),
        new MenuItem({
          text: 'Three',
          handler: logHandler
        }),
        new MenuItem({
          text: 'Four',
          handler: logHandler
        })
      ])
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Close',
      icon: 'fa fa-close',
      handler: logHandler
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
  panel.addChild(contextArea);
  panel.addChild(cmSource);
  panel.addChild(cmCss);

  menuBar.attach(document.body);
  panel.attach(document.body);

  window.onresize = () => { panel.update() };
}


window.onload = main;

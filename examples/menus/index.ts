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
  Tab, TabPanel
} from 'phosphor-tabs';

import {
  ResizeMessage, Widget, attachWidget
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


function logItem(item: MenuItem): void {
    console.log(item.text);
}


var MENU_BAR_TEMPLATE = [
    {
        text: 'File',
        submenu: [
            {
                text: 'New File',
                shortcut: 'Ctrl+N',
                handler: logItem
            },
            {
                text: 'Open File',
                shortcut: 'Ctrl+O',
                handler: logItem
            },
            {
                text: 'Save File',
                shortcut: 'Ctrl+S',
                handler: logItem
            },
            {
                text: 'Save As...',
                shortcut: 'Ctrl+Shift+S',
                handler: logItem
            },
            {
                type: 'separator'
            },
            {
                text: 'Close File',
                shortcut: 'Ctrl+W',
                handler: logItem
            },
            {
                text: 'Close All Files',
                handler: logItem
            },
            {
                type: 'separator'
            },
            {
                text: 'More...',
                submenu: [
                    {
                        text: 'One',
                        handler: logItem
                    },
                    {
                        text: 'Two',
                        handler: logItem
                    },
                    {
                        text: 'Three',
                        handler: logItem
                    },
                    {
                        text: 'Four',
                        handler: logItem
                    }
                ]
            },
            {
                type: 'separator'
            },
            {
                text: 'Exit',
                handler: logItem
            }
        ]
    },
    {
        text: 'Edit',
        submenu: [
            {
                text: '&Undo',
                shortcut: 'Ctrl+Z',
                className: 'undo',
                handler: logItem
            },
            {
                text: '&Repeat',
                shortcut: 'Ctrl+Y',
                className: 'repeat',
                handler: logItem
            },
            {
                type: 'separator'
            },
            {
                text: '&Copy',
                shortcut: 'Ctrl+C',
                className: 'copy',
                handler: logItem
            },
            {
                text: 'Cu&t',
                shortcut: 'Ctrl+X',
                className: 'cut',
                handler: logItem
            },
            {
                text: '&Paste',
                shortcut: 'Ctrl+V',
                className: 'paste',
                handler: logItem
            }
        ]
    },
    {
        text: 'Find',
        submenu: [
            {
                text: 'Find...',
                shortcut: 'Ctrl+F',
                handler: logItem
            },
            {
                text: 'Find Next',
                shortcut: 'F3',
                handler: logItem
            },
            {
                text: 'Find Previous',
                shortcut: 'Shift+F3',
                handler: logItem
            },
            {
                type: 'separator'
            },
            {
                text: 'Replace...',
                shortcut: 'Ctrl+H',
                handler: logItem
            },
            {
                text: 'Replace Next',
                shortcut: 'Ctrl+Shift+H',
                handler: logItem
            }
        ]
    },
    {
        text: 'View',
        disabled: true
    },
    {
        type: 'separator'
    },
    {
        text: 'Help',
        submenu: [
            {
                text: 'Documentation',
                handler: logItem
            },
            {
                text: 'About',
                handler: logItem
            }
        ]
    }
];


var CONTEXT_MENU_TEMPLATE = [
    {
        text: '&Copy',
        shortcut: 'Ctrl+C',
        className: 'copy',
        handler: logItem
    },
    {
        text: 'Cu&t',
        shortcut: 'Ctrl+X',
        className: 'cut',
        handler: logItem
    },
    {
        text: '&Paste',
        shortcut: 'Ctrl+V',
        className: 'paste',
        handler: logItem
    },
    {
        type: 'separator'
    },
    {
        text: '&New Tab',
        handler: logItem
    },
    {
        text: '&Close Tab',
        handler: logItem
    },
    {
        type: 'check',
        checked: true,
        text: '&Save On Exit',
        handler: (item: MenuItem) => {
            item.checked = !item.checked;
            console.log('Save On Exit:', item.checked);
        }
    },
    {
        type: 'separator'
    },
    {
        text: 'Task Manager',
        disabled: true
    },
    {
        type: 'separator'
    },
    {
        text: 'More...',
        submenu: [
            {
                text: 'One',
                handler: logItem
            },
            {
                text: 'Two',
                handler: logItem
            },
            {
                text: 'Three',
                handler: logItem
            },
            {
                text: 'Four',
                handler: logItem
            }
        ]
    },
    {
        type: 'separator'
    },
    {
        text: 'Close',
        className: 'close',
        handler: logItem
    }
];


function main(): void {

  var menuBar = MenuBar.fromTemplate(MENU_BAR_TEMPLATE);
  var contextMenu = Menu.fromTemplate(CONTEXT_MENU_TEMPLATE);

  document.addEventListener('contextmenu', (event: MouseEvent) => {
    event.preventDefault();
    var x = event.clientX;
    var y = event.clientY;
    contextMenu.popup(x, y);
  });

  TabPanel.setTab(menuBar, new Tab('Menu'));

  var cmSource = new CodeMirrorWidget({
    mode: 'text/javascript',
    lineNumbers: true,
    tabSize: 2,
  });
  cmSource.loadTarget('./index.ts');

  var cmCss = new CodeMirrorWidget({
    mode: 'text/css',
    lineNumbers: true,
    tabSize: 2,
  });
  cmCss.loadTarget('./index.css');

  TabPanel.setTab(cmSource, new Tab('Source'));
  TabPanel.setTab(cmCss, new Tab('CSS'));

  var panel = new TabPanel();
  panel.id = 'main';
  panel.widgets = [menuBar, cmSource, cmCss];

  attachWidget(panel, document.body);

  window.onresize = () => panel.update();
}


window.onload = main;

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2016, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/

import {
  Message
} from 'phosphor/lib/core/messaging';

import {
  CommandRegistry
} from 'phosphor/lib/ui/commandregistry';

import {
  Keymap
} from 'phosphor/lib/ui/keymap';

import {
  Menu
} from 'phosphor/lib/ui/menu';

import {
  MenuBar
} from 'phosphor/lib/ui/menubar';

import {
  TabPanel
} from 'phosphor/lib/ui/tabpanel';

import {
  ResizeMessage, Widget
} from 'phosphor/lib/ui/widget';


import 'phosphor/styles/base.css';
import '../index.css';


const commands = new CommandRegistry();
const keymap = new Keymap({ commands });


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
    let doc = this._editor.getDoc();
    let xhr = new XMLHttpRequest();
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


function createMenu(): Menu {
  let sub1 = new Menu({ commands, keymap });
  sub1.title.label = 'More...';
  sub1.title.mnemonic = 0;
  sub1.addItem({ command: 'example:one' });
  sub1.addItem({ command: 'example:two' });
  sub1.addItem({ command: 'example:three' });
  sub1.addItem({ command: 'example:four' });

  let sub2 = new Menu({ commands, keymap });
  sub2.title.label = 'More...';
  sub2.title.mnemonic = 0;
  sub2.addItem({ command: 'example:one' });
  sub2.addItem({ command: 'example:two' });
  sub2.addItem({ command: 'example:three' });
  sub2.addItem({ command: 'example:four' });
  sub2.addItem({ type: 'submenu', menu: sub1 });

  let root = new Menu({ commands, keymap });
  root.addItem({ command: 'example:copy' });
  root.addItem({ command: 'example:cut' });
  root.addItem({ command: 'example:paste' });
  root.addItem({ type: 'separator' });
  root.addItem({ command: 'example:new-tab' });
  root.addItem({ command: 'example:close-tab' });
  root.addItem({ command: 'example:save-on-exit' });
  root.addItem({ type: 'separator' });
  root.addItem({ command: 'example:open-task-manager' });
  root.addItem({ type: 'separator' });
  root.addItem({ type: 'submenu', menu: sub2 });
  root.addItem({ type: 'separator' });
  root.addItem({ command: 'example:close' });

  return root;
}


/**
 * A handler which logs the item text to the log span.
 */
function logHandler(value: string): void {
  let node = document.getElementById('log-span');
  node.textContent = value.replace(/&/g, '');
  console.log(value);
}



function main(): void {

  commands.addCommand('example:cut', {
    label: 'Cut',
    mnemonic: 1,
    icon: 'fa fa-cut',
    execute: () => {
      logHandler('Cut');
    }
  });

  commands.addCommand('example:copy', {
    label: 'Copy',
    mnemonic: 0,
    icon: 'fa fa-copy',
    execute: () => {
      logHandler('Copy');
    }
  });

  commands.addCommand('example:paste', {
    label: 'Paste',
    mnemonic: 0,
    icon: 'fa fa-paste',
    execute: () => {
      logHandler('Paste');
    }
  });

  commands.addCommand('example:new-tab', {
    label: 'New Tab',
    mnemonic: 0,
    caption: 'Open a new tab',
    execute: () => {
      logHandler('New Tab');
    }
  });

  commands.addCommand('example:close-tab', {
    label: 'Close Tab',
    mnemonic: 2,
    caption: 'Close the current tab',
    execute: () => {
      logHandler('Close Tab');
    }
  });

  commands.addCommand('example:save-on-exit', {
    label: 'Save on Exit',
    mnemonic: 0,
    caption: 'Toggle the save on exit flag',
    execute: () => {
      logHandler('Save on Exit');
    }
  });

  commands.addCommand('example:open-task-manager', {
    label: 'Task Manager',
    mnemonic: 5,
    isEnabled: () => false,
    execute: () => { }
  });

  commands.addCommand('example:close', {
    label: 'Close',
    mnemonic: 0,
    icon: 'fa fa-close',
    execute: () => {
      logHandler('Close');
    }
  });

  commands.addCommand('example:one', {
    label: 'One',
    execute: () => {
      logHandler('One');
    }
  });

  commands.addCommand('example:two', {
    label: 'Two',
    execute: () => {
      logHandler('Two');
    }
  });

  commands.addCommand('example:three', {
    label: 'Three',
    execute: () => {
      logHandler('Three');
    }
  });

  commands.addCommand('example:four', {
    label: 'Four',
    execute: () => {
      logHandler('Four');
    }
  });

  keymap.addBinding({
    keys: ['Accel X'],
    selector: 'body',
    command: 'example:cut'
  });

  keymap.addBinding({
    keys: ['Accel C'],
    selector: 'body',
    command: 'example:copy'
  });

  keymap.addBinding({
    keys: ['Accel V'],
    selector: 'body',
    command: 'example:paste'
  });

  keymap.addBinding({
    keys: ['Accel J', 'Accel J'],
    selector: 'body',
    command: 'example:new-tab'
  });

  keymap.addBinding({
    keys: ['Accel M'],
    selector: 'body',
    command: 'example:open-task-manager'
  });

  let contextArea = new Widget();
  contextArea.addClass('ContextArea');
  contextArea.node.innerHTML = (
    '<h2>Notice the menu bar at the top of the document.</h2>' +
    '<h2>Right click this panel for a context menu.</h2>' +
    '<h3>Clicked Item: <span id="log-span"></span></h3>'
  );
  contextArea.title.label = 'Demo';

  let cmSource = new CodeMirrorWidget({
    mode: 'text/javascript',
    lineNumbers: true,
    tabSize: 2,
  });
  cmSource.loadTarget('./index.ts');
  cmSource.title.label = 'Source';

  let menu1 = createMenu();
  menu1.title.label = 'File';
  menu1.title.mnemonic = 0;

  let menu2 = createMenu();
  menu2.title.label = 'Edit';
  menu2.title.mnemonic = 0;

  let menu3 = createMenu();
  menu3.title.label = 'View';
  menu3.title.mnemonic = 0;

  let contextMenu = createMenu();

  let bar = new MenuBar({ keymap });
  bar.addMenu(menu1);
  bar.addMenu(menu2);
  bar.addMenu(menu3);

  contextArea.node.addEventListener('contextmenu', (event: MouseEvent) => {
    event.preventDefault();
    let x = event.clientX;
    let y = event.clientY;
    contextMenu.open(x, y);
  });

  let panel = new TabPanel();
  panel.id = 'main';
  panel.addWidget(contextArea);
  panel.addWidget(cmSource);

  Widget.attach(bar, document.body);
  Widget.attach(panel, document.body);

  window.onresize = () => { panel.update(); };
}


window.onload = main;

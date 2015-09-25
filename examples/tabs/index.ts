/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

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


/**
 * A widget which disposes itself when closed.
 *
 * By default, a widget will only remove itself from the hierarchy.
 */
class ContentWidget extends Widget {

  constructor(title: string) {
    super();
    this.addClass('content');
    this.addClass(title.toLowerCase());

    var tab = new Tab(title);
    tab.closable = true;
    TabPanel.setTab(this, tab);
  }

  protected onCloseRequest(msg: Message): void {
    this.dispose();
  }
}


/**
 * A title generator function.
 */
var nextTitle = (() => {
  var i = 0;
  var titles = ['Red', 'Yellow', 'Green', 'Blue'];
  return () => titles[i++ % titles.length];
})();


/**
 * Add a new content widget the the given tab panel.
 */
function addContent(panel: TabPanel): void {
  var content = new ContentWidget(nextTitle());
  panel.addWidget(new ContentWidget(nextTitle()));
}


/**
 * The main application entry point.
 */
function main(): void {
  var panel = new TabPanel();
  panel.id = 'main';

  var btn = document.createElement('button');
  btn.textContent = 'Add New Tab';
  btn.onclick = () => addContent(panel);

  var demoArea = new Widget();
  demoArea.node.appendChild(btn);

  var cmSource = new CodeMirrorWidget({
    mode: 'text/typescript',
    lineNumbers:true,
    tabSize: 2
  });
  cmSource.loadTarget('./index.ts');

  var cmCss = new CodeMirrorWidget({
    mode: 'text/css',
    lineNumbers: true,
    tabSize: 2
  });
  cmCss.loadTarget('./index.css');

  TabPanel.setTab(demoArea, new Tab('Demo'));
  TabPanel.setTab(cmSource, new Tab('Source'));
  TabPanel.setTab(cmCss, new Tab('CSS'));

  panel.widgets = [demoArea, cmSource, cmCss];

  attachWidget(panel, document.body);

  window.onresize = () => panel.update();
}


window.onload = main;

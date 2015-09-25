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


class ExampleTab extends Widget {
  constructor() {
    super();
    var tab = new Tab('Example');
    tab.closable = true;
    TabPanel.setTab(this, tab);
  }
}


function main(): void {
  var panel = new TabPanel();
  panel.id = 'main';

  var btn = document.createElement('button');
  var text = document.createTextNode('Click to add a Tab');
  btn.appendChild(text);
  btn.onclick = () => {
      panel.addWidget(new ExampleTab());
  }

  var contextArea = new Widget();
  contextArea.addClass('ContextArea');
  contextArea.node.appendChild(btn);

  var cmSource = new CodeMirrorWidget({
    mode: 'text/css',
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

  TabPanel.setTab(contextArea, new Tab('Demo'));
  TabPanel.setTab(cmSource, new Tab('Source'));
  TabPanel.setTab(cmCss, new Tab('CSS'));

  panel.widgets = [contextArea, cmSource, cmCss];

  attachWidget(panel, document.body);

  window.onresize = () => panel.update();
}

window.onload = main;

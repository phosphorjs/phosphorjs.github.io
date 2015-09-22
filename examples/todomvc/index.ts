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
  SplitPanel
} from 'phosphor-splitpanel';

import {
  ResizeMessage, Widget, attachWidget
} from 'phosphor-widget';

import './index.css';


declare var app: any;


class TodoWidget extends Widget {

  static createNode(): HTMLElement {
    var node = document.createElement('div');
    var app = document.createElement('div');
    app.className = 'todoapp';
    node.appendChild(app);
    return node;
  }

  constructor(model: any) {
    super();
    this.addClass('content');
    this._model = model;
    model.subscribe(() => this.update());
  }

  protected onAfterAttach(msg: Message): void {
    this.update();
  }

  protected onUpdateRequest(msg: Message): void {
    var host = this.node.firstChild as Element;
    var data = { model: this._model };
    React.render(React.createElement(app.TodoApp, data), host);
  }

  private _model: any; 
}


class CodeMirrorWidget extends Widget {

  constructor(config?: CodeMirror.EditorConfiguration) {
    super();
    this.addClass('CodeMirrorWidget');
    this.addClass('content');
    this._editor = CodeMirror(this.node, config);
  }

  dispose(): void {
    this._editor = null;
    super.dispose();
  }

  get editor(): CodeMirror.Editor {
    return this._editor;
  }

  protected onAfterAttach(msg: Message): void {
    this._editor.refresh();
  }

  protected onResize(msg: ResizeMessage): void {
    this._editor.setSize(msg.width, msg.height);
  }

  private _editor: CodeMirror.Editor;
}


function main(): void {

  var split = new SplitPanel();
  split.id = 'main';
  split.handleSize = 5;

  var model = new app.TodoModel('react-todos');
  var todo = new TodoWidget(model);

  var cm = new CodeMirrorWidget({
    value: "var text = 'This is a CodeMirror widget.';",
    mode: 'javascript',
    lineNumbers: true,
    tabSize: 2,
    extraKeys: {"Ctrl-Space": "autocomplete"},
  });

  var client = new XMLHttpRequest();
  client.open('GET', '/index.ts');
  client.onreadystatechange = () => {
    cm.editor.getDoc().setValue(client.responseText);
  }
  client.send();

  split.children = [cm, todo];
  attachWidget(split, document.body);

  window.onresize = () => split.update();
}

window.onload = main;

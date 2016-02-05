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
  TabPanel
} from 'phosphor-tabs';

import {
  ResizeMessage, Widget
} from 'phosphor-widget';

import './index.css';


// Declare the untyped Todo-App namespace.
declare var app: any;


/**
 * A widget which hosts a Todo-App.
 */
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
    this.addClass('TodoWidget');
    this._model = model;
  }

  get model(): any {
    return this._model;
  }

  protected onAfterAttach(msg: Message): void {
    this._model.subscribe(() => this.update());
    this.update();
  }

  protected onUpdateRequest(msg: Message): void {
    var data = { model: this._model };
    var host = this.node.firstChild as Element;
    React.render(React.createElement(app.TodoApp, data), host);
  }

  private _model: any;
}


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
 * The main application entry point.
 */
function main(): void {
  var model = new app.TodoModel('react-todos');
  var todo = new TodoWidget(model);
  todo.title.text = 'Demo';

  var cmSource = new CodeMirrorWidget({
    mode: 'text/typescript',
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

  var panel = new TabPanel()
  panel.id = 'main';
  panel.addChild(todo);
  panel.addChild(cmSource);
  panel.addChild(cmCss);

  panel.attach(document.body);

  window.onresize = () => { panel.update(); };
}


window.onload = main;

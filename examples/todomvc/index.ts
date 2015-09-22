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


function main(): void {
  // Create Todo widget with a new Todo model
  var model = new app.TodoModel('react-todos');
  var todo = new TodoWidget(model);

  // Create the CodeMirror widget with a typescript mode.
  var cm = new CodeMirrorWidget({
    mode: 'text/typescript',
    lineNumbers: true,
    tabSize: 2,
  });

  // Set the stretch factors for the widgets.
  SplitPanel.setStretch(cm, 0);
  SplitPanel.setStretch(todo, 1);

  // Setup the main split panel
  var split = new SplitPanel();
  split.id = 'main';
  split.handleSize = 0;
  split.children = [cm, todo];
  split.setSizes([1, 1.5]);

  // Initialize the CodeMirror text to the contents of this file.
  var doc = cm.editor.getDoc();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', './index.ts');
  xhr.onreadystatechange = () => doc.setValue(xhr.responseText);
  xhr.send();

  // Attach the main split panel to the body.
  attachWidget(split, document.body);

  // Update the main panel on window resize.
  window.onresize = () => split.update();
}


window.onload = main;

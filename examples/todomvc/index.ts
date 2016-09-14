/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/

import {
  Message
} from 'phosphor/lib/core/messaging';

import {
  TabPanel
} from 'phosphor/lib/ui/tabpanel';

import {
  ResizeMessage, Widget
} from 'phosphor/lib/ui/widget';


import 'phosphor/styles/base.css';
import '../index.css';


// Declare the untyped Todo-App namespace.
declare let app: any;


/**
 * A widget which hosts a Todo-App.
 */
class TodoWidget extends Widget {

  constructor(model: any) {
    super();
    this.addClass('TodoWidget');
    this.addClass('todoapp');
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
    let data = { model: this._model };
    React.render(React.createElement(app.TodoApp, data), this.node);
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


/**
 * The main application entry point.
 */
function main(): void {
  let model = new app.TodoModel('react-todos');
  let todo = new TodoWidget(model);
  todo.title.label = 'Demo';

  let cmSource = new CodeMirrorWidget({
    mode: 'text/typescript',
    lineNumbers: true,
    tabSize: 2,
  });
  cmSource.loadTarget('./index.ts');
  cmSource.title.label = 'Source';

  let panel = new TabPanel();
  panel.id = 'main';
  panel.addWidget(todo);
  panel.addWidget(cmSource);

  Widget.attach(panel, document.body);

  window.onresize = () => { panel.update(); };
}


window.onload = main;

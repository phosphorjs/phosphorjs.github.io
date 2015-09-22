/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
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

  constructor(name: string) {
    super();
    this.addClass('todoapp');
    this.addClass('content');
    this._model = new app.TodoModel('react-todos-' + name);
  }

  onAfterAttach(msg: Message): void { 
    var render = () => {
      React.render(
        React.createElement(app.TodoApp, {model: this._model}),
        this.node
      );
    }
    this._model.subscribe(render);
    render();
  }

  private _model: any = null;

}


function main(): void {

  var split = new SplitPanel();
  split.id = 'main';
  split.handleSize = 5;

  var widget0 = new TodoWidget('foo');
  var widget1 = new TodoWidget('bar');
  split.children = [widget0, widget1];

  // wait for the JSX to load
  setTimeout(() => {
    attachWidget(split, document.body);
  }, 100);

  window.onresize = () => split.update();
}

window.onload = main;

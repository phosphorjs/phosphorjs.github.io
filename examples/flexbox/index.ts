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
} from 'phosphor/lib/core/messaging';

import {
  Panel
} from 'phosphor/lib/ui/panel';

import {
  SplitPanel
} from 'phosphor/lib/ui/splitpanel';

import {
  TabPanel
} from 'phosphor/lib/ui/tabpanel';

import {
  ResizeMessage, Widget
} from 'phosphor/lib/ui/widget';

import 'phosphor/styles/base.css';
import '../index.css';
import './index.css';


/**
 * A widget which uses CSS flexbox to layout its children.
 */
class MyVBox extends Panel {

  constructor() {
    super();
    this.addClass('my-vbox');
  }
}


/**
 * A widget which logs its resize messages.
 */
class MyResizeWidget extends Widget {
  // All widgets will receive a resize message when their parent
  // determines that they have likely been resized. If the current
  // size of the widget is known, it will be passed as part of the
  // message. Otherwise, the size parameters will be `-1`, and the
  // the node will need to be measured to get the current size.
  //
  // The current size will typically be known when the parent of
  // the widget is an absolute Phosphor layout panel, and will be
  // unknown when the parent is a widget which uses CSS to layout
  // its children.
  protected onResize(msg: ResizeMessage): void {
    let w = msg.width;
    let h = msg.height;
    console.log(this.node.className, 'width:', w, 'height:', h);
  }
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
 * Create a placeholder content widget.
 */
function createContent(name: string): Widget {
  let widget = new MyResizeWidget();
  widget.addClass('content');
  widget.addClass(name);
  return widget;
}


/**
 * The main application entry point.
 */
function main(): void {
  let red = createContent('red');
  let yellow = createContent('yellow');
  let green = createContent('green');

  let blue1 = createContent('blue');
  let blue2 = createContent('blue');
  let blue3 = createContent('blue');
  let blue4 = createContent('blue');

  let split = new SplitPanel();
  split.addWidget(blue1);
  split.addWidget(blue2);
  split.addWidget(blue3);
  split.addWidget(blue4);

  let box = new MyVBox();
  box.addWidget(red);
  box.addWidget(split);
  box.addWidget(yellow);
  box.addWidget(green);
  box.title.label = 'Demo';

  let cmSource = new CodeMirrorWidget({
    mode: 'text/typescript',
    lineNumbers: true,
    tabSize: 2,
  });
  cmSource.loadTarget('./index.ts');
  cmSource.title.label = 'Source';

  let cmCss = new CodeMirrorWidget({
    mode: 'text/css',
    lineNumbers: true,
    tabSize: 2,
  });
  cmCss.loadTarget('./index.css');
  cmCss.title.label = 'CSS';

  let panel = new TabPanel();
  panel.id = 'main';
  panel.addWidget(box);
  panel.addWidget(cmSource);
  panel.addWidget(cmCss);

  Widget.attach(panel, document.body);

  window.onresize = () => { panel.update(); };
}


window.onload = main;

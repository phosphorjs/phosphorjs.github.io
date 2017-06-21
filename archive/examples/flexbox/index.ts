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
  Panel
} from 'phosphor-panel';

import {
  SplitPanel
} from 'phosphor-splitpanel';

import {
  TabPanel
} from 'phosphor-tabs';

import {
  ResizeMessage, Widget
} from 'phosphor-widget';

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
    var w = msg.width;
    var h = msg.height;
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
 * Create a placeholder content widget.
 */
function createContent(name: string): Widget {
  var widget = new MyResizeWidget();
  widget.addClass('content');
  widget.addClass(name);
  return widget;
}


/**
 * The main application entry point.
 */
function main(): void {
  var red = createContent('red');
  var yellow = createContent('yellow');
  var green = createContent('green');

  var blue1 = createContent('blue');
  var blue2 = createContent('blue');
  var blue3 = createContent('blue');
  var blue4 = createContent('blue');

  var split = new SplitPanel();
  split.addChild(blue1);
  split.addChild(blue2);
  split.addChild(blue3);
  split.addChild(blue4);

  var box = new MyVBox();
  box.addChild(red);
  box.addChild(split);
  box.addChild(yellow);
  box.addChild(green);
  box.title.text = 'Demo';

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
  panel.addChild(box);
  panel.addChild(cmSource);
  panel.addChild(cmCss);

  panel.attach(document.body);

  window.onresize = () => { panel.update() };
}


window.onload = main;

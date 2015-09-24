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
  Tab, TabPanel
} from 'phosphor-tabs';

import {
  ResizeMessage, Widget, attachWidget
} from 'phosphor-widget';

import './index.css';


/**
 * A widget which uses CSS flexbox to layout its children.
 *
 * **See Also:** './index.css'
 */
class MyVBox extends Widget {
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
  split.children = [blue1, blue2, blue3, blue4];

  var box = new MyVBox();
  box.children = [red, split, yellow, green];

  var cmSource = new CodeMirrorWidget({
    mode: 'text/typescript',
    lineNumbers: true,
    tabSize: 2,
  });
  cmSource.loadTarget('./index.ts');

  var cmCss = new CodeMirrorWidget({
    mode: 'text/css',
    lineNumbers: true,
    tabSize: 2,
  });
  cmCss.loadTarget('./index.css');

  TabPanel.setTab(box, new Tab('Demo'));
  TabPanel.setTab(cmSource, new Tab('Source'));
  TabPanel.setTab(cmCss, new Tab('CSS'));

  var panel = new TabPanel()
  panel.id = 'main';
  panel.widgets = [box, cmSource, cmCss];

  attachWidget(panel, document.body);

  window.onresize = () => panel.update();
}


window.onload = main;

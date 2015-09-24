/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  DockPanel
} from 'phosphor-dockpanel';

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


function createContent(title: string): Widget {
  var widget = new Widget();
  widget.addClass('content');
  widget.addClass(title.toLowerCase());

  var tab = new Tab(title);
  tab.closable = true;
  DockPanel.setTab(widget, tab);

  return widget;
}


function main(): void {
  var r1 = createContent('Red');
  var r2 = createContent('Red');
  var r3 = createContent('Red');

  var b1 = createContent('Blue');
  var b2 = createContent('Blue');
  var b3 = createContent('Blue');

  var g1 = createContent('Green');
  var g2 = createContent('Green');
  var g3 = createContent('Green');

  var y1 = createContent('Yellow');
  var y2 = createContent('Yellow');
  var y3 = createContent('Yellow');

  var panel = new DockPanel();

  panel.addWidget(r1);

  panel.addWidget(b1, DockPanel.SplitRight, r1);
  panel.addWidget(y1, DockPanel.SplitBottom, b1);
  panel.addWidget(g1, DockPanel.SplitLeft, y1);

  panel.addWidget(b2, DockPanel.SplitBottom);

  panel.addWidget(y2, DockPanel.TabBefore, r1);
  panel.addWidget(b3, DockPanel.TabBefore, y2);
  panel.addWidget(g2, DockPanel.TabBefore, b2);
  panel.addWidget(y3, DockPanel.TabBefore, g2);
  panel.addWidget(g3, DockPanel.TabBefore, y3);
  panel.addWidget(r2, DockPanel.TabBefore, b1);
  panel.addWidget(r3, DockPanel.TabBefore, y1);

  // Create the CodeMirror widget with a typescript mode.
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

  TabPanel.setTab(panel, new Tab('Demo'));
  TabPanel.setTab(cmSource, new Tab('Source'));
  TabPanel.setTab(cmCss, new Tab('CSS'));

  var tabs = new TabPanel()
  tabs.id = 'main';
  tabs.widgets = [panel, cmSource, cmCss];

  attachWidget(tabs, document.body);

  window.onresize = () => tabs.update();
}


window.onload = main;

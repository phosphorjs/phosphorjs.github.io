/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2016, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/

import {
  Message
} from 'phosphor/lib/core/messaging';

import {
  DockPanel
} from 'phosphor/lib/ui/dockpanel';

import {
  ResizeMessage, Widget
} from 'phosphor/lib/ui/widget';

import 'phosphor/styles/base.css';
import '../index.css';


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
function createContent(title: string): Widget {
  let widget = new Widget();
  widget.addClass('content');
  widget.addClass(title.toLowerCase());

  widget.title.label = title;
  widget.title.closable = true;

  return widget;
}


/**
 * The main application entry point.
 */
function main(): void {
  let r1 = createContent('Red');
  let r2 = createContent('Red');
  let r3 = createContent('Red');

  let b1 = createContent('Blue');
  let b2 = createContent('Blue');

  let g1 = createContent('Green');
  let g2 = createContent('Green');
  let g3 = createContent('Green');

  let y1 = createContent('Yellow');
  let y2 = createContent('Yellow');

  let panel = new DockPanel();
  panel.id = 'main';

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
  cmCss.loadTarget('../index.css');
  cmCss.title.label = 'CSS';

  panel.addWidget(cmSource);
  panel.addWidget(b1, { ref: cmSource, mode: 'split-right' });
  panel.addWidget(y1, { ref: b1, mode: 'split-bottom' });
  panel.addWidget(g1, { ref: y1, mode: 'split-left' });

  panel.addWidget(b2, { mode: 'split-bottom' });

  panel.addWidget(cmCss, { ref: cmSource, mode: 'tab-after' });
  panel.addWidget(r1, { ref: cmCss, mode: 'tab-after' });
  panel.addWidget(g2, { ref: b2, mode: 'tab-before' });
  panel.addWidget(y2, { ref: g2, mode: 'tab-before' });
  panel.addWidget(g3, { ref: y2, mode: 'tab-before' });
  panel.addWidget(r2, { ref: b1, mode: 'tab-before' });
  panel.addWidget(r3, { ref: y1, mode: 'tab-before' });

  panel.activateWidget(cmSource);

  Widget.attach(panel, document.body);

  window.onresize = () => { panel.update(); };
}


window.onload = main;

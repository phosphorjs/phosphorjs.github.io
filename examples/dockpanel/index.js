/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phosphor_dockpanel_1 = require('phosphor-dockpanel');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * A widget which hosts a CodeMirror editor.
 */
var CodeMirrorWidget = (function (_super) {
    __extends(CodeMirrorWidget, _super);
    function CodeMirrorWidget(config) {
        _super.call(this);
        this.addClass('CodeMirrorWidget');
        this._editor = CodeMirror(this.node, config);
    }
    Object.defineProperty(CodeMirrorWidget.prototype, "editor", {
        get: function () {
            return this._editor;
        },
        enumerable: true,
        configurable: true
    });
    CodeMirrorWidget.prototype.loadTarget = function (target) {
        var doc = this._editor.getDoc();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', target);
        xhr.onreadystatechange = function () { return doc.setValue(xhr.responseText); };
        xhr.send();
    };
    CodeMirrorWidget.prototype.onAfterAttach = function (msg) {
        this._editor.refresh();
    };
    CodeMirrorWidget.prototype.onResize = function (msg) {
        if (msg.width < 0 || msg.height < 0) {
            this._editor.refresh();
        }
        else {
            this._editor.setSize(msg.width, msg.height);
        }
    };
    return CodeMirrorWidget;
})(phosphor_widget_1.Widget);
/**
 * Create a placeholder content widget.
 */
function createContent(title) {
    var widget = new phosphor_widget_1.Widget();
    widget.addClass('content');
    widget.addClass(title.toLowerCase());
    widget.title.text = title;
    widget.title.closable = true;
    return widget;
}
/**
 * The main application entry point.
 */
function main() {
    var r1 = createContent('Red');
    var r2 = createContent('Red');
    var r3 = createContent('Red');
    var b1 = createContent('Blue');
    var b2 = createContent('Blue');
    var g1 = createContent('Green');
    var g2 = createContent('Green');
    var g3 = createContent('Green');
    var y1 = createContent('Yellow');
    var y2 = createContent('Yellow');
    var panel = new phosphor_dockpanel_1.DockPanel();
    panel.id = 'main';
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
    panel.insertLeft(cmSource);
    panel.insertRight(b1, cmSource);
    panel.insertBottom(y1, b1);
    panel.insertLeft(g1, y1);
    panel.insertBottom(b2);
    panel.insertTabAfter(cmCss, cmSource);
    panel.insertTabAfter(r1, cmCss);
    panel.insertTabBefore(g2, b2);
    panel.insertTabBefore(y2, g2);
    panel.insertTabBefore(g3, y2);
    panel.insertTabBefore(r2, b1);
    panel.insertTabBefore(r3, y1);
    phosphor_widget_1.Widget.attach(panel, document.body);
    window.onresize = function () { return panel.update(); };
}
window.onload = main;

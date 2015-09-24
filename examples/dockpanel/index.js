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
var phosphor_tabs_1 = require('phosphor-tabs');
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
    var tab = new phosphor_tabs_1.Tab(title);
    tab.closable = true;
    phosphor_dockpanel_1.DockPanel.setTab(widget, tab);
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
    var cmCss = new CodeMirrorWidget({
        mode: 'text/css',
        lineNumbers: true,
        tabSize: 2,
    });
    cmCss.loadTarget('./index.css');
    phosphor_dockpanel_1.DockPanel.setTab(cmSource, new phosphor_tabs_1.Tab('Source'));
    phosphor_dockpanel_1.DockPanel.setTab(cmCss, new phosphor_tabs_1.Tab('CSS'));
    panel.addWidget(cmSource);
    panel.addWidget(b1, phosphor_dockpanel_1.DockPanel.SplitRight, cmSource);
    panel.addWidget(y1, phosphor_dockpanel_1.DockPanel.SplitBottom, b1);
    panel.addWidget(g1, phosphor_dockpanel_1.DockPanel.SplitLeft, y1);
    panel.addWidget(b2, phosphor_dockpanel_1.DockPanel.SplitBottom);
    panel.addWidget(cmCss, phosphor_dockpanel_1.DockPanel.TabAfter, cmSource);
    panel.addWidget(r1, phosphor_dockpanel_1.DockPanel.TabAfter, cmCss);
    panel.addWidget(g2, phosphor_dockpanel_1.DockPanel.TabBefore, b2);
    panel.addWidget(y2, phosphor_dockpanel_1.DockPanel.TabBefore, g2);
    panel.addWidget(g3, phosphor_dockpanel_1.DockPanel.TabBefore, y2);
    panel.addWidget(r2, phosphor_dockpanel_1.DockPanel.TabBefore, b1);
    panel.addWidget(r3, phosphor_dockpanel_1.DockPanel.TabBefore, y1);
    phosphor_widget_1.attachWidget(panel, document.body);
    window.onresize = function () { return panel.update(); };
}
window.onload = main;

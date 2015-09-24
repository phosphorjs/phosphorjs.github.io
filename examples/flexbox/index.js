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
var phosphor_splitpanel_1 = require('phosphor-splitpanel');
var phosphor_tabs_1 = require('phosphor-tabs');
var phosphor_widget_1 = require('phosphor-widget');
require('./index.css');
/**
 * A widget which uses CSS flexbox to layout its children.
 */
var MyVBox = (function (_super) {
    __extends(MyVBox, _super);
    function MyVBox() {
        _super.call(this);
        this.addClass('my-vbox');
    }
    return MyVBox;
})(phosphor_widget_1.Widget);
/**
 * A widget which logs its resize messages.
 */
var MyResizeWidget = (function (_super) {
    __extends(MyResizeWidget, _super);
    function MyResizeWidget() {
        _super.apply(this, arguments);
    }
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
    MyResizeWidget.prototype.onResize = function (msg) {
        var w = msg.width;
        var h = msg.height;
        console.log(this.node.className, 'width:', w, 'height:', h);
    };
    return MyResizeWidget;
})(phosphor_widget_1.Widget);
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
function createContent(name) {
    var widget = new MyResizeWidget();
    widget.addClass('content');
    widget.addClass(name);
    return widget;
}
/**
 * The main application entry point.
 */
function main() {
    var red = createContent('red');
    var yellow = createContent('yellow');
    var green = createContent('green');
    var blue1 = createContent('blue');
    var blue2 = createContent('blue');
    var blue3 = createContent('blue');
    var blue4 = createContent('blue');
    var split = new phosphor_splitpanel_1.SplitPanel();
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
    phosphor_tabs_1.TabPanel.setTab(box, new phosphor_tabs_1.Tab('Demo'));
    phosphor_tabs_1.TabPanel.setTab(cmSource, new phosphor_tabs_1.Tab('Source'));
    phosphor_tabs_1.TabPanel.setTab(cmCss, new phosphor_tabs_1.Tab('CSS'));
    var panel = new phosphor_tabs_1.TabPanel();
    panel.id = 'main';
    panel.widgets = [box, cmSource, cmCss];
    phosphor_widget_1.attachWidget(panel, document.body);
    window.onresize = function () { return panel.update(); };
}
window.onload = main;

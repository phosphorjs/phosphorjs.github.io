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
var ExampleTab = (function (_super) {
    __extends(ExampleTab, _super);
    function ExampleTab() {
        _super.call(this);
        var tab = new phosphor_tabs_1.Tab('Example');
        tab.closable = true;
        phosphor_tabs_1.TabPanel.setTab(this, tab);
    }
    return ExampleTab;
})(phosphor_widget_1.Widget);
function main() {
    var panel = new phosphor_tabs_1.TabPanel();
    panel.id = 'main';
    var btn = document.createElement('button');
    var text = document.createTextNode('Click to add a Tab');
    btn.appendChild(text);
    btn.onclick = function () {
        panel.addWidget(new ExampleTab());
    };
    var contextArea = new phosphor_widget_1.Widget();
    contextArea.addClass('ContextArea');
    contextArea.node.appendChild(btn);
    var cmSource = new CodeMirrorWidget({
        mode: 'text/typescript',
        lineNumbers: true,
        tabSize: 2
    });
    cmSource.loadTarget('./index.ts');
    var cmCss = new CodeMirrorWidget({
        mode: 'text/css',
        lineNumbers: true,
        tabSize: 2
    });
    cmCss.loadTarget('./index.css');
    phosphor_tabs_1.TabPanel.setTab(contextArea, new phosphor_tabs_1.Tab('Demo'));
    phosphor_tabs_1.TabPanel.setTab(cmSource, new phosphor_tabs_1.Tab('Source'));
    phosphor_tabs_1.TabPanel.setTab(cmCss, new phosphor_tabs_1.Tab('CSS'));
    panel.widgets = [contextArea, cmSource, cmCss];
    phosphor_widget_1.attachWidget(panel, document.body);
    window.onresize = function () { return panel.update(); };
}
window.onload = main;

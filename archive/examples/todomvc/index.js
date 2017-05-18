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
 * A widget which hosts a Todo-App.
 */
var TodoWidget = (function (_super) {
    __extends(TodoWidget, _super);
    function TodoWidget(model) {
        _super.call(this);
        this.addClass('TodoWidget');
        this._model = model;
    }
    TodoWidget.createNode = function () {
        var node = document.createElement('div');
        var app = document.createElement('div');
        app.className = 'todoapp';
        node.appendChild(app);
        return node;
    };
    Object.defineProperty(TodoWidget.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    TodoWidget.prototype.onAfterAttach = function (msg) {
        var _this = this;
        this._model.subscribe(function () { return _this.update(); });
        this.update();
    };
    TodoWidget.prototype.onUpdateRequest = function (msg) {
        var data = { model: this._model };
        var host = this.node.firstChild;
        React.render(React.createElement(app.TodoApp, data), host);
    };
    return TodoWidget;
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
 * The main application entry point.
 */
function main() {
    var model = new app.TodoModel('react-todos');
    var todo = new TodoWidget(model);
    todo.title.text = 'Demo';
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
    var panel = new phosphor_tabs_1.TabPanel();
    panel.id = 'main';
    panel.addChild(todo);
    panel.addChild(cmSource);
    panel.addChild(cmCss);
    panel.attach(document.body);
    window.onresize = function () { panel.update(); };
}
window.onload = main;

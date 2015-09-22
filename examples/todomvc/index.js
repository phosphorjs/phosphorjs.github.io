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
function main() {
    // Create Todo widget with a new Todo model
    var model = new app.TodoModel('react-todos');
    var todo = new TodoWidget(model);
    // Create the CodeMirror widget with a typescript mode.
    var cm = new CodeMirrorWidget({
        mode: 'text/typescript',
        lineNumbers: true,
        tabSize: 2,
    });
    // Set the stretch factors for the widgets.
    phosphor_splitpanel_1.SplitPanel.setStretch(cm, 0);
    phosphor_splitpanel_1.SplitPanel.setStretch(todo, 1);
    // Setup the main split panel
    var split = new phosphor_splitpanel_1.SplitPanel();
    split.id = 'main';
    split.handleSize = 0;
    split.children = [cm, todo];
    split.setSizes([1, 1.5]);
    // Initialize the CodeMirror text to the contents of this file.
    var doc = cm.editor.getDoc();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './index.ts');
    xhr.onreadystatechange = function () { return doc.setValue(xhr.responseText); };
    xhr.send();
    // Attach the main split panel to the body.
    phosphor_widget_1.attachWidget(split, document.body);
    // Update the main panel on window resize.
    window.onresize = function () { return split.update(); };
}
window.onload = main;

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
var TodoWidget = (function (_super) {
    __extends(TodoWidget, _super);
    function TodoWidget(model) {
        var _this = this;
        _super.call(this);
        this.addClass('content');
        this._model = model;
        model.subscribe(function () { return _this.update(); });
    }
    TodoWidget.createNode = function () {
        var node = document.createElement('div');
        var app = document.createElement('div');
        app.className = 'todoapp';
        node.appendChild(app);
        return node;
    };
    TodoWidget.prototype.onAfterAttach = function (msg) {
        this.update();
    };
    TodoWidget.prototype.onUpdateRequest = function (msg) {
        var host = this.node.firstChild;
        var data = { model: this._model };
        React.render(React.createElement(app.TodoApp, data), host);
    };
    return TodoWidget;
})(phosphor_widget_1.Widget);
var CodeMirrorWidget = (function (_super) {
    __extends(CodeMirrorWidget, _super);
    function CodeMirrorWidget(config) {
        _super.call(this);
        this.addClass('CodeMirrorWidget');
        this.addClass('content');
        this._editor = CodeMirror(this.node, config);
    }
    CodeMirrorWidget.prototype.dispose = function () {
        this._editor = null;
        _super.prototype.dispose.call(this);
    };
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
        this._editor.setSize(msg.width, msg.height);
    };
    return CodeMirrorWidget;
})(phosphor_widget_1.Widget);
function main() {
    var split = new phosphor_splitpanel_1.SplitPanel();
    split.id = 'main';
    split.handleSize = 5;
    var model = new app.TodoModel('react-todos');
    var todo = new TodoWidget(model);
    var cm = new CodeMirrorWidget({
        value: "var text = 'This is a CodeMirror widget.';",
        mode: 'javascript',
        lineNumbers: true,
        tabSize: 2,
        extraKeys: { "Ctrl-Space": "autocomplete" },
    });
    var client = new XMLHttpRequest();
    client.open('GET', '/index.ts');
    client.onreadystatechange = function () {
        cm.editor.getDoc().setValue(client.responseText);
    };
    client.send();
    split.children = [cm, todo];
    phosphor_widget_1.attachWidget(split, document.body);
    window.onresize = function () { return split.update(); };
}
window.onload = main;

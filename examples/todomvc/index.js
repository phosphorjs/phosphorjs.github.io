/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
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
    function TodoWidget(name) {
        _super.call(this);
        this._model = null;
        this.addClass('todoapp');
        this.addClass('content');
        this._model = new app.TodoModel('react-todos-' + name);
    }
    TodoWidget.prototype.onAfterAttach = function (msg) {
        var _this = this;
        var render = function () {
            React.render(React.createElement(app.TodoApp, { model: _this._model }), _this.node);
        };
        this._model.subscribe(render);
        render();
    };
    return TodoWidget;
})(phosphor_widget_1.Widget);
function main() {
    var split = new phosphor_splitpanel_1.SplitPanel();
    split.id = 'main';
    split.handleSize = 5;
    var widget0 = new TodoWidget('foo');
    var widget1 = new TodoWidget('bar');
    split.children = [widget0, widget1];
    // wait for the JSX to load
    setTimeout(function () {
        phosphor_widget_1.attachWidget(split, document.body);
    }, 100);
    window.onresize = function () { return split.update(); };
}
window.onload = main;

"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var example;
(function (example) {
    var Panel = phosphor.panels.Panel;
    var Tab = phosphor.panels.Tab;
    var TabPanel = phosphor.panels.TabPanel;
    var Content = (function (_super) {
        __extends(Content, _super);
        function Content(title) {
            _super.call(this);
            this.node.classList.add('content');
            this.node.classList.add(title.toLowerCase());
            this._tab = new Tab(title);
        }
        Object.defineProperty(Content.prototype, "tab", {
            get: function () {
                return this._tab;
            },
            enumerable: true,
            configurable: true
        });
        return Content;
    })(Panel);
    function main() {
        var tabs = new TabPanel();
        tabs.addPanel(new Content('Red'));
        tabs.addPanel(new Content('Yellow'));
        tabs.addPanel(new Content('Blue'));
        tabs.addPanel(new Content('Green'));
        tabs.attach(document.getElementById('main'));
        tabs.fit();
        window.onresize = function () { return tabs.fit(); };
    }
    window.onload = main;
})(example || (example = {})); // module example

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
    var Orientation = phosphor.widgets.Orientation;
    var SplitPanel = phosphor.widgets.SplitPanel;
    var Tab = phosphor.widgets.Tab;
    var TabPanel = phosphor.widgets.TabPanel;
    var Widget = phosphor.widgets.Widget;
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
    })(Widget);
    function createTabs(index) {
        var tabs = new TabPanel();
        tabs.tabBar.tabOverlap = 1;
        tabs.addWidget(new Content('Red'));
        tabs.addWidget(new Content('Yellow'));
        tabs.addWidget(new Content('Blue'));
        tabs.addWidget(new Content('Green'));
        tabs.currentIndex = index;
        return tabs;
    }
    function main() {
        var sp1 = new SplitPanel(0 /* Horizontal */);
        var sp2 = new SplitPanel(1 /* Vertical */);
        var sp3 = new SplitPanel(1 /* Vertical */);
        sp2.addWidget(createTabs(0));
        sp2.addWidget(createTabs(1));
        sp3.addWidget(createTabs(2));
        sp3.addWidget(createTabs(3));
        sp1.addWidget(sp2);
        sp1.addWidget(sp3);
        sp1.attach(document.getElementById('main'));
        sp1.fit();
        window.onresize = function () { return sp1.fit(); };
    }
    window.onload = main;
})(example || (example = {})); // module example

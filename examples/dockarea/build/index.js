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
    var DockArea = phosphor.panels.DockArea;
    var DockMode = phosphor.panels.DockMode;
    var Panel = phosphor.panels.Panel;
    var Tab = phosphor.panels.Tab;
    var Content = (function (_super) {
        __extends(Content, _super);
        function Content(title) {
            _super.call(this);
            this.node.classList.add('content');
            this.node.classList.add(title.toLowerCase());
            this.setMinSize(50, 50);
            this._tab = new Tab(title);
            this._tab.closable = true;
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
        var area = new DockArea();
        var r1 = new Content('Red');
        var r2 = new Content('Red');
        var r3 = new Content('Red');
        var b1 = new Content('Blue');
        var b2 = new Content('Blue');
        var b3 = new Content('Blue');
        var g1 = new Content('Green');
        var g2 = new Content('Green');
        var g3 = new Content('Green');
        var y1 = new Content('Yellow');
        var y2 = new Content('Yellow');
        var y3 = new Content('Yellow');
        area.addPanel(r1);
        area.addPanel(b1, 6 /* SplitRight */, r1);
        area.addPanel(y1, 7 /* SplitBottom */, b1);
        area.addPanel(g1, 5 /* SplitLeft */, y1);
        area.addPanel(b2, 3 /* Bottom */);
        area.addPanel(y2, 8 /* TabBefore */, r1);
        area.addPanel(b3, 8 /* TabBefore */, y2);
        area.addPanel(g2, 8 /* TabBefore */, b2);
        area.addPanel(y3, 8 /* TabBefore */, g2);
        area.addPanel(g3, 8 /* TabBefore */, y3);
        area.addPanel(r2, 8 /* TabBefore */, b1);
        area.addPanel(r3, 8 /* TabBefore */, y1);
        area.attach(document.getElementById('main'));
        area.fit();
        window.onresize = function () { return area.fit(); };
    }
    window.onload = main;
})(example || (example = {})); // module example

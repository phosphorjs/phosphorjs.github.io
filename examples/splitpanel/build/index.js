"use strict";
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var example;
(function (example) {
    var Orientation = phosphor.panels.Orientation;
    var Panel = phosphor.panels.Panel;
    var SplitPanel = phosphor.panels.SplitPanel;
    function createContent(name) {
        var panel = new Panel();
        panel.node.classList.add(name);
        panel.setMinSize(50, 50);
        return panel;
    }
    function main() {
        var sp1 = new SplitPanel(1 /* Vertical */);
        var sp2 = new SplitPanel(0 /* Horizontal */);
        var sp3 = new SplitPanel(1 /* Vertical */);
        sp3.addPanel(createContent('red'));
        sp3.addPanel(createContent('green'));
        sp3.addPanel(createContent('blue'));
        sp2.addPanel(sp3);
        sp2.addPanel(createContent('yellow'));
        sp2.addPanel(createContent('red'));
        sp1.addPanel(createContent('yellow'));
        sp1.addPanel(createContent('blue'));
        sp1.addPanel(sp2);
        sp1.addPanel(createContent('green'));
        sp1.attach(document.getElementById('main'));
        sp1.fit();
        window.onresize = function () { return sp1.fit(); };
    }
    window.onload = main;
})(example || (example = {})); // module example

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
    var Orientation = phosphor.widgets.Orientation;
    var SplitPanel = phosphor.widgets.SplitPanel;
    var Widget = phosphor.widgets.Widget;
    function createContent(name) {
        var widget = new Widget();
        widget.addClass('content');
        widget.addClass(name);
        return widget;
    }
    function main() {
        var sp1 = new SplitPanel(1 /* Vertical */);
        var sp2 = new SplitPanel(0 /* Horizontal */);
        var sp3 = new SplitPanel(1 /* Vertical */);
        sp3.addWidget(createContent('red'));
        sp3.addWidget(createContent('green'));
        sp3.addWidget(createContent('blue'));
        sp2.addWidget(sp3);
        sp2.addWidget(createContent('yellow'));
        sp2.addWidget(createContent('red'));
        sp1.addWidget(createContent('yellow'));
        sp1.addWidget(createContent('blue'));
        sp1.addWidget(sp2);
        sp1.addWidget(createContent('green'));
        sp1.attach(document.getElementById('main'));
        sp1.fit();
        window.onresize = function () { return sp1.fit(); };
    }
    window.onload = main;
})(example || (example = {})); // module example

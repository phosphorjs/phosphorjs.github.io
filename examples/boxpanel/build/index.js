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
    var BoxPanel = phosphor.widgets.BoxPanel;
    var Direction = phosphor.widgets.Direction;
    var Widget = phosphor.widgets.Widget;
    function createContent(text) {
        var widget = new Widget();
        widget.addClass('content');
        widget.node.innerHTML = '<span>' + text + '</span>';
        return widget;
    }
    function main() {
        var ttb = new BoxPanel(2 /* TopToBottom */);
        ttb.addClass('red');
        ttb.addWidget(createContent('Top'));
        ttb.addWidget(createContent('To'));
        ttb.addWidget(createContent('Bottom'));
        ttb.addStretch();
        var btt = new BoxPanel(3 /* BottomToTop */);
        btt.addClass('green');
        btt.addWidget(createContent('Top'));
        btt.addWidget(createContent('To'));
        btt.addWidget(createContent('Bottom'));
        btt.addStretch();
        var ltr = new BoxPanel(0 /* LeftToRight */);
        ltr.addClass('yellow');
        ltr.addWidget(createContent('Left'));
        ltr.addWidget(createContent('To'));
        ltr.addWidget(createContent('Right'));
        ltr.addStretch();
        var rtl = new BoxPanel(1 /* RightToLeft */);
        rtl.addClass('blue');
        rtl.addWidget(createContent('Left'));
        rtl.addWidget(createContent('To'));
        rtl.addWidget(createContent('Right'));
        rtl.addStretch();
        var row = new BoxPanel(0 /* LeftToRight */);
        row.addWidget(ttb);
        row.addWidget(btt);
        var col = new BoxPanel(2 /* TopToBottom */);
        col.addWidget(row);
        col.addWidget(ltr);
        col.addWidget(rtl);
        col.attach(document.getElementById('main'));
        col.fit();
        window.onresize = function () { return col.fit(); };
    }
    window.onload = main;
})(example || (example = {})); // module example

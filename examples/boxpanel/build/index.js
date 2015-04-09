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
    var BoxPanel = phosphor.panels.BoxPanel;
    var Direction = phosphor.panels.Direction;
    var Panel = phosphor.panels.Panel;
    function createContent(text) {
        var panel = new Panel();
        panel.node.classList.add('content');
        panel.node.innerHTML = '<span>' + text + '</span>';
        panel.setMinMaxSize(60, 25, Infinity, 25);
        return panel;
    }
    function main() {
        var ttb = new BoxPanel(2 /* TopToBottom */);
        ttb.node.classList.add('red');
        ttb.addPanel(createContent('Top'));
        ttb.addPanel(createContent('To'));
        ttb.addPanel(createContent('Bottom'));
        ttb.addStretch();
        var btt = new BoxPanel(3 /* BottomToTop */);
        btt.node.classList.add('green');
        btt.addPanel(createContent('Top'));
        btt.addPanel(createContent('To'));
        btt.addPanel(createContent('Bottom'));
        btt.addStretch();
        var ltr = new BoxPanel(0 /* LeftToRight */);
        ltr.node.classList.add('yellow');
        ltr.addPanel(createContent('Left'));
        ltr.addPanel(createContent('To'));
        ltr.addPanel(createContent('Right'));
        ltr.addStretch();
        var rtl = new BoxPanel(1 /* RightToLeft */);
        rtl.node.classList.add('blue');
        rtl.addPanel(createContent('Left'));
        rtl.addPanel(createContent('To'));
        rtl.addPanel(createContent('Right'));
        rtl.addStretch();
        var row = new BoxPanel(0 /* LeftToRight */);
        row.addPanel(ttb);
        row.addPanel(btt);
        var col = new BoxPanel(2 /* TopToBottom */);
        col.addPanel(row);
        col.addPanel(ltr);
        col.addPanel(rtl);
        col.attach(document.getElementById('main'));
        col.fit();
        window.onresize = function () { return col.fit(); };
    }
    window.onload = main;
})(example || (example = {})); // module example

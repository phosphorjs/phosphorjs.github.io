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
    var clientViewportRect = phosphor.utility.clientViewportRect;
    var BoxPanel = phosphor.widgets.BoxPanel;
    var Direction = phosphor.widgets.Direction;
    var Widget = phosphor.widgets.Widget;
    function createContent(name) {
        var widget = new Widget();
        widget.node.classList.add('content');
        widget.node.classList.add(name);
        return widget;
    }
    function main() {
        var red = createContent('red');
        var green = createContent('green');
        var blue = createContent('blue');
        var yellow = createContent('yellow');
        var panel = new BoxPanel();
        panel.addWidget(red, 1);
        panel.addWidget(green, 2);
        panel.addWidget(blue, 3);
        panel.addWidget(yellow, 1);
        panel.attach(document.getElementById('main'));
        var refresh = function () {
            if (clientViewportRect().width > 600) {
                panel.direction = 0 /* LeftToRight */;
            }
            else {
                panel.direction = 2 /* TopToBottom */;
            }
            panel.fit();
        };
        refresh();
        window.onresize = refresh;
    }
    window.onload = main;
})(example || (example = {})); // module example

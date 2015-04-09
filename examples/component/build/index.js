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
    var Component = phosphor.components.Component;
    var createFactory = phosphor.virtualdom.createFactory;
    var dom = phosphor.virtualdom.dom;
    var render = phosphor.virtualdom.render;
    var div = dom.div;
    var h1 = dom.h1;
    var h2 = dom.h2;
    var li = dom.li;
    var span = dom.span;
    var TicksComponent = (function (_super) {
        __extends(TicksComponent, _super);
        function TicksComponent() {
            _super.apply(this, arguments);
        }
        TicksComponent.prototype.render = function () {
            var data = this.data;
            var items = [li(data.title)];
            for (var i = 0, n = data.count; i <= n; ++i) {
                items.push(li(i + ''));
            }
            return items;
        };
        TicksComponent.tagName = 'ul';
        return TicksComponent;
    })(Component);
    var Ticks = createFactory(TicksComponent);
    var TimeComponent = (function (_super) {
        __extends(TimeComponent, _super);
        function TimeComponent() {
            _super.apply(this, arguments);
        }
        TimeComponent.prototype.render = function () {
            var data = this.data;
            var time = data.time;
            var now = data.now;
            return [
                h1('This page is updated every 30ms'),
                h2('UTC Time: ', span(time.toUTCString())),
                h2('Local Time: ', span(time.toString())),
                h2('Milliseconds Since Epoch: ', span(now.toString())),
                div({ className: 'waterfall' }, Ticks({ title: 'Hours', count: time.getHours() }), Ticks({ title: 'Minutes', count: time.getMinutes() }), Ticks({ title: 'Seconds', count: time.getSeconds() }))
            ];
        };
        TimeComponent.className = 'time-component';
        return TimeComponent;
    })(Component);
    var Time = createFactory(TimeComponent);
    function main() {
        var main = document.getElementById('main');
        setInterval(function () {
            var time = new Date();
            var now = Date.now();
            render(Time({ time: time, now: now }), main);
        }, 30);
    }
    window.onload = main;
})(example || (example = {})); // module example

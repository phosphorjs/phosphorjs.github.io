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
var chat;
(function (chat) {
    var feedplugin;
    (function (feedplugin) {
        var IShellView = phosphor.shell.IShellView;
        var Size = phosphor.utility.Size;
        var Component = phosphor.virtualdom.Component;
        var createFactory = phosphor.virtualdom.createFactory;
        var dom = phosphor.virtualdom.dom;
        var RenderWidget = phosphor.widgets.RenderWidget;
        /**
         * A simple placeholder component for the chat feed.
         */
        var FeedPlaceholder = (function (_super) {
            __extends(FeedPlaceholder, _super);
            function FeedPlaceholder(data, children) {
                _super.call(this, data, children);
                this.node.classList.add('chat-feed');
            }
            FeedPlaceholder.prototype.render = function () {
                return dom.h2('Chat Feed Placeholder');
            };
            return FeedPlaceholder;
        })(Component);
        /**
         * The element factory for the chat feed component.
         */
        var Feed = createFactory(FeedPlaceholder);
        /**
         * A host widget for the feed component.
         */
        var FeedHost = (function (_super) {
            __extends(FeedHost, _super);
            function FeedHost() {
                _super.call(this);
                this.node.classList.add('chat-feed-host');
            }
            FeedHost.prototype.sizeHint = function () {
                return new Size(600, 200);
            };
            FeedHost.prototype.render = function () {
                return Feed();
            };
            return FeedHost;
        })(RenderWidget);
        /**
         * Initialize the chat feed plugin.
         */
        function initialize(container) {
            var shell = container.resolve(IShellView);
            shell.addWidget('bottom', new FeedHost());
        }
        feedplugin.initialize = initialize;
    })(feedplugin = chat.feedplugin || (chat.feedplugin = {}));
})(chat || (chat = {})); // module chat.feedplugin

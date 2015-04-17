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
        var Component = phosphor.virtualdom.Component;
        var createFactory = phosphor.virtualdom.createFactory;
        var dom = phosphor.virtualdom.dom;
        var ElementHost = phosphor.widgets.ElementHost;
        /**
         * A simple placeholder component for the chat feed.
         */
        var FeedPlaceholder = (function (_super) {
            __extends(FeedPlaceholder, _super);
            function FeedPlaceholder() {
                _super.apply(this, arguments);
            }
            FeedPlaceholder.prototype.render = function () {
                return dom.h2('Chat Feed Placeholder');
            };
            FeedPlaceholder.className = 'chat-feed';
            return FeedPlaceholder;
        })(Component);
        /**
         * The element factory for the chat feed component.
         */
        var Feed = createFactory(FeedPlaceholder);
        /**
         * Initialize the chat feed plugin.
         */
        function initialize(container) {
            var shell = container.resolve(IShellView);
            var feed = new ElementHost(Feed(), 600, 200);
            feed.addClass('chat-feed-host');
            shell.addWidget('bottom', feed);
        }
        feedplugin.initialize = initialize;
    })(feedplugin = chat.feedplugin || (chat.feedplugin = {}));
})(chat || (chat = {})); // module chat.feedplugin

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
    var Bootstrapper = phosphor.shell.Bootstrapper;
    /**
     * A simple chat application built entirely from plugins.
     */
    var ChatApplication = (function (_super) {
        __extends(ChatApplication, _super);
        function ChatApplication() {
            _super.apply(this, arguments);
        }
        /**
         * Configure the plugins for the application.
         */
        ChatApplication.prototype.configurePlugins = function () {
            return this.pluginList.add([
                chat.serverplugin,
                chat.clientplugin,
                chat.roomsplugin,
                chat.feedplugin
            ]);
        };
        return ChatApplication;
    })(Bootstrapper);
    chat.ChatApplication = ChatApplication;
})(chat || (chat = {})); // module chat

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
    var roomsplugin;
    (function (roomsplugin) {
        var IShellView = phosphor.shell.IShellView;
        var Component = phosphor.virtualdom.Component;
        var createFactory = phosphor.virtualdom.createFactory;
        var dom = phosphor.virtualdom.dom;
        var ElementHost = phosphor.widgets.ElementHost;
        /**
         * A simple placeholder component for the chat rooms list.
         */
        var RoomListPlaceholder = (function (_super) {
            __extends(RoomListPlaceholder, _super);
            function RoomListPlaceholder() {
                _super.apply(this, arguments);
            }
            RoomListPlaceholder.prototype.render = function () {
                return dom.h2('Room List Placeholder');
            };
            RoomListPlaceholder.className = 'chat-room-list';
            return RoomListPlaceholder;
        })(Component);
        /**
         * The element factory for the rooms list component.
         */
        var RoomList = createFactory(RoomListPlaceholder);
        /**
         * A simple placeholder component for the open chat rooms.
         */
        var OpenRoomsPlaceholder = (function (_super) {
            __extends(OpenRoomsPlaceholder, _super);
            function OpenRoomsPlaceholder() {
                _super.apply(this, arguments);
            }
            OpenRoomsPlaceholder.prototype.render = function () {
                return dom.h2('Open Rooms Placeholder');
            };
            OpenRoomsPlaceholder.className = 'chat-open-rooms';
            return OpenRoomsPlaceholder;
        })(Component);
        /**
         * The element factory for the open rooms component.
         */
        var OpenRooms = createFactory(OpenRoomsPlaceholder);
        /**
         * Initialize the chat rooms plugin.
         */
        function initialize(container) {
            var shell = container.resolve(IShellView);
            var list = new ElementHost(RoomList(), 250, 400);
            list.addClass('chat-room-list-host');
            var rooms = new ElementHost(OpenRooms(), 600, 400);
            rooms.addClass('chat-open-rooms-host');
            shell.addWidget('left', list);
            shell.addWidget('center', rooms);
        }
        roomsplugin.initialize = initialize;
    })(roomsplugin = chat.roomsplugin || (chat.roomsplugin = {}));
})(chat || (chat = {})); // module chat.roomsplugin

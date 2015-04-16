"use strict";
/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var chat;
(function (chat) {
    var serverplugin;
    (function (serverplugin) {
        /**
         * Initialize the chat server plugin.
         */
        function initialize(container) {
            // currently an empty stub
        }
        serverplugin.initialize = initialize;
    })(serverplugin = chat.serverplugin || (chat.serverplugin = {}));
})(chat || (chat = {})); // module chat.serverplugin

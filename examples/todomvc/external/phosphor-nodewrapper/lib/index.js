/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A base class for creating objects which wrap a DOM node.
 */
var NodeWrapper = (function () {
    function NodeWrapper() {
        this._node = this.constructor.createNode();
    }
    /**
     * Create the DOM node for a new node wrapper instance.
     *
     * @returns The DOM node to use with the node wrapper instance.
     *
     * #### Notes
     * The default implementation creates an empty `<div>`.
     *
     * This may be reimplemented by a subclass to create a custom node.
     */
    NodeWrapper.createNode = function () {
        return document.createElement('div');
    };
    Object.defineProperty(NodeWrapper.prototype, "node", {
        /**
         * Get the DOM node managed by the wrapper.
         *
         * #### Notes
         * This property is read-only.
         */
        get: function () {
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeWrapper.prototype, "id", {
        /**
         * Get the id of the wrapper's DOM node.
         */
        get: function () {
            return this._node.id;
        },
        /**
         * Set the id of the wrapper's DOM node.
         */
        set: function (value) {
            this._node.id = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Test whether the wrapper's DOM node has the given class name.
     *
     * @param name - The class name of interest.
     *
     * @returns `true` if the node has the class, `false` otherwise.
     */
    NodeWrapper.prototype.hasClass = function (name) {
        return this._node.classList.contains(name);
    };
    /**
     * Add a class name to the wrapper's DOM node.
     *
     * @param name - The class name to add to the node.
     *
     * #### Notes
     * If the class name is already added to the node, this is a no-op.
     */
    NodeWrapper.prototype.addClass = function (name) {
        this._node.classList.add(name);
    };
    /**
     * Remove a class name from the wrapper's DOM node.
     *
     * @param name - The class name to remove from the node.
     *
     * #### Notes
     * If the class name is not yet added to the node, this is a no-op.
     */
    NodeWrapper.prototype.removeClass = function (name) {
        this._node.classList.remove(name);
    };
    /**
     * Toggle a class name on the wrapper's DOM node.
     *
     * @param name - The class name to toggle on the node.
     *
     * @param force - Whether to force add the class (`true`) or force
     *   remove the class (`false`). If not provided, the presence of
     *   the class will be toggled from its current state.
     *
     * @returns `true` if the class is now present, `false` otherwise.
     */
    NodeWrapper.prototype.toggleClass = function (name, force) {
        var present;
        if (force === true) {
            this.addClass(name);
            present = true;
        }
        else if (force === false) {
            this.removeClass(name);
            present = false;
        }
        else if (this.hasClass(name)) {
            this.removeClass(name);
            present = false;
        }
        else {
            this.addClass(name);
            present = true;
        }
        return present;
    };
    return NodeWrapper;
})();
exports.NodeWrapper = NodeWrapper;
//# sourceMappingURL=index.js.map
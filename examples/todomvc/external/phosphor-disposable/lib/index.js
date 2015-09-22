/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * A disposable object which delegates to a callback.
 */
var DisposableDelegate = (function () {
    /**
     * Construct a new disposable delegate.
     *
     * @param callback - The function to invoke when the delegate is
     *   disposed.
     */
    function DisposableDelegate(callback) {
        this._callback = callback;
    }
    Object.defineProperty(DisposableDelegate.prototype, "isDisposed", {
        /**
         * Test whether the delegate has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         */
        get: function () {
            return !this._callback;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the delegate and invoke its callback.
     *
     * #### Notes
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    DisposableDelegate.prototype.dispose = function () {
        var callback = this._callback;
        this._callback = null;
        if (callback)
            callback();
    };
    return DisposableDelegate;
})();
exports.DisposableDelegate = DisposableDelegate;
/**
 * An object which manages a collection of disposable items.
 */
var DisposableSet = (function () {
    /**
     * Construct a new disposable set.
     *
     * @param items - The initial disposable items for the set.
     */
    function DisposableSet(items) {
        var _this = this;
        this._set = new Set();
        if (items)
            items.forEach(function (item) { return _this._set.add(item); });
    }
    Object.defineProperty(DisposableSet.prototype, "isDisposed", {
        /**
         * Test whether the set has been disposed.
         *
         * #### Notes
         * This is a read-only property which is always safe to access.
         */
        get: function () {
            return !this._set;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose of the set and dispose the items it contains.
     *
     * #### Notes
     * Items are disposed in the order they are added to the set.
     *
     * It is unsafe to use the set after it has been disposed.
     *
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    DisposableSet.prototype.dispose = function () {
        var set = this._set;
        this._set = null;
        if (set)
            set.forEach(function (item) { return item.dispose(); });
    };
    /**
     * Add a disposable item to the set.
     *
     * @param item - The disposable item to add to the set. If the item
     *   is already contained in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.add = function (item) {
        if (!this._set) {
            throw new Error('object is disposed');
        }
        this._set.add(item);
    };
    /**
     * Remove a disposable item from the set.
     *
     * @param item - The disposable item to remove from the set. If the
     *   item does not exist in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.remove = function (item) {
        if (!this._set) {
            throw new Error('object is disposed');
        }
        this._set.delete(item);
    };
    /**
     * Clear all disposable items from the set.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    DisposableSet.prototype.clear = function () {
        if (!this._set) {
            throw new Error('object is disposed');
        }
        this._set.clear();
    };
    return DisposableSet;
})();
exports.DisposableSet = DisposableSet;
//# sourceMappingURL=index.js.map
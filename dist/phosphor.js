"use strict";














/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var collections;
    (function (collections) {
        /**
         * Create an iterator for an iterable or array.
         */
        function iter(iterable) {
            if (iterable instanceof Array) {
                return new collections.ArrayIterator(iterable);
            }
            return iterable.iterator();
        }
        collections.iter = iter;
        /**
         * Create an array from the values in an iterable.
         */
        function toArray(iterable) {
            var result = [];
            for (var it = iter(iterable); it.moveNext();) {
                result.push(it.current);
            }
            return result;
        }
        collections.toArray = toArray;
        /**
         * Invoke a function once for each element in an iterable.
         *
         * If the callback returns anything but `undefined`, iteration
         * will stop and that value will be returned from the function.
         */
        function forEach(iterable, callback) {
            for (var i = 0, it = iter(iterable); it.moveNext(); ++i) {
                var result = callback(it.current, i);
                if (result !== void 0)
                    return result;
            }
            return void 0;
        }
        collections.forEach = forEach;
        /**
         * Returns true if any element in the iterable passes the given test.
         */
        function some(iterable, callback) {
            for (var i = 0, it = iter(iterable); it.moveNext(); ++i) {
                if (callback(it.current, i))
                    return true;
            }
            return false;
        }
        collections.some = some;
        /**
         * Returns true if all elements in the iterable pass the given test.
         */
        function every(iterable, callback) {
            for (var i = 0, it = iter(iterable); it.moveNext(); ++i) {
                if (!callback(it.current, i))
                    return false;
            }
            return true;
        }
        collections.every = every;
        /**
         * Create an array of the iterable elements which pass the given test.
         */
        function filter(iterable, callback) {
            var result = [];
            for (var i = 0, it = iter(iterable); it.moveNext(); ++i) {
                if (callback(it.current, i))
                    result.push(it.current);
            }
            return result;
        }
        collections.filter = filter;
        /**
         * Create an array of callback results for each element in an iterable.
         */
        function map(iterable, callback) {
            var result = [];
            for (var i = 0, it = iter(iterable); it.moveNext(); ++i) {
                result.push(callback(it.current, i));
            }
            return result;
        }
        collections.map = map;
        /**
         * Find the first element in the iterable which passes the given test.
         *
         * Returns `undefined` if no element passes the test.
         */
        function find(iterable, callback) {
            for (var i = 0, it = iter(iterable); it.moveNext(); ++i) {
                if (callback(it.current, i))
                    return it.current;
            }
            return void 0;
        }
        collections.find = find;
        /**
         * Find the index of the first element which passes the given test.
         *
         * Returns -1 if no element passes the test.
         */
        function findIndex(iterable, callback) {
            for (var i = 0, it = iter(iterable); it.moveNext(); ++i) {
                if (callback(it.current, i))
                    return i;
            }
            return -1;
        }
        collections.findIndex = findIndex;
        /**
         * Find the index of the first element which compares `>=` to `value`.
         *
         * This uses a binary search algorithm which must be applied to a
         * sorted list in order for the results to be correct.
         *
         * Returns `list.size` if all elements compare `<` than `value`.
         */
        function lowerBound(list, value, compare) {
            var begin = 0;
            var half;
            var middle;
            var n = list.size;
            while (n > 0) {
                half = n >> 1;
                middle = begin + half;
                if (compare(list.get(middle), value) < 0) {
                    begin = middle + 1;
                    n -= half + 1;
                }
                else {
                    n = half;
                }
            }
            return begin;
        }
        collections.lowerBound = lowerBound;
        /**
         * Find the index of the first element which compares `>` than `value`.
         *
         * This uses a binary search algorithm which must be applied to a
         * sorted list in order for the results to be correct.
         *
         * Returns `0` if all elements compare `<=` than `value`.
         */
        function upperBound(list, value, compare) {
            var begin = 0;
            var half;
            var middle;
            var n = list.size;
            while (n > 0) {
                half = n >> 1;
                middle = begin + half;
                if (compare(list.get(middle), value) > 0) {
                    n = half;
                }
                else {
                    begin = middle + 1;
                    n -= half + 1;
                }
            }
            return begin;
        }
        collections.upperBound = upperBound;
        /**
         * Find the index of the first element which compares `==` to `value`.
         *
         * This uses a binary search algorithm which must be applied to a
         * sorted list in order for the results to be correct.
         *
         * Returns `-1` if no matching value is found.
         */
        function lowerFind(list, value, compare) {
            var i = lowerBound(list, value, compare);
            if (i === list.size) {
                return -1;
            }
            if (compare(list.get(i), value) === 0) {
                return i;
            }
            return -1;
        }
        collections.lowerFind = lowerFind;
        /**
         * Find the index of the last element which compares `==` to `value`.
         *
         * This uses a binary search algorithm which must be applied to a
         * sorted list in order for the results to be correct.
         *
         * Returns `-1` if no matching value is found.
         */
        function upperFind(list, value, compare) {
            var i = upperBound(list, value, compare);
            if (i === 0) {
                return -1;
            }
            if (compare(list.get(--i), value) === 0) {
                return i;
            }
            return -1;
        }
        collections.upperFind = upperFind;
    })(collections = phosphor.collections || (phosphor.collections = {}));
})(phosphor || (phosphor = {})); // module phosphor.collections

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var collections;
    (function (collections) {
        /**
         * A read only view of a collection.
         */
        var ReadOnlyCollection = (function () {
            /**
             * Construct a new read only collection.
             */
            function ReadOnlyCollection(collection) {
                this._collection = collection;
            }
            Object.defineProperty(ReadOnlyCollection.prototype, "empty", {
                /**
                 * True if the collection has elements, false otherwise.
                 */
                get: function () {
                    return this._collection.empty;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReadOnlyCollection.prototype, "size", {
                /**
                 * The number of elements in the collection.
                 */
                get: function () {
                    return this._collection.size;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get an iterator for the elements in the collection.
             */
            ReadOnlyCollection.prototype.iterator = function () {
                return this._collection.iterator();
            };
            /**
             * Test whether the collection contains the given value.
             */
            ReadOnlyCollection.prototype.contains = function (value) {
                return this._collection.contains(value);
            };
            /**
             * Add a value to the collection.
             *
             * This method always throws.
             */
            ReadOnlyCollection.prototype.add = function (value) {
                throw new Error('collection is read only');
            };
            /**
             * Remove a value from the collection.
             *
             * This method always throws.
             */
            ReadOnlyCollection.prototype.remove = function (value) {
                throw new Error('collection is read only');
            };
            /**
             * Remove all elements from the collection.
             *
             * This method always throws.
             */
            ReadOnlyCollection.prototype.clear = function () {
                throw new Error('collection is read only');
            };
            return ReadOnlyCollection;
        })();
        collections.ReadOnlyCollection = ReadOnlyCollection;
    })(collections = phosphor.collections || (phosphor.collections = {}));
})(phosphor || (phosphor = {})); // module phosphor.collections

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
var phosphor;
(function (phosphor) {
    var collections;
    (function (collections) {
        /**
         * A read only view of a list.
         */
        var ReadOnlyList = (function (_super) {
            __extends(ReadOnlyList, _super);
            /**
             * Construct a new read only list.
             */
            function ReadOnlyList(list) {
                _super.call(this, list);
            }
            /**
             * Get the index of the given value.
             *
             * Returns -1 if the value is not in the list.
             */
            ReadOnlyList.prototype.indexOf = function (value) {
                return this._collection.indexOf(value);
            };
            /**
             * Get the value at the given index.
             *
             * Returns `undefined` if the index is out of range.
             */
            ReadOnlyList.prototype.get = function (index) {
                return this._collection.get(index);
            };
            /**
             * Set the value at the given index.
             *
             * This method always throws.
             */
            ReadOnlyList.prototype.set = function (index, value) {
                throw new Error('list is read only');
            };
            /**
             * Insert a value at the given index.
             *
             * This method always throws.
             */
            ReadOnlyList.prototype.insert = function (index, value) {
                throw new Error('list is read only');
            };
            /**
             * Remove and return the value at the given index.
             *
             * This method always throws.
             */
            ReadOnlyList.prototype.removeAt = function (index) {
                throw new Error('list is read only');
            };
            return ReadOnlyList;
        })(collections.ReadOnlyCollection);
        collections.ReadOnlyList = ReadOnlyList;
    })(collections = phosphor.collections || (phosphor.collections = {}));
})(phosphor || (phosphor = {})); // module phosphor.collections

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var collections;
    (function (collections) {
        /**
         * An iterator for a generic array.
         */
        var ArrayIterator = (function () {
            /**
             * Construct a new array iterator.
             */
            function ArrayIterator(array) {
                this._index = 0;
                this._current = void 0;
                this._array = array || null;
            }
            Object.defineProperty(ArrayIterator.prototype, "current", {
                /**
                 * The current value of the iterable.
                 *
                 * Returns `undefined` if there is no current value.
                 */
                get: function () {
                    return this._current;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Move the iterator to the next value.
             *
             * Returns true on success, false when the iterator is exhausted.
             */
            ArrayIterator.prototype.moveNext = function () {
                if (this._array === null) {
                    return false;
                }
                if (this._index < this._array.length) {
                    this._current = this._array[this._index++];
                    return true;
                }
                this._array = null;
                this._current = void 0;
                return false;
            };
            /**
             * Returns `this` to make the iterator iterable.
             */
            ArrayIterator.prototype.iterator = function () {
                return this;
            };
            return ArrayIterator;
        })();
        collections.ArrayIterator = ArrayIterator;
    })(collections = phosphor.collections || (phosphor.collections = {}));
})(phosphor || (phosphor = {})); // module phosphor.collections

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var collections;
    (function (collections) {
        /**
         * A collection of elements which can be accessed by index.
         */
        var List = (function () {
            /**
             * Construct a new list.
             */
            function List(items) {
                this._array = items !== void 0 ? collections.toArray(items) : [];
            }
            Object.defineProperty(List.prototype, "empty", {
                /**
                 * True if the list has elements, false otherwise.
                 */
                get: function () {
                    return this._array.length === 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(List.prototype, "size", {
                /**
                 * The number of elements in the list.
                 */
                get: function () {
                    return this._array.length;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(List.prototype, "back", {
                /**
                 * The value at the back of the list.
                 */
                get: function () {
                    return this._array[this._array.length - 1];
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get an iterator for the elements in the list.
             */
            List.prototype.iterator = function () {
                return new collections.ArrayIterator(this._array);
            };
            /**
             * Test whether the list contains the given value.
             */
            List.prototype.contains = function (value) {
                return this.indexOf(value) !== -1;
            };
            /**
             * Get the index of the given value.
             *
             * Returns -1 if the value is not in the list.
             */
            List.prototype.indexOf = function (value) {
                var array = this._array;
                for (var i = 0, n = array.length; i < n; ++i) {
                    if (array[i] === value) {
                        return i;
                    }
                }
                return -1;
            };
            /**
             * Get the value at the given index.
             *
             * Returns `undefined` if the index is out of range.
             */
            List.prototype.get = function (index) {
                return this._array[index];
            };
            /**
             * Set the value at the given index.
             *
             * Returns false if the index is out of range.
             */
            List.prototype.set = function (index, value) {
                var array = this._array;
                if (index < 0 || index >= array.length) {
                    return false;
                }
                array[index] = value;
                return true;
            };
            /**
             * Add a value to the end of the list.
             *
             * This method always succeeds.
             */
            List.prototype.add = function (value) {
                this._array.push(value);
                return true;
            };
            /**
             * Push a value onto the back of the list.
             */
            List.prototype.pushBack = function (value) {
                this._array.push(value);
            };
            /**
             * Insert a value at the given index.
             *
             * Returns false if the index is out of range.
             */
            List.prototype.insert = function (index, value) {
                var array = this._array;
                if (index < 0 || index > array.length) {
                    return false;
                }
                for (var i = array.length; i > index; --i) {
                    array[i] = array[i - 1];
                }
                array[index] = value;
                return true;
            };
            /**
             * Pop and return the value at the back of the list.
             */
            List.prototype.popBack = function () {
                return this._array.pop();
            };
            /**
             * Remove the first matching value from the list.
             *
             * Returns false if the value is not in the list.
             */
            List.prototype.remove = function (value) {
                var index = this.indexOf(value);
                if (index !== -1) {
                    this.removeAt(index);
                    return true;
                }
                return false;
            };
            /**
             * Remove and return the value at the given index.
             *
             * Returns `undefined` if the index is out of range.
             */
            List.prototype.removeAt = function (index) {
                var array = this._array;
                if (index < 0 || index >= array.length) {
                    return void 0;
                }
                var value = array[index];
                for (var i = index + 1, n = array.length; i < n; ++i) {
                    array[i - 1] = array[i];
                }
                array.pop();
                return value;
            };
            /**
             * Remove all elements from the list.
             */
            List.prototype.clear = function () {
                this._array.length = 0;
            };
            return List;
        })();
        collections.List = List;
    })(collections = phosphor.collections || (phosphor.collections = {}));
})(phosphor || (phosphor = {})); // module phosphor.collections

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert and Phosphor Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var collections;
    (function (collections) {
        /**
         * An iterator for a generic list.
         */
        var ListIterator = (function () {
            /**
             * Construct a new list iterator.
             */
            function ListIterator(list) {
                this._index = 0;
                this._current = void 0;
                this._list = list || null;
            }
            Object.defineProperty(ListIterator.prototype, "current", {
                /**
                 * The current value of the iterable.
                 *
                 * Returns `undefined` if there is no current value.
                 */
                get: function () {
                    return this._current;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Move the iterator to the next value.
             *
             * Returns true on success, false when the iterator is exhausted.
             */
            ListIterator.prototype.moveNext = function () {
                if (this._list === null) {
                    return false;
                }
                if (this._index < this._list.size) {
                    this._current = this._list.get(this._index++);
                    return true;
                }
                this._list = null;
                this._current = void 0;
                return false;
            };
            /**
             * Returns `this` to make the iterator iterable.
             */
            ListIterator.prototype.iterator = function () {
                return this;
            };
            return ListIterator;
        })();
        collections.ListIterator = ListIterator;
    })(collections = phosphor.collections || (phosphor.collections = {}));
})(phosphor || (phosphor = {})); // module phosphor.collections

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var collections;
    (function (collections) {
        /**
         * A circular buffer with a fixed maximum size.
         *
         * A circular buffer is a buffer with constant time access to its
         * elements and constant times inserts and deletes from the front
         * and back of the buffer. When the buffer reaches its maximum
         * size, newly added elements will overwrite existing elements.
         */
        var CircularBuffer = (function () {
            /**
             * Construct a new circular buffer.
             */
            function CircularBuffer(maxSize, items) {
                var _this = this;
                this._size = 0;
                this._offset = 0;
                this._array = new Array(Math.max(1, maxSize));
                if (items !== void 0)
                    collections.forEach(items, function (it) {
                        _this.pushBack(it);
                    });
            }
            Object.defineProperty(CircularBuffer.prototype, "maxSize", {
                /**
                 * The maximum size of the buffer.
                 */
                get: function () {
                    return this._array.length;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CircularBuffer.prototype, "empty", {
                /**
                 * True if the buffer has elements, false otherwise.
                 */
                get: function () {
                    return this._size === 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CircularBuffer.prototype, "size", {
                /**
                 * The number of elements in the buffer.
                 */
                get: function () {
                    return this._size;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CircularBuffer.prototype, "front", {
                /**
                 * The value at the front of the buffer.
                 */
                get: function () {
                    return this._size !== 0 ? this._get(0) : void 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CircularBuffer.prototype, "back", {
                /**
                 * The value at the back of the buffer.
                 */
                get: function () {
                    return this._size !== 0 ? this._get(this._size - 1) : void 0;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get an iterator for the elements in the buffer.
             */
            CircularBuffer.prototype.iterator = function () {
                return new collections.ListIterator(this);
            };
            /**
             * Test whether the buffer contains the given value.
             */
            CircularBuffer.prototype.contains = function (value) {
                return this.indexOf(value) !== -1;
            };
            /**
             * Get the index of the given value.
             *
             * Returns -1 if the value is not in the buffer.
             */
            CircularBuffer.prototype.indexOf = function (value) {
                for (var i = 0, n = this._size; i < n; ++i) {
                    if (this._get(i) === value) {
                        return i;
                    }
                }
                return -1;
            };
            /**
             * Get the element at the given index.
             *
             * Returns `undefined` if the index is out of range.
             */
            CircularBuffer.prototype.get = function (index) {
                if (index < 0 || index >= this._size) {
                    return void 0;
                }
                return this._get(index);
            };
            /**
             * Set the value at the given index.
             *
             * Returns false if the index is out of range.
             */
            CircularBuffer.prototype.set = function (index, value) {
                if (index < 0 || index >= this._size) {
                    return false;
                }
                this._set(index, value);
                return true;
            };
            /**
             * Push a value onto the back of the buffer.
             *
             * If the buffer is full, the front element will be overwritten.
             */
            CircularBuffer.prototype.pushBack = function (value) {
                this._set(this._size, value);
                if (this._size === this._array.length) {
                    this._increment();
                }
                else {
                    this._size++;
                }
            };
            /**
             * Push a value onto the front of the buffer.
             *
             * If the buffer is full, the back element will be overwritten.
             */
            CircularBuffer.prototype.pushFront = function (value) {
                this._decrement();
                this._set(0, value);
                if (this._size < this._array.length) {
                    this._size++;
                }
            };
            /**
             * Pop and return the value at the back of the buffer.
             */
            CircularBuffer.prototype.popBack = function () {
                if (this._size === 0) {
                    return void 0;
                }
                return this._del(--this._size);
            };
            /**
             * Pop and return the value at the front of the buffer.
             */
            CircularBuffer.prototype.popFront = function () {
                if (this._size === 0) {
                    return void 0;
                }
                var value = this._del(0);
                this._increment();
                this._size--;
                return value;
            };
            /**
             * Add a value to the back of the buffer.
             *
             * This method always succeeds.
             */
            CircularBuffer.prototype.add = function (value) {
                this.pushBack(value);
                return true;
            };
            /**
             * Insert a value at the given index.
             *
             * If the buffer is full, the first element will be overwritten.
             *
             * Returns false if the index is out of range.
             */
            CircularBuffer.prototype.insert = function (index, value) {
                if (index < 0 || index > this._size) {
                    return false;
                }
                this.pushBack(void 0);
                for (var i = this._size - 1; i > index; --i) {
                    this._set(i, this._get(i - 1));
                }
                this._set(index, value);
                return true;
            };
            /**
             * Remove the first matching value from the buffer.
             *
             * Returns false if the value is not in the buffer.
             */
            CircularBuffer.prototype.remove = function (value) {
                var index = this.indexOf(value);
                if (index !== -1) {
                    this.removeAt(index);
                    return true;
                }
                return false;
            };
            /**
             * Remove and return the value at the given index.
             *
             * Returns `undefined` if the index is out of range.
             */
            CircularBuffer.prototype.removeAt = function (index) {
                if (index < 0 || index >= this._size) {
                    return void 0;
                }
                var value = this._get(index);
                for (var i = index + 1, n = this._size; i < n; ++i) {
                    this._set(i - 1, this._get(i));
                }
                this.popBack();
                return value;
            };
            /**
             * Remove all elements from the buffer.
             */
            CircularBuffer.prototype.clear = function () {
                var max = this._array.length;
                this._array.length = 0;
                this._array.length = max;
                this._size = 0;
                this._offset = 0;
            };
            /**
             * Get the value for the apparent index.
             *
             * The index is assumed to be in-range.
             */
            CircularBuffer.prototype._get = function (index) {
                return this._array[(index + this._offset) % this._array.length];
            };
            /**
             * Set the value for the apparent index.
             *
             * The index is assumed to be in-range.
             */
            CircularBuffer.prototype._set = function (index, value) {
                this._array[(index + this._offset) % this._array.length] = value;
            };
            /**
             * Clear and return the value at the apparent index.
             *
             * The index is assumed to be in-range.
             */
            CircularBuffer.prototype._del = function (index) {
                var i = (index + this._offset) % this._array.length;
                var value = this._array[i];
                this._array[i] = void 0;
                return value;
            };
            /**
             * Increment the offset by one.
             */
            CircularBuffer.prototype._increment = function () {
                if (this._offset === this._array.length - 1) {
                    this._offset = 0;
                }
                else {
                    this._offset++;
                }
            };
            /**
             * Decrement the offset by one.
             */
            CircularBuffer.prototype._decrement = function () {
                if (this._offset === 0) {
                    this._offset = this._array.length - 1;
                }
                else {
                    this._offset--;
                }
            };
            return CircularBuffer;
        })();
        collections.CircularBuffer = CircularBuffer;
    })(collections = phosphor.collections || (phosphor.collections = {}));
})(phosphor || (phosphor = {})); // module phosphor.collections

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var collections;
    (function (collections) {
        /**
         * A canonical singly linked FIFO queue.
         */
        var Queue = (function () {
            /**
             * Construct a new queue.
             */
            function Queue(items) {
                var _this = this;
                this._size = 0;
                this._front = null;
                this._back = null;
                if (items !== void 0)
                    collections.forEach(items, function (it) {
                        _this.pushBack(it);
                    });
            }
            Object.defineProperty(Queue.prototype, "empty", {
                /**
                 * True if the queue has elements, false otherwise.
                 */
                get: function () {
                    return this._size === 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Queue.prototype, "size", {
                /**
                 * The number of elements in the queue.
                 */
                get: function () {
                    return this._size;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Queue.prototype, "front", {
                /**
                 * The value at the front of the queue.
                 */
                get: function () {
                    return this._front !== null ? this._front.value : void 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Queue.prototype, "back", {
                /**
                 * The value at the back of the queue.
                 */
                get: function () {
                    return this._back !== null ? this._back.value : void 0;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get an iterator for the elements in the queue.
             */
            Queue.prototype.iterator = function () {
                return new QueueIterator(this._front);
            };
            /**
             * Test whether the queue contains the given value.
             */
            Queue.prototype.contains = function (value) {
                var link = this._front;
                while (link !== null) {
                    if (link.value === value) {
                        return true;
                    }
                    link = link.next;
                }
                return false;
            };
            /**
             * Add a value to the end of the queue.
             *
             * This method always succeeds.
             */
            Queue.prototype.add = function (value) {
                this.pushBack(value);
                return true;
            };
            /**
             * Push a value onto the back of the queue.
             */
            Queue.prototype.pushBack = function (value) {
                var link = { next: null, value: value };
                if (this._back === null) {
                    this._front = link;
                    this._back = link;
                }
                else {
                    this._back.next = link;
                    this._back = link;
                }
                this._size++;
            };
            /**
             * Pop and return the value at the front of the queue.
             */
            Queue.prototype.popFront = function () {
                var link = this._front;
                if (link === null) {
                    return void 0;
                }
                if (link.next === null) {
                    this._front = null;
                    this._back = null;
                }
                else {
                    this._front = link.next;
                }
                this._size--;
                return link.value;
            };
            /**
             * Remove the first matching value from the queue.
             *
             * Returns false if the value is not in the queue.
             */
            Queue.prototype.remove = function (value) {
                var link = this._front;
                var prev = null;
                while (link !== null) {
                    if (link.value === value) {
                        if (prev === null) {
                            this._front = link.next;
                        }
                        else {
                            prev.next = link.next;
                        }
                        if (link.next === null) {
                            this._back = prev;
                        }
                        this._size--;
                        return true;
                    }
                    prev = link;
                    link = link.next;
                }
                return false;
            };
            /**
             * Remove all values from the queue.
             */
            Queue.prototype.clear = function () {
                this._size = 0;
                this._front = null;
                this._back = null;
            };
            return Queue;
        })();
        collections.Queue = Queue;
        /**
         * An iterator for a Queue.
         */
        var QueueIterator = (function () {
            /**
             * Construct a new queue iterator.
             */
            function QueueIterator(link) {
                this._current = void 0;
                this._link = link;
            }
            Object.defineProperty(QueueIterator.prototype, "current", {
                /**
                 * The current value of the iterable.
                 *
                 * Returns `undefined` if there is no current value.
                 */
                get: function () {
                    return this._current;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Move the iterator to the next value.
             *
             * Returns true on success, false when the iterator is exhausted.
             */
            QueueIterator.prototype.moveNext = function () {
                if (this._link === null) {
                    return false;
                }
                this._current = this._link.value;
                this._link = this._link.next;
                return true;
            };
            /**
             * Returns `this` to make the iterator iterable.
             */
            QueueIterator.prototype.iterator = function () {
                return this;
            };
            return QueueIterator;
        })();
    })(collections = phosphor.collections || (phosphor.collections = {}));
})(phosphor || (phosphor = {})); // module phosphor.collections









/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var core;
    (function (core) {
        var Queue = phosphor.collections.Queue;
        var dispatch;
        (function (dispatch) {
            /**
             * Send a message to the message handler to process immediately.
             */
            function sendMessage(handler, msg) {
                getDispatcher(handler).sendMessage(msg);
            }
            dispatch.sendMessage = sendMessage;
            /**
             * Post a message to the message handler to process in the future.
             */
            function postMessage(handler, msg) {
                getDispatcher(handler).postMessage(msg);
            }
            dispatch.postMessage = postMessage;
            /**
             * Test whether the message handler has pending messages.
             */
            function hasPendingMessages(handler) {
                return getDispatcher(handler).hasPendingMessages();
            }
            dispatch.hasPendingMessages = hasPendingMessages;
            /**
             * Send the first pending message to the message handler.
             */
            function sendPendingMessage(handler) {
                getDispatcher(handler).sendPendingMessage();
            }
            dispatch.sendPendingMessage = sendPendingMessage;
            /**
             * Install a message filter for a message handler.
             *
             * A message filter is invoked before the message handler processes
             * the message. If the filter returns true from its `filterMessage`
             * method, processing of the message will stop immediately and no
             * other filters or the message handler will be invoked.
             *
             * The most recently installed filter is executed first.
             */
            function installMessageFilter(handler, filter) {
                getDispatcher(handler).installMessageFilter(filter);
            }
            dispatch.installMessageFilter = installMessageFilter;
            /**
             * Remove a message filter added for a message handler.
             *
             * It is safe to call this function while the filter is executing.
             *
             * If the filter is not installed, this is a no-op.
             */
            function removeMessageFilter(handler, filter) {
                getDispatcher(handler).removeMessageFilter(filter);
            }
            dispatch.removeMessageFilter = removeMessageFilter;
            /**
             * Clear all message data associated with the message handler.
             *
             * This removes all pending messages and filters for the handler.
             */
            function clearMessageData(handler) {
                var dispatcher = dispatcherMap.get(handler);
                if (dispatcher !== void 0) {
                    dispatcherMap.delete(handler);
                    dispatcher.clearPendingMessages();
                    dispatcher.clearMessageFilters();
                }
            }
            dispatch.clearMessageData = clearMessageData;
        })(dispatch = core.dispatch || (core.dispatch = {})); // module dispatch
        /**
         * The internal mapping of message handler to message dispatcher.
         */
        var dispatcherMap = new WeakMap();
        /**
         * The internal queue of posted message dispatchers.
         */
        var dispatchQueue = new Queue();
        /**
         * The internal animation frame id for the message loop wake up call.
         */
        var frameId = 0;
        /**
         * A local reference to `requestAnimationFrame`.
         */
        var raf = requestAnimationFrame;
        /**
         * Get or create the message dispatcher for an message handler.
         */
        function getDispatcher(handler) {
            var dispatcher = dispatcherMap.get(handler);
            if (dispatcher === void 0) {
                dispatcher = new MessageDispatcher(handler);
                dispatcherMap.set(handler, dispatcher);
            }
            return dispatcher;
        }
        /**
         * Wake up the message loop to process any pending dispatchers.
         *
         * This is a no-op if a wake up is not needed or is already pending.
         */
        function wakeUpMessageLoop() {
            if (frameId === 0 && !dispatchQueue.empty) {
                frameId = raf(runMessageLoop);
            }
        }
        /**
         * Run an iteration of the message loop.
         *
         * This will process all pending dispatchers in the queue. Dispatchers
         * which are added to the queue while the message loop is running will
         * be processed on the next message loop cycle.
         */
        function runMessageLoop() {
            // Clear the frame id so the next wake up call can be scheduled.
            frameId = 0;
            // If the queue is empty, there is nothing else to do.
            if (dispatchQueue.empty) {
                return;
            }
            // Add a null sentinel value to the end of the queue. The queue
            // will only be processed up to the first null value. This means
            // that messages posted during this cycle will execute on the next
            // cycle of the loop. If the last value in the array is null, it
            // means that an exception was thrown by a message handler and the
            // loop had to be restarted.
            if (dispatchQueue.back !== null) {
                dispatchQueue.pushBack(null);
            }
            while (!dispatchQueue.empty) {
                var dispatcher = dispatchQueue.popFront();
                if (dispatcher === null) {
                    wakeUpMessageLoop();
                    return;
                }
                dispatchMessage(dispatcher);
            }
        }
        /**
         * Safely process the pending handler message.
         *
         * If the message handler throws an exception, the message loop will
         * be restarted and the exception will be rethrown.
         */
        function dispatchMessage(dispatcher) {
            try {
                dispatcher.sendPendingMessage();
            }
            catch (ex) {
                wakeUpMessageLoop();
                throw ex;
            }
        }
        /**
         * A thin wrapper around a message filter.
         */
        var FilterWrapper = (function () {
            /**
             * construct a new filter wrapper.
             */
            function FilterWrapper(filter) {
                this._filter = filter;
            }
            /**
             * Clear the contents of the wrapper.
             */
            FilterWrapper.prototype.clear = function () {
                this._filter = null;
            };
            /**
             * Test whether the wrapper is equivalent to the given filter.
             */
            FilterWrapper.prototype.equals = function (filter) {
                return this._filter === filter;
            };
            /**
             * Invoke the filter with the given handler and message.
             *
             * Returns true if the message should be filtered, false otherwise.
             */
            FilterWrapper.prototype.invoke = function (handler, msg) {
                return this._filter ? this._filter.filterMessage(handler, msg) : false;
            };
            return FilterWrapper;
        })();
        /**
         * An object which manages message dispatch for a message handler.
         */
        var MessageDispatcher = (function () {
            /**
             * Construct a new message dispatcher.
             */
            function MessageDispatcher(handler) {
                this._messages = null;
                this._filters = null;
                this._handler = handler;
            }
            /**
             * Send an message to the message handler to process immediately.
             *
             * The message will first be sent through the installed filters.
             * If the message is filtered, it will not be sent to the handler.
             */
            MessageDispatcher.prototype.sendMessage = function (msg) {
                if (!this._filterMessage(msg)) {
                    this._handler.processMessage(msg);
                }
            };
            /**
             * Post a message to the message handler to process in the future.
             *
             * The message will first be compressed if possible. If the message
             * cannot be compressed, it will be added to the message queue.
             */
            MessageDispatcher.prototype.postMessage = function (msg) {
                if (!this._compressMessage(msg)) {
                    this._enqueueMessage(msg);
                }
            };
            /**
             * Test whether the message handler has pending messages.
             */
            MessageDispatcher.prototype.hasPendingMessages = function () {
                return this._messages !== null && !this._messages.empty;
            };
            /**
             * Send the first pending message to the message handler.
             */
            MessageDispatcher.prototype.sendPendingMessage = function () {
                if (this._messages !== null && !this._messages.empty) {
                    this.sendMessage(this._messages.popFront());
                }
            };
            /**
             * Clear the pending messages for the message handler.
             */
            MessageDispatcher.prototype.clearPendingMessages = function () {
                if (this._messages !== null) {
                    this._messages.clear();
                    this._messages = null;
                }
            };
            /**
             * Install an message filter for the message handler.
             */
            MessageDispatcher.prototype.installMessageFilter = function (filter) {
                var wrapper = new FilterWrapper(filter);
                var current = this._filters;
                if (current === null) {
                    this._filters = wrapper;
                }
                else if (current instanceof FilterWrapper) {
                    this._filters = [current, wrapper];
                }
                else {
                    current.push(wrapper);
                }
            };
            /**
             * Remove an message filter installed for the message handler.
             */
            MessageDispatcher.prototype.removeMessageFilter = function (filter) {
                var current = this._filters;
                if (current === null) {
                    return;
                }
                if (current instanceof FilterWrapper) {
                    if (current.equals(filter)) {
                        current.clear();
                        this._filters = null;
                    }
                }
                else {
                    var rest = [];
                    var array = current;
                    for (var i = 0, n = array.length; i < n; ++i) {
                        var wrapper = array[i];
                        if (wrapper.equals(filter)) {
                            wrapper.clear();
                        }
                        else {
                            rest.push(wrapper);
                        }
                    }
                    if (rest.length === 0) {
                        this._filters = null;
                    }
                    else if (rest.length === 1) {
                        this._filters = rest[0];
                    }
                    else {
                        this._filters = rest;
                    }
                }
            };
            /**
             * Remove all message filters installed for the message handler.
             */
            MessageDispatcher.prototype.clearMessageFilters = function () {
                var current = this._filters;
                if (current === null) {
                    return;
                }
                this._filters = null;
                if (current instanceof FilterWrapper) {
                    current.clear();
                }
                else {
                    var array = current;
                    for (var i = 0, n = array.length; i < n; ++i) {
                        array[i].clear();
                    }
                }
            };
            /**
             * Compress an message posted to the message handler, if possible.
             *
             * Returns true if the message was compressed, or false if the
             * message should be posted to the message queue as normal.
             */
            MessageDispatcher.prototype._compressMessage = function (msg) {
                if (this._handler.compressMessage === void 0) {
                    return false;
                }
                if (this._messages === null || this._messages.empty) {
                    return false;
                }
                return this._handler.compressMessage(msg, this._messages);
            };
            /**
             * Send an message through the installed message filters.
             *
             * Returns true if the message should be filtered, false otherwise.
             */
            MessageDispatcher.prototype._filterMessage = function (msg) {
                var current = this._filters;
                if (current === null) {
                    return false;
                }
                if (current instanceof FilterWrapper) {
                    return current.invoke(this._handler, msg);
                }
                var handler = this._handler;
                var array = current;
                for (var i = array.length - 1; i >= 0; --i) {
                    if (array[i].invoke(handler, msg)) {
                        return true;
                    }
                }
                return false;
            };
            /**
             * Add a message to the message queue and wake up the message loop.
             */
            MessageDispatcher.prototype._enqueueMessage = function (msg) {
                if (this._messages === null) {
                    this._messages = new Queue();
                }
                this._messages.pushBack(msg);
                dispatchQueue.pushBack(this);
                wakeUpMessageLoop();
            };
            return MessageDispatcher;
        })();
    })(core = phosphor.core || (phosphor.core = {}));
})(phosphor || (phosphor = {})); // module phosphor.core

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var core;
    (function (core) {
        /**
         * A singleton frozen empty object.
         */
        core.emptyObject = Object.freeze({});
        /**
         * A singleton frozen empty array.
         */
        core.emptyArray = Object.freeze([]);
        /**
         * A singleton empty no-op function.
         */
        core.emptyFunction = function () {
        };
    })(core = phosphor.core || (phosphor.core = {}));
})(phosphor || (phosphor = {})); // module phosphor.core

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var core;
    (function (core) {
        /**
         * A concrete implementation of IDisposable.
         *
         * A Disposable invokes a user provided callback when disposed.
         */
        var Disposable = (function () {
            /**
             * Construct a new disposable.
             */
            function Disposable(callback) {
                this._callback = callback;
            }
            /**
             * Dispose the object and invoke the user provided callback.
             */
            Disposable.prototype.dispose = function () {
                var callback = this._callback;
                this._callback = null;
                if (callback)
                    callback();
            };
            return Disposable;
        })();
        core.Disposable = Disposable;
    })(core = phosphor.core || (phosphor.core = {}));
})(phosphor || (phosphor = {})); // module phosphor.core

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var core;
    (function (core) {
        /**
         * A concrete implementation of IMessage.
         *
         * This may be subclassed to create complex message types.
         */
        var Message = (function () {
            /**
             * Construct a new message.
             */
            function Message(type) {
                this._type = type;
            }
            Object.defineProperty(Message.prototype, "type", {
                /**
                 * The type of the message.
                 */
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });
            return Message;
        })();
        core.Message = Message;
    })(core = phosphor.core || (phosphor.core = {}));
})(phosphor || (phosphor = {})); // module phosphor.core

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var core;
    (function (core) {
        /**
         * An object used for loosely coupled inter-object communication.
         *
         * A signal is emitted by an object in response to some event. User
         * code may connect callback functions to the signal to be notified
         * when that event occurs.
         */
        var Signal = (function () {
            /**
             * Construct a new signal.
             */
            function Signal() {
                this._callbacks = null;
            }
            /**
             * Connect a callback to the signal.
             *
             * If the callback is connected to the signal multiple times, it
             * will be invoked that many times when the signal is emitted.
             *
             * It is safe to connect the callback to the signal while the signal
             * is being emitted. The callback will not be invoked until the next
             * time the signal is emitted.
             */
            Signal.prototype.connect = function (callback, thisArg) {
                var wrapper = new CBWrapper(callback, thisArg);
                var current = this._callbacks;
                if (current === null) {
                    this._callbacks = wrapper;
                }
                else if (current instanceof CBWrapper) {
                    this._callbacks = [current, wrapper];
                }
                else {
                    current.push(wrapper);
                }
            };
            /**
             * Disconnect a callback from the signal.
             *
             * This will remove all instances of the callback from the signal.
             * If no callback is provided, all callbacks will be disconnected.
             *
             * It is safe to disconnect a callback from the signal while the
             * signal is being emitted. The callback will not be invoked.
             */
            Signal.prototype.disconnect = function (callback, thisArg) {
                var current = this._callbacks;
                if (current === null) {
                    return;
                }
                if (current instanceof CBWrapper) {
                    if (!callback || current.equals(callback, thisArg)) {
                        current.clear();
                        this._callbacks = null;
                    }
                }
                else if (!callback) {
                    var array = current;
                    for (var i = 0, n = array.length; i < n; ++i) {
                        array[i].clear();
                    }
                    this._callbacks = null;
                }
                else {
                    var rest = [];
                    var array = current;
                    for (var i = 0, n = array.length; i < n; ++i) {
                        var wrapper = array[i];
                        if (wrapper.equals(callback, thisArg)) {
                            wrapper.clear();
                        }
                        else {
                            rest.push(wrapper);
                        }
                    }
                    if (rest.length === 0) {
                        this._callbacks = null;
                    }
                    else if (rest.length === 1) {
                        this._callbacks = rest[0];
                    }
                    else {
                        this._callbacks = rest;
                    }
                }
            };
            /**
             * Test whether a callback is connected to the signal.
             */
            Signal.prototype.isConnected = function (callback, thisArg) {
                var current = this._callbacks;
                if (current === null) {
                    return false;
                }
                if (current instanceof CBWrapper) {
                    return current.equals(callback, thisArg);
                }
                var array = current;
                for (var i = 0, n = array.length; i < n; ++i) {
                    if (array[i].equals(callback, thisArg)) {
                        return true;
                    }
                }
                return false;
            };
            /**
             * Emit the signal and invoke its connected callbacks.
             *
             * Callbacks are invoked in the order in which they are connected.
             */
            Signal.prototype.emit = function (sender, args) {
                var current = this._callbacks;
                if (current === null) {
                    return;
                }
                if (current instanceof CBWrapper) {
                    current.invoke(sender, args);
                }
                else {
                    var array = current;
                    for (var i = 0, n = array.length; i < n; ++i) {
                        array[i].invoke(sender, args);
                    }
                }
            };
            return Signal;
        })();
        core.Signal = Signal;
        /**
         * A thin wrapper around a callback function and context.
         */
        var CBWrapper = (function () {
            /**
             * Construct a new callback wrapper.
             */
            function CBWrapper(callback, thisArg) {
                this._callback = callback;
                this._thisArg = thisArg;
            }
            /**
             * Clear the contents of the callback wrapper.
             */
            CBWrapper.prototype.clear = function () {
                this._callback = null;
                this._thisArg = null;
            };
            /**
             * Test whether the wrapper equals a callback and context.
             */
            CBWrapper.prototype.equals = function (callback, thisArg) {
                return this._callback === callback && this._thisArg === thisArg;
            };
            /**
             * Invoke the wrapped callback with the given sender and args.
             *
             * This is a no-op if the wrapper has been cleared.
             */
            CBWrapper.prototype.invoke = function (sender, args) {
                if (this._callback) {
                    this._callback.call(this._thisArg, sender, args);
                }
            };
            return CBWrapper;
        })();
    })(core = phosphor.core || (phosphor.core = {}));
})(phosphor || (phosphor = {})); // module phosphor.core

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var di;
    (function (di) {
        /**
         * Create a token with the given name.
         */
        function createToken(name) {
            return Object.freeze({ name: name });
        }
        di.createToken = createToken;
    })(di = phosphor.di || (phosphor.di = {}));
})(phosphor || (phosphor = {})); // module phosphor.di



/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var di;
    (function (di) {
        di.IContainer = di.createToken('phosphor.di.IContainer');
    })(di = phosphor.di || (phosphor.di = {}));
})(phosphor || (phosphor = {})); // module phosphor.di

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var di;
    (function (di) {
        /**
         * A lightweight dependency injection container.
         */
        var Container = (function () {
            /**
             * Construct a new container.
             */
            function Container() {
                this._registry = new Map();
            }
            /**
             * Test whether a type is registered with the container.
             */
            Container.prototype.isRegistered = function (token) {
                return this._registry.has(token);
            };
            /**
             * Register a type mapping with the container.
             *
             * An exception will be thrown if the type is already registered.
             *
             * The allowed lifetimes are:
             *
             *   'singleton' - Only a single instance of the type is ever
             *      created, and that instance is shared by all objects
             *      which have a dependency on the given type id.
             *
             *   'transient' - A new instance of the type is created each
             *      time the dependency is fullfilled for an object which
             *      has a dependency on the given type id.
             *
             *   'perresolve' - A single instance of the type is created
             *      each time the `resolve` method is called, and that
             *      instance is shared by all objects which are created
             *      during the same resolve pass and have a dependency
             *      on the given type id.
             *
             * The default lifetime is 'singleton'.
             */
            Container.prototype.registerType = function (token, type, lifetime) {
                if (this._registry.has(token)) {
                    throw new Error('token is already registered');
                }
                var lt = createLifetime(lifetime || 'singleton');
                this._registry.set(token, { type: type, lifetime: lt });
            };
            /**
             * Register an instance mapping with the container.
             *
             * This is the same as a 'singleton' type registration, except
             * that the user creates the instance of the type beforehand.
             *
             * This will throw an exception if the token is already registered.
             */
            Container.prototype.registerInstance = function (token, instance) {
                if (this._registry.has(token)) {
                    throw new Error('token is already registered');
                }
                var lt = new SingletonLifetime(instance);
                this._registry.set(token, { type: null, lifetime: lt });
            };
            /**
             * Resolve an instance for the given token or type.
             *
             * An error is thrown if no type mapping is registered for the
             * token or if the injection dependencies cannot be fulfilled.
             */
            Container.prototype.resolve = function (token) {
                if (typeof token === 'function') {
                    return this._resolveType(token, resolveKeyTick++);
                }
                return this._resolveToken(token, resolveKeyTick++);
            };
            /**
             * Resolve an instance for the given token.
             *
             * An error is thrown if the token is not registered.
             */
            Container.prototype._resolveToken = function (token, key) {
                var item = this._registry.get(token);
                if (item === void 0) {
                    throw new Error('`' + token.name + '` is not registered');
                }
                var instance = item.lifetime.get(key);
                if (instance) {
                    return instance;
                }
                instance = this._resolveType(item.type, key);
                item.lifetime.set(key, instance);
                return instance;
            };
            /**
             * Resolve an instance of the given type.
             *
             * An error is thrown if the type dependencies cannot be fulfilled.
             */
            Container.prototype._resolveType = function (type, key) {
                var instance = Object.create(type.prototype);
                var deps = type.$inject;
                if (!deps || deps.length === 0) {
                    return type.call(instance) || instance;
                }
                var args = [];
                for (var i = 0, n = deps.length; i < n; ++i) {
                    args[i] = this._resolveToken(deps[i], key);
                }
                return type.apply(instance, args) || instance;
            };
            return Container;
        })();
        di.Container = Container;
        /**
         * An internal resolve key counter.
         */
        var resolveKeyTick = 0;
        /**
         * Create a lifetime object for the given string.
         */
        function createLifetime(lifetime) {
            if (lifetime === 'transient') {
                return transientInstance;
            }
            if (lifetime === 'singleton') {
                return new SingletonLifetime();
            }
            if (lifetime === 'perresolve') {
                return new PerResolveLifetime();
            }
            throw new Error('invalid lifetime: ' + lifetime);
        }
        /**
         * A lifetime which never caches its object.
         */
        var TransientLifetime = (function () {
            function TransientLifetime() {
            }
            /**
             * Get the cached object for the lifetime.
             */
            TransientLifetime.prototype.get = function (key) {
                return null;
            };
            /**
             * Set the cached object for the lifetime.
             */
            TransientLifetime.prototype.set = function (key, val) {
            };
            return TransientLifetime;
        })();
        /**
         * Only a single transient lifetime instance is ever needed.
         */
        var transientInstance = new TransientLifetime();
        /**
         * A lifetime which always caches its object.
         */
        var SingletonLifetime = (function () {
            /**
             * Construct a new singleton lifetime.
             */
            function SingletonLifetime(val) {
                if (val === void 0) { val = null; }
                this._val = val;
            }
            /**
             * Get the cached object for the lifetime if one exists.
             */
            SingletonLifetime.prototype.get = function (key) {
                return this._val;
            };
            /**
             * Set the cached object for the lifetime if needed.
             */
            SingletonLifetime.prototype.set = function (key, val) {
                this._val = val;
            };
            return SingletonLifetime;
        })();
        /**
         * A lifetime which caches the instance on a per-resolve basis.
         */
        var PerResolveLifetime = (function () {
            function PerResolveLifetime() {
                this._key = 0;
                this._val = null;
            }
            /**
             * Get the cached object for the lifetime if one exists.
             */
            PerResolveLifetime.prototype.get = function (key) {
                return this._key === key ? this._val : null;
            };
            /**
             * Set the cached object for the lifetime if needed.
             */
            PerResolveLifetime.prototype.set = function (key, val) {
                this._key = key;
                this._val = val;
            };
            return PerResolveLifetime;
        })();
    })(di = phosphor.di || (phosphor.di = {}));
})(phosphor || (phosphor = {})); // module phosphor.di

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var domutil;
    (function (domutil) {
        /**
         * Create a box data object for the given node.
         *
         * The values of the returned object are read only.
         */
        function createBoxData(node) {
            var style = window.getComputedStyle(node);
            var bt = parseInt(style.borderTopWidth, 10) || 0;
            var bl = parseInt(style.borderLeftWidth, 10) || 0;
            var br = parseInt(style.borderRightWidth, 10) || 0;
            var bb = parseInt(style.borderBottomWidth, 10) || 0;
            var pt = parseInt(style.paddingTop, 10) || 0;
            var pl = parseInt(style.paddingLeft, 10) || 0;
            var pr = parseInt(style.paddingRight, 10) || 0;
            var pb = parseInt(style.paddingBottom, 10) || 0;
            var data = Object.create(boxDataProto);
            if (bt !== 0)
                data._bt = bt;
            if (bl !== 0)
                data._bl = bl;
            if (br !== 0)
                data._br = br;
            if (bb !== 0)
                data._bb = bb;
            if (pt !== 0)
                data._pt = pt;
            if (pl !== 0)
                data._pl = pl;
            if (pr !== 0)
                data._pr = pr;
            if (pb !== 0)
                data._pb = pb;
            return data;
        }
        domutil.createBoxData = createBoxData;
        /**
         * The box data prototype object used by `createBoxData`.
         */
        var boxDataProto = {
            get borderTop() {
                return this._bt;
            },
            get borderLeft() {
                return this._bl;
            },
            get borderRight() {
                return this._br;
            },
            get borderBottom() {
                return this._bb;
            },
            get paddingTop() {
                return this._pt;
            },
            get paddingLeft() {
                return this._pl;
            },
            get paddingRight() {
                return this._pr;
            },
            get paddingBottom() {
                return this._pb;
            },
            get verticalSum() {
                return this._bt + this._bb + this._pt + this._pb;
            },
            get horizontalSum() {
                return this._bl + this._br + this._pl + this._pr;
            },
            _bt: 0,
            _bl: 0,
            _br: 0,
            _bb: 0,
            _pt: 0,
            _pl: 0,
            _pr: 0,
            _pb: 0,
        };
    })(domutil = phosphor.domutil || (phosphor.domutil = {}));
})(phosphor || (phosphor = {})); // module phosphor.domutil

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var domutil;
    (function (domutil) {
        /**
         * Test whether a client position lies within a node.
         */
        function hitTest(node, x, y) {
            var rect = node.getBoundingClientRect();
            return x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom;
        }
        domutil.hitTest = hitTest;
    })(domutil = phosphor.domutil || (phosphor.domutil = {}));
})(phosphor || (phosphor = {})); // module phosphor.domutil

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var domutil;
    (function (domutil) {
        var Disposable = phosphor.core.Disposable;
        /**
         * The class name added to the document body on cursor override.
         */
        var CURSOR_CLASS = 'p-mod-cursor-override';
        /**
         * The current disposable which owns the override.
         */
        var current = null;
        /**
         * Override the cursor for the entire document.
         *
         * Returns an IDisposable which will clear the override.
         */
        function overrideCursor(cursor) {
            if (current)
                current.dispose();
            var body = document.body;
            body.style.cursor = cursor;
            body.classList.add(CURSOR_CLASS);
            return current = new Disposable(clearOverride);
        }
        domutil.overrideCursor = overrideCursor;
        /**
         * Clear the cursor override.
         */
        function clearOverride() {
            current = null;
            var body = document.body;
            body.style.cursor = '';
            body.classList.remove(CURSOR_CLASS);
        }
    })(domutil = phosphor.domutil || (phosphor.domutil = {}));
})(phosphor || (phosphor = {})); // module phosphor.domutil





/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var virtualdom;
    (function (virtualdom) {
        /**
         * An enum of supported virtual element types.
         */
        (function (ElementType) {
            /**
             * The element represents a text node.
             */
            ElementType[ElementType["Text"] = 0] = "Text";
            /**
             * The element represents an HTMLElement node.
             */
            ElementType[ElementType["Node"] = 1] = "Node";
            /**
             * The element represents a component.
             */
            ElementType[ElementType["Component"] = 2] = "Component";
        })(virtualdom.ElementType || (virtualdom.ElementType = {}));
        var ElementType = virtualdom.ElementType;
    })(virtualdom = phosphor.virtualdom || (phosphor.virtualdom = {}));
})(phosphor || (phosphor = {})); // module phosphor.virtualdom

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var virtualdom;
    (function (virtualdom) {
        var emptyArray = phosphor.core.emptyArray;
        var emptyObject = phosphor.core.emptyObject;
        /**
         * Create a virtual element factory function for the given tag.
         *
         * This will typically be used to create an element factory for a user
         * defined component. The `virtualdom` module exports a `dom` object
         * which contains factories for the standard DOM elements.
         */
        function createFactory(tag) {
            return factory.bind(void 0, tag);
        }
        virtualdom.createFactory = createFactory;
        /**
         * A concrete implementation of IElement.
         */
        var VirtualElement = (function () {
            /**
             * Construct a new element.
             */
            function VirtualElement(type, tag, data, children) {
                this.type = type;
                this.tag = tag;
                this.data = data;
                this.children = children;
            }
            return VirtualElement;
        })();
        VirtualElement.prototype.__isElement = true;
        /**
         * Create a new virtual text element.
         */
        function createTextElement(text) {
            return new VirtualElement(0 /* Text */, text, emptyObject, emptyArray);
        }
        /**
         * Create a new virtual node element.
         */
        function createNodeElement(tag, data, children) {
            data = data || emptyObject;
            children = children || emptyArray;
            return new VirtualElement(1 /* Node */, tag, data, children);
        }
        /**
         * Create a new virtual component element.
         */
        function createComponentElement(tag, data, children) {
            data = data || emptyObject;
            children = children || emptyArray;
            return new VirtualElement(2 /* Component */, tag, data, children);
        }
        /**
         * Extend the first array with elements of the second.
         *
         * Falsey values in the second array are ignored.
         */
        function extend(first, second) {
            for (var i = 0, n = second.length; i < n; ++i) {
                var item = second[i];
                if (item)
                    first.push(item);
            }
        }
        /**
         * The virtual element factory function implementation.
         *
         * When bound to a tag, this function implements IElementFactory.
         */
        function factory(tag, first) {
            var data = null;
            var children = null;
            if (first) {
                if (typeof first === 'string' || first.__isElement) {
                    children = [first];
                }
                else if (first instanceof Array) {
                    children = first.slice();
                }
                else {
                    data = first;
                }
            }
            var count = arguments.length;
            if (count > 2) {
                children = children || [];
                for (var i = 2; i < count; ++i) {
                    var child = arguments[i];
                    if (child instanceof Array) {
                        extend(children, child);
                    }
                    else if (child) {
                        children.push(child);
                    }
                }
            }
            if (children) {
                for (var i = 0, n = children.length; i < n; ++i) {
                    var child = children[i];
                    if (typeof child === 'string') {
                        children[i] = createTextElement(child);
                    }
                }
            }
            var elem;
            if (typeof tag === 'string') {
                elem = createNodeElement(tag, data, children);
            }
            else {
                elem = createComponentElement(tag, data, children);
            }
            return elem;
        }
    })(virtualdom = phosphor.virtualdom || (phosphor.virtualdom = {}));
})(phosphor || (phosphor = {})); // module phosphor.virtualdom

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var virtualdom;
    (function (virtualdom) {
        /**
         * The virtual dom factory functions.
         */
        virtualdom.dom = {
            a: virtualdom.createFactory('a'),
            abbr: virtualdom.createFactory('abbr'),
            address: virtualdom.createFactory('address'),
            area: virtualdom.createFactory('area'),
            article: virtualdom.createFactory('article'),
            aside: virtualdom.createFactory('aside'),
            audio: virtualdom.createFactory('audio'),
            b: virtualdom.createFactory('b'),
            bdi: virtualdom.createFactory('bdi'),
            bdo: virtualdom.createFactory('bdo'),
            blockquote: virtualdom.createFactory('blockquote'),
            br: virtualdom.createFactory('br'),
            button: virtualdom.createFactory('button'),
            canvas: virtualdom.createFactory('canvas'),
            caption: virtualdom.createFactory('caption'),
            cite: virtualdom.createFactory('cite'),
            code: virtualdom.createFactory('code'),
            col: virtualdom.createFactory('col'),
            colgroup: virtualdom.createFactory('colgroup'),
            data: virtualdom.createFactory('data'),
            datalist: virtualdom.createFactory('datalist'),
            dd: virtualdom.createFactory('dd'),
            del: virtualdom.createFactory('del'),
            dfn: virtualdom.createFactory('dfn'),
            div: virtualdom.createFactory('div'),
            dl: virtualdom.createFactory('dl'),
            dt: virtualdom.createFactory('dt'),
            em: virtualdom.createFactory('em'),
            embed: virtualdom.createFactory('embed'),
            fieldset: virtualdom.createFactory('fieldset'),
            figcaption: virtualdom.createFactory('figcaption'),
            figure: virtualdom.createFactory('figure'),
            footer: virtualdom.createFactory('footer'),
            form: virtualdom.createFactory('form'),
            h1: virtualdom.createFactory('h1'),
            h2: virtualdom.createFactory('h2'),
            h3: virtualdom.createFactory('h3'),
            h4: virtualdom.createFactory('h4'),
            h5: virtualdom.createFactory('h5'),
            h6: virtualdom.createFactory('h6'),
            header: virtualdom.createFactory('header'),
            hr: virtualdom.createFactory('hr'),
            i: virtualdom.createFactory('i'),
            iframe: virtualdom.createFactory('iframe'),
            img: virtualdom.createFactory('img'),
            input: virtualdom.createFactory('input'),
            ins: virtualdom.createFactory('ins'),
            kbd: virtualdom.createFactory('kbd'),
            label: virtualdom.createFactory('label'),
            legend: virtualdom.createFactory('legend'),
            li: virtualdom.createFactory('li'),
            main: virtualdom.createFactory('main'),
            map: virtualdom.createFactory('map'),
            mark: virtualdom.createFactory('mark'),
            meter: virtualdom.createFactory('meter'),
            nav: virtualdom.createFactory('nav'),
            object: virtualdom.createFactory('object'),
            ol: virtualdom.createFactory('ol'),
            optgroup: virtualdom.createFactory('optgroup'),
            option: virtualdom.createFactory('option'),
            output: virtualdom.createFactory('output'),
            p: virtualdom.createFactory('p'),
            param: virtualdom.createFactory('param'),
            pre: virtualdom.createFactory('pre'),
            progress: virtualdom.createFactory('progress'),
            q: virtualdom.createFactory('q'),
            rp: virtualdom.createFactory('rp'),
            rt: virtualdom.createFactory('rt'),
            ruby: virtualdom.createFactory('ruby'),
            s: virtualdom.createFactory('s'),
            samp: virtualdom.createFactory('samp'),
            section: virtualdom.createFactory('section'),
            select: virtualdom.createFactory('select'),
            small: virtualdom.createFactory('small'),
            source: virtualdom.createFactory('source'),
            span: virtualdom.createFactory('span'),
            strong: virtualdom.createFactory('strong'),
            sub: virtualdom.createFactory('sub'),
            summary: virtualdom.createFactory('summary'),
            sup: virtualdom.createFactory('sup'),
            table: virtualdom.createFactory('table'),
            tbody: virtualdom.createFactory('tbody'),
            td: virtualdom.createFactory('td'),
            textarea: virtualdom.createFactory('textarea'),
            tfoot: virtualdom.createFactory('tfoot'),
            th: virtualdom.createFactory('th'),
            thead: virtualdom.createFactory('thead'),
            time: virtualdom.createFactory('time'),
            title: virtualdom.createFactory('title'),
            tr: virtualdom.createFactory('tr'),
            track: virtualdom.createFactory('track'),
            u: virtualdom.createFactory('u'),
            ul: virtualdom.createFactory('ul'),
            var: virtualdom.createFactory('var'),
            video: virtualdom.createFactory('video'),
            wbr: virtualdom.createFactory('wbr'),
        };
    })(virtualdom = phosphor.virtualdom || (phosphor.virtualdom = {}));
})(phosphor || (phosphor = {})); // module phosphor.virtualdom

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var virtualdom;
    (function (virtualdom) {
        var emptyArray = phosphor.core.emptyArray;
        var emptyObject = phosphor.core.emptyObject;
        /**
         * Render virtual content into a host node.
         *
         * This renders the delta from the previous rendering. It assumes that
         * the contents of the host node are not manipulated by external code.
         * Modifying the host node will result in undefined rendering behavior.
         *
         * Returns an object which maps ref names to nodes and components.
         */
        function render(content, host) {
            var oldContent = hostMap.get(host) || emptyArray;
            var newContent = asElementArray(content);
            hostMap.set(host, newContent);
            updateContent(host, oldContent, newContent);
            return collectRefs(host, newContent);
        }
        virtualdom.render = render;
        /**
         * A weak mapping of host node to rendered content.
         */
        var hostMap = new WeakMap();
        /**
         * A weak mapping of component node to component.
         */
        var componentMap = new WeakMap();
        /**
         * Coerce virtual content into a virtual element array.
         *
         * Null content will be coerced to an empty array.
         */
        function asElementArray(content) {
            if (content instanceof Array) {
                return content;
            }
            if (content) {
                return [content];
            }
            return emptyArray;
        }
        /**
         * Collect a mapping of keyed elements for the host content.
         */
        function collectKeys(host, content) {
            var childNodes = host.childNodes;
            var keyed = Object.create(null);
            for (var i = 0, n = content.length; i < n; ++i) {
                var elem = content[i];
                var key = elem.data.key;
                if (key)
                    keyed[key] = { elem: elem, node: childNodes[i] };
            }
            return keyed;
        }
        /**
         * Walk the element tree and collect the refs into a new object.
         */
        function collectRefs(host, content) {
            var refs = Object.create(null);
            refsHelper(host, content, refs);
            return refs;
        }
        /**
         * A recursive implementation helper for `collectRefs`.
         */
        function refsHelper(host, content, refs) {
            var childNodes = host.childNodes;
            for (var i = 0, n = content.length; i < n; ++i) {
                var elem = content[i];
                var type = elem.type;
                if (type === 1 /* Node */) {
                    var node = childNodes[i];
                    var ref = elem.data.ref;
                    if (ref)
                        refs[ref] = node;
                    refsHelper(node, elem.children, refs);
                }
                else if (type === 2 /* Component */) {
                    var ref = elem.data.ref;
                    if (ref)
                        refs[ref] = componentMap.get(childNodes[i]);
                }
            }
        }
        /**
         * Move a node to a new location in a host element.
         *
         * This function will maintain focus on the node if applicable.
         */
        function moveNode(host, node, ref) {
            // TODO - IE11 fails to set the focus properly
            var wasActive = document.activeElement === node;
            host.insertBefore(node, ref);
            if (wasActive)
                node.focus();
        }
        /**
         * Create a node for a virtual element and add it to a host.
         */
        function addNode(host, elem, ref) {
            var type = elem.type;
            if (type === 0 /* Text */) {
                host.insertBefore(document.createTextNode(elem.tag), ref);
            }
            else if (type === 1 /* Node */) {
                var node = document.createElement(elem.tag);
                addAttributes(node, elem.data);
                host.insertBefore(node, ref);
                addContent(node, elem.children);
            }
            else if (type === 2 /* Component */) {
                var component = new elem.tag();
                componentMap.set(component.node, component);
                host.insertBefore(component.node, ref);
                component.init(elem.data, elem.children);
            }
            else {
                throw new Error('invalid element type');
            }
        }
        /**
         * Add content to a newly created DOM node.
         */
        function addContent(host, content) {
            for (var i = 0, n = content.length; i < n; ++i) {
                addNode(host, content[i]);
            }
        }
        /**
         * Add attributes to a newly created DOM node.
         */
        function addAttributes(node, attrs) {
            for (var name in attrs) {
                var mode = attrModeTable[name];
                if (mode === 0 /* Property */ || mode === 2 /* Event */) {
                    node[name] = attrs[name];
                }
                else if (mode === 1 /* Attribute */) {
                    node.setAttribute(name.toLowerCase(), attrs[name]);
                }
            }
            var dataset = attrs.dataset;
            if (dataset) {
                for (var name in dataset) {
                    node.setAttribute('data-' + name, dataset[name]);
                }
            }
            var inlineStyles = attrs.style;
            if (inlineStyles) {
                var style = node.style;
                for (var name in inlineStyles) {
                    style[name] = inlineStyles[name];
                }
            }
        }
        /**
         * Update a host node with the delta of the virtual content.
         */
        function updateContent(host, oldContent, newContent) {
            // Bail early if the content is identical. This can occur when an
            // element has no children or if a component renders cached content.
            if (oldContent === newContent) {
                return;
            }
            // Collect the old keyed elements into a mapping.
            var oldKeyed = collectKeys(host, oldContent);
            // Create a copy of the old content which can be modified in-place.
            var oldCopy = oldContent.slice();
            // Store the child node list locally.
            var childNodes = host.childNodes;
            // Update the host with the new content. The diff algorithm always
            // proceeds forward and never modifies a previously visited index.
            // The `oldCopy` array is modified in-place to reflect the changes
            // made to the host. This causes the unused nodes to be pushed to
            // the end of the host node and removed at the end of the loop.
            var newCount = newContent.length;
            for (var i = 0; i < newCount; ++i) {
                var newElem = newContent[i];
                // If the old elements are exhausted, create a new node.
                if (i >= oldCopy.length) {
                    oldCopy.push(newElem);
                    addNode(host, newElem);
                    continue;
                }
                var oldElem = oldCopy[i];
                var currNode = childNodes[i];
                // If the new element is keyed, move a keyed old element to the
                // proper location before proceeding with the diff.
                var newKey = newElem.data.key;
                if (newKey && newKey in oldKeyed) {
                    var pair = oldKeyed[newKey];
                    if (pair.elem !== oldElem) {
                        var k = oldCopy.indexOf(pair.elem);
                        if (k !== -1)
                            oldCopy.splice(k, 1);
                        oldCopy.splice(i, 0, pair.elem);
                        moveNode(host, pair.node, currNode);
                        oldElem = pair.elem;
                        currNode = pair.node;
                    }
                }
                // If both elements are identical, there is nothing to do.
                // This can occur when a component renders cached content.
                if (oldElem === newElem) {
                    continue;
                }
                // If the old element is keyed and does not match the new element
                // key, create a new node. This is necessary since the old element
                // may be moved forward in the tree at a later point in the diff.
                var oldKey = oldElem.data.key;
                if (oldKey && oldKey !== newKey) {
                    oldCopy.splice(i, 0, newElem);
                    addNode(host, newElem, currNode);
                    continue;
                }
                // If the elements have different types, create a new node.
                if (oldElem.type !== newElem.type) {
                    oldCopy.splice(i, 0, newElem);
                    addNode(host, newElem, currNode);
                    continue;
                }
                // If the element is a text node, update its text content.
                if (newElem.type === 0 /* Text */) {
                    if (oldElem.tag !== newElem.tag) {
                        currNode.textContent = newElem.tag;
                    }
                    continue;
                }
                // At this point, the element is a Node or Component type.
                // If the element tags are different, create a new node.
                if (oldElem.tag !== newElem.tag) {
                    oldCopy.splice(i, 0, newElem);
                    addNode(host, newElem, currNode);
                    continue;
                }
                // If the element is a Node type, update the node in place.
                if (newElem.type === 1 /* Node */) {
                    updateAttrs(currNode, oldElem.data, newElem.data);
                    updateContent(currNode, oldElem.children, newElem.children);
                    continue;
                }
                // At this point, the node is a Component type; re-init it.
                var component = componentMap.get(currNode);
                component.init(newElem.data, newElem.children);
            }
            for (var i = oldCopy.length - 1; i >= newCount; --i) {
                var oldNode = childNodes[i];
                host.removeChild(oldNode);
                disposeBranch(oldNode);
            }
        }
        /**
         * Update the node attributes with the delta of attribute objects.
         */
        function updateAttrs(node, oldAttrs, newAttrs) {
            if (oldAttrs === newAttrs) {
                return;
            }
            for (var name in oldAttrs) {
                if (!(name in newAttrs)) {
                    var mode = attrModeTable[name];
                    if (mode === 0 /* Property */) {
                        node.removeAttribute(name);
                    }
                    else if (mode === 1 /* Attribute */) {
                        node.removeAttribute(name.toLowerCase());
                    }
                    else if (mode === 2 /* Event */) {
                        node[name] = null;
                    }
                }
            }
            for (var name in newAttrs) {
                var value = newAttrs[name];
                if (oldAttrs[name] !== value) {
                    var mode = attrModeTable[name];
                    if (mode === 0 /* Property */ || mode === 2 /* Event */) {
                        node[name] = value;
                    }
                    else if (mode === 1 /* Attribute */) {
                        node.setAttribute(name.toLowerCase(), value);
                    }
                }
            }
            var oldDataset = oldAttrs.dataset || emptyObject;
            var newDataset = newAttrs.dataset || emptyObject;
            if (oldDataset !== newDataset) {
                for (var name in oldDataset) {
                    if (!(name in newDataset)) {
                        node.removeAttribute('data-' + name);
                    }
                }
                for (var name in newDataset) {
                    var value = newDataset[name];
                    if (oldDataset[name] !== value) {
                        node.setAttribute('data-' + name, value);
                    }
                }
            }
            var oldInlineStyles = oldAttrs.style || emptyObject;
            var newInlineStyles = newAttrs.style || emptyObject;
            if (oldInlineStyles !== newInlineStyles) {
                var style = node.style;
                for (var name in oldInlineStyles) {
                    if (!(name in newInlineStyles)) {
                        style[name] = '';
                    }
                }
                for (var name in newInlineStyles) {
                    var value = newInlineStyles[name];
                    if (oldInlineStyles[name] !== value) {
                        style[name] = value;
                    }
                }
            }
        }
        /**
         * Dispose of the components associated with the given branch.
         */
        function disposeBranch(root) {
            if (root.nodeType === 1) {
                var component = componentMap.get(root);
                if (component)
                    component.dispose();
            }
            for (var child = root.firstChild; child; child = child.nextSibling) {
                disposeBranch(child);
            }
        }
        /**
         * A mapping of attribute name to required setattr mode.
         */
        var attrModeTable = {
            accept: 0 /* Property */,
            acceptCharset: 0 /* Property */,
            accessKey: 0 /* Property */,
            action: 0 /* Property */,
            allowFullscreen: 1 /* Attribute */,
            alt: 0 /* Property */,
            autocomplete: 0 /* Property */,
            autofocus: 0 /* Property */,
            autoplay: 0 /* Property */,
            checked: 0 /* Property */,
            cite: 0 /* Property */,
            className: 0 /* Property */,
            colSpan: 0 /* Property */,
            cols: 0 /* Property */,
            contentEditable: 0 /* Property */,
            controls: 0 /* Property */,
            coords: 0 /* Property */,
            crossOrigin: 0 /* Property */,
            data: 0 /* Property */,
            dateTime: 0 /* Property */,
            default: 0 /* Property */,
            dir: 0 /* Property */,
            dirName: 0 /* Property */,
            disabled: 0 /* Property */,
            download: 0 /* Property */,
            draggable: 0 /* Property */,
            enctype: 0 /* Property */,
            form: 1 /* Attribute */,
            formAction: 0 /* Property */,
            formEnctype: 0 /* Property */,
            formMethod: 0 /* Property */,
            formNoValidate: 0 /* Property */,
            formTarget: 0 /* Property */,
            headers: 0 /* Property */,
            height: 0 /* Property */,
            hidden: 0 /* Property */,
            high: 0 /* Property */,
            href: 0 /* Property */,
            hreflang: 0 /* Property */,
            htmlFor: 0 /* Property */,
            id: 0 /* Property */,
            inputMode: 0 /* Property */,
            isMap: 0 /* Property */,
            kind: 0 /* Property */,
            label: 0 /* Property */,
            lang: 0 /* Property */,
            list: 1 /* Attribute */,
            loop: 0 /* Property */,
            low: 0 /* Property */,
            max: 0 /* Property */,
            maxLength: 0 /* Property */,
            media: 1 /* Attribute */,
            mediaGroup: 0 /* Property */,
            method: 0 /* Property */,
            min: 0 /* Property */,
            minLength: 0 /* Property */,
            multiple: 0 /* Property */,
            muted: 0 /* Property */,
            name: 0 /* Property */,
            noValidate: 0 /* Property */,
            optimum: 0 /* Property */,
            pattern: 0 /* Property */,
            placeholder: 0 /* Property */,
            poster: 0 /* Property */,
            preload: 0 /* Property */,
            readOnly: 0 /* Property */,
            rel: 0 /* Property */,
            required: 0 /* Property */,
            reversed: 0 /* Property */,
            rowSpan: 0 /* Property */,
            rows: 0 /* Property */,
            sandbox: 0 /* Property */,
            scope: 0 /* Property */,
            seamless: 1 /* Attribute */,
            selected: 0 /* Property */,
            shape: 0 /* Property */,
            size: 0 /* Property */,
            sizes: 1 /* Attribute */,
            sorted: 0 /* Property */,
            span: 0 /* Property */,
            spellcheck: 0 /* Property */,
            src: 0 /* Property */,
            srcdoc: 0 /* Property */,
            srclang: 0 /* Property */,
            srcset: 1 /* Attribute */,
            start: 0 /* Property */,
            step: 0 /* Property */,
            tabIndex: 0 /* Property */,
            target: 0 /* Property */,
            title: 0 /* Property */,
            type: 0 /* Property */,
            typeMustMatch: 0 /* Property */,
            useMap: 0 /* Property */,
            value: 0 /* Property */,
            volume: 0 /* Property */,
            width: 0 /* Property */,
            wrap: 0 /* Property */,
            onabort: 2 /* Event */,
            onbeforecopy: 2 /* Event */,
            onbeforecut: 2 /* Event */,
            onbeforepaste: 2 /* Event */,
            onblur: 2 /* Event */,
            oncanplay: 2 /* Event */,
            oncanplaythrough: 2 /* Event */,
            onchange: 2 /* Event */,
            onclick: 2 /* Event */,
            oncontextmenu: 2 /* Event */,
            oncopy: 2 /* Event */,
            oncuechange: 2 /* Event */,
            oncut: 2 /* Event */,
            ondblclick: 2 /* Event */,
            ondrag: 2 /* Event */,
            ondragend: 2 /* Event */,
            ondragenter: 2 /* Event */,
            ondragleave: 2 /* Event */,
            ondragover: 2 /* Event */,
            ondragstart: 2 /* Event */,
            ondrop: 2 /* Event */,
            ondurationchange: 2 /* Event */,
            onended: 2 /* Event */,
            onemptied: 2 /* Event */,
            onerror: 2 /* Event */,
            onfocus: 2 /* Event */,
            onhelp: 2 /* Event */,
            oninput: 2 /* Event */,
            onkeydown: 2 /* Event */,
            onkeypress: 2 /* Event */,
            onkeyup: 2 /* Event */,
            onload: 2 /* Event */,
            onloadeddata: 2 /* Event */,
            onloadedmetadata: 2 /* Event */,
            onloadstart: 2 /* Event */,
            onmousedown: 2 /* Event */,
            onmouseenter: 2 /* Event */,
            onmouseleave: 2 /* Event */,
            onmousemove: 2 /* Event */,
            onmouseout: 2 /* Event */,
            onmouseover: 2 /* Event */,
            onmouseup: 2 /* Event */,
            onmousewheel: 2 /* Event */,
            onpaste: 2 /* Event */,
            onpause: 2 /* Event */,
            onplay: 2 /* Event */,
            onplaying: 2 /* Event */,
            onprogress: 2 /* Event */,
            onratechange: 2 /* Event */,
            onreadystatechange: 2 /* Event */,
            onreset: 2 /* Event */,
            onscroll: 2 /* Event */,
            onseeked: 2 /* Event */,
            onseeking: 2 /* Event */,
            onselect: 2 /* Event */,
            onselectstart: 2 /* Event */,
            onstalled: 2 /* Event */,
            onsubmit: 2 /* Event */,
            onsuspend: 2 /* Event */,
            ontimeupdate: 2 /* Event */,
            onvolumechange: 2 /* Event */,
            onwaiting: 2 /* Event */,
        };
    })(virtualdom = phosphor.virtualdom || (phosphor.virtualdom = {}));
})(phosphor || (phosphor = {})); // module phosphor.virtualdom

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var components;
    (function (components) {
        var emptyArray = phosphor.core.emptyArray;
        var emptyObject = phosphor.core.emptyObject;
        /**
         * A concrete base implementation of IComponent.
         *
         * This class should be used by subclasses that want to manage their
         * own DOM content outside the virtual DOM, but still be embeddable
         * inside a virtual DOM hierarchy.
         */
        var BaseComponent = (function () {
            /**
             * Construct a new base component.
             */
            function BaseComponent() {
                this._data = emptyObject;
                this._children = emptyArray;
                var ctor = this.constructor;
                this._node = document.createElement(ctor.tagName);
                this._node.className = ctor.className;
            }
            /**
             * Dispose of the resources held by the component.
             */
            BaseComponent.prototype.dispose = function () {
                this._node = null;
                this._data = null;
                this._children = null;
            };
            Object.defineProperty(BaseComponent.prototype, "node", {
                /**
                 * Get the DOM node for the component.
                 */
                get: function () {
                    return this._node;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseComponent.prototype, "data", {
                /**
                 * Get the current data object for the component.
                 */
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseComponent.prototype, "children", {
                /**
                 * Get the current children for the component.
                 */
                get: function () {
                    return this._children;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Initialize the component with new data and children.
             *
             * This is called whenever the component is rendered by its parent.
             */
            BaseComponent.prototype.init = function (data, children) {
                this._data = data;
                this._children = children;
            };
            /**
             * The tag name used to create the component's DOM node.
             *
             * A subclass may redefine this property.
             */
            BaseComponent.tagName = 'div';
            /**
             * The initial class name for the component's DOM node.
             *
             * A subclass may redefine this property.
             */
            BaseComponent.className = '';
            return BaseComponent;
        })();
        components.BaseComponent = BaseComponent;
    })(components = phosphor.components || (phosphor.components = {}));
})(phosphor || (phosphor = {})); // module phosphor.components

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
var phosphor;
(function (phosphor) {
    var components;
    (function (components) {
        var emptyObject = phosphor.core.emptyObject;
        var render = phosphor.virtualdom.render;
        // cache frequently used globals
        var raf = requestAnimationFrame;
        var caf = cancelAnimationFrame;
        /**
         * A concrete implementation of IComponent with virtual DOM rendering.
         *
         * User code should subclass this class to create a custom component.
         * The subclasses should reimplement the `render` method to generate
         * the virtual DOM content for the component.
         */
        var Component = (function (_super) {
            __extends(Component, _super);
            function Component() {
                _super.apply(this, arguments);
                this._frameId = 0;
                this._refs = emptyObject;
            }
            /**
             * Dispose of the resources held by the component.
             */
            Component.prototype.dispose = function () {
                this._refs = null;
                this._cancelFrame();
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(Component.prototype, "refs", {
                /**
                 * Get the refs mapping for the component.
                 *
                 * This is an object which maps a ref name to the corresponding node
                 * or component instance created for the most recent rendering pass.
                 */
                get: function () {
                    return this._refs;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Initialize the component with new data and children.
             *
             * This is called whenever the component is rendered by its parent.
             *
             * The method will normally not be reimplemented by a subclass.
             */
            Component.prototype.init = function (data, children) {
                var update = this.shouldUpdate(data, children);
                _super.prototype.init.call(this, data, children);
                if (update)
                    this.update(true);
            };
            /**
             * Create the virtual content for the component.
             *
             * The rendered content is used to populate the component's node.
             *
             * This should be reimplemented by a subclass.
             */
            Component.prototype.render = function () {
                return null;
            };
            /**
             * Schedule a rendering update for the component.
             *
             * This should be called whenever the internal state of the component
             * has changed such that it requires the component to be re-rendered,
             * or when external code requires the component to be refreshed.
             *
             * If the 'immediate' flag is false (the default) the update will be
             * scheduled for the next cycle of the event loop. If the flag is set
             * to true, the component will be updated immediately.
             *
             * Multiple pending requests are collapsed into a single update.
             */
            Component.prototype.update = function (immediate) {
                var _this = this;
                if (immediate === void 0) { immediate = false; }
                if (immediate) {
                    this._cancelFrame();
                    this._render();
                }
                else if (this._frameId === 0) {
                    this._frameId = raf(function () {
                        _this._frameId = 0;
                        _this._render();
                    });
                }
            };
            /**
             * A method invoked immediately before the component is rendered.
             *
             * The default implementation is a no-op.
             */
            Component.prototype.beforeRender = function () {
            };
            /**
             * A method invoked immediately after the component is rendered.
             *
             * The default implementation is a no-op.
             */
            Component.prototype.afterRender = function () {
            };
            /**
             * Test whether the component should be updated.
             *
             * This method is invoked when the component is initialized with new
             * data and children. It should return true if the component should
             * be updated, or false if the values do not cause a visual change.
             *
             * Determining whether a component should update is error prone and
             * can be just as expensive as performing the virtual DOM diff, so
             * this should only be reimplemented if performance is a problem.
             *
             * The default implementation of this method always returns true.
             */
            Component.prototype.shouldUpdate = function (data, children) {
                return true;
            };
            /**
             * Perform an immediate rendering of the component.
             */
            Component.prototype._render = function () {
                this.beforeRender();
                this._refs = render(this.render(), this.node);
                this.afterRender();
            };
            /**
             * Clear the pending animation frame.
             */
            Component.prototype._cancelFrame = function () {
                if (this._frameId !== 0) {
                    caf(this._frameId);
                    this._frameId = 0;
                }
            };
            return Component;
        })(components.BaseComponent);
        components.Component = Component;
    })(components = phosphor.components || (phosphor.components = {}));
})(phosphor || (phosphor = {})); // module phosphor.components

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
var phosphor;
(function (phosphor) {
    var components;
    (function (components) {
        var createFactory = phosphor.virtualdom.createFactory;
        /**
         * A component which hosts a CodeMirror editor.
         */
        var CodeMirrorComponent = (function (_super) {
            __extends(CodeMirrorComponent, _super);
            function CodeMirrorComponent() {
                _super.apply(this, arguments);
                this._editor = null;
            }
            /**
             * Dispose of the resources held by the component.
             */
            CodeMirrorComponent.prototype.dispose = function () {
                this._editor = null;
                _super.prototype.dispose.call(this);
            };
            /**
             * Initialize the component with new data and children.
             */
            CodeMirrorComponent.prototype.init = function (data, children) {
                _super.prototype.init.call(this, data, children);
                if (this._editor === null) {
                    this._editor = this.createEditor();
                }
            };
            Object.defineProperty(CodeMirrorComponent.prototype, "editor", {
                /**
                 * Get the code mirror editor for the component.
                 *
                 * This component does not attempt to wrap the extensive code mirror
                 * api. User code should interact with the editor object directly.
                 */
                get: function () {
                    return this._editor;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Create the editor for the component.
             *
             * This can be reimplemented by subclasses which require custom
             * creation of the editor instance. The default implementation
             * assumes `CodeMirror` is available in the global scope.
             */
            CodeMirrorComponent.prototype.createEditor = function () {
                return CodeMirror(this.node, this.data.config);
            };
            /**
             * The default class name for a code mirror component.
             */
            CodeMirrorComponent.className = 'p-CodeMirrorComponent';
            return CodeMirrorComponent;
        })(components.BaseComponent);
        components.CodeMirrorComponent = CodeMirrorComponent;
        /**
         * The default virtual element factory for the CodeMirrorComponent.
         */
        components.CodeMirrorFactory = createFactory(CodeMirrorComponent);
    })(components = phosphor.components || (phosphor.components = {}));
})(phosphor || (phosphor = {})); // module phosphor.components

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * An enum of alignment bit flags.
         */
        (function (Alignment) {
            /**
             * Align with the left edge.
             */
            Alignment[Alignment["Left"] = 0x1] = "Left";
            /**
             * Align with the right edge.
             */
            Alignment[Alignment["Right"] = 0x2] = "Right";
            /**
             * Align with the horizontal center.
             */
            Alignment[Alignment["HorizontalCenter"] = 0x4] = "HorizontalCenter";
            /**
             * Align with the top edge.
             */
            Alignment[Alignment["Top"] = 0x10] = "Top";
            /**
             * Align with the bottom edge.
             */
            Alignment[Alignment["Bottom"] = 0x20] = "Bottom";
            /**
             * Align with the vertical center.
             */
            Alignment[Alignment["VerticalCenter"] = 0x40] = "VerticalCenter";
            /**
             * Align with the horizontal and vertical center.
             */
            Alignment[Alignment["Center"] = Alignment.HorizontalCenter | Alignment.VerticalCenter] = "Center";
            /**
             * A mask of horizontal alignment values.
             */
            Alignment[Alignment["Horizontal_Mask"] = Alignment.Left | Alignment.Right | Alignment.HorizontalCenter] = "Horizontal_Mask";
            /**
             * A mask of vertical alignment values.
             */
            Alignment[Alignment["Vertical_Mask"] = Alignment.Top | Alignment.Bottom | Alignment.VerticalCenter] = "Vertical_Mask";
        })(panels.Alignment || (panels.Alignment = {}));
        var Alignment = panels.Alignment;
        /**
         * An enum of direction values.
         */
        (function (Direction) {
            /**
             * Left to right direction.
             */
            Direction[Direction["LeftToRight"] = 0] = "LeftToRight";
            /**
             * Right to left direction.
             */
            Direction[Direction["RightToLeft"] = 1] = "RightToLeft";
            /**
             * Top to bottom direction.
             */
            Direction[Direction["TopToBottom"] = 2] = "TopToBottom";
            /**
             * Bottom to top direction.
             */
            Direction[Direction["BottomToTop"] = 3] = "BottomToTop";
        })(panels.Direction || (panels.Direction = {}));
        var Direction = panels.Direction;
        /**
         * The available docking modes for a dock area.
         */
        (function (DockMode) {
            /**
             * Insert the panel at the top of the dock area.
             */
            DockMode[DockMode["Top"] = 0] = "Top";
            /**
             * Insert the panel at the left of the dock area.
             */
            DockMode[DockMode["Left"] = 1] = "Left";
            /**
             * Insert the panel at the right of the dock area.
             */
            DockMode[DockMode["Right"] = 2] = "Right";
            /**
             * Insert the panel at the bottom of the dock area.
             */
            DockMode[DockMode["Bottom"] = 3] = "Bottom";
            /**
             * Insert the panel as a new split item above the reference.
             */
            DockMode[DockMode["SplitTop"] = 4] = "SplitTop";
            /**
             * Insert the panel as a new split item to the left of the reference.
             */
            DockMode[DockMode["SplitLeft"] = 5] = "SplitLeft";
            /**
             * Insert the panel as a new split item to the right of the reference.
             */
            DockMode[DockMode["SplitRight"] = 6] = "SplitRight";
            /**
             * Insert the panel as a new split item below the reference.
             */
            DockMode[DockMode["SplitBottom"] = 7] = "SplitBottom";
            /**
             * Insert the panel as a new tab before the reference.
             */
            DockMode[DockMode["TabBefore"] = 8] = "TabBefore";
            /**
             * Insert the panel as a new tab after the reference.
             */
            DockMode[DockMode["TabAfter"] = 9] = "TabAfter";
        })(panels.DockMode || (panels.DockMode = {}));
        var DockMode = panels.DockMode;
        /**
         * An enum of orientation values.
         */
        (function (Orientation) {
            /**
             * Horizontal orientation.
             */
            Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
            /**
             * Vertical orientation.
             */
            Orientation[Orientation["Vertical"] = 1] = "Vertical";
        })(panels.Orientation || (panels.Orientation = {}));
        var Orientation = panels.Orientation;
        /**
         * An enum of panel bit flags.
         *
         * Panel flags are used to control various low-level behaviors of
         * a panel. They are typcially not used directly by user code.
         */
        (function (PanelFlag) {
            /**
             * The panel is attached to the DOM.
             */
            PanelFlag[PanelFlag["IsAttached"] = 0x1] = "IsAttached";
            /**
             * The panel is explicitly hidden.
             */
            PanelFlag[PanelFlag["IsHidden"] = 0x2] = "IsHidden";
            /**
             * The panel is visible.
             */
            PanelFlag[PanelFlag["IsVisible"] = 0x4] = "IsVisible";
            /**
             * The panel has been disposed.
             */
            PanelFlag[PanelFlag["IsDisposed"] = 0x8] = "IsDisposed";
            /**
             * Changing the panel layout is disallowed.
             */
            PanelFlag[PanelFlag["DisallowLayoutChange"] = 0x10] = "DisallowLayoutChange";
        })(panels.PanelFlag || (panels.PanelFlag = {}));
        var PanelFlag = panels.PanelFlag;
        /**
         * An enum of size policy values.
         *
         * A size policy controls how a layout interprets a panel's `sizeHint`.
         */
        (function (SizePolicy) {
            /**
             * A policy indicating that the `sizeHint` is the only acceptable
             * size for the panel.
             */
            SizePolicy[SizePolicy["Fixed"] = 0] = "Fixed";
            /**
             * A bit flag indicating the panel can grow beyond `sizeHint`.
             */
            SizePolicy[SizePolicy["GrowFlag"] = 0x1] = "GrowFlag";
            /**
             * A bit flag indicating the panel can shrink below `sizeHint`.
             */
            SizePolicy[SizePolicy["ShrinkFlag"] = 0x2] = "ShrinkFlag";
            /**
             * A bit flag indicating the panel should expand beyond `sizeHint`.
             */
            SizePolicy[SizePolicy["ExpandFlag"] = 0x4] = "ExpandFlag";
            /**
             * A bit flag indicating the `sizeHint` is ignored.
             */
            SizePolicy[SizePolicy["IgnoreFlag"] = 0x8] = "IgnoreFlag";
            /**
             * A policy indicating that the `sizeHint` is a minimum, but the
             * panel can be expanded if needed and still be useful.
             */
            SizePolicy[SizePolicy["Minimum"] = SizePolicy.GrowFlag] = "Minimum";
            /**
             * A policy indicating that the `sizeHint` is a maximum, but the
             * panel can be shrunk if needed and still be useful.
             */
            SizePolicy[SizePolicy["Maximum"] = SizePolicy.ShrinkFlag] = "Maximum";
            /**
             * A policy indicating that the `sizeHint` is preferred, but the
             * panel can grow or shrink if needed and still be useful.
             *
             * This is the default size policy.
             */
            SizePolicy[SizePolicy["Preferred"] = SizePolicy.GrowFlag | SizePolicy.ShrinkFlag] = "Preferred";
            /**
             * A policy indicating that `sizeHint` is reasonable, but the panel
             * can shrink if needed and still be useful. It can also make use of
             * extra space and should expand as much as possible.
             */
            SizePolicy[SizePolicy["Expanding"] = SizePolicy.GrowFlag | SizePolicy.ShrinkFlag | SizePolicy.ExpandFlag] = "Expanding";
            /**
             * A policy indicating that `sizeHint` is a minimum. The panel can
             * make use of extra space and should expand as much as possible.
             */
            SizePolicy[SizePolicy["MinimumExpanding"] = SizePolicy.GrowFlag | SizePolicy.ExpandFlag] = "MinimumExpanding";
            /**
             * A policy indicating the `sizeHint` is ignored.
             */
            SizePolicy[SizePolicy["Ignored"] = SizePolicy.GrowFlag | SizePolicy.ShrinkFlag | SizePolicy.IgnoreFlag] = "Ignored";
        })(panels.SizePolicy || (panels.SizePolicy = {}));
        var SizePolicy = panels.SizePolicy;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * The position of a two dimensional object.
         */
        var Point = (function () {
            /**
             * Construct a new point.
             */
            function Point(x, y) {
                this._x = x;
                this._y = y;
            }
            Object.defineProperty(Point.prototype, "x", {
                /**
                 * The X coordinate of the point.
                 */
                get: function () {
                    return this._x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Point.prototype, "y", {
                /**
                 * The Y coordinate of the point.
                 */
                get: function () {
                    return this._y;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Test whether the point is equivalent to another.
             */
            Point.prototype.equals = function (other) {
                return this._x === other._x && this._y === other._y;
            };
            return Point;
        })();
        panels.Point = Point;
        /**
         * The size of a 2-dimensional object.
         */
        var Size = (function () {
            /**
             * Construct a new size.
             */
            function Size(width, height) {
                this._width = width;
                this._height = height;
            }
            Object.defineProperty(Size.prototype, "width", {
                /**
                 * The width of the size.
                 */
                get: function () {
                    return this._width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Size.prototype, "height", {
                /**
                 * The height of the size.
                 */
                get: function () {
                    return this._height;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Test whether the size is equivalent to another.
             */
            Size.prototype.equals = function (other) {
                return this._width === other._width && this._height === other._height;
            };
            return Size;
        })();
        panels.Size = Size;
        /**
         * The position and size of a 2-dimensional object.
         */
        var Rect = (function () {
            /**
             * Construct a new rect.
             */
            function Rect(x, y, width, height) {
                this._x = x;
                this._y = y;
                this._width = width;
                this._height = height;
            }
            Object.defineProperty(Rect.prototype, "x", {
                /**
                 * The X coordinate of the rect.
                 *
                 * This is equivalent to `left`.
                 */
                get: function () {
                    return this._x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "y", {
                /**
                 * The Y coordinate of the rect.
                 *
                 * This is equivalent to `top`.
                 */
                get: function () {
                    return this._y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "width", {
                /**
                 * The width of the rect.
                 */
                get: function () {
                    return this._width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "height", {
                /**
                 * The height of the rect.
                 */
                get: function () {
                    return this._height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "pos", {
                /**
                 * The position of the rect.
                 *
                 * This is equivalent to `topLeft`.
                 */
                get: function () {
                    return new Point(this._x, this._y);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "size", {
                /**
                 * The size of the rect.
                 */
                get: function () {
                    return new Size(this._width, this._height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "top", {
                /**
                 * The top edge of the rect.
                 *
                 * This is equivalent to `y`.
                 */
                get: function () {
                    return this._y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "left", {
                /**
                 * The left edge of the rect.
                 *
                 * This is equivalent to `x`.
                 */
                get: function () {
                    return this._x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "right", {
                /**
                 * The right edge of the rect.
                 *
                 * This is equivalent to `x + width`.
                 */
                get: function () {
                    return this._x + this._width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "bottom", {
                /**
                 * The bottom edge of the rect.
                 *
                 * This is equivalent to `y + height`.
                 */
                get: function () {
                    return this._y + this._height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "topLeft", {
                /**
                 * The position of the top left corner of the rect.
                 *
                 * This is equivalent to `pos`.
                 */
                get: function () {
                    return new Point(this._x, this._y);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "topRight", {
                /**
                 * The position of the top right corner of the rect.
                 */
                get: function () {
                    return new Point(this._x + this._width, this._y);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "bottomLeft", {
                /**
                 * The position bottom left corner of the rect.
                 */
                get: function () {
                    return new Point(this._x, this._y + this._height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "bottomRight", {
                /**
                 * The position bottom right corner of the rect.
                 */
                get: function () {
                    return new Point(this._x + this._width, this._y + this._height);
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Test whether the rect is equivalent to another.
             */
            Rect.prototype.equals = function (other) {
                return (this._x === other._x && this._y === other._y && this._width === other._width && this._height === other._height);
            };
            return Rect;
        })();
        panels.Rect = Rect;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels







/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var dispatch = phosphor.core.dispatch;
        var Message = phosphor.core.Message;
        /**
         * The base class of phosphor layouts.
         *
         * The Layout class does not define an interface for adding panels to
         * the layout. A subclass should define that API in a manner suitable
         * for its intended use.
         */
        var Layout = (function () {
            /**
             * Construct a new layout.
             */
            function Layout() {
                this._parent = null;
            }
            /**
             * Dispose of the resources held by the layout.
             */
            Layout.prototype.dispose = function () {
                this._parent = null;
            };
            Object.defineProperty(Layout.prototype, "parent", {
                /**
                 * Get the parent panel of the layout.
                 */
                get: function () {
                    return this._parent;
                },
                /**
                 * Set the parent panel of the layout.
                 *
                 * The parent panel can only be set once, and is done automatically
                 * when the layout is installed on a panel. This should not be set
                 * directly by user code.
                 */
                set: function (parent) {
                    if (!parent) {
                        throw new Error('cannot set parent panel to null');
                    }
                    if (parent === this._parent) {
                        return;
                    }
                    if (this._parent) {
                        throw new Error('layout already installed on a panel');
                    }
                    this._parent = parent;
                    this.reparentChildPanels();
                    this.invalidate();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Layout.prototype, "count", {
                /**
                 * Get the number of layout items in the layout.
                 *
                 * This must be implemented by a subclass.
                 */
                get: function () {
                    throw new Error('not implemented');
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the layout item at the given index.
             *
             * This must be implemented by a subclass.
             */
            Layout.prototype.itemAt = function (index) {
                throw new Error('not implemented');
            };
            /**
             * Remove and return the layout item at the given index.
             *
             * This must be implemented by a subclass.
             */
            Layout.prototype.takeAt = function (index) {
                throw new Error('not implemented');
            };
            /**
             * Compute the preferred size of the layout.
             *
             * This must be implemented by a subclass.
             */
            Layout.prototype.sizeHint = function () {
                throw new Error('not implemented');
            };
            /**
             * Compute the minimum required size for the layout.
             *
             * This must be implemented by a subclass.
             */
            Layout.prototype.minSize = function () {
                throw new Error('not implemented');
            };
            /**
             * Compute the maximum allowed size for the layout.
             *
             * This must be implemented by a subclass.
             */
            Layout.prototype.maxSize = function () {
                throw new Error('not implemented');
            };
            /**
             * Get the panel at the given index.
             *
             * Returns `undefined` if there is no panel at the given index.
             */
            Layout.prototype.panelAt = function (index) {
                var item = this.itemAt(index);
                return (item && item.panel) || void 0;
            };
            /**
             * Get the index of the given panel or layout item.
             *
             * Returns -1 if the panel or item does not exist in the layout.
             */
            Layout.prototype.indexOf = function (value) {
                for (var i = 0, n = this.count; i < n; ++i) {
                    var item = this.itemAt(i);
                    if (item === value || item.panel === value) {
                        return i;
                    }
                }
                return -1;
            };
            /**
             * Remove the given panel or layout item from the layout.
             */
            Layout.prototype.remove = function (value) {
                var i = this.indexOf(value);
                if (i !== -1)
                    this.takeAt(i);
            };
            /**
             * Invalidate the cached layout data and enqueue an update.
             *
             * This should be reimplemented by a subclass as needed.
             */
            Layout.prototype.invalidate = function () {
                var parent = this._parent;
                if (parent) {
                    dispatch.postMessage(parent, new Message('layout-request'));
                    parent.updateGeometry();
                }
            };
            /**
             * Filter a message sent to a message handler.
             */
            Layout.prototype.filterMessage = function (handler, msg) {
                if (handler === this._parent) {
                    this.processPanelMessage(msg);
                }
                return false;
            };
            /**
             * Process a message dispatched to the parent panel.
             *
             * Subclasses may reimplement this method as needed.
             */
            Layout.prototype.processPanelMessage = function (msg) {
                switch (msg.type) {
                    case 'resize':
                    case 'layout-request':
                        if (this._parent.isVisible) {
                            this.layout();
                        }
                        break;
                    case 'child-removed':
                        this.remove(msg.child);
                        break;
                    case 'before-attach':
                        this.invalidate();
                        break;
                    default:
                        break;
                }
            };
            /**
             * Ensure a child panel is parented to the layout parent.
             *
             * This should be called by a subclass when adding a panel.
             */
            Layout.prototype.ensureParent = function (panel) {
                var parent = this._parent;
                if (parent)
                    panel.parent = parent;
            };
            /**
             * Reparent the child panels to the current layout parent.
             *
             * This is typically called automatically at the proper times.
             */
            Layout.prototype.reparentChildPanels = function () {
                var parent = this.parent;
                if (!parent) {
                    return;
                }
                for (var i = 0, n = this.count; i < n; ++i) {
                    var panel = this.itemAt(i).panel;
                    if (panel)
                        panel.parent = parent;
                }
            };
            /**
             * A method invoked on parent 'resize' and 'layout-request' messages.
             *
             * Subclasses should reimplement this method to update the layout.
             *
             * The default implementation is a no-op.
             */
            Layout.prototype.layout = function () {
            };
            return Layout;
        })();
        panels.Layout = Layout;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * A sizer object for the `layoutCalc` function.
         *
         * Instances of this class are used internally by the panel layouts
         * to implement their layout logic. User code will not typically use
         * this class directly.
         */
        var LayoutSizer = (function () {
            function LayoutSizer() {
                /**
                 * The preferred size of the sizer.
                 */
                this.sizeHint = 0;
                /**
                 * The minimum size of the sizer.
                 *
                 * The sizer will never sized less than this value.
                 *
                 * Limits: [0, Infinity) && <= maxSize
                 */
                this.minSize = 0;
                /**
                 * The maximum size of the sizer.
                 *
                 * The sizer will never be sized greater than this value.
                 *
                 * Limits: [0, Infinity] && >= minSize
                 */
                this.maxSize = Infinity;
                /**
                 * The stretch factor for the sizer.
                 *
                 * This controls how much the sizer stretches relative to the other
                 * sizers when layout space is distributed. A sizer with a stretch
                 * factor of zero will only be resized after all stretch sizers
                 * and expansive sizers have been sized to their limits.
                 *
                 * Limits: [0, Infinity)
                 */
                this.stretch = 1;
                /**
                 * Whether the sizer should consume extra space if available.
                 *
                 * Expansive sizers will absorb any remaining space after all
                 * stretch sizers have been resized to their limits.
                 */
                this.expansive = false;
                /**
                 * The computed size of the sizer.
                 *
                 * This value is the output of the algorithm.
                 */
                this.size = 0;
                /**
                 * An internal storage property for the layout algorithm.
                 */
                this.done = false;
            }
            return LayoutSizer;
        })();
        panels.LayoutSizer = LayoutSizer;
        /**
         * Distribute space among the given sizers.
         *
         * This distributes the given layout spacing among the sizers
         * according the following algorithm:
         *
         *   1) Initialize the sizers's size to its size hint and compute
         *      the sums for each of size hint, min size, and max size.
         *
         *   2) If the total size hint equals the layout space, return.
         *
         *   3) If the layout space is less than the total min size,
         *      set all sizers to their min size and return.
         *
         *   4) If the layout space is greater than the total max size,
         *      set all sizers to their max size and return.
         *
         *   5) If the layout space is less than the total size hint,
         *      distribute the negative delta as follows:
         *
         *     a) Shrink each sizer with a stretch factor greater than
         *        zero by an amount proportional to the sum of stretch
         *        factors and negative space. If the sizer reaches its
         *        minimum size, remove it and its stretch factor from
         *        the computation.
         *
         *     b) If after adjusting all stretch sizers there remains
         *        negative space, distribute it equally among sizers
         *        with a stretch factor of zero. If a sizer reaches
         *        its minimum size, remove it from the computation.
         *
         *   6) If the layout space is greater than the total size hint,
         *      distribute the positive delta as follows:
         *
         *     a) Expand each sizer with a stretch factor greater than
         *        zero by an amount proportional to the sum of stretch
         *        factors and positive space. If the sizer reaches its
         *        maximum size, remove it and its stretch factor from
         *        the computation.
         *
         *     b) If after adjusting all stretch sizers there remains
         *        positive space, distribute it equally among sizers
         *        with the `expansive` flag set. If a sizer reaches
         *        its maximum size, remove it from the computation.
         *
         *     c) If after adjusting all stretch and expansive sizers
         *        there remains positive space, distribute it equally
         *        among sizers with a stretch factor of zero. If a sizer
         *        reaches its maximum size, remove it from the computation.
         */
        function layoutCalc(sizers, space) {
            var count = sizers.length;
            if (count === 0) {
                return;
            }
            // Setup the counters.
            var totalMin = 0;
            var totalMax = 0;
            var totalSize = 0;
            var totalStretch = 0;
            var stretchCount = 0;
            var expansiveCount = 0;
            for (var i = 0; i < count; ++i) {
                var sizer = sizers[i];
                var minSize = sizer.minSize;
                var maxSize = sizer.maxSize;
                var sizeHint = sizer.sizeHint;
                var size = Math.max(minSize, Math.min(sizeHint, maxSize));
                sizer.done = false;
                sizer.size = size;
                totalSize += size;
                totalMin += minSize;
                totalMax += maxSize;
                if (sizer.stretch > 0) {
                    totalStretch += sizer.stretch;
                    stretchCount++;
                }
                if (sizer.expansive) {
                    expansiveCount++;
                }
            }
            // 1) If the space is equal to the total size, return.
            if (space === totalSize) {
                return;
            }
            // 2) If the space is less than the total min, minimize each sizer.
            if (space <= totalMin) {
                for (var i = 0; i < count; ++i) {
                    var sizer = sizers[i];
                    sizer.size = sizer.minSize;
                }
                return;
            }
            // 3) If the space is greater than the total max, maximize each sizer.
            if (space >= totalMax) {
                for (var i = 0; i < count; ++i) {
                    var sizer = sizers[i];
                    sizer.size = sizer.maxSize;
                }
                return;
            }
            // The loops below perform sub-pixel precision sizing. A near zero
            // value is used for compares instead of zero to ensure that the
            // loop terminates when the subdivided space is reasonably small.
            var nearZero = 0.01;
            // A counter which decreaes monotonically each time an sizer is
            // resized to its limit. This ensure the loops terminate even
            // if there is space remaining to distribute.
            var notDoneCount = count;
            // 5) Distribute negative delta space.
            if (space < totalSize) {
                // 5a) Shrink each stretch sizer by an amount proportional to its
                // stretch factor. If it reaches its limit it's marked as done.
                // The loop progresses in phases where each sizer gets a chance to
                // consume its fair share for the phase, regardless of whether an
                // sizer before it reached its limit. This continues until the
                // stretch sizers or the free space is exhausted.
                var freeSpace = totalSize - space;
                while (stretchCount > 0 && freeSpace > nearZero) {
                    var distSpace = freeSpace;
                    var distStretch = totalStretch;
                    for (var i = 0; i < count; ++i) {
                        var sizer = sizers[i];
                        if (sizer.done || sizer.stretch === 0) {
                            continue;
                        }
                        var amt = sizer.stretch * distSpace / distStretch;
                        if (sizer.size - amt <= sizer.minSize) {
                            freeSpace -= sizer.size - sizer.minSize;
                            totalStretch -= sizer.stretch;
                            sizer.size = sizer.minSize;
                            sizer.done = true;
                            notDoneCount--;
                            stretchCount--;
                        }
                        else {
                            freeSpace -= amt;
                            sizer.size -= amt;
                        }
                    }
                }
                while (notDoneCount > 0 && freeSpace > nearZero) {
                    var amt = freeSpace / notDoneCount;
                    for (var i = 0; i < count; ++i) {
                        var sizer = sizers[i];
                        if (sizer.done) {
                            continue;
                        }
                        if (sizer.size - amt <= sizer.minSize) {
                            freeSpace -= sizer.size - sizer.minSize;
                            sizer.size = sizer.minSize;
                            sizer.done = true;
                            notDoneCount--;
                        }
                        else {
                            freeSpace -= amt;
                            sizer.size -= amt;
                        }
                    }
                }
            }
            else {
                // 6a) Expand each stretch sizer by an amount proportional to its
                // stretch factor. If it reaches its limit it's marked as done.
                // The loop progresses in phases where each sizer gets a chance to
                // consume its fair share for the phase, regardless of whether an
                // sizer before it reached its limit. This continues until the
                // stretch sizers or the free space is exhausted.
                var freeSpace = space - totalSize;
                while (stretchCount > 0 && freeSpace > nearZero) {
                    var distSpace = freeSpace;
                    var distStretch = totalStretch;
                    for (var i = 0; i < count; ++i) {
                        var sizer = sizers[i];
                        if (sizer.done || sizer.stretch === 0) {
                            continue;
                        }
                        var amt = sizer.stretch * distSpace / distStretch;
                        if (sizer.size + amt >= sizer.maxSize) {
                            freeSpace -= sizer.maxSize - sizer.size;
                            totalStretch -= sizer.stretch;
                            sizer.size = sizer.maxSize;
                            sizer.done = true;
                            notDoneCount--;
                            stretchCount--;
                            if (sizer.expansive) {
                                expansiveCount--;
                            }
                        }
                        else {
                            freeSpace -= amt;
                            sizer.size += amt;
                        }
                    }
                }
                while (expansiveCount > 0 && freeSpace > nearZero) {
                    var amt = freeSpace / expansiveCount;
                    for (var i = 0; i < count; ++i) {
                        var sizer = sizers[i];
                        if (sizer.done || !sizer.expansive) {
                            continue;
                        }
                        if (sizer.size + amt >= sizer.maxSize) {
                            freeSpace -= sizer.maxSize - sizer.size;
                            sizer.size = sizer.maxSize;
                            sizer.done = true;
                            expansiveCount--;
                            notDoneCount--;
                        }
                        else {
                            freeSpace -= amt;
                            sizer.size += amt;
                        }
                    }
                }
                while (notDoneCount > 0 && freeSpace > nearZero) {
                    var amt = freeSpace / notDoneCount;
                    for (var i = 0; i < count; ++i) {
                        var sizer = sizers[i];
                        if (sizer.done) {
                            continue;
                        }
                        if (sizer.size + amt >= sizer.maxSize) {
                            freeSpace -= sizer.maxSize - sizer.size;
                            sizer.size = sizer.maxSize;
                            sizer.done = true;
                            notDoneCount--;
                        }
                        else {
                            freeSpace -= amt;
                            sizer.size += amt;
                        }
                    }
                }
            }
        }
        panels.layoutCalc = layoutCalc;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var Message = phosphor.core.Message;
        /**
         * A message class for child panel related messages.
         */
        var ChildMessage = (function (_super) {
            __extends(ChildMessage, _super);
            /**
             * Construct a new child message.
             */
            function ChildMessage(type, child) {
                _super.call(this, type);
                this._child = child;
            }
            Object.defineProperty(ChildMessage.prototype, "child", {
                /**
                 * The child panel for the message.
                 */
                get: function () {
                    return this._child;
                },
                enumerable: true,
                configurable: true
            });
            return ChildMessage;
        })(Message);
        panels.ChildMessage = ChildMessage;
        /**
         * A message class for 'move' messages.
         */
        var MoveMessage = (function (_super) {
            __extends(MoveMessage, _super);
            /**
             * Construct a new move message.
             */
            function MoveMessage(oldX, oldY, x, y) {
                _super.call(this, 'move');
                this._oldX = oldX;
                this._oldY = oldY;
                this._x = x;
                this._y = y;
            }
            Object.defineProperty(MoveMessage.prototype, "oldX", {
                /**
                 * The previous X coordinate of the panel.
                 */
                get: function () {
                    return this._oldX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MoveMessage.prototype, "oldY", {
                /**
                 * The previous Y coordinate of the panel.
                 */
                get: function () {
                    return this._oldY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MoveMessage.prototype, "x", {
                /**
                 * The current X coordinate of the panel.
                 */
                get: function () {
                    return this._x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MoveMessage.prototype, "y", {
                /**
                 * The current Y coordinate of the panel.
                 */
                get: function () {
                    return this._y;
                },
                enumerable: true,
                configurable: true
            });
            return MoveMessage;
        })(Message);
        panels.MoveMessage = MoveMessage;
        /**
         * A message class for 'resize' messages.
         */
        var ResizeMessage = (function (_super) {
            __extends(ResizeMessage, _super);
            /**
             * Construct a new resize message.
             */
            function ResizeMessage(oldWidth, oldHeight, width, height) {
                _super.call(this, 'resize');
                this._oldWidth = oldWidth;
                this._oldHeight = oldHeight;
                this._width = width;
                this._height = height;
            }
            Object.defineProperty(ResizeMessage.prototype, "oldWidth", {
                /**
                 * The previous width of the panel.
                 */
                get: function () {
                    return this._oldWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResizeMessage.prototype, "oldHeight", {
                /**
                 * The previous height of the panel.
                 */
                get: function () {
                    return this._oldHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResizeMessage.prototype, "width", {
                /**
                 * The current width of the panel.
                 */
                get: function () {
                    return this._width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ResizeMessage.prototype, "height", {
                /**
                 * The current height of the panel.
                 */
                get: function () {
                    return this._height;
                },
                enumerable: true,
                configurable: true
            });
            return ResizeMessage;
        })(Message);
        panels.ResizeMessage = ResizeMessage;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var some = phosphor.collections.some;
        var List = phosphor.collections.List;
        var ReadOnlyList = phosphor.collections.ReadOnlyList;
        var Message = phosphor.core.Message;
        var Signal = phosphor.core.Signal;
        var dispatch = phosphor.core.dispatch;
        var createBoxData = phosphor.domutil.createBoxData;
        /**
         * The class name added to Panel instances.
         */
        var PANEL_CLASS = 'p-Panel';
        /**
         * The class name added to hidden panels.
         */
        var HIDDEN_CLASS = 'p-mod-hidden';
        /**
         * The base class of the Phosphor panel hierarchy.
         *
         * A panel wraps an absolutely positioned DOM node. It can be used with
         * a Phosphor layout manager to layout its child panels, or it can also
         * be used to host any other leaf DOM content.
         */
        var Panel = (function () {
            /**
             * Construct a new panel.
             */
            function Panel() {
                /**
                 * A signal emitted when the panel is disposed.
                 */
                this.disposed = new Signal();
                this._flags = 0;
                this._parent = null;
                this._layout = null;
                this._children = new List();
                this._x = 0;
                this._y = 0;
                this._width = 0;
                this._height = 0;
                this._minWidth = 0;
                this._minHeight = 0;
                this._maxWidth = Infinity;
                this._maxHeight = Infinity;
                this._boxData = null;
                this._stretch = 0;
                this._alignment = 0;
                this._sizePolicy = defaultPolicy;
                this._node = this.createNode();
                this._node.classList.add(PANEL_CLASS);
            }
            /**
             * Dispose of the panel and its descendants.
             */
            Panel.prototype.dispose = function () {
                dispatch.clearMessageData(this);
                this.setFlag(8 /* IsDisposed */);
                this.disposed.emit(this, void 0);
                this.disposed.disconnect();
                var parent = this._parent;
                if (parent) {
                    this._parent = null;
                    parent._children.remove(this);
                    dispatch.sendMessage(parent, new panels.ChildMessage('child-removed', this));
                }
                else if (this.isAttached) {
                    this.detach();
                }
                var layout = this._layout;
                if (layout) {
                    this._layout = null;
                    layout.dispose();
                }
                var children = this._children;
                for (var i = 0, n = children.size; i < n; ++i) {
                    var child = children.get(i);
                    children.set(i, null);
                    child._parent = null;
                    child.dispose();
                }
                children.clear();
                this._node = null;
            };
            Object.defineProperty(Panel.prototype, "node", {
                /**
                 * Get the DOM node managed by the panel.
                 */
                get: function () {
                    return this._node;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "x", {
                /**
                 * Get the X position of the panel.
                 */
                get: function () {
                    return this._x;
                },
                /**
                 * Set the X position of the panel.
                 */
                set: function (x) {
                    this.move(x, this._y);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "y", {
                /**
                 * Get the Y position of the panel.
                 */
                get: function () {
                    return this._y;
                },
                /**
                 * Set the Y position of the panel.
                 */
                set: function (y) {
                    this.move(this._x, y);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "width", {
                /**
                 * Get the width of the panel.
                 */
                get: function () {
                    return this._width;
                },
                /**
                 * Set the width of the panel.
                 */
                set: function (width) {
                    this.resize(width, this._height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "height", {
                /**
                 * Get the height of the panel.
                 */
                get: function () {
                    return this._height;
                },
                /**
                 * Set the height of the panel.
                 */
                set: function (height) {
                    this.resize(this._width, height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "pos", {
                /**
                 * Get the position of the panel.
                 */
                get: function () {
                    return new panels.Point(this._x, this._y);
                },
                /**
                 * Set the position of the panel.
                 */
                set: function (pos) {
                    this.move(pos.x, pos.y);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "size", {
                /**
                 * Get the size of the panel.
                 */
                get: function () {
                    return new panels.Size(this._width, this._height);
                },
                /**
                 * Set the size of the panel.
                 */
                set: function (size) {
                    this.resize(size.width, size.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "geometry", {
                /**
                 * Get the geometry of the panel.
                 */
                get: function () {
                    return new panels.Rect(this._x, this._y, this._width, this._height);
                },
                /**
                 * Set the geometry of the panel.
                 */
                set: function (geo) {
                    this.setGeometry(geo.x, geo.y, geo.width, geo.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "minWidth", {
                /**
                 * Get the minimum width of the panel.
                 */
                get: function () {
                    return this._minWidth;
                },
                /**
                 * Set the minimum width of the panel.
                 */
                set: function (width) {
                    this.setMinSize(width, this._minHeight);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "minHeight", {
                /**
                 * Get the minimum height of the panel.
                 */
                get: function () {
                    return this._minHeight;
                },
                /**
                 * Set the minimum height of the panel.
                 */
                set: function (height) {
                    this.setMinSize(this._minWidth, height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "maxWidth", {
                /**
                 * Get the maximum width of the panel.
                 */
                get: function () {
                    return this._maxWidth;
                },
                /**
                 * Set the maximum width of the panel.
                 */
                set: function (width) {
                    this.setMaxSize(width, this._maxHeight);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "maxHeight", {
                /**
                 * Get the maximum height of the panel.
                 */
                get: function () {
                    return this._maxHeight;
                },
                /**
                 * Set the maxmimum height of the panel.
                 */
                set: function (height) {
                    this.setMaxSize(this._maxWidth, height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "minSize", {
                /**
                 * Get the minimum size of the panel.
                 */
                get: function () {
                    return new panels.Size(this._minWidth, this._minHeight);
                },
                /**
                 * Set the minimum size of the panel.
                 */
                set: function (size) {
                    this.setMinSize(size.width, size.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "maxSize", {
                /**
                 * Get the maximum size of the panel.
                 */
                get: function () {
                    return new panels.Size(this._maxWidth, this._maxHeight);
                },
                /**
                 * Set the maximum size of the panel.
                 */
                set: function (size) {
                    this.setMaxSize(size.width, size.height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "horizontalStretch", {
                /**
                 * Get the horizontal stretch factor for the panel.
                 */
                get: function () {
                    return this._stretch >> 16;
                },
                /**
                 * Set the horizontal stretch factor for the panel.
                 */
                set: function (stretch) {
                    this.setStretch(stretch, this.verticalStretch);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "verticalStretch", {
                /**
                 * Get the vertical stretch factor for the panel.
                 */
                get: function () {
                    return this._stretch & 0xFFFF;
                },
                /**
                 * Set the vertical stretch factor for the panel.
                 */
                set: function (stretch) {
                    this.setStretch(this.horizontalStretch, stretch);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "horizontalSizePolicy", {
                /**
                 * Get the horizontal size policy for the panel.
                 */
                get: function () {
                    return this._sizePolicy >> 16;
                },
                /**
                 * Set the horizontal size policy for the panel.
                 */
                set: function (policy) {
                    this.setSizePolicy(policy, this.verticalSizePolicy);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "verticalSizePolicy", {
                /**
                 * Get the vertical size policy for the panel.
                 */
                get: function () {
                    return this._sizePolicy & 0xFFFF;
                },
                /**
                 * Set the vertical size policy for the panel.
                 */
                set: function (policy) {
                    this.setSizePolicy(this.horizontalSizePolicy, policy);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "alignment", {
                /**
                 * Get the alignment flags for the panel.
                 */
                get: function () {
                    return this._alignment;
                },
                /**
                 * Set the alignment flags for the panel.
                 */
                set: function (align) {
                    if (align !== this._alignment) {
                        this._alignment = align;
                        this.updateGeometry();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "boxData", {
                /**
                 * Get the box data for the panel's node.
                 */
                get: function () {
                    return this._boxData || (this._boxData = createBoxData(this._node));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "isAttached", {
                /**
                 * Test whether the panel's node is attached to the DOM.
                 */
                get: function () {
                    return this.testFlag(1 /* IsAttached */);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "isDisposed", {
                /**
                 * Test whether the panel has been disposed.
                 */
                get: function () {
                    return this.testFlag(8 /* IsDisposed */);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "isHidden", {
                /**
                 * Test whether the panel is explicitly hidden.
                 */
                get: function () {
                    return this.testFlag(2 /* IsHidden */);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "isVisible", {
                /**
                 * Test whether the panel is visible.
                 *
                 * A panel is visible under the following conditions:
                 *   - it is attached to the DOM
                 *   - it is not explicitly hidden
                 *   - it has no explicitly hidden ancestors
                 */
                get: function () {
                    return this.testFlag(4 /* IsVisible */);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "parent", {
                /**
                 * Get the parent panel of the panel.
                 */
                get: function () {
                    return this._parent;
                },
                /**
                 * Set the parent panel of the panel.
                 */
                set: function (parent) {
                    parent = parent || null;
                    var old = this._parent;
                    if (old === parent) {
                        return;
                    }
                    if (old) {
                        this._parent = null;
                        old._children.remove(this);
                        dispatch.sendMessage(old, new panels.ChildMessage('child-removed', this));
                    }
                    if (parent) {
                        this._parent = parent;
                        parent._children.add(this);
                        dispatch.sendMessage(parent, new panels.ChildMessage('child-added', this));
                    }
                    dispatch.sendMessage(this, new Message('parent-changed'));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "children", {
                /**
                 * Get a read only list of the child panels.
                 */
                get: function () {
                    return new ReadOnlyList(this._children);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Panel.prototype, "layout", {
                /**
                 * Get the layout attached to the panel.
                 */
                get: function () {
                    return this._layout;
                },
                /**
                 * Set the layout for the panel.
                 *
                 * The given layout must be a new layout not assigned to any other
                 * panel or an exception will be thrown. A null layout is allowed.
                 *
                 * The current layout will be disposed and cannot be reused.
                 */
                set: function (layout) {
                    layout = layout || null;
                    var old = this._layout;
                    if (old === layout) {
                        return;
                    }
                    if (this.testFlag(16 /* DisallowLayoutChange */)) {
                        throw new Error('cannot change panel layout');
                    }
                    if (layout && layout.parent) {
                        throw new Error('layout already installed on a panel');
                    }
                    if (old) {
                        this._layout = null;
                        dispatch.removeMessageFilter(this, old);
                        old.dispose();
                    }
                    if (layout) {
                        this._layout = layout;
                        dispatch.installMessageFilter(this, layout);
                        layout.parent = this;
                    }
                    dispatch.sendMessage(this, new Message('layout-changed'));
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Test whether the given panel flag is set.
             */
            Panel.prototype.testFlag = function (flag) {
                return (this._flags & flag) !== 0;
            };
            /**
             * Set the given panel flag.
             */
            Panel.prototype.setFlag = function (flag) {
                this._flags |= flag;
            };
            /**
             * Clear the given panel flag.
             */
            Panel.prototype.clearFlag = function (flag) {
                this._flags &= ~flag;
            };
            /**
             * Make the panel visible to its parent.
             *
             * If the panel is not explicitly hidden, this is a no-op.
             */
            Panel.prototype.show = function () {
                if (!this.isHidden) {
                    return;
                }
                var parent = this._parent;
                if (this.isAttached && (!parent || parent.isVisible)) {
                    dispatch.sendMessage(this, new Message('before-show'));
                    this._node.classList.remove(HIDDEN_CLASS);
                    this.clearFlag(2 /* IsHidden */);
                    dispatch.sendMessage(this, new Message('after-show'));
                }
                else {
                    this._node.classList.remove(HIDDEN_CLASS);
                    this.clearFlag(2 /* IsHidden */);
                }
                if (parent) {
                    dispatch.sendMessage(parent, new panels.ChildMessage('child-shown', this));
                }
                this.updateGeometry();
            };
            /**
             * Make the panel invisible to its parent.
             *
             * If the panel is already hidden, this is a no-op.
             */
            Panel.prototype.hide = function () {
                if (this.isHidden) {
                    return;
                }
                var parent = this._parent;
                if (this.isAttached && (!parent || parent.isVisible)) {
                    dispatch.sendMessage(this, new Message('before-hide'));
                    this._node.classList.add(HIDDEN_CLASS);
                    this.setFlag(2 /* IsHidden */);
                    dispatch.sendMessage(this, new Message('after-hide'));
                }
                else {
                    this._node.classList.add(HIDDEN_CLASS);
                    this.setFlag(2 /* IsHidden */);
                }
                if (parent) {
                    dispatch.sendMessage(parent, new panels.ChildMessage('child-hidden', this));
                }
                this.updateGeometry(true);
            };
            /**
             * Close the panel by sending it a 'close' message.
             *
             * Subclasses may reimplement the `onClose` method to perform custom
             * actions before removing the panel from the hierarchy. The default
             * close message handler will unparent the panel.
             */
            Panel.prototype.close = function () {
                dispatch.sendMessage(this, new Message('close'));
            };
            /**
             * Attach the panel's node to a host DOM element.
             *
             * The `fit` method can be called to resize the panel to fill its
             * host node. It should be called whenever the size of host node
             * is known to have changed.
             *
             * Only a root panel can be attached to a host node.
             */
            Panel.prototype.attach = function (host) {
                if (this._parent) {
                    throw new Error('can only attach a root panel to the DOM');
                }
                dispatch.sendMessage(this, new Message('before-attach'));
                host.appendChild(this._node);
                dispatch.sendMessage(this, new Message('after-attach'));
            };
            /**
             * Detach the panel's node from the DOM.
             *
             * Only a root panel can be detached from its host node.
             */
            Panel.prototype.detach = function () {
                if (this._parent) {
                    throw new Error('can only detach a root panel from the DOM');
                }
                var node = this._node;
                var host = node.parentNode;
                if (!host) {
                    return;
                }
                dispatch.sendMessage(this, new Message('before-detach'));
                host.removeChild(node);
                dispatch.sendMessage(this, new Message('after-detach'));
            };
            /**
             * Resize the panel so that its fills its host node.
             *
             * Only a root panel can be fit to its host.
             *
             * If the size of the host node is known, it can be provided. This
             * will prevent a read from the DOM and avoid a potential reflow.
             */
            Panel.prototype.fit = function (width, height, box) {
                if (this._parent) {
                    throw new Error('can only fit a root panel');
                }
                var host = this._node.parentNode;
                if (!host) {
                    return;
                }
                if (width === void 0) {
                    width = host.offsetWidth;
                }
                if (height === void 0) {
                    height = host.offsetHeight;
                }
                if (box === void 0) {
                    box = createBoxData(host);
                }
                var x = box.paddingLeft;
                var y = box.paddingTop;
                var w = width - box.horizontalSum;
                var h = height - box.verticalSum;
                this.setGeometry(x, y, w, h);
            };
            /**
             * Calculate the preferred size for the panel.
             *
             * The default implementation returns the layout size hint if
             * a layout is installed, otherwise it returns a zero size.
             */
            Panel.prototype.sizeHint = function () {
                if (this._layout) {
                    return this._layout.sizeHint();
                }
                return new panels.Size(0, 0);
            };
            /**
             * Calculate the preferred minimum size for the panel.
             *
             * The default implementation returns the layout min size if
             * a layout is installed, otherwise it returns a zero size.
             */
            Panel.prototype.minSizeHint = function () {
                if (this._layout) {
                    return this._layout.minSize();
                }
                return new panels.Size(0, 0);
            };
            /**
             * Calculate the preferred maximum size for the panel.
             *
             * The default implementation returns the layout max size if
             * a layout is installed, otherwise it returns an inf size.
             */
            Panel.prototype.maxSizeHint = function () {
                if (this._layout) {
                    return this._layout.maxSize();
                }
                return new panels.Size(Infinity, Infinity);
            };
            /**
             * Notify the layout system that the panel geometry needs updating.
             *
             * This should be called if the panel's size hint(s) have changed.
             *
             * If the `force` flag is false and the panel is explicitly hidden,
             * this is a no-op. The geometry will update automatically when the
             * panel is made visible.
             */
            Panel.prototype.updateGeometry = function (force) {
                if (force === void 0) { force = false; }
                var parent = this._parent;
                if (!parent || (this.isHidden && !force)) {
                    return;
                }
                if (parent._layout) {
                    parent._layout.invalidate();
                }
                else {
                    dispatch.postMessage(parent, new Message('layout-request'));
                    parent.updateGeometry();
                }
            };
            /**
             * Notify the layout system that the panel box data needs updating.
             *
             * This should be called if the node's padding or border has changed.
             */
            Panel.prototype.updateBoxData = function () {
                this._boxData = null;
                if (this._layout) {
                    this._layout.invalidate();
                }
                else {
                    dispatch.postMessage(this, new Message('layout-request'));
                }
                this.updateGeometry();
            };
            /**
             * Move the panel to the given X-Y position.
             */
            Panel.prototype.move = function (x, y) {
                this.setGeometry(x, y, this._width, this._height);
            };
            /**
             * Resize the panel to the given width and height.
             */
            Panel.prototype.resize = function (width, height) {
                this.setGeometry(this._x, this._y, width, height);
            };
            /**
             * Set the geometry of the panel.
             */
            Panel.prototype.setGeometry = function (x, y, width, height) {
                width = Math.max(this._minWidth, Math.min(width, this._maxWidth));
                height = Math.max(this._minHeight, Math.min(height, this._maxHeight));
                var isMove = false;
                var isResize = false;
                var oldX = this._x;
                var oldY = this._y;
                var oldWidth = this._width;
                var oldHeight = this._height;
                var style = this._node.style;
                if (oldX !== x) {
                    this._x = x;
                    style.left = x + 'px';
                    isMove = true;
                }
                if (oldY !== y) {
                    this._y = y;
                    style.top = y + 'px';
                    isMove = true;
                }
                if (oldWidth !== width) {
                    this._width = width;
                    style.width = width + 'px';
                    isResize = true;
                }
                if (oldHeight !== height) {
                    this._height = height;
                    style.height = height + 'px';
                    isResize = true;
                }
                if (isMove) {
                    var move = new panels.MoveMessage(oldX, oldY, x, y);
                    dispatch.sendMessage(this, move);
                }
                if (isResize) {
                    var resize = new panels.ResizeMessage(oldWidth, oldHeight, width, height);
                    dispatch.sendMessage(this, resize);
                }
            };
            /**
             * Set the minimum size of the panel.
             */
            Panel.prototype.setMinSize = function (width, height) {
                this.setMinMaxSize(width, height, this._maxWidth, this._maxHeight);
            };
            /**
             * Set the maximum size of the panel.
             */
            Panel.prototype.setMaxSize = function (width, height) {
                this.setMinMaxSize(this._minWidth, this._minHeight, width, height);
            };
            /**
             * Set the minimum and maximum size of the panel.
             */
            Panel.prototype.setMinMaxSize = function (minW, minH, maxW, maxH) {
                minW = Math.max(0, minW);
                minH = Math.max(0, minH);
                maxW = Math.max(minW, maxW);
                maxH = Math.max(minH, maxH);
                var changed = false;
                if (minW !== this._minWidth) {
                    this._minWidth = minW;
                    changed = true;
                }
                if (minH !== this._minHeight) {
                    this._minHeight = minH;
                    changed = true;
                }
                if (maxW !== this._maxWidth) {
                    this._maxWidth = maxW;
                    changed = true;
                }
                if (maxH !== this._maxHeight) {
                    this._maxHeight = maxH;
                    changed = true;
                }
                if (changed) {
                    this.resize(this._width, this._height);
                    this.updateGeometry();
                }
            };
            /**
             * Set the stretch factors for the panel.
             */
            Panel.prototype.setStretch = function (horizontal, vertical) {
                horizontal = Math.max(0, Math.min(horizontal, 0x7FFF));
                vertical = Math.max(0, Math.min(vertical, 0x7FFF));
                var stretch = (horizontal << 16) | vertical;
                if (stretch !== this._stretch) {
                    this._stretch = stretch;
                    this.updateGeometry();
                }
            };
            /**
             * Set the size policy values for the panel.
             */
            Panel.prototype.setSizePolicy = function (horizontal, vertical) {
                var policy = (horizontal << 16) | vertical;
                if (policy !== this._sizePolicy) {
                    this._sizePolicy = policy;
                    this.updateGeometry();
                }
            };
            /**
             * Process a message dispatched to the handler.
             */
            Panel.prototype.processMessage = function (msg) {
                switch (msg.type) {
                    case 'move':
                        this.onMove(msg);
                        break;
                    case 'resize':
                        this.onResize(msg);
                        break;
                    case 'child-added':
                        this.onChildAdded(msg);
                        break;
                    case 'child-removed':
                        this.onChildRemoved(msg);
                        break;
                    case 'before-show':
                        this.onBeforeShow(msg);
                        sendNonHidden(this._children, msg);
                        break;
                    case 'after-show':
                        this.setFlag(4 /* IsVisible */);
                        this.onAfterShow(msg);
                        sendNonHidden(this._children, msg);
                        break;
                    case 'before-hide':
                        this.onBeforeHide(msg);
                        sendNonHidden(this._children, msg);
                        break;
                    case 'after-hide':
                        this.clearFlag(4 /* IsVisible */);
                        this.onAfterHide(msg);
                        sendNonHidden(this._children, msg);
                        break;
                    case 'before-attach':
                        this._boxData = null;
                        this.onBeforeAttach(msg);
                        sendAll(this._children, msg);
                        break;
                    case 'after-attach':
                        var parent = this._parent;
                        var visible = !this.isHidden && (!parent || parent.isVisible);
                        if (visible)
                            this.setFlag(4 /* IsVisible */);
                        this.setFlag(1 /* IsAttached */);
                        this.onAfterAttach(msg);
                        sendAll(this._children, msg);
                        break;
                    case 'before-detach':
                        this.onBeforeDetach(msg);
                        sendAll(this._children, msg);
                        break;
                    case 'after-detach':
                        this.clearFlag(4 /* IsVisible */);
                        this.clearFlag(1 /* IsAttached */);
                        this.onAfterDetach(msg);
                        sendAll(this._children, msg);
                        break;
                    case 'close':
                        this.onClose(msg);
                        break;
                    default:
                        break;
                }
            };
            /**
             * Compress a message posted to the handler.
             *
             * By default 'layout-request' messages are compressed.
             */
            Panel.prototype.compressEvent = function (msg, posted) {
                if (msg.type === 'layout-request') {
                    return some(posted, function (p) { return p.type === msg.type; });
                }
                return false;
            };
            /**
             * Create the DOM node which represents the panel.
             *
             * The default implementation creates an empty div.
             */
            Panel.prototype.createNode = function () {
                return document.createElement('div');
            };
            /**
             * A method invoked on a 'child-added' message.
             *
             * The default implementation attaches the child node.
             */
            Panel.prototype.onChildAdded = function (msg) {
                var child = msg.child;
                if (this.isAttached) {
                    dispatch.sendMessage(child, new Message('before-attach'));
                    this._node.appendChild(child._node);
                    dispatch.sendMessage(child, new Message('after-attach'));
                }
                else {
                    this._node.appendChild(child._node);
                }
            };
            /**
             * A method invoked on a 'child-removed' message.
             *
             * The default implementation detaches the child node.
             */
            Panel.prototype.onChildRemoved = function (msg) {
                var child = msg.child;
                if (this.isAttached) {
                    dispatch.sendMessage(child, new Message('before-detach'));
                    this._node.removeChild(child._node);
                    dispatch.sendMessage(child, new Message('after-detach'));
                }
                else {
                    this._node.removeChild(child._node);
                }
            };
            /**
             * A method invoked on a 'close' message.
             *
             * The default implementation sets the parent to null.
             */
            Panel.prototype.onClose = function (msg) {
                this.parent = null;
            };
            /**
             * A method invoked on a 'move' message.
             *
             * The default implementation is a no-op.
             */
            Panel.prototype.onMove = function (msg) {
            };
            /**
             * A method invoked on a 'resize' message.
             *
             * The default implementation is a no-op.
             */
            Panel.prototype.onResize = function (msg) {
            };
            /**
             * A method invoked on a 'before-show' message.
             *
             * The default implementation is a no-op.
             */
            Panel.prototype.onBeforeShow = function (msg) {
            };
            /**
             * A method invoked on an 'after-show' message.
             *
             * The default implementation is a no-op.
             */
            Panel.prototype.onAfterShow = function (msg) {
            };
            /**
             * A method invoked on a 'before-hide' message.
             *
             * The default implementation is a no-op.
             */
            Panel.prototype.onBeforeHide = function (msg) {
            };
            /**
             * A method invoked on an 'after-hide' message.
             *
             * The default implementation is a no-op.
             */
            Panel.prototype.onAfterHide = function (msg) {
            };
            /**
             * A method invoked on a 'before-attach' message.
             *
             * The default implementation is a no-op.
             */
            Panel.prototype.onBeforeAttach = function (msg) {
            };
            /**
             * A method invoked on an 'after-attach' message.
             *
             * The default implementation is a no-op.
             */
            Panel.prototype.onAfterAttach = function (msg) {
            };
            /**
             * A method invoked on a 'before-detach' message.
             *
             * The default implementation is a no-op.
             */
            Panel.prototype.onBeforeDetach = function (msg) {
            };
            /**
             * A method invoked on an 'after-detach' message.
             *
             * The default implementation is a no-op.
             */
            Panel.prototype.onAfterDetach = function (msg) {
            };
            return Panel;
        })();
        panels.Panel = Panel;
        /**
         * The default panel size policy.
         */
        var defaultPolicy = (panels.SizePolicy.Preferred << 16) | panels.SizePolicy.Preferred;
        /**
         * Send a message to all panels in a list.
         */
        function sendAll(list, msg) {
            for (var i = 0; i < list.size; ++i) {
                dispatch.sendMessage(list.get(i), msg);
            }
        }
        /**
         * Send a message to all non-hidden panels in a list.
         */
        function sendNonHidden(list, msg) {
            for (var i = 0; i < list.size; ++i) {
                var panel = list.get(i);
                if (!panel.isHidden) {
                    dispatch.sendMessage(panel, msg);
                }
            }
        }
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var render = phosphor.virtualdom.render;
        /**
         * The class name added to element host panels.
         */
        var ELEMENT_HOST_CLASS = 'p-ElementHost';
        /**
         * A panel which hosts a virtual element.
         *
         * This is used to embed a virtual element into a panel hierarchy. This
         * is a simple panel which disallows an external layout. The intent is
         * that the element will provide the content for the panel, typically
         * in the form of a component which manages its own updates.
         */
        var ElementHost = (function (_super) {
            __extends(ElementHost, _super);
            /**
             * Construct a new element host.
             */
            function ElementHost(element, width, height) {
                if (element === void 0) { element = null; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                _super.call(this);
                this.node.classList.add(ELEMENT_HOST_CLASS);
                this.setFlag(16 /* DisallowLayoutChange */);
                this._size = new panels.Size(Math.max(0, width), Math.max(0, height));
                this._element = element;
            }
            Object.defineProperty(ElementHost.prototype, "element", {
                /**
                 * Get the virtual element hosted by the panel.
                 */
                get: function () {
                    return this._element;
                },
                /**
                 * Set the virtual element hosted by the panel.
                 */
                set: function (element) {
                    element = element || null;
                    if (element === this._element) {
                        return;
                    }
                    this._element = element;
                    render(element, this.node);
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Calculate the preferred size of the panel.
             */
            ElementHost.prototype.sizeHint = function () {
                return this._size;
            };
            /**
             * Set the preferred size for the panel.
             */
            ElementHost.prototype.setSizeHint = function (width, height) {
                width = Math.max(0, width);
                height = Math.max(0, height);
                if (width === this._size.width && height === this._size.height) {
                    return;
                }
                this._size = new panels.Size(width, height);
                this.updateGeometry();
            };
            /**
             * A method invoked on an 'after-attach' message.
             */
            ElementHost.prototype.onAfterAttach = function (msg) {
                render(this._element, this.node);
            };
            /**
             * A method invoked on an 'after-detach' message.
             */
            ElementHost.prototype.onAfterDetach = function (msg) {
                render(null, this.node);
            };
            return ElementHost;
        })(panels.Panel);
        panels.ElementHost = ElementHost;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * A concrete implementation of ILayoutItem which manages a panel.
         *
         * User code will not typically use this class directly.
         */
        var PanelItem = (function () {
            /**
             * Construct a new panel item.
             */
            function PanelItem(panel) {
                this._origHint = null;
                this._sizeHint = null;
                this._minSize = null;
                this._maxSize = null;
                this._panel = panel;
            }
            Object.defineProperty(PanelItem.prototype, "isPanel", {
                /**
                 * Test whether the item manages a panel.
                 */
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanelItem.prototype, "isSpacer", {
                /**
                 * Test whether the item manages empty space.
                 */
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanelItem.prototype, "isHidden", {
                /**
                 * Test whether the item should be treated as hidden.
                 */
                get: function () {
                    return this._panel.isHidden;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanelItem.prototype, "panel", {
                /**
                 * The panel the item manages, if any.
                 */
                get: function () {
                    return this._panel;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanelItem.prototype, "expandHorizontal", {
                /**
                 * Test whether the item should be expanded horizontally.
                 */
                get: function () {
                    if (this._panel.alignment & panels.Alignment.Horizontal_Mask) {
                        return false;
                    }
                    var hPolicy = this._panel.horizontalSizePolicy;
                    return (hPolicy & 4 /* ExpandFlag */) !== 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanelItem.prototype, "expandVertical", {
                /**
                 * Test Whether the item should be expanded vertically.
                 */
                get: function () {
                    if (this._panel.alignment & panels.Alignment.Vertical_Mask) {
                        return false;
                    }
                    var vPolicy = this._panel.verticalSizePolicy;
                    return (vPolicy & 4 /* ExpandFlag */) !== 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanelItem.prototype, "horizontalStretch", {
                /**
                 * The horizontal stretch factor for the item.
                 */
                get: function () {
                    return this._panel.horizontalStretch;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanelItem.prototype, "verticalStretch", {
                /**
                 * The vertical stretch factor for the item.
                 */
                get: function () {
                    return this._panel.verticalStretch;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Invalidate the cached data for the item.
             */
            PanelItem.prototype.invalidate = function () {
                this._origHint = null;
                this._sizeHint = null;
                this._minSize = null;
                this._maxSize = null;
            };
            /**
             * Compute the preferred size of the item.
             */
            PanelItem.prototype.sizeHint = function () {
                if (!this._sizeHint) {
                    this._updateSizes();
                }
                return this._sizeHint;
            };
            /**
             * Compute the minimum size of the item.
             */
            PanelItem.prototype.minSize = function () {
                if (!this._minSize) {
                    this._updateSizes();
                }
                return this._minSize;
            };
            /**
             * Compute the maximum size of the item.
             */
            PanelItem.prototype.maxSize = function () {
                if (!this._maxSize) {
                    this._updateSizes();
                }
                return this._maxSize;
            };
            /**
             * Set the geometry of the item.
             */
            PanelItem.prototype.setGeometry = function (x, y, width, height) {
                var panel = this._panel;
                if (panel.isHidden) {
                    return;
                }
                var w = width;
                var h = height;
                var alignment = panel.alignment;
                if (alignment & panels.Alignment.Horizontal_Mask) {
                    var igW = panel.horizontalSizePolicy === panels.SizePolicy.Ignored;
                    w = Math.min(w, igW ? this._origHint.width : this._sizeHint.width);
                }
                if (alignment & panels.Alignment.Vertical_Mask) {
                    var igH = panel.verticalSizePolicy === panels.SizePolicy.Ignored;
                    h = Math.min(h, igH ? this._origHint.height : this._sizeHint.height);
                }
                var minSize = this._minSize;
                var maxSize = this._maxSize;
                var w = Math.max(minSize.width, Math.min(w, maxSize.width));
                var h = Math.max(minSize.height, Math.min(h, maxSize.height));
                if (alignment & 2 /* Right */) {
                    x += width - w;
                }
                else if (alignment & 4 /* HorizontalCenter */) {
                    x += (width - w) / 2;
                }
                if (alignment & 32 /* Bottom */) {
                    y += height - h;
                }
                else if (alignment & 64 /* VerticalCenter */) {
                    y += (height - h) / 2;
                }
                panel.setGeometry(x, y, w, h);
            };
            /**
             * Update the computed sizes for the panel item.
             */
            PanelItem.prototype._updateSizes = function () {
                var panel = this._panel;
                if (panel.isHidden) {
                    var zero = new panels.Size(0, 0);
                    this._origHint = zero;
                    this._sizeHint = zero;
                    this._minSize = zero;
                    this._maxSize = zero;
                    return;
                }
                var min = panel.minSize;
                var max = panel.maxSize;
                var sHint = panel.sizeHint();
                var mHint = panel.minSizeHint();
                var xHint = panel.maxSizeHint();
                var vsp = panel.verticalSizePolicy;
                var hsp = panel.horizontalSizePolicy;
                var al = panel.alignment;
                this._origHint = sHint;
                this._sizeHint = makeSizeHint(sHint, mHint, min, max, hsp, vsp);
                this._minSize = makeMinSize(sHint, mHint, min, max, hsp, vsp);
                this._maxSize = makeMaxSize(sHint, mHint, xHint, min, max, hsp, vsp, al);
            };
            return PanelItem;
        })();
        panels.PanelItem = PanelItem;
        /**
         * Make the effective size hint for the given sizing values.
         */
        function makeSizeHint(sizeHint, minHint, minSize, maxSize, hPolicy, vPolicy) {
            var w = 0;
            var h = 0;
            if (hPolicy !== panels.SizePolicy.Ignored) {
                w = Math.max(minHint.width, sizeHint.width);
            }
            if (vPolicy !== panels.SizePolicy.Ignored) {
                h = Math.max(minHint.height, sizeHint.height);
            }
            w = Math.max(minSize.width, Math.min(w, maxSize.width));
            h = Math.max(minSize.height, Math.min(h, maxSize.height));
            return new panels.Size(w, h);
        }
        /**
         * Make the effective minimum size for the given sizing values.
         */
        function makeMinSize(sizeHint, minHint, minSize, maxSize, hPolicy, vPolicy) {
            var w = 0;
            var h = 0;
            if (hPolicy !== panels.SizePolicy.Ignored) {
                if (hPolicy & 2 /* ShrinkFlag */) {
                    w = minHint.width;
                }
                else {
                    w = Math.max(minHint.width, sizeHint.width);
                }
            }
            if (vPolicy !== panels.SizePolicy.Ignored) {
                if (vPolicy & 2 /* ShrinkFlag */) {
                    h = minHint.height;
                }
                else {
                    h = Math.max(minHint.height, sizeHint.height);
                }
            }
            w = Math.max(minSize.width, Math.min(w, maxSize.width));
            h = Math.max(minSize.height, Math.min(h, maxSize.height));
            return new panels.Size(w, h);
        }
        /**
         * Make the effective maximum size for the given sizing values.
         */
        function makeMaxSize(sizeHint, minHint, maxHint, minSize, maxSize, hPolicy, vPolicy, alignment) {
            var w = Infinity;
            var h = Infinity;
            if ((alignment & panels.Alignment.Horizontal_Mask) === 0) {
                if (hPolicy !== panels.SizePolicy.Ignored) {
                    if (hPolicy & 1 /* GrowFlag */) {
                        w = Math.max(minHint.width, maxHint.width);
                    }
                    else {
                        w = Math.max(minHint.width, sizeHint.width);
                    }
                }
                w = Math.max(minSize.width, Math.min(w, maxSize.width));
            }
            if ((alignment & panels.Alignment.Vertical_Mask) === 0) {
                if (vPolicy !== panels.SizePolicy.Ignored) {
                    if (vPolicy & 1 /* GrowFlag */) {
                        h = Math.max(minHint.height, maxHint.height);
                    }
                    else {
                        h = Math.max(minHint.height, sizeHint.height);
                    }
                }
                h = Math.max(minSize.height, Math.min(h, maxSize.height));
            }
            return new panels.Size(w, h);
        }
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * A concrete implementation of ILayoutItem which manages empty space.
         *
         * User code will not typically create instances of this class directly.
         */
        var SpacerItem = (function () {
            /**
             * Construct a new spacer item.
             */
            function SpacerItem(width, height, hStretch, vStretch, hPolicy, vPolicy) {
                this.setSizing(width, height, hStretch, vStretch, hPolicy, vPolicy);
            }
            Object.defineProperty(SpacerItem.prototype, "isPanel", {
                /**
                 * Test whether the item manages a panel.
                 */
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SpacerItem.prototype, "isSpacer", {
                /**
                 * Test whether the item manages empty space.
                 */
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SpacerItem.prototype, "isHidden", {
                /**
                 * Test whether the item should be treated as hidden.
                 */
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SpacerItem.prototype, "panel", {
                /**
                 * The panel the item manages, if any.
                 */
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SpacerItem.prototype, "expandHorizontal", {
                /**
                 * Test whether the item should be expanded horizontally.
                 */
                get: function () {
                    var hPolicy = this._sizePolicy >> 16;
                    return (hPolicy & 4 /* ExpandFlag */) !== 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SpacerItem.prototype, "expandVertical", {
                /**
                 * Test Whether the item should be expanded vertically.
                 */
                get: function () {
                    var vPolicy = this._sizePolicy & 0xFFFF;
                    return (vPolicy & 4 /* ExpandFlag */) !== 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SpacerItem.prototype, "horizontalStretch", {
                /**
                 * The horizontal stretch factor for the item.
                 */
                get: function () {
                    return this._stretch >> 16;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SpacerItem.prototype, "verticalStretch", {
                /**
                 * The vertical stretch factor for the item.
                 */
                get: function () {
                    return this._stretch & 0xFFFF;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Change the sizing of the spacer item.
             *
             * The owner layout must be invalidated to reflect the change.
             */
            SpacerItem.prototype.setSizing = function (width, height, hStretch, vStretch, hPolicy, vPolicy) {
                var w = Math.max(0, width);
                var h = Math.max(0, height);
                hStretch = Math.max(0, Math.min(hStretch, 0x7FFF));
                vStretch = Math.max(0, Math.min(vStretch, 0x7FFF));
                this._size = new panels.Size(w, h);
                this._stretch = (hStretch << 16) | vStretch;
                this._sizePolicy = (hPolicy << 16) | vPolicy;
            };
            /**
             * Transpose the effective orientation of the spacer item.
             */
            SpacerItem.prototype.transpose = function () {
                var size = this._size;
                var hStretch = this._stretch >> 16;
                var vStretch = this._stretch & 0xFFFF;
                var hPolicy = this._sizePolicy >> 16;
                var vPolicy = this._sizePolicy & 0xFFFF;
                this._size = new panels.Size(size.height, size.width);
                this._stretch = (vStretch << 16) | hStretch;
                this._sizePolicy = (vPolicy << 16) | hPolicy;
            };
            /**
             * Invalidate the cached data for the item.
             */
            SpacerItem.prototype.invalidate = function () {
            };
            /**
             * Compute the preferred size of the item.
             */
            SpacerItem.prototype.sizeHint = function () {
                return this._size;
            };
            /**
             * Compute the minimum size of the item.
             */
            SpacerItem.prototype.minSize = function () {
                var size = this._size;
                var hPolicy = this._sizePolicy >> 16;
                var vPolicy = this._sizePolicy & 0xFFFF;
                var w = hPolicy & 2 /* ShrinkFlag */ ? 0 : size.width;
                var h = vPolicy & 2 /* ShrinkFlag */ ? 0 : size.height;
                return new panels.Size(w, h);
            };
            /**
             * Compute the maximum size of the item.
             */
            SpacerItem.prototype.maxSize = function () {
                var size = this._size;
                var hPolicy = this._sizePolicy >> 16;
                var vPolicy = this._sizePolicy & 0xFFFF;
                var w = hPolicy & 1 /* GrowFlag */ ? Infinity : size.width;
                var h = vPolicy & 1 /* GrowFlag */ ? Infinity : size.height;
                return new panels.Size(w, h);
            };
            /**
             * Set the geometry of the item.
             */
            SpacerItem.prototype.setGeometry = function (x, y, width, height) {
            };
            return SpacerItem;
        })();
        panels.SpacerItem = SpacerItem;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * A layout which arranges panels in a row or column.
         */
        var BoxLayout = (function (_super) {
            __extends(BoxLayout, _super);
            /**
             * Construct a new box layout.
             */
            function BoxLayout(direction, spacing) {
                if (spacing === void 0) { spacing = 8; }
                _super.call(this);
                this._dirty = true;
                this._fixedSpace = 0;
                this._lastSpaceIndex = -1;
                this._sizeHint = null;
                this._minSize = null;
                this._maxSize = null;
                this._items = [];
                this._sizers = [];
                this._direction = direction;
                this._spacing = Math.max(0, spacing);
            }
            /**
             * Dispose of the resources held by the layout.
             */
            BoxLayout.prototype.dispose = function () {
                this._items = null;
                this._sizers = null;
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(BoxLayout.prototype, "direction", {
                /**
                 * Get the layout direction for the box layout.
                 */
                get: function () {
                    return this._direction;
                },
                /**
                 * Set the layout direction for the box layout.
                 */
                set: function (direction) {
                    if (direction === this._direction) {
                        return;
                    }
                    if (isHorizontal(this._direction) !== isHorizontal(direction)) {
                        this._items.forEach(function (item) {
                            if (item instanceof panels.SpacerItem)
                                item.transpose();
                        });
                    }
                    this._direction = direction;
                    this.invalidate();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BoxLayout.prototype, "spacing", {
                /**
                 * Get the inter-element fixed spacing for the box layout.
                 */
                get: function () {
                    return this._spacing;
                },
                /**
                 * Set the inter-element fixed spacing for the box layout.
                 */
                set: function (spacing) {
                    spacing = Math.max(0, spacing);
                    if (spacing === this._spacing) {
                        return;
                    }
                    this._spacing = spacing;
                    this.invalidate();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BoxLayout.prototype, "count", {
                /**
                 * Get the number of layout items in the layout.
                 */
                get: function () {
                    return this._items.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the layout item at the specified index.
             */
            BoxLayout.prototype.itemAt = function (index) {
                return this._items[index];
            };
            /**
             * Remove and return the layout item at the specified index.
             */
            BoxLayout.prototype.takeAt = function (index) {
                index = index | 0;
                if (index < 0 || index >= this._items.length) {
                    return void 0;
                }
                var item = this._items.splice(index, 1)[0];
                this._sizers.splice(index, 1);
                this.invalidate();
                return item;
            };
            /**
             * Add a panel as the last item in the layout.
             *
             * If the panel already exists in the layout, it will be moved.
             *
             * Returns the index of the added panel.
             */
            BoxLayout.prototype.addPanel = function (panel) {
                return this.insertPanel(this.count, panel);
            };
            /**
             * Insert a panel into the layout at the given index.
             *
             * If the panel already exists in the layout, it will be moved.
             *
             * Returns the index of the added panel.
             */
            BoxLayout.prototype.insertPanel = function (index, panel) {
                this.remove(panel);
                this.ensureParent(panel);
                return this._insert(index, new panels.PanelItem(panel));
            };
            /**
             * Add a fixed amount of spacing to the end of the layout.
             *
             * Returns the index of the added space.
             */
            BoxLayout.prototype.addSpacing = function (size) {
                return this.insertSpacing(this.count, size);
            };
            /**
             * Insert a fixed amount of spacing at the given index.
             *
             * Returns the index of the added space.
             */
            BoxLayout.prototype.insertSpacing = function (index, size) {
                var item;
                var fixed = 0 /* Fixed */;
                var minimum = panels.SizePolicy.Minimum;
                if (isHorizontal(this._direction)) {
                    item = new panels.SpacerItem(size, 0, 0, 0, fixed, minimum);
                }
                else {
                    item = new panels.SpacerItem(0, size, 0, 0, minimum, fixed);
                }
                return this._insert(index, item);
            };
            /**
             * Add stretchable space to the end of the layout.
             *
             * Returns the index of the added space.
             */
            BoxLayout.prototype.addStretch = function (stretch) {
                if (stretch === void 0) { stretch = 0; }
                return this.insertStretch(this.count, stretch);
            };
            /**
             * Insert stretchable space at the given index.
             */
            BoxLayout.prototype.insertStretch = function (index, stretch) {
                if (stretch === void 0) { stretch = 0; }
                var item;
                var expanding = panels.SizePolicy.Expanding;
                var minimum = panels.SizePolicy.Minimum;
                if (isHorizontal(this._direction)) {
                    item = new panels.SpacerItem(0, 0, stretch, stretch, expanding, minimum);
                }
                else {
                    item = new panels.SpacerItem(0, 0, stretch, stretch, minimum, expanding);
                }
                return this._insert(index, item);
            };
            /**
             * Invalidate the cached layout data and enqueue an update.
             */
            BoxLayout.prototype.invalidate = function () {
                this._dirty = true;
                _super.prototype.invalidate.call(this);
            };
            /**
             * Compute the preferred size of the layout.
             */
            BoxLayout.prototype.sizeHint = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._sizeHint;
            };
            /**
             * Compute the minimum size of the layout.
             */
            BoxLayout.prototype.minSize = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._minSize;
            };
            /**
             * Compute the maximum size of the layout.
             */
            BoxLayout.prototype.maxSize = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._maxSize;
            };
            /**
             * Update the geometry of the child layout items.
             */
            BoxLayout.prototype.layout = function () {
                // Bail early when no work needs to be done.
                var parent = this.parent;
                var items = this._items;
                if (!parent || items.length === 0) {
                    return;
                }
                // Refresh the layout items if needed.
                if (this._dirty) {
                    this._setupGeometry();
                }
                // Setup commonly used variables.
                var boxD = parent.boxData;
                var width = parent.width - boxD.horizontalSum;
                var height = parent.height - boxD.verticalSum;
                var dir = this._direction;
                var sizers = this._sizers;
                var lastSpaceIndex = this._lastSpaceIndex;
                // Distribute the layout space to the sizers.
                var mainSpace = isHorizontal(dir) ? width : height;
                panels.layoutCalc(sizers, mainSpace - this._fixedSpace);
                // Update the geometry of the items according to the layout
                // direction. Fixed spacing is added before each item which
                // immediately follows a non-hidden panel item. This has the
                // effect of of collapsing all sibling spacers and ensuring
                // that only one fixed spacing increment occurs between any
                // two panels. It also prevents fixed spacing from being
                // added before the first item or after the last item.
                var y = boxD.paddingTop;
                var x = boxD.paddingLeft;
                var lastWasPanel = false;
                var spacing = this._spacing;
                var count = items.length;
                if (dir === 0 /* LeftToRight */) {
                    for (var i = 0; i < count; ++i) {
                        var item = items[i];
                        if (item.isHidden) {
                            continue;
                        }
                        if (lastWasPanel && i <= lastSpaceIndex) {
                            x += spacing;
                        }
                        var size = sizers[i].size;
                        item.setGeometry(x, y, size, height);
                        lastWasPanel = item.isPanel;
                        x += size;
                    }
                }
                else if (dir === 2 /* TopToBottom */) {
                    for (var i = 0; i < count; ++i) {
                        var item = items[i];
                        if (item.isHidden) {
                            continue;
                        }
                        if (lastWasPanel && i <= lastSpaceIndex) {
                            y += spacing;
                        }
                        var size = sizers[i].size;
                        item.setGeometry(x, y, width, size);
                        lastWasPanel = item.isPanel;
                        y += size;
                    }
                }
                else if (dir === 1 /* RightToLeft */) {
                    x += width;
                    for (var i = 0; i < count; ++i) {
                        var item = items[i];
                        if (item.isHidden) {
                            continue;
                        }
                        if (lastWasPanel && i <= lastSpaceIndex) {
                            x -= spacing;
                        }
                        var size = sizers[i].size;
                        item.setGeometry(x - size, y, size, height);
                        lastWasPanel = item.isPanel;
                        x -= size;
                    }
                }
                else {
                    y += height;
                    for (var i = 0; i < count; ++i) {
                        var item = items[i];
                        if (item.isHidden) {
                            continue;
                        }
                        if (lastWasPanel && i <= lastSpaceIndex) {
                            y -= spacing;
                        }
                        var size = sizers[i].size;
                        item.setGeometry(x, y - size, width, size);
                        lastWasPanel = item.isPanel;
                        y -= size;
                    }
                }
            };
            /**
             * Initialize the layout items and internal sizes for the layout.
             */
            BoxLayout.prototype._setupGeometry = function () {
                // Bail early when no work needs to be done.
                if (!this._dirty) {
                    return;
                }
                this._dirty = false;
                // No parent means the layout is not yet attached.
                var parent = this.parent;
                if (!parent) {
                    var zero = new panels.Size(0, 0);
                    this._sizeHint = zero;
                    this._minSize = zero;
                    this._maxSize = zero;
                    this._fixedSpace = 0;
                    return;
                }
                // Invalidate the layout items. This is done here instead of the
                // `invalidate` method as this method is invoked only when needed,
                // typically on a collapsed event. It also finds the last visible
                // panel item index, which is needed for fixed spacing allocation.
                var lastSpaceIndex = -1;
                var items = this._items;
                var count = items.length;
                for (var i = 0; i < count; ++i) {
                    var item = items[i];
                    item.invalidate();
                    if (item.isPanel && !item.isHidden) {
                        lastSpaceIndex = i;
                    }
                }
                // Setup commonly used variables.
                var hintW = 0;
                var hintH = 0;
                var minW = 0;
                var minH = 0;
                var maxW;
                var maxH;
                var fixedSpace = 0;
                var lastWasPanel = false;
                var dir = this._direction;
                var spacing = this._spacing;
                var sizers = this._sizers;
                // Compute the size bounds according to the layout orientation.
                // Empty layout items behave as if they don't exist and fixed
                // spacing is before items which immediately follow a non-hidden
                // panel item. This prevents leading and trailing fixed spacing
                // as well as fixed spacing after spacers. Sizers are initialized
                // according to their corresponding layout item.
                if (isHorizontal(dir)) {
                    maxH = Infinity;
                    maxW = count > 0 ? 0 : Infinity;
                    for (var i = 0; i < count; ++i) {
                        var item = items[i];
                        var sizer = sizers[i];
                        if (item.isHidden) {
                            sizer.expansive = false;
                            sizer.stretch = 0;
                            sizer.sizeHint = 0;
                            sizer.minSize = 0;
                            sizer.maxSize = 0;
                            continue;
                        }
                        var itemHint = item.sizeHint();
                        var itemMin = item.minSize();
                        var itemMax = item.maxSize();
                        hintH = Math.max(hintH, itemHint.height);
                        minH = Math.max(minH, itemMin.height);
                        maxH = Math.min(maxH, itemMax.height);
                        hintW += itemHint.width;
                        minW += itemMin.width;
                        maxW += itemMax.width;
                        sizer.expansive = item.expandHorizontal;
                        sizer.stretch = item.horizontalStretch;
                        sizer.sizeHint = itemHint.width;
                        sizer.minSize = itemMin.width;
                        sizer.maxSize = itemMax.width;
                        if (lastWasPanel && i <= lastSpaceIndex) {
                            fixedSpace += spacing;
                        }
                        lastWasPanel = item.isPanel;
                    }
                    hintW += fixedSpace;
                    minW += fixedSpace;
                    maxW += fixedSpace;
                }
                else {
                    maxW = Infinity;
                    maxH = count > 0 ? 0 : Infinity;
                    for (var i = 0; i < count; ++i) {
                        var item = items[i];
                        var sizer = sizers[i];
                        if (item.isHidden) {
                            sizer.expansive = false;
                            sizer.stretch = 0;
                            sizer.sizeHint = 0;
                            sizer.minSize = 0;
                            sizer.maxSize = 0;
                            continue;
                        }
                        var itemHint = item.sizeHint();
                        var itemMin = item.minSize();
                        var itemMax = item.maxSize();
                        hintW = Math.max(hintW, itemHint.width);
                        minW = Math.max(minW, itemMin.width);
                        maxW = Math.min(maxW, itemMax.width);
                        hintH += itemHint.height;
                        minH += itemMin.height;
                        maxH += itemMax.height;
                        sizer.expansive = item.expandVertical;
                        sizer.stretch = item.verticalStretch;
                        sizer.sizeHint = itemHint.height;
                        sizer.minSize = itemMin.height;
                        sizer.maxSize = itemMax.height;
                        if (lastWasPanel && i <= lastSpaceIndex) {
                            fixedSpace += spacing;
                        }
                        lastWasPanel = item.isPanel;
                    }
                    hintH += fixedSpace;
                    minH += fixedSpace;
                    maxH += fixedSpace;
                }
                // Account for padding and border on the parent.
                var boxD = parent.boxData;
                var boxW = boxD.horizontalSum;
                var boxH = boxD.verticalSum;
                hintW += boxW;
                hintH += boxH;
                minW += boxW;
                minH += boxH;
                maxW += boxW;
                maxH += boxH;
                // Update the internal sizes.
                this._sizeHint = new panels.Size(hintW, hintH);
                this._minSize = new panels.Size(minW, minH);
                this._maxSize = new panels.Size(maxW, maxH);
                this._fixedSpace = fixedSpace;
                this._lastSpaceIndex = lastSpaceIndex;
            };
            /**
             * Insert a layout item at the given index.
             *
             * Returns the index of the added item.
             */
            BoxLayout.prototype._insert = function (index, item) {
                index = Math.max(0, Math.min(index, this._items.length));
                this._items.splice(index, 0, item);
                this._sizers.splice(index, 0, new panels.LayoutSizer());
                this.invalidate();
                return index;
            };
            return BoxLayout;
        })(panels.Layout);
        panels.BoxLayout = BoxLayout;
        /**
         * Test whether the given direction is horizontal.
         */
        function isHorizontal(dir) {
            return dir === 0 /* LeftToRight */ || dir === 1 /* RightToLeft */;
        }
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * The class name added to BoxPanel instances.
         */
        var BOX_PANEL_CLASS = 'p-BoxPanel';
        /**
         * A panel which arranges its children in a row or column
         *
         * This panel delegates to a permanently installed box layout and
         * can be used as a more convenient interface to a box layout.
         */
        var BoxPanel = (function (_super) {
            __extends(BoxPanel, _super);
            /**
             * Construct a new box panel.
             */
            function BoxPanel(direction, spacing) {
                if (direction === void 0) { direction = 2 /* TopToBottom */; }
                if (spacing === void 0) { spacing = 8; }
                _super.call(this);
                this.node.classList.add(BOX_PANEL_CLASS);
                this.layout = new panels.BoxLayout(direction, spacing);
                this.setFlag(16 /* DisallowLayoutChange */);
            }
            Object.defineProperty(BoxPanel.prototype, "direction", {
                /**
                 * Get the layout direction for the box.
                 */
                get: function () {
                    return this.layout.direction;
                },
                /**
                 * Set the layout direction for the box.
                 */
                set: function (direction) {
                    this.layout.direction = direction;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BoxPanel.prototype, "spacing", {
                /**
                 * Get the inter-element fixed spacing for the box.
                 */
                get: function () {
                    return this.layout.spacing;
                },
                /**
                 * Set the inter-element fixed spacing for the box.
                 */
                set: function (spacing) {
                    this.layout.spacing = spacing;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BoxPanel.prototype, "count", {
                /**
                 * Get the number of items (panels + spacers) in the box.
                 */
                get: function () {
                    return this.layout.count;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the index of the given panel.
             *
             * Returns -1 if the panel is not found.
             */
            BoxPanel.prototype.indexOf = function (panel) {
                return this.layout.indexOf(panel);
            };
            /**
             * Get the panel at the given index.
             *
             * Returns `undefined` if there is no panel at the given index.
             */
            BoxPanel.prototype.panelAt = function (index) {
                return this.layout.panelAt(index);
            };
            /**
             * Add a child panel to the end of the split panel.
             *
             * If the panel already exists, it will be moved.
             *
             * Returns the index of the added panel.
             */
            BoxPanel.prototype.addPanel = function (panel) {
                return this.layout.addPanel(panel);
            };
            /**
             * Insert a child panel into the split panel at the given index.
             *
             * If the panel already exists, it will be moved.
             *
             * Returns the index of the added panel.
             */
            BoxPanel.prototype.insertPanel = function (index, panel) {
                return this.layout.insertPanel(index, panel);
            };
            /**
             * Add a fixed amount of spacing to the end of the box.
             *
             * Returns the index of the added space.
             */
            BoxPanel.prototype.addSpacing = function (size) {
                return this.layout.addSpacing(size);
            };
            /**
             * Insert a fixed amount of spacing at the given index.
             *
             * Returns the index of the added space.
             */
            BoxPanel.prototype.insertSpacing = function (index, size) {
                return this.layout.insertSpacing(index, size);
            };
            /**
             * Add stretchable space to the end of the box.
             *
             * Returns the index of the added space.
             */
            BoxPanel.prototype.addStretch = function (stretch) {
                if (stretch === void 0) { stretch = 0; }
                return this.layout.addStretch(stretch);
            };
            /**
             * Insert stretchable space at the given index.
             *
             * Returns the index of the added space.
             */
            BoxPanel.prototype.insertStretch = function (index, stretch) {
                if (stretch === void 0) { stretch = 0; }
                return this.layout.insertStretch(index, stretch);
            };
            return BoxPanel;
        })(panels.Panel);
        panels.BoxPanel = BoxPanel;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var Signal = phosphor.core.Signal;
        /**
         * An object which can be added to a menu or menu bar.
         */
        var MenuItem = (function () {
            /**
             * Construct a new menu item.
             */
            function MenuItem(opts) {
                /**
                 * A signal emitted when the state of the menu item is changed.
                 */
                this.changed = new Signal();
                /**
                 * A signal emitted when a `check` type menu item is toggled.
                 */
                this.toggled = new Signal();
                /**
                 * A signal emitted when the menu item is triggered.
                 */
                this.triggered = new Signal();
                this._mnemonic = '';
                this._shortcut = '';
                this._className = '';
                this._enabled = true;
                this._type = 'normal';
                this._checked = false;
                this._submenu = null;
                if (opts)
                    this._initFrom(opts);
            }
            Object.defineProperty(MenuItem.prototype, "type", {
                /**
                 * Get the type of the menu item: 'normal' | 'check' | 'separator'.
                 */
                get: function () {
                    return this._type;
                },
                /**
                 * Set the type of the menu item: 'normal' | 'check' | 'separator'.
                 */
                set: function (type) {
                    if (type === this._type) {
                        return;
                    }
                    if (type !== 'normal' && type !== 'check' && type !== 'separator') {
                        throw new Error('invalid menu item type: ' + type);
                    }
                    this._type = type;
                    this._checked = false;
                    this.changed.emit(this, void 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MenuItem.prototype, "text", {
                /**
                 * Get the text for the menu item.
                 */
                get: function () {
                    return this._text;
                },
                /**
                 * Set the text for the menu item.
                 */
                set: function (text) {
                    if (text === this._text) {
                        return;
                    }
                    this._text = text;
                    this.changed.emit(this, void 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MenuItem.prototype, "mnemonic", {
                /**
                 * Get the mnemonic key for the menu item.
                 */
                get: function () {
                    return this._mnemonic;
                },
                /**
                 * Set the mnemonic key for the menu item.
                 */
                set: function (mnemonic) {
                    if (mnemonic === this._mnemonic || mnemonic.length > 1) {
                        return;
                    }
                    this._mnemonic = mnemonic;
                    this.changed.emit(this, void 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MenuItem.prototype, "shortcut", {
                /**
                 * Get the shortcut key for the menu item (decoration only).
                 */
                get: function () {
                    return this._shortcut;
                },
                /**
                 * Set the shortcut key for the menu item (decoration only).
                 */
                set: function (shortcut) {
                    if (shortcut === this._shortcut) {
                        return;
                    }
                    this._shortcut = shortcut;
                    this.changed.emit(this, void 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MenuItem.prototype, "enabled", {
                /**
                 * Get whether the menu item is enabled.
                 */
                get: function () {
                    return this._enabled;
                },
                /**
                 * Set whether the menu item is enabled.
                 */
                set: function (enabled) {
                    if (enabled === this._enabled) {
                        return;
                    }
                    this._enabled = enabled;
                    this.changed.emit(this, void 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MenuItem.prototype, "checked", {
                /**
                 * Get whether the 'check' type menu item is checked.
                 */
                get: function () {
                    return this._checked;
                },
                /**
                 * Set whether the 'check' type menu item is checked.
                 */
                set: function (checked) {
                    if (this._type !== 'check' || checked === this._checked) {
                        return;
                    }
                    this._checked = checked;
                    this.changed.emit(this, void 0);
                    this.toggled.emit(this, void 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MenuItem.prototype, "submenu", {
                /**
                 * Get the submenu for the menu item.
                 */
                get: function () {
                    return this._submenu;
                },
                /**
                 * Set the submenu for the menu item.
                 */
                set: function (submenu) {
                    if (submenu === this._submenu) {
                        return;
                    }
                    this._submenu = submenu;
                    this.changed.emit(this, void 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MenuItem.prototype, "className", {
                /**
                 * Get the class name for the menu item.
                 */
                get: function () {
                    return this._className;
                },
                /**
                 * Set the class name for the menu item.
                 */
                set: function (name) {
                    if (name === this._className) {
                        return;
                    }
                    this._className = name;
                    this.changed.emit(this, void 0);
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Trigger the menu item.
             *
             * This will emit the `triggered` signal.
             *
             * If the item is a `check` type, it will also be toggled.
             */
            MenuItem.prototype.trigger = function () {
                if (this._type === 'check') {
                    this.checked = !this.checked;
                }
                this.triggered.emit(this, void 0);
            };
            /**
             * Initialize the menu item from the given options object.
             */
            MenuItem.prototype._initFrom = function (opts) {
                if (opts.type !== void 0) {
                    this.type = opts.type;
                }
                if (opts.text !== void 0) {
                    this._text = opts.text;
                }
                if (opts.mnemonic !== void 0) {
                    this.mnemonic = opts.mnemonic;
                }
                if (opts.shortcut !== void 0) {
                    this._shortcut = opts.shortcut;
                }
                if (opts.enabled !== void 0) {
                    this._enabled = opts.enabled;
                }
                if (opts.checked !== void 0) {
                    this.checked = opts.checked;
                }
                if (opts.submenu !== void 0) {
                    this._submenu = opts.submenu;
                }
                if (opts.className !== void 0) {
                    this._className = opts.className;
                }
                if (opts.onTriggered !== void 0) {
                    this.triggered.connect(opts.onTriggered);
                }
                if (opts.onToggled !== void 0) {
                    this.toggled.connect(opts.onToggled);
                }
            };
            return MenuItem;
        })();
        panels.MenuItem = MenuItem;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var Signal = phosphor.core.Signal;
        var hitTest = phosphor.domutil.hitTest;
        /**
         * The class name added to a menu panel.
         */
        var MENU_CLASS = 'p-Menu';
        /**
         * The class name assigned to a menu item.
         */
        var MENU_ITEM_CLASS = 'p-Menu-item';
        /**
         * The class name added to a menu item icon cell.
         */
        var ICON_CLASS = 'p-Menu-item-icon';
        /**
         * The class name added to a menu item text cell.
         */
        var TEXT_CLASS = 'p-Menu-item-text';
        /**
         * The class name added to a menu item shortcut cell.
         */
        var SHORTCUT_CLASS = 'p-Menu-item-shortcut';
        /**
         * The class name added to a menu item submenu icon cell.
         */
        var SUBMENU_ICON_CLASS = 'p-Menu-item-submenu-icon';
        /**
         * The class name added to a check type menu item.
         */
        var CHECK_TYPE_CLASS = 'p-mod-check-type';
        /**
         * The class name added to a separator type menu item.
         */
        var SEPARATOR_TYPE_CLASS = 'p-mod-separator-type';
        /**
         * The class name added to active menu items.
         */
        var ACTIVE_CLASS = 'p-mod-active';
        /**
         * The class name added to a disabled menu item.
         */
        var DISABLED_CLASS = 'p-mod-disabled';
        /**
         * The class name added to a checked menu item.
         */
        var CHECKED_CLASS = 'p-mod-checked';
        /**
         * The class name added to a menu item with a submenu.
         */
        var HAS_SUBMENU_CLASS = 'p-mod-has-submenu';
        /**
         * The delay, in ms, for opening a submenu.
         */
        var OPEN_DELAY = 300;
        /**
         * The delay, in ms, for closing a submenu.
         */
        var CLOSE_DELAY = 300;
        /**
         * The horizontal overlap to use for submenus.
         */
        var SUBMENU_OVERLAP = 3;
        /**
         * A panel which displays an array of menu items as a menu.
         */
        var Menu = (function (_super) {
            __extends(Menu, _super);
            /**
             * Construct a new menu.
             */
            function Menu(items) {
                var _this = this;
                _super.call(this);
                /**
                 * A signal emitted when the menu is closed.
                 */
                this.closed = new Signal();
                this._childItem = null;
                this._childMenu = null;
                this._parentMenu = null;
                this._items = [];
                this._nodes = [];
                this._activeIndex = -1;
                this._openTimer = 0;
                this._closeTimer = 0;
                this.node.classList.add(MENU_CLASS);
                if (items)
                    items.forEach(function (it) { return _this.addItem(it); });
            }
            /**
             * Find the root menu of a menu hierarchy.
             */
            Menu.rootMenu = function (menu) {
                while (menu._parentMenu) {
                    menu = menu._parentMenu;
                }
                return menu;
            };
            /**
             * Find the leaf menu of the menu hierarchy.
             */
            Menu.leafMenu = function (menu) {
                while (menu._childMenu) {
                    menu = menu._childMenu;
                }
                return menu;
            };
            /**
             * Dispose of the resources held by the panel.
             */
            Menu.prototype.dispose = function () {
                this._reset();
                this._removeFromParentMenu();
                this.closed.disconnect();
                this.clearItems();
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(Menu.prototype, "parentMenu", {
                /**
                 * Get the parent menu of the menu.
                 *
                 * This will be null if the menu is not an open submenu.
                 */
                get: function () {
                    return this._parentMenu;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Menu.prototype, "childMenu", {
                /**
                 * Get the child menu of the menu.
                 *
                 * This will be null if the menu does not have an open submenu.
                 */
                get: function () {
                    return this._childMenu;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Menu.prototype, "activeIndex", {
                /**
                 * Get the index of the active (highlighted) item.
                 */
                get: function () {
                    return this._activeIndex;
                },
                /**
                 * Set the index of the active (highlighted) menu item.
                 *
                 * Only a non-separator item can be set as the active item.
                 */
                set: function (index) {
                    var item = this._items[index];
                    var ok = item && item.type !== 'separator';
                    this._setActiveIndex(ok ? index : -1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Menu.prototype, "activeItem", {
                /**
                 * Get the active (highlighted) item.
                 */
                get: function () {
                    return this._items[this._activeIndex];
                },
                /**
                 * Set the active (highlighted) item.
                 *
                 * Only a non-separator item can be set as the active item.
                 */
                set: function (item) {
                    this.activeIndex = this._items.indexOf(item);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Menu.prototype, "count", {
                /**
                 * Get the number of menu items in the menu.
                 */
                get: function () {
                    return this._items.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the menu item at the given index.
             */
            Menu.prototype.itemAt = function (index) {
                return this._items[index];
            };
            /**
             * Get the index of the given menu item.
             */
            Menu.prototype.itemIndex = function (item) {
                return this._items.indexOf(item);
            };
            /**
             * Add a menu item to the end of the menu.
             *
             * Returns the new index of the item.
             */
            Menu.prototype.addItem = function (item) {
                return this.insertItem(this._items.length, item);
            };
            /**
             * Insert a menu item into the menu at the given index.
             *
             * Returns the new index of the item.
             */
            Menu.prototype.insertItem = function (index, item) {
                var items = this._items;
                index = Math.max(0, Math.min(index | 0, items.length));
                if (index === items.length) {
                    items.push(item);
                }
                else {
                    items.splice(index, 0, item);
                }
                this.itemInserted(index, item);
                return index;
            };
            /**
             * Remove the menu item at the given index from the menu.
             *
             * Returns the removed item.
             */
            Menu.prototype.takeItem = function (index) {
                index = index | 0;
                var items = this._items;
                if (index < 0 || index >= items.length) {
                    return void 0;
                }
                var item;
                if (index === items.length - 1) {
                    item = items.pop();
                }
                else {
                    item = items.splice(index, 1)[0];
                }
                this.itemRemoved(index, item);
                return item;
            };
            /**
             * Remove the given menu item from the menu.
             *
             * Returns the index of the removed item.
             */
            Menu.prototype.removeItem = function (item) {
                var index = this._items.indexOf(item);
                if (index === -1) {
                    return -1;
                }
                this.takeItem(index);
                return index;
            };
            /**
             * Remove all menu items from the menu.
             */
            Menu.prototype.clearItems = function () {
                var items = this._items;
                while (items.length) {
                    var item = items.pop();
                    var index = items.length;
                    this.itemRemoved(index, item);
                }
            };
            /**
             * Activate the next non-separator menu item.
             *
             * This is equivalent to pressing the down arrow key.
             */
            Menu.prototype.activateNextItem = function () {
                var k = this._activeIndex + 1;
                var i = firstWrap(this._items, function (it) { return it.type !== 'separator'; }, k);
                this._setActiveIndex(i);
            };
            /**
             * Activate the previous non-separator menu item.
             *
             * This is equivalent to pressing the up arrow key.
             */
            Menu.prototype.activatePreviousItem = function () {
                var k = this._activeIndex - 1;
                var i = lastWrap(this._items, function (it) { return it.type !== 'separator'; }, k);
                this._setActiveIndex(i);
            };
            /**
             * Activate the next menu item with the given mnemonic key.
             *
             * This is equivalent to pressing the mnemonic key.
             */
            Menu.prototype.activateMnemonicItem = function (key) {
                key = key.toUpperCase();
                var i = firstWrap(this._items, function (it) {
                    if (it.type !== 'separator' && it.enabled) {
                        return it.mnemonic.toUpperCase() === key;
                    }
                    return false;
                }, this._activeIndex + 1);
                this._setActiveIndex(i);
            };
            /**
             * Open the submenu of the active menu item.
             *
             * This is equivalent to pressing the right arrow key.
             *
             * Returns true if the item was opened, false otherwise.
             */
            Menu.prototype.openActiveItem = function () {
                var index = this._activeIndex;
                var item = this._items[index];
                if (!item || !item.submenu || !item.enabled) {
                    return false;
                }
                this._openChildMenu(item, this._nodes[index], false);
                this._childMenu.activateNextItem();
                return true;
            };
            /**
             * Trigger (or open) the active menu item.
             *
             * This is equivalent to pressing the enter key.
             *
             * Returns true if the item was triggered, false otherwise.
             */
            Menu.prototype.triggerActiveItem = function () {
                var index = this._activeIndex;
                var item = this._items[index];
                if (!item || !item.enabled) {
                    return false;
                }
                if (item.submenu) {
                    this._openChildMenu(item, this._nodes[index], false);
                    this._childMenu.activateNextItem();
                }
                else {
                    Menu.rootMenu(this).close();
                    item.trigger();
                }
                return true;
            };
            /**
             * Popup the menu at the specified location.
             *
             * The menu will be opened at the given location unless it will not
             * fully fit on the screen. If it will not fit, it will be adjusted
             * to fit naturally on the screen. The last two optional parameters
             * control whether the provided coordinate value must be obeyed.
             *
             * When the menu is opened as a popup menu, it will handle all key
             * events related to menu navigation as well as closing the menu
             * when the mouse is pressed outside of the menu hierarchy. To
             * prevent these actions, use the 'open' method instead.
             */
            Menu.prototype.popup = function (x, y, forceX, forceY) {
                if (forceX === void 0) { forceX = false; }
                if (forceY === void 0) { forceY = false; }
                if (this.isAttached) {
                    return;
                }
                document.addEventListener('keydown', this, true);
                document.addEventListener('keypress', this, true);
                document.addEventListener('mousedown', this, true);
                openRootMenu(this, x, y, forceX, forceY);
            };
            /**
             * Open the menu at the specified location.
             *
             * The menu will be opened at the given location unless it will not
             * fully fit on the screen. If it will not fit, it will be adjusted
             * to fit naturally on the screen. The last two optional parameters
             * control whether the provided coordinate value must be obeyed.
             *
             * When the menu is opened with this method, it will not handle key
             * events for navigation, nor will it close itself when the mouse is
             * pressed outside the menu hierarchy. This is useful when using the
             * menu from a menubar, where this menubar should handle these tasks.
             * Use the `popup` method for the alternative behavior.
             */
            Menu.prototype.open = function (x, y, forceX, forceY) {
                if (forceX === void 0) { forceX = false; }
                if (forceY === void 0) { forceY = false; }
                if (!this.isAttached)
                    openRootMenu(this, x, y, forceX, forceY);
            };
            /**
             * Handle the 'close' message for the menu.
             *
             * If the menu is currently attached, this will detach the menu
             * and emit the `closed` signal. The super handler is not called.
             */
            Menu.prototype.onClose = function (msg) {
                if (!this.isAttached) {
                    return;
                }
                this.hide();
                this._reset();
                this._removeFromParentMenu();
                this.closed.emit(this, void 0);
                this.detach();
            };
            /**
             * A method invoked when a menu item is inserted into the menu.
             */
            Menu.prototype.itemInserted = function (index, item) {
                if (this._activeIndex !== -1) {
                    this._reset();
                }
                var node = createItemNode(item);
                var next = this._nodes[index];
                this.node.insertBefore(node, next);
                this._nodes.splice(index, 0, node);
                node.addEventListener('mouseenter', this);
                item.changed.connect(this._mi_changed, this);
            };
            /**
             * A method invoked when a menu item is removed from the menu.
             */
            Menu.prototype.itemRemoved = function (index, item) {
                if (this._activeIndex !== -1) {
                    this._reset();
                }
                var node = this._nodes.splice(index, 1)[0];
                this.node.removeChild(node);
                node.removeEventListener('mouseenter', this);
                item.changed.disconnect(this._mi_changed, this);
            };
            /**
             * Create the DOM node for the panel.
             */
            Menu.prototype.createNode = function () {
                return document.createElement('ul');
            };
            /**
             * A method invoked on an 'after-attach' message.
             */
            Menu.prototype.onAfterAttach = function (msg) {
                var node = this.node;
                node.addEventListener('mouseup', this);
                node.addEventListener('mouseleave', this);
                node.addEventListener('contextmenu', this);
            };
            /**
             * A method invoked on an 'after-detach' message.
             */
            Menu.prototype.onAfterDetach = function (msg) {
                var node = this.node;
                node.removeEventListener('mouseup', this);
                node.removeEventListener('mouseleave', this);
                node.removeEventListener('contextmenu', this);
                document.removeEventListener('mousedown', this, true);
                document.removeEventListener('keydown', this, true);
                document.removeEventListener('keypress', this, true);
            };
            /**
             * Handle the DOM events for the menu.
             */
            Menu.prototype.handleEvent = function (event) {
                switch (event.type) {
                    case 'mouseenter':
                        this.domEvent_mouseenter(event);
                        break;
                    case 'mouseleave':
                        this.domEvent_mouseleave(event);
                        break;
                    case 'mousedown':
                        this.domEvent_mousedown(event);
                        break;
                    case 'mouseup':
                        this.domEvent_mouseup(event);
                        break;
                    case 'contextmenu':
                        this.domEvent_contextmenu(event);
                        break;
                    case 'keydown':
                        this.domEvent_keydown(event);
                        break;
                    case 'keypress':
                        this.domEvent_keypress(event);
                        break;
                    default:
                        break;
                }
            };
            /**
             * Handle the 'mouseenter' event for the menu.
             *
             * This event listener is attached to the child item nodes.
             */
            Menu.prototype.domEvent_mouseenter = function (event) {
                this._syncAncestors();
                this._closeChildMenu();
                this._cancelPendingOpen();
                var node = event.currentTarget;
                var index = this._nodes.indexOf(node);
                if (index === -1) {
                    this._setActiveIndex(-1);
                    return;
                }
                var item = this._items[index];
                if (item.type === 'separator') {
                    this._setActiveIndex(-1);
                    return;
                }
                this._setActiveIndex(index);
                if (item.submenu && item.enabled) {
                    if (item === this._childItem) {
                        this._cancelPendingClose();
                    }
                    else {
                        this._openChildMenu(item, node, true);
                    }
                }
            };
            /**
             * Handle the 'mouseleave' event for the menu.
             *
             * The event listener is only attached to the menu node.
             */
            Menu.prototype.domEvent_mouseleave = function (event) {
                this._cancelPendingOpen();
                var x = event.clientX;
                var y = event.clientY;
                var child = this._childMenu;
                if (!child || !hitTest(child.node, x, y)) {
                    this._setActiveIndex(-1);
                    this._closeChildMenu();
                }
            };
            /**
             * Handle the 'mouseup' event for the menu.
             *
             * This event listener is attached to the menu node.
             */
            Menu.prototype.domEvent_mouseup = function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (event.button === 0) {
                    this.triggerActiveItem();
                }
            };
            /**
             * Handle the 'contextmenu' event for the menu.
             *
             * This event listener is attached to the menu node.
             */
            Menu.prototype.domEvent_contextmenu = function (event) {
                event.preventDefault();
                event.stopPropagation();
            };
            /**
             * Handle the 'mousedown' event for the menu.
             *
             * This event listener is attached to the document for the root
             * menu only when it is opened as a popup menu.
             */
            Menu.prototype.domEvent_mousedown = function (event) {
                var menu = this;
                var hit = false;
                var x = event.clientX;
                var y = event.clientY;
                while (!hit && menu) {
                    hit = hitTest(menu.node, x, y);
                    menu = menu._childMenu;
                }
                if (!hit)
                    this.close();
            };
            /**
             * Handle the key down event for the menu.
             *
             * This event listener is attached to the document for the root
             * menu only when it is opened as a popup menu.
             */
            Menu.prototype.domEvent_keydown = function (event) {
                event.stopPropagation();
                var leaf = Menu.leafMenu(this);
                switch (event.keyCode) {
                    case 13:
                        event.preventDefault();
                        leaf.triggerActiveItem();
                        break;
                    case 27:
                        event.preventDefault();
                        leaf.close();
                        break;
                    case 37:
                        event.preventDefault();
                        if (leaf !== this)
                            leaf.close();
                        break;
                    case 38:
                        event.preventDefault();
                        leaf.activatePreviousItem();
                        break;
                    case 39:
                        event.preventDefault();
                        leaf.openActiveItem();
                        break;
                    case 40:
                        event.preventDefault();
                        leaf.activateNextItem();
                        break;
                    default:
                        break;
                }
            };
            /**
             * Handle the 'keypress' event for the menu.
             *
             * This event listener is attached to the document for the root
             * menu only when it is opened as a popup menu.
             */
            Menu.prototype.domEvent_keypress = function (event) {
                event.preventDefault();
                event.stopPropagation();
                var str = String.fromCharCode(event.charCode);
                Menu.leafMenu(this).activateMnemonicItem(str);
            };
            /**
             * Set the active item index for the menu.
             *
             * This updates the class name of the relevant item nodes.
             */
            Menu.prototype._setActiveIndex = function (index) {
                var curr = this._nodes[this._activeIndex];
                var next = this._nodes[index];
                this._activeIndex = index;
                if (curr === next) {
                    return;
                }
                if (curr)
                    curr.classList.remove(ACTIVE_CLASS);
                if (next)
                    next.classList.add(ACTIVE_CLASS);
            };
            /**
             * Synchronize the active item hierarchy starting with the parent.
             *
             * This ensures that the proper child items are activated for the
             * ancestor menu hierarchy and that any pending open or close
             * tasks are cleared.
             */
            Menu.prototype._syncAncestors = function () {
                var menu = this._parentMenu;
                while (menu) {
                    menu._cancelPendingOpen();
                    menu._cancelPendingClose();
                    menu._syncChildItem();
                    menu = menu._parentMenu;
                }
            };
            /**
             * Synchronize the active item with the item for the child menu.
             *
             * This ensures that the active item is the child menu item.
             */
            Menu.prototype._syncChildItem = function () {
                var menu = this._childMenu;
                if (!menu) {
                    return;
                }
                var index = this._items.indexOf(this._childItem);
                if (index === -1) {
                    return;
                }
                this._setActiveIndex(index);
            };
            /**
             * Open the menu item's submenu using the node for location.
             *
             * If the given item is already open, this is a no-op.
             *
             * Any pending open operation will be cancelled before opening
             * the menu or queueing the delayed task to open the menu.
             */
            Menu.prototype._openChildMenu = function (item, node, delayed) {
                var _this = this;
                if (item === this._childItem) {
                    return;
                }
                this._cancelPendingOpen();
                if (delayed) {
                    this._openTimer = setTimeout(function () {
                        var menu = item.submenu;
                        _this._openTimer = 0;
                        _this._childItem = item;
                        _this._childMenu = menu;
                        menu._parentMenu = _this;
                        openSubmenu(menu, node);
                    }, OPEN_DELAY);
                }
                else {
                    var menu = item.submenu;
                    this._childItem = item;
                    this._childMenu = menu;
                    menu._parentMenu = this;
                    openSubmenu(menu, node);
                }
            };
            /**
             * Close the currently open child menu using a delayed task.
             *
             * If a task is pending or if there is no child menu, this is a no-op.
             */
            Menu.prototype._closeChildMenu = function () {
                var _this = this;
                if (this._closeTimer || !this._childMenu) {
                    return;
                }
                this._closeTimer = setTimeout(function () {
                    _this._closeTimer = 0;
                    if (_this._childMenu) {
                        _this._childMenu.close();
                        _this._childMenu = null;
                        _this._childItem = null;
                    }
                }, CLOSE_DELAY);
            };
            /**
             * Reset the state of the menu.
             *
             * This deactivates the current item and closes the child menu.
             */
            Menu.prototype._reset = function () {
                this._cancelPendingOpen();
                this._cancelPendingClose();
                this._setActiveIndex(-1);
                if (this._childMenu) {
                    this._childMenu.close();
                    this._childMenu = null;
                    this._childItem = null;
                }
            };
            /**
             * Remove the menu from its parent menu.
             */
            Menu.prototype._removeFromParentMenu = function () {
                var parent = this._parentMenu;
                if (!parent) {
                    return;
                }
                this._parentMenu = null;
                parent._cancelPendingOpen();
                parent._cancelPendingClose();
                parent._childMenu = null;
                parent._childItem = null;
            };
            /**
             * Cancel any pending child menu open task.
             */
            Menu.prototype._cancelPendingOpen = function () {
                if (this._openTimer) {
                    clearTimeout(this._openTimer);
                    this._openTimer = 0;
                }
            };
            /**
             * Cancel any pending child menu close task.
             */
            Menu.prototype._cancelPendingClose = function () {
                if (this._closeTimer) {
                    clearTimeout(this._closeTimer);
                    this._closeTimer = 0;
                }
            };
            /**
             * Handle the `changed` signal from a menu item.
             */
            Menu.prototype._mi_changed = function (sender) {
                var items = this._items;
                var nodes = this._nodes;
                for (var i = 0, n = items.length; i < n; ++i) {
                    if (items[i] !== sender) {
                        continue;
                    }
                    if (i === this._activeIndex) {
                        this._reset();
                    }
                    initItemNode(sender, nodes[i]);
                }
            };
            return Menu;
        })(panels.Panel);
        panels.Menu = Menu;
        /**
         * Compute the offset of the first menu item.
         *
         * This returns the distance from the top of the menu to the top
         * of the first item in the menu.
         */
        function firstItemOffset(node) {
            var item = node.firstChild;
            if (!item) {
                return 0;
            }
            var menuRect = node.getBoundingClientRect();
            var itemRect = item.getBoundingClientRect();
            return itemRect.top - menuRect.top;
        }
        /**
         * Compute the offset of the last menu item.
         *
         * This returns the distance from the bottom of the menu to the
         * bottom of the last item in the menu.
         */
        function lastItemOffset(node) {
            var item = node.lastChild;
            if (!item) {
                return 0;
            }
            var menuRect = node.getBoundingClientRect();
            var itemRect = item.getBoundingClientRect();
            return menuRect.bottom - itemRect.bottom;
        }
        /**
         * Open the menu as a root menu at the target location.
         */
        function openRootMenu(menu, x, y, forceX, forceY) {
            // mount far offscreen for measurement
            var node = menu.node;
            var style = node.style;
            style.visibility = 'hidden';
            menu.attach(document.body);
            menu.show();
            // compute the adjusted coordinates
            var elem = document.documentElement;
            var maxX = elem.clientWidth;
            var maxY = elem.clientHeight;
            var rect = node.getBoundingClientRect();
            if (!forceX && x + rect.width > maxX) {
                x = maxX - rect.width;
            }
            if (!forceY && y + rect.height > maxY) {
                if (y > maxY) {
                    y = maxY - rect.height;
                }
                else {
                    y = y - rect.height;
                }
            }
            // move to adjusted position
            style.top = Math.max(0, y) + 'px';
            style.left = Math.max(0, x) + 'px';
            style.visibility = '';
        }
        /**
         * Open a the menu as a submenu using the item node for positioning.
         */
        function openSubmenu(menu, item) {
            // mount far offscreen for measurement
            var node = menu.node;
            var style = node.style;
            style.visibility = 'hidden';
            menu.attach(document.body);
            menu.show();
            // compute the adjusted coordinates
            var elem = document.documentElement;
            var maxX = elem.clientWidth;
            var maxY = elem.clientHeight;
            var menuRect = node.getBoundingClientRect();
            var itemRect = item.getBoundingClientRect();
            var x = itemRect.right - SUBMENU_OVERLAP;
            var y = itemRect.top - firstItemOffset(node);
            if (x + menuRect.width > maxX) {
                x = itemRect.left + SUBMENU_OVERLAP - menuRect.width;
            }
            if (y + menuRect.height > maxY) {
                y = itemRect.bottom + lastItemOffset(node) - menuRect.height;
            }
            // move to adjusted position
            style.top = Math.max(0, y) + 'px';
            style.left = Math.max(0, x) + 'px';
            style.visibility = '';
        }
        /**
         * Create an initialize the node for a menu item.
         */
        function createItemNode(item) {
            var node = document.createElement('li');
            var icon = document.createElement('span');
            var text = document.createElement('span');
            var shortcut = document.createElement('span');
            var submenu = document.createElement('span');
            icon.className = ICON_CLASS;
            text.className = TEXT_CLASS;
            shortcut.className = SHORTCUT_CLASS;
            submenu.className = SUBMENU_ICON_CLASS;
            node.appendChild(icon);
            node.appendChild(text);
            node.appendChild(shortcut);
            node.appendChild(submenu);
            initItemNode(item, node);
            return node;
        }
        /**
         * Initialize the node for a menu item.
         *
         * This can be called again to update the node state.
         */
        function initItemNode(item, node) {
            var classParts = [MENU_ITEM_CLASS];
            if (item.className) {
                classParts.push(item.className);
            }
            if (item.type === 'check') {
                classParts.push(CHECK_TYPE_CLASS);
            }
            else if (item.type === 'separator') {
                classParts.push(SEPARATOR_TYPE_CLASS);
            }
            if (item.checked) {
                classParts.push(CHECKED_CLASS);
            }
            if (!item.enabled) {
                classParts.push(DISABLED_CLASS);
            }
            if (item.submenu) {
                classParts.push(HAS_SUBMENU_CLASS);
            }
            node.className = classParts.join(' ');
            node.children[1].textContent = item.text;
            node.children[2].textContent = item.shortcut;
        }
        function firstWrap(items, cb, s) {
            for (var i = 0, n = items.length; i < n; ++i) {
                var j = (s + i) % n;
                if (cb(items[j]))
                    return j;
            }
            return -1;
        }
        function lastWrap(items, cb, s) {
            for (var i = 0, n = items.length; i < n; ++i) {
                var j = (((s - i) % n) + n) % n;
                if (cb(items[j]))
                    return j;
            }
            return -1;
        }
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var hitTest = phosphor.domutil.hitTest;
        /**
         * The class name added to a menu bar panel.
         */
        var MENU_BAR_CLASS = 'p-MenuBar';
        /**
         * The class name assigned to an open menu bar menu.
         */
        var MENU_CLASS = 'p-MenuBar-menu';
        /**
         * The class name assigned to a menu item.
         */
        var MENU_ITEM_CLASS = 'p-MenuBar-item';
        /**
         * The class name added to a menu item icon cell.
         */
        var ICON_CLASS = 'p-MenuBar-item-icon';
        /**
         * The class name added to a menu item text cell.
         */
        var TEXT_CLASS = 'p-MenuBar-item-text';
        /**
         * The class name added to a separator type menu item.
         */
        var SEPARATOR_TYPE_CLASS = 'p-mod-separator-type';
        /**
         * The class name added to active menu items.
         */
        var ACTIVE_CLASS = 'p-mod-active';
        /**
         * The class name added to active menu items.
         */
        var SELECTED_CLASS = 'p-mod-selected';
        /**
         * The class name added to a disabled menu item.
         */
        var DISABLED_CLASS = 'p-mod-disabled';
        /**
         * A panel which displays menu items as a menu bar.
         */
        var MenuBar = (function (_super) {
            __extends(MenuBar, _super);
            /**
             * Construct a new menu bar.
             */
            function MenuBar(items) {
                var _this = this;
                _super.call(this);
                this._childMenu = null;
                this._items = [];
                this._nodes = [];
                this._state = 0 /* Inactive */;
                this._activeIndex = -1;
                this.node.classList.add(MENU_BAR_CLASS);
                this.verticalSizePolicy = 0 /* Fixed */;
                if (items)
                    items.forEach(function (it) { return _this.addItem(it); });
            }
            /**
             * Dispose of the resources held by the panel.
             */
            MenuBar.prototype.dispose = function () {
                this._closeChildMenu();
                this.clearItems();
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(MenuBar.prototype, "childMenu", {
                /**
                 * Get the child menu of the menu bar.
                 *
                 * This will be null if the menu bar does not have an open menu.
                 */
                get: function () {
                    return this._childMenu;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MenuBar.prototype, "activeIndex", {
                /**
                 * Get the index of the active (highlighted) item.
                 */
                get: function () {
                    return this._activeIndex;
                },
                /**
                 * Set the index of the active (highlighted) menu item.
                 *
                 * Only an enabled non-separator item can be set as the active item.
                 */
                set: function (index) {
                    var ok = isSelectable(this._items[index]);
                    this._setActiveIndex(ok ? index : -1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MenuBar.prototype, "activeItem", {
                /**
                 * Get the active (highlighted) item.
                 */
                get: function () {
                    return this._items[this._activeIndex];
                },
                /**
                 * Set the active (highlighted) item.
                 *
                 * Only an enabled non-separator item can be set as the active item.
                 */
                set: function (item) {
                    this.activeIndex = this._items.indexOf(item);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MenuBar.prototype, "count", {
                /**
                 * Get the number of menu items in the menu bar.
                 */
                get: function () {
                    return this._items.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the menu item at the given index.
             */
            MenuBar.prototype.itemAt = function (index) {
                return this._items[index];
            };
            /**
             * Get the index of the given menu item.
             */
            MenuBar.prototype.itemIndex = function (item) {
                return this._items.indexOf(item);
            };
            /**
             * Add a menu item to the end of the menu bar.
             *
             * Returns the new index of the item.
             */
            MenuBar.prototype.addItem = function (item) {
                return this.insertItem(this._items.length, item);
            };
            /**
             * Insert a menu item into the menu bar at the given index.
             *
             * Returns the new index of the item.
             */
            MenuBar.prototype.insertItem = function (index, item) {
                var items = this._items;
                index = Math.max(0, Math.min(index | 0, items.length));
                if (index === items.length) {
                    items.push(item);
                }
                else {
                    items.splice(index, 0, item);
                }
                this.itemInserted(index, item);
                return index;
            };
            /**
             * Remove the menu item at the given index from the menu bar.
             *
             * Returns the removed item.
             */
            MenuBar.prototype.takeItem = function (index) {
                index = index | 0;
                var items = this._items;
                if (index < 0 || index >= items.length) {
                    return void 0;
                }
                var item;
                if (index === items.length - 1) {
                    item = items.pop();
                }
                else {
                    item = items.splice(index, 1)[0];
                }
                this.itemRemoved(index, item);
                return item;
            };
            /**
             * Remove the given menu item from the menu bar.
             *
             * Returns the index of the removed item.
             */
            MenuBar.prototype.removeItem = function (item) {
                var index = this._items.indexOf(item);
                if (index === -1) {
                    return -1;
                }
                this.takeItem(index);
                return index;
            };
            /**
             * Remove all menu items from the menu bar.
             */
            MenuBar.prototype.clearItems = function () {
                var items = this._items;
                while (items.length) {
                    var item = items.pop();
                    var index = items.length;
                    this.itemRemoved(index, item);
                }
            };
            /**
             * Activate the next non-separator menu item.
             *
             * This is equivalent to pressing the right arrow key.
             */
            MenuBar.prototype.activateNextItem = function () {
                var from = this._activeIndex + 1;
                var i = firstWrap(this._items, isSelectable, from);
                this._setActiveIndex(i);
                var menu = this._childMenu;
                if (menu)
                    menu.activateNextItem();
            };
            /**
             * Activate the previous non-separator menu item.
             *
             * This is equivalent to pressing the left arrow key.
             */
            MenuBar.prototype.activatePreviousItem = function () {
                var from = this._activeIndex - 1;
                var i = lastWrap(this._items, isSelectable, from);
                this._setActiveIndex(i);
                var menu = this._childMenu;
                if (menu)
                    menu.activateNextItem();
            };
            /**
             * Activate the next menu item with the given mnemonic key.
             *
             * This is equivalent to pressing the mnemonic key.
             */
            MenuBar.prototype.activateMnemonicItem = function (key) {
                key = key.toUpperCase();
                var i = firstWrap(this._items, function (it) {
                    return isSelectable(it) && it.mnemonic.toUpperCase() === key;
                }, this._activeIndex + 1);
                this._setActiveIndex(i);
                var menu = this._childMenu;
                if (menu)
                    menu.activateNextItem();
            };
            /**
             * Open the submenu of the active menu item.
             *
             * This is equivalent to pressing the down arrow key.
             *
             * Returns true if the item was opened, false otherwise.
             */
            MenuBar.prototype.openActiveItem = function () {
                var index = this._activeIndex;
                var item = this._items[index];
                if (!item) {
                    return false;
                }
                this._setState(1 /* Active */);
                this._setActiveIndex(index);
                var menu = this._childMenu;
                if (menu)
                    menu.activateNextItem();
                return true;
            };
            /**
             * Compute the size hint for the menu bar.
             */
            MenuBar.prototype.sizeHint = function () {
                return this.minSizeHint();
            };
            /**
             * Compute the minimum size hint for the menu bar.
             */
            MenuBar.prototype.minSizeHint = function () {
                var style = window.getComputedStyle(this.node);
                var height = parseInt(style.minHeight, 10) || 0;
                return new panels.Size(0, height);
            };
            /**
             * A method called when a menu item is inserted into the menu bar.
             */
            MenuBar.prototype.itemInserted = function (index, item) {
                if (this._activeIndex !== -1) {
                    this._setState(0 /* Inactive */);
                    this._setActiveIndex(-1);
                }
                var node = createItemNode(item);
                var next = this._nodes[index];
                this.node.insertBefore(node, next);
                this._nodes.splice(index, 0, node);
                item.changed.connect(this._mi_changed, this);
            };
            /**
             * A method called when a menu item is removed from the menu bar.
             */
            MenuBar.prototype.itemRemoved = function (index, item) {
                if (this._activeIndex !== -1) {
                    this._setState(0 /* Inactive */);
                    this._setActiveIndex(-1);
                }
                var node = this._nodes.splice(index, 1)[0];
                this.node.removeChild(node);
                item.changed.disconnect(this._mi_changed, this);
            };
            /**
             * Create the DOM node for the panel.
             */
            MenuBar.prototype.createNode = function () {
                return document.createElement('ul');
            };
            /**
             * A method invoked on the 'after-attach' event.
             */
            MenuBar.prototype.onAfterAttach = function (msg) {
                this.node.addEventListener('mousedown', this);
                this.node.addEventListener('mousemove', this);
                this.node.addEventListener('mouseleave', this);
            };
            /**
             * A method invoked on the 'after-detach' event.
             */
            MenuBar.prototype.onAfterDetach = function (msg) {
                this.node.removeEventListener('mousedown', this);
                this.node.removeEventListener('mousemove', this);
                this.node.removeEventListener('mouseleave', this);
            };
            /**
             * Handle the DOM events for the menu bar.
             */
            MenuBar.prototype.handleEvent = function (event) {
                switch (event.type) {
                    case 'mousedown':
                        this.domEvent_mousedown(event);
                        break;
                    case 'mousemove':
                        this.domEvent_mousemove(event);
                        break;
                    case 'mouseleave':
                        this.domEvent_mouseleave(event);
                        break;
                    case 'keydown':
                        this.domEvent_keydown(event);
                        break;
                    case 'keypress':
                        this.domEvent_keypress(event);
                        break;
                    default:
                        break;
                }
            };
            /**
             * Handle the 'mousedown' event for the menu bar.
             */
            MenuBar.prototype.domEvent_mousedown = function (event) {
                var x = event.clientX;
                var y = event.clientY;
                if (this._state === 0 /* Inactive */) {
                    if (event.button !== 0) {
                        return;
                    }
                    var index = firstWrap(this._nodes, function (n) { return hitTest(n, x, y); }, 0);
                    if (!isSelectable(this._items[index])) {
                        return;
                    }
                    this._setState(1 /* Active */);
                    this._setActiveIndex(index);
                }
                else {
                    if (hitTestMenus(this._childMenu, x, y)) {
                        return;
                    }
                    this._setState(0 /* Inactive */);
                    var index = firstWrap(this._nodes, function (n) { return hitTest(n, x, y); }, 0);
                    var ok = isSelectable(this._items[index]);
                    this._setActiveIndex(ok ? index : -1);
                }
            };
            /**
             * Handle the 'mousemove' event for the menu bar.
             */
            MenuBar.prototype.domEvent_mousemove = function (event) {
                var x = event.clientX;
                var y = event.clientY;
                var index = firstWrap(this._nodes, function (n) { return hitTest(n, x, y); }, 0);
                if (index === this._activeIndex) {
                    return;
                }
                if (index === -1 && this._state === 1 /* Active */) {
                    return;
                }
                var ok = isSelectable(this._items[index]);
                this._setActiveIndex(ok ? index : -1);
            };
            /**
             * Handle the 'mouseleave' event for the menu bar.
             */
            MenuBar.prototype.domEvent_mouseleave = function (event) {
                if (this._state === 0 /* Inactive */) {
                    this._setActiveIndex(-1);
                }
            };
            /**
             * Handle the 'keydown' event for the menu bar.
             */
            MenuBar.prototype.domEvent_keydown = function (event) {
                event.stopPropagation();
                var menu = this._childMenu;
                var leaf = menu && panels.Menu.leafMenu(menu);
                switch (event.keyCode) {
                    case 13:
                        event.preventDefault();
                        if (leaf)
                            leaf.triggerActiveItem();
                        break;
                    case 27:
                        event.preventDefault();
                        if (leaf && leaf !== menu) {
                            leaf.close();
                        }
                        else {
                            this._setState(0 /* Inactive */);
                            this._setActiveIndex(-1);
                        }
                        break;
                    case 37:
                        event.preventDefault();
                        if (leaf && leaf !== menu) {
                            leaf.close();
                        }
                        else {
                            this.activatePreviousItem();
                        }
                        break;
                    case 38:
                        event.preventDefault();
                        if (leaf)
                            leaf.activatePreviousItem();
                        break;
                    case 39:
                        event.preventDefault();
                        if (!leaf || !leaf.openActiveItem()) {
                            this.activateNextItem();
                        }
                        break;
                    case 40:
                        event.preventDefault();
                        if (leaf)
                            leaf.activateNextItem();
                        break;
                    default:
                        break;
                }
            };
            /**
             * Handle the 'keypress' event for the menu bar.
             */
            MenuBar.prototype.domEvent_keypress = function (event) {
                event.preventDefault();
                event.stopPropagation();
                var str = String.fromCharCode(event.charCode);
                if (this._childMenu) {
                    panels.Menu.leafMenu(this._childMenu).activateMnemonicItem(str);
                }
                else {
                    this.activateMnemonicItem(str);
                }
            };
            /**
             * Set the active item index for the menu bar.
             *
             * If the index points to an item, it is assumed to be selectable.
             *
             * This will take the appropriate action based on the menu bar state.
             */
            MenuBar.prototype._setActiveIndex = function (index) {
                var curr = this._nodes[this._activeIndex];
                var next = this._nodes[index];
                this._activeIndex = index;
                if (curr) {
                    curr.classList.remove(ACTIVE_CLASS);
                    curr.classList.remove(SELECTED_CLASS);
                }
                if (next) {
                    next.classList.add(ACTIVE_CLASS);
                }
                if (next && this._state !== 0 /* Inactive */) {
                    next.classList.add(SELECTED_CLASS);
                }
                this._closeChildMenu();
                if (!next || this._state !== 1 /* Active */) {
                    return;
                }
                var item = this._items[index];
                if (!item.submenu) {
                    return;
                }
                this._openChildMenu(item.submenu, next);
            };
            /**
             * Open the menu item's submenu using the node for location.
             */
            MenuBar.prototype._openChildMenu = function (menu, node) {
                var rect = node.getBoundingClientRect();
                this._childMenu = menu;
                menu.node.classList.add(MENU_CLASS);
                menu.closed.connect(this._mn_closed, this);
                menu.open(rect.left, rect.bottom, false, true);
            };
            /**
             * Close the current child menu, if one exists.
             */
            MenuBar.prototype._closeChildMenu = function () {
                if (this._childMenu) {
                    this._childMenu.node.classList.remove(MENU_CLASS);
                    this._childMenu.closed.disconnect(this._mn_closed, this);
                    this._childMenu.close();
                    this._childMenu = null;
                }
            };
            /**
             * Set the state mode for the menu bar.
             *
             * This will update the menu bar event listeners accordingly.
             */
            MenuBar.prototype._setState = function (state) {
                if (state === this._state) {
                    return;
                }
                if (state === 0 /* Inactive */) {
                    this._useInactiveListeners();
                }
                else {
                    this._useActiveListeners();
                }
                this._state = state;
            };
            /**
             * Update the event listeners for the inactive state.
             */
            MenuBar.prototype._useInactiveListeners = function () {
                var _this = this;
                setTimeout(function () {
                    _this.node.addEventListener('mousedown', _this);
                    document.removeEventListener('mousedown', _this, true);
                    document.removeEventListener('keydown', _this, true);
                    document.removeEventListener('keypress', _this, true);
                }, 0);
            };
            /**
             * Update the event listeners for the active and open states.
             */
            MenuBar.prototype._useActiveListeners = function () {
                var _this = this;
                setTimeout(function () {
                    _this.node.removeEventListener('mousedown', _this);
                    document.addEventListener('mousedown', _this, true);
                    document.addEventListener('keydown', _this, true);
                    document.addEventListener('keypress', _this, true);
                }, 0);
            };
            /**
             * Handle the `closed` signal from the child menu.
             */
            MenuBar.prototype._mn_closed = function (sender) {
                sender.closed.disconnect(this._mn_closed, this);
                sender.node.classList.remove(MENU_CLASS);
                this._childMenu = null;
                this._setState(0 /* Inactive */);
                this._setActiveIndex(-1);
            };
            /**
             * Handle the `changed` signal from a menu item.
             */
            MenuBar.prototype._mi_changed = function (sender) {
                var items = this._items;
                var nodes = this._nodes;
                for (var i = 0, n = items.length; i < n; ++i) {
                    if (items[i] !== sender) {
                        continue;
                    }
                    if (i === this._activeIndex) {
                        this._setState(0 /* Inactive */);
                        this._setActiveIndex(-1);
                    }
                    initItemNode(sender, nodes[i]);
                }
            };
            return MenuBar;
        })(panels.Panel);
        panels.MenuBar = MenuBar;
        /**
         * An internal enum describing the current state of the menu bar.
         */
        var MBState;
        (function (MBState) {
            MBState[MBState["Inactive"] = 0] = "Inactive";
            MBState[MBState["Active"] = 1] = "Active";
        })(MBState || (MBState = {}));
        ;
        /**
         * Test whether the menu bar item is selectable.
         *
         * This returns true if the item is enabled and not a separator.
         */
        function isSelectable(item) {
            return item && item.type !== 'separator' && item.enabled;
        }
        /**
         * Hit test the chain menus for the given client position.
         */
        function hitTestMenus(menu, x, y) {
            while (menu) {
                if (hitTest(menu.node, x, y)) {
                    return true;
                }
                menu = menu.childMenu;
            }
            return false;
        }
        /**
         * Create and initialize the node for a menu item.
         */
        function createItemNode(item) {
            var node = document.createElement('li');
            var icon = document.createElement('span');
            var text = document.createElement('span');
            icon.className = ICON_CLASS;
            text.className = TEXT_CLASS;
            node.appendChild(icon);
            node.appendChild(text);
            initItemNode(item, node);
            return node;
        }
        /**
         * Initialize the node for a menu item.
         *
         * This can be called again to update the node state.
         */
        function initItemNode(item, node) {
            var classParts = [MENU_ITEM_CLASS];
            if (item.className) {
                classParts.push(item.className);
            }
            if (item.type === 'separator') {
                classParts.push(SEPARATOR_TYPE_CLASS);
            }
            if (!item.enabled) {
                classParts.push(DISABLED_CLASS);
            }
            node.className = classParts.join(' ');
            node.children[1].textContent = item.text;
        }
        function firstWrap(items, cb, s) {
            for (var i = 0, n = items.length; i < n; ++i) {
                var j = (s + i) % n;
                if (cb(items[j]))
                    return j;
            }
            return -1;
        }
        function lastWrap(items, cb, s) {
            for (var i = 0, n = items.length; i < n; ++i) {
                var j = (((s - i) % n) + n) % n;
                if (cb(items[j]))
                    return j;
            }
            return -1;
        }
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // modulephosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * A layout in which positions a single child at time.
         *
         * This is useful for panels which hold a single content child.
         */
        var SingleLayout = (function (_super) {
            __extends(SingleLayout, _super);
            /**
             * Construct a new single layout.
             */
            function SingleLayout(panel) {
                _super.call(this);
                this._dirty = true;
                this._sizeHint = null;
                this._minSize = null;
                this._maxSize = null;
                this._item = null;
                if (panel)
                    this.panel = panel;
            }
            /**
             * Dispose of the resources held by the layout.
             */
            SingleLayout.prototype.dispose = function () {
                this._item = null;
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(SingleLayout.prototype, "panel", {
                /**
                 * Get the panel managed by the layout.
                 */
                get: function () {
                    var item = this._item;
                    return item ? item.panel : null;
                },
                /**
                 * Set the panel managed by the layout.
                 */
                set: function (panel) {
                    var item = this._item;
                    if (item && item.panel === panel) {
                        return;
                    }
                    if (panel) {
                        this._item = new panels.PanelItem(panel);
                        this.ensureParent(panel);
                    }
                    else {
                        this._item = null;
                    }
                    this.invalidate();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SingleLayout.prototype, "count", {
                /**
                 * Get the number of layout items in the layout.
                 */
                get: function () {
                    return this._item ? 1 : 0;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the layout item at the specified index.
             */
            SingleLayout.prototype.itemAt = function (index) {
                var item = this._item;
                if (item && index === 0) {
                    return item;
                }
                return void 0;
            };
            /**
             * Remove and return the layout item at the specified index.
             */
            SingleLayout.prototype.takeAt = function (index) {
                var item = this._item;
                if (item && index === 0) {
                    this._item = null;
                    this.invalidate();
                    return item;
                }
                return void 0;
            };
            /**
             * Invalidate the cached layout data and enqueue an update.
             */
            SingleLayout.prototype.invalidate = function () {
                this._dirty = true;
                _super.prototype.invalidate.call(this);
            };
            /**
             * Compute the preferred size of the layout.
             */
            SingleLayout.prototype.sizeHint = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._sizeHint;
            };
            /**
             * Compute the minimum size of the layout.
             */
            SingleLayout.prototype.minSize = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._minSize;
            };
            /**
             * Compute the maximum size of the layout.
             */
            SingleLayout.prototype.maxSize = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._maxSize;
            };
            /**
             * Update the geometry of the child layout items.
             */
            SingleLayout.prototype.layout = function () {
                // Bail early when no work needs to be done.
                var parent = this.parent;
                var item = this._item;
                if (!parent || !item) {
                    return;
                }
                // Refresh the layout items if needed.
                if (this._dirty) {
                    this._setupGeometry();
                }
                // Update the geometry of the visible item.
                var boxD = parent.boxData;
                var x = boxD.paddingLeft;
                var y = boxD.paddingTop;
                var w = parent.width - boxD.horizontalSum;
                var h = parent.height - boxD.verticalSum;
                item.setGeometry(x, y, w, h);
            };
            /**
             * Initialize the layout items and internal sizes for the layout.
             */
            SingleLayout.prototype._setupGeometry = function () {
                // Bail early when no work needs to be done.
                if (!this._dirty) {
                    return;
                }
                this._dirty = false;
                // No parent means the layout is not yet attached.
                var parent = this.parent;
                if (!parent) {
                    var zero = new panels.Size(0, 0);
                    this._sizeHint = zero;
                    this._minSize = zero;
                    this._maxSize = zero;
                    return;
                }
                // Compute the size bounds based on the panel item.
                var hintW = 0;
                var hintH = 0;
                var minW = 0;
                var minH = 0;
                var maxW = Infinity;
                var maxH = Infinity;
                var item = this._item;
                if (item) {
                    item.invalidate();
                    var itemHint = item.sizeHint();
                    var itemMin = item.minSize();
                    var itemMax = item.maxSize();
                    hintW = Math.max(hintW, itemHint.width);
                    hintH = Math.max(hintH, itemHint.height);
                    minW = Math.max(minW, itemMin.width);
                    minH = Math.max(minH, itemMin.height);
                    maxW = Math.min(maxW, itemMax.width);
                    maxH = Math.min(maxH, itemMax.height);
                }
                // Account for padding and border on the parent.
                var boxD = parent.boxData;
                var boxW = boxD.horizontalSum;
                var boxH = boxD.verticalSum;
                hintW += boxW;
                hintH += boxH;
                minW += boxW;
                minH += boxH;
                maxW += boxW;
                maxH += boxH;
                // Update the internal sizes.
                this._sizeHint = new panels.Size(hintW, hintH);
                this._minSize = new panels.Size(minW, minH);
                this._maxSize = new panels.Size(maxW, maxH);
            };
            return SingleLayout;
        })(panels.Layout);
        panels.SingleLayout = SingleLayout;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * The class name added to SinglePanel instances.
         */
        var SINGLE_PANEL_CLASS = 'p-SinglePanel';
        /**
         * A panel which holds a single child.
         *
         * This panel delegates to a permanently installed single layout and
         * can be used as a more convenient interface to a single layout.
         */
        var SinglePanel = (function (_super) {
            __extends(SinglePanel, _super);
            /**
             * Construct a new single panel.
             */
            function SinglePanel(panel) {
                _super.call(this);
                this.node.classList.add(SINGLE_PANEL_CLASS);
                this.layout = new panels.SingleLayout(panel);
                this.setFlag(16 /* DisallowLayoutChange */);
            }
            Object.defineProperty(SinglePanel.prototype, "panel", {
                /**
                 * Get the managed child panel.
                 */
                get: function () {
                    return this.layout.panel;
                },
                /**
                 * Set the managed child panel.
                 */
                set: function (panel) {
                    this.layout.panel = panel;
                },
                enumerable: true,
                configurable: true
            });
            return SinglePanel;
        })(panels.Panel);
        panels.SinglePanel = SinglePanel;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * The class name assigned to a split handle.
         */
        var HANDLE_CLASS = 'p-SplitHandle';
        /**
         * The class name assigned to a split handle overlay.
         */
        var OVERLAY_CLASS = 'p-SplitHandle-overlay';
        /**
         * The class name added to horizontal split handles.
         */
        var HORIZONTAL_CLASS = 'p-mod-horizontal';
        /**
         * The class name added to vertical split handles.
         */
        var VERTICAL_CLASS = 'p-mod-vertical';
        /**
         * The class name added to hidden split handles.
         */
        var HIDDEN_CLASS = 'p-mod-hidden';
        /**
         * A class which manages a handle node for a split panel.
         */
        var SplitHandle = (function () {
            /**
             * Construct a new split handle.
             */
            function SplitHandle(orientation) {
                this._hidden = false;
                this._node = this.createNode();
                this.orientation = orientation;
            }
            Object.defineProperty(SplitHandle.prototype, "hidden", {
                /**
                 * Get whether the handle is hidden.
                 */
                get: function () {
                    return this._hidden;
                },
                /**
                 * Set whether the handle is hidden.
                 */
                set: function (hidden) {
                    if (hidden === this._hidden) {
                        return;
                    }
                    this._hidden = hidden;
                    if (hidden) {
                        this._node.classList.add(HIDDEN_CLASS);
                    }
                    else {
                        this._node.classList.remove(HIDDEN_CLASS);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SplitHandle.prototype, "orientation", {
                /**
                 * Get the orientation of the handle.
                 */
                get: function () {
                    return this._orientation;
                },
                /**
                 * Set the orientation of the handle.
                 */
                set: function (value) {
                    if (value === this._orientation) {
                        return;
                    }
                    this._orientation = value;
                    if (value === 0 /* Horizontal */) {
                        this._node.classList.remove(VERTICAL_CLASS);
                        this._node.classList.add(HORIZONTAL_CLASS);
                    }
                    else {
                        this._node.classList.remove(HORIZONTAL_CLASS);
                        this._node.classList.add(VERTICAL_CLASS);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SplitHandle.prototype, "node", {
                /**
                 * Get the DOM node for the handle.
                 */
                get: function () {
                    return this._node;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Create the DOM node for the handle.
             */
            SplitHandle.prototype.createNode = function () {
                var node = document.createElement('div');
                var overlay = document.createElement('div');
                node.className = HANDLE_CLASS;
                overlay.className = OVERLAY_CLASS;
                node.appendChild(overlay);
                return node;
            };
            return SplitHandle;
        })();
        panels.SplitHandle = SplitHandle;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // modulephosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * A layout which arranges its panels in resizable sections.
         */
        var SplitLayout = (function (_super) {
            __extends(SplitLayout, _super);
            /**
             * Construct a new split layout.
             */
            function SplitLayout(orientation) {
                _super.call(this);
                this._dirty = true;
                this._handleSize = 3;
                this._fixedSpace = 0;
                this._sizeHint = null;
                this._minSize = null;
                this._maxSize = null;
                this._items = [];
                this._sizers = [];
                this._orientation = orientation;
            }
            /**
             * Dispose of the resources held by the layout.
             */
            SplitLayout.prototype.dispose = function () {
                this._items = null;
                this._sizers = null;
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(SplitLayout.prototype, "orientation", {
                /**
                 * Get the orientation of the split layout.
                 */
                get: function () {
                    return this._orientation;
                },
                /**
                 * Set the orientation of the split layout.
                 */
                set: function (orient) {
                    if (orient === this._orientation) {
                        return;
                    }
                    this._orientation = orient;
                    this.invalidate();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SplitLayout.prototype, "handleSize", {
                /**
                 * Get the size of the split handles.
                 */
                get: function () {
                    return this._handleSize;
                },
                /**
                 * Set the the size of the split handles.
                 */
                set: function (size) {
                    size = Math.max(0, size | 0);
                    if (size === this._handleSize) {
                        return;
                    }
                    this._handleSize = size;
                    this.invalidate();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SplitLayout.prototype, "count", {
                /**
                 * Get the number of layout items in the layout.
                 */
                get: function () {
                    return this._items.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the normalized sizes of the items in the layout.
             */
            SplitLayout.prototype.sizes = function () {
                return normalize(this._sizers.map(function (it) { return it.size; }));
            };
            /**
             * Set the relative sizes for the split items.
             *
             * Extra values are ignored, too few will yield an undefined layout.
             */
            SplitLayout.prototype.setSizes = function (sizes) {
                var parent = this.parent;
                if (!parent) {
                    return;
                }
                var totalSize;
                var boxD = parent.boxData;
                if (this._orientation === 0 /* Horizontal */) {
                    totalSize = parent.width - boxD.horizontalSum - this._fixedSpace;
                }
                else {
                    totalSize = parent.height - boxD.verticalSum - this._fixedSpace;
                }
                var sizers = this._sizers;
                var normed = normalize(sizes);
                var n = Math.min(sizers.length, normed.length);
                for (var i = 0; i < n; ++i) {
                    sizers[i].sizeHint = Math.round(normed[i] * totalSize);
                }
                if (parent.isVisible) {
                    this.layout();
                }
            };
            /**
             * Get the splitter handle at the given index.
             */
            SplitLayout.prototype.handleAt = function (index) {
                var item = this._items[index];
                return item ? item.handle : void 0;
            };
            /**
             * Get the layout item at the specified index.
             */
            SplitLayout.prototype.itemAt = function (index) {
                return this._items[index];
            };
            /**
             * Remove and return the layout item at the specified index.
             */
            SplitLayout.prototype.takeAt = function (index) {
                index = index | 0;
                if (index < 0 || index >= this._items.length) {
                    return void 0;
                }
                var item = this._items.splice(index, 1)[0];
                this._sizers.splice(index, 1);
                var hNode = item.handle.node;
                var pNode = hNode.parentNode;
                if (pNode)
                    pNode.removeChild(hNode);
                this.invalidate();
                return item;
            };
            /**
             * Add a panel as the last item in the layout.
             *
             * If the panel already exists in the layout, it will be moved.
             *
             * Returns the index of the added panel.
             */
            SplitLayout.prototype.addPanel = function (panel) {
                return this.insertPanel(this.count, panel);
            };
            /**
             * Insert a panel into the layout at the given index.
             *
             * If the panel already exists in the layout, it will be moved.
             *
             * Returns the index of the added panel.
             */
            SplitLayout.prototype.insertPanel = function (index, panel) {
                this.remove(panel);
                this.ensureParent(panel);
                var handle = new panels.SplitHandle(this._orientation);
                var item = new SplitItem(panel, handle);
                var sizer = new panels.LayoutSizer();
                index = Math.max(0, Math.min(index, this._items.length));
                this._items.splice(index, 0, item);
                this._sizers.splice(index, 0, sizer);
                this.invalidate();
                return index;
            };
            /**
             * Move the handle at the given index to the offset position.
             *
             * This will move the handle as close as possible to the given
             * offset position, without violating item size constraints.
             */
            SplitLayout.prototype.moveHandle = function (index, pos) {
                var item = this._items[index];
                if (!item || item.handle.hidden) {
                    return;
                }
                var delta;
                if (this._orientation === 0 /* Horizontal */) {
                    delta = pos - item.handle.node.offsetLeft;
                }
                else {
                    delta = pos - item.handle.node.offsetTop;
                }
                if (delta === 0) {
                    return;
                }
                var sizers = this._sizers;
                if (delta > 0) {
                    growSizer(sizers, index, delta);
                }
                else {
                    sizers.reverse();
                    growSizer(sizers, sizers.length - (index + 2), -delta);
                    sizers.reverse();
                }
                this.layout();
            };
            /**
             * Invalidate the cached layout data and enqueue an update.
             */
            SplitLayout.prototype.invalidate = function () {
                this._dirty = true;
                _super.prototype.invalidate.call(this);
            };
            /**
             * Compute the preferred size of the layout.
             */
            SplitLayout.prototype.sizeHint = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._sizeHint;
            };
            /**
             * Compute the minimum size of the layout.
             */
            SplitLayout.prototype.minSize = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._minSize;
            };
            /**
             * Compute the maximum size of the layout.
             */
            SplitLayout.prototype.maxSize = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._maxSize;
            };
            /**
             * Update the geometry of the child layout items.
             */
            SplitLayout.prototype.layout = function () {
                // Bail early when no work needs to be done.
                var parent = this.parent;
                var items = this._items;
                if (!parent || items.length === 0) {
                    return;
                }
                // Refresh the layout items if needed.
                if (this._dirty) {
                    this._setupGeometry();
                }
                // Setup commonly used variables.
                var boxD = parent.boxData;
                var width = parent.width - boxD.horizontalSum;
                var height = parent.height - boxD.verticalSum;
                var orient = this._orientation;
                var sizers = this._sizers;
                // Distribute the layout space to the sizers.
                var mainSpace = orient === 0 /* Horizontal */ ? width : height;
                panels.layoutCalc(sizers, mainSpace - this._fixedSpace);
                // Update the geometry of the items according to the orientation.
                var y = boxD.paddingTop;
                var x = boxD.paddingLeft;
                var hSize = this._handleSize;
                var count = items.length;
                if (orient === 0 /* Horizontal */) {
                    for (var i = 0; i < count; ++i) {
                        var item = items[i];
                        if (item.isHidden) {
                            continue;
                        }
                        var size = sizers[i].size;
                        var hStyle = item.handle.node.style;
                        item.setGeometry(x, y, size, height);
                        hStyle.top = y + 'px';
                        hStyle.left = x + size + 'px';
                        hStyle.width = hSize + 'px';
                        hStyle.height = height + 'px';
                        x += size + hSize;
                    }
                }
                else {
                    for (var i = 0; i < count; ++i) {
                        var item = items[i];
                        if (item.isHidden) {
                            continue;
                        }
                        var size = sizers[i].size;
                        var hStyle = item.handle.node.style;
                        item.setGeometry(x, y, width, size);
                        hStyle.top = y + size + 'px';
                        hStyle.left = x + 'px';
                        hStyle.width = width + 'px';
                        hStyle.height = hSize + 'px';
                        y += size + hSize;
                    }
                }
            };
            /**
             * Initialize the layout items and internal sizes for the layout.
             */
            SplitLayout.prototype._setupGeometry = function () {
                // Bail early when no work needs to be done.
                if (!this._dirty) {
                    return;
                }
                this._dirty = false;
                // No parent means the layout is not yet attached.
                var parent = this.parent;
                if (!parent) {
                    var zero = new panels.Size(0, 0);
                    this._sizeHint = zero;
                    this._minSize = zero;
                    this._maxSize = zero;
                    this._fixedSpace = 0;
                    return;
                }
                // Invalidate the layout items and reset the handles for the current
                // orientation. Hide the handles associated with a hidden item and
                // the handle node is attached to the parent node. Traverse the
                // items backwards and hide the first visible item handle.
                var hidFirst = false;
                var pNode = parent.node;
                var orient = this._orientation;
                var items = this._items;
                var count = items.length;
                for (var i = count - 1; i >= 0; --i) {
                    var item = items[i];
                    var handle = item.handle;
                    var hNode = handle.node;
                    item.invalidate();
                    handle.orientation = orient;
                    handle.hidden = item.isHidden;
                    if (hNode.parentNode !== pNode) {
                        pNode.appendChild(hNode);
                    }
                    if (!hidFirst && !item.isHidden) {
                        item.handle.hidden = true;
                        hidFirst = true;
                    }
                }
                // Setup commonly used variables.
                var hintW = 0;
                var hintH = 0;
                var minW = 0;
                var minH = 0;
                var maxW;
                var maxH;
                var fixedSpace = 0;
                var handleSize = this._handleSize;
                var sizers = this._sizers;
                // Compute the size bounds according to the splitter orientation.
                // The size hints for the sizers are explicitly not updated. The
                // size hint for a panel is only adjusted when the user moves a
                // handle. This allows the panels to remain well-sized when their
                // siblings panels are added of removed or when the panel is shown
                // or hidden (see the growItem function).
                if (orient === 0 /* Horizontal */) {
                    maxH = Infinity;
                    maxW = count > 0 ? 0 : Infinity;
                    for (var i = 0; i < count; ++i) {
                        var item = items[i];
                        var sizer = sizers[i];
                        if (item.isHidden) {
                            sizer.expansive = false;
                            sizer.stretch = 0;
                            sizer.minSize = 0;
                            sizer.maxSize = 0;
                            continue;
                        }
                        var itemHint = item.sizeHint();
                        var itemMin = item.minSize();
                        var itemMax = item.maxSize();
                        hintH = Math.max(hintH, itemHint.height);
                        minH = Math.max(minH, itemMin.height);
                        maxH = Math.min(maxH, itemMax.height);
                        hintW += itemHint.width;
                        minW += itemMin.width;
                        maxW += itemMax.width;
                        sizer.expansive = item.expandHorizontal;
                        sizer.stretch = item.horizontalStretch;
                        sizer.minSize = itemMin.width;
                        sizer.maxSize = itemMax.width;
                        if (!item.handle.hidden) {
                            fixedSpace += handleSize;
                        }
                    }
                    hintW += fixedSpace;
                    minW += fixedSpace;
                    maxW += fixedSpace;
                }
                else {
                    maxW = Infinity;
                    maxH = count > 0 ? 0 : Infinity;
                    for (var i = 0; i < count; ++i) {
                        var item = items[i];
                        var sizer = sizers[i];
                        if (item.isHidden) {
                            sizer.expansive = false;
                            sizer.stretch = 0;
                            sizer.minSize = 0;
                            sizer.maxSize = 0;
                            continue;
                        }
                        var itemHint = item.sizeHint();
                        var itemMin = item.minSize();
                        var itemMax = item.maxSize();
                        hintW = Math.max(hintW, itemHint.width);
                        minW = Math.max(minW, itemMin.width);
                        maxW = Math.min(maxW, itemMax.width);
                        hintH += itemHint.height;
                        minH += itemMin.height;
                        maxH += itemMax.height;
                        sizer.expansive = item.expandVertical;
                        sizer.stretch = item.verticalStretch;
                        sizer.minSize = itemMin.height;
                        sizer.maxSize = itemMax.height;
                        if (!item.handle.hidden) {
                            fixedSpace += handleSize;
                        }
                    }
                    hintH += fixedSpace;
                    minH += fixedSpace;
                    maxH += fixedSpace;
                }
                // Account for padding and border on the parent.
                var boxD = parent.boxData;
                var boxW = boxD.horizontalSum;
                var boxH = boxD.verticalSum;
                hintW += boxW;
                hintH += boxH;
                minW += boxW;
                minH += boxH;
                maxW += boxW;
                maxH += boxH;
                // Update the internal sizes.
                this._sizeHint = new panels.Size(hintW, hintH);
                this._minSize = new panels.Size(minW, minH);
                this._maxSize = new panels.Size(maxW, maxH);
                this._fixedSpace = fixedSpace;
            };
            return SplitLayout;
        })(panels.Layout);
        panels.SplitLayout = SplitLayout;
        /**
         * A custom panel item used by a split layout.
         */
        var SplitItem = (function (_super) {
            __extends(SplitItem, _super);
            /**
             * Construct a new split item.
             */
            function SplitItem(panel, handle) {
                _super.call(this, panel);
                this._handle = handle;
            }
            Object.defineProperty(SplitItem.prototype, "handle", {
                /**
                 * Get the split handle for the item.
                 */
                get: function () {
                    return this._handle;
                },
                enumerable: true,
                configurable: true
            });
            return SplitItem;
        })(panels.PanelItem);
        panels.SplitItem = SplitItem;
        /**
         * Grow a sizer to the right by a positive delta.
         *
         * This will adjust the sizer's neighbors if required.
         *
         * Before adjusting the sizer, the size hints of all sizers will be
         * updated to their current size. This allows the sections to remain
         * well sized on the subsequent layout since the size hint is the
         * effective input to the `layoutCalc` function.
         */
        function growSizer(sizers, index, delta) {
            for (var i = 0, n = sizers.length; i < n; ++i) {
                var sizer = sizers[i];
                sizer.sizeHint = sizer.size;
            }
            var growLimit = 0;
            for (var i = 0; i <= index; ++i) {
                var sizer = sizers[i];
                growLimit += sizer.maxSize - sizer.size;
            }
            var shrinkLimit = 0;
            for (var i = index + 1, n = sizers.length; i < n; ++i) {
                var sizer = sizers[i];
                shrinkLimit += sizer.size - sizer.minSize;
            }
            delta = Math.min(delta, growLimit, shrinkLimit);
            var grow = delta;
            for (var i = index; i >= 0 && grow > 0; --i) {
                var sizer = sizers[i];
                var limit = sizer.maxSize - sizer.size;
                if (limit >= grow) {
                    sizer.sizeHint = sizer.size + grow;
                    grow = 0;
                }
                else {
                    sizer.sizeHint = sizer.size + limit;
                    grow -= limit;
                }
            }
            var shrink = delta;
            for (var i = index + 1, n = sizers.length; i < n && shrink > 0; ++i) {
                var sizer = sizers[i];
                var limit = sizer.size - sizer.minSize;
                if (limit >= shrink) {
                    sizer.sizeHint = sizer.size - shrink;
                    shrink = 0;
                }
                else {
                    sizer.sizeHint = sizer.size - limit;
                    shrink -= limit;
                }
            }
        }
        /**
         * Normalize an array of positive values.
         */
        function normalize(values) {
            var n = values.length;
            if (n === 0) {
                return [];
            }
            var sum = 0;
            for (var i = 0; i < n; ++i) {
                sum += values[i];
            }
            var result = new Array(n);
            if (sum === 0) {
                for (var i = 0; i < n; ++i) {
                    result[i] = 1 / n;
                }
            }
            else {
                for (var i = 0; i < n; ++i) {
                    result[i] = values[i] / sum;
                }
            }
            return result;
        }
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var overrideCursor = phosphor.domutil.overrideCursor;
        /**
         * The class name added to SplitPanel instances.
         */
        var SPLIT_PANEL_CLASS = 'p-SplitPanel';
        /**
         * A panel which separates its children into resizable sections.
         *
         * This panel delegates to a permanently installed split layout and
         * can be used as a more convenient interface to a split layout.
         */
        var SplitPanel = (function (_super) {
            __extends(SplitPanel, _super);
            /**
             * Construct a new split panel.
             */
            function SplitPanel(orientation) {
                if (orientation === void 0) { orientation = 0 /* Horizontal */; }
                _super.call(this);
                this._pressData = null;
                this.node.classList.add(SPLIT_PANEL_CLASS);
                this.layout = new panels.SplitLayout(orientation);
                this.setFlag(16 /* DisallowLayoutChange */);
            }
            /**
             * Dispose of the resources held by the panel.
             */
            SplitPanel.prototype.dispose = function () {
                this._releaseMouse();
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(SplitPanel.prototype, "orientation", {
                /**
                 * Get the orientation of the split panel.
                 */
                get: function () {
                    return this.layout.orientation;
                },
                /**
                 * Set the orientation of the split panel.
                 */
                set: function (orient) {
                    this.layout.orientation = orient;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SplitPanel.prototype, "handleSize", {
                /**
                 * Get the size of the split handles.
                 */
                get: function () {
                    return this.layout.handleSize;
                },
                /**
                 * Set the the size of the split handles.
                 */
                set: function (size) {
                    this.layout.handleSize = size;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SplitPanel.prototype, "count", {
                /**
                 * Get the number of child panels in the split panel.
                 */
                get: function () {
                    return this.layout.count;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the normalized sizes of the children in the split panel.
             */
            SplitPanel.prototype.sizes = function () {
                return this.layout.sizes();
            };
            /**
             * Set the relative sizes for the split panel children.
             *
             * Extra values are ignored, too few will yield an undefined layout.
             */
            SplitPanel.prototype.setSizes = function (sizes) {
                this.layout.setSizes(sizes);
            };
            /**
             * Get the index of the given panel.
             *
             * Returns -1 if the panel is not found.
             */
            SplitPanel.prototype.indexOf = function (panel) {
                return this.layout.indexOf(panel);
            };
            /**
             * Get the panel at the given index.
             *
             * Returns `undefined` if there is no panel at the given index.
             */
            SplitPanel.prototype.panelAt = function (index) {
                return this.layout.panelAt(index);
            };
            /**
             * Add a child panel to the end of the split panel.
             *
             * If the panel already exists, it will be moved.
             *
             * Returns the index of the added panel.
             */
            SplitPanel.prototype.addPanel = function (panel) {
                return this.layout.addPanel(panel);
            };
            /**
             * Insert a child panel into the split panel at the given index.
             *
             * If the panel already exists, it will be moved.
             *
             * Returns the index of the added panel.
             */
            SplitPanel.prototype.insertPanel = function (index, panel) {
                return this.layout.insertPanel(index, panel);
            };
            /**
             * A method invoked after the node is attached to the DOM.
             */
            SplitPanel.prototype.onAfterAttach = function (msg) {
                this.node.addEventListener('mousedown', this);
            };
            /**
             * A method invoked after the node is detached from the DOM.
             */
            SplitPanel.prototype.onAfterDetach = function (msg) {
                this.node.removeEventListener('mousedown', this);
            };
            /**
             * Handle the DOM events for the splitter.
             */
            SplitPanel.prototype.handleEvent = function (event) {
                switch (event.type) {
                    case 'mousedown':
                        this.domEvent_mousedown(event);
                        break;
                    case 'mouseup':
                        this.domEvent_mouseup(event);
                        break;
                    case 'mousemove':
                        this.domEvent_mousemove(event);
                        break;
                    default:
                        break;
                }
            };
            /**
             * Handle the 'mousedown' event for the splitter.
             */
            SplitPanel.prototype.domEvent_mousedown = function (event) {
                if (event.button !== 0) {
                    return;
                }
                var data = this._findHandle(event.target);
                if (!data) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                document.addEventListener('mouseup', this, true);
                document.addEventListener('mousemove', this, true);
                var delta;
                var node = data.handle.node;
                var rect = node.getBoundingClientRect();
                if (this.orientation === 0 /* Horizontal */) {
                    delta = event.clientX - rect.left;
                }
                else {
                    delta = event.clientY - rect.top;
                }
                var grab = overrideCursor(window.getComputedStyle(node).cursor);
                this._pressData = { index: data.index, delta: delta, grab: grab };
            };
            /**
             * Handle the 'mouseup' event for the splitter.
             */
            SplitPanel.prototype.domEvent_mouseup = function (event) {
                if (event.button !== 0) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                this._releaseMouse();
            };
            /**
             * Handle the 'mousemove' event for the splitter.
             */
            SplitPanel.prototype.domEvent_mousemove = function (event) {
                event.preventDefault();
                event.stopPropagation();
                var pos;
                var data = this._pressData;
                var rect = this.node.getBoundingClientRect();
                var layout = this.layout;
                if (layout.orientation === 0 /* Horizontal */) {
                    pos = event.clientX - data.delta - rect.left;
                }
                else {
                    pos = event.clientY - data.delta - rect.top;
                }
                layout.moveHandle(data.index, pos);
            };
            /**
             * Find the index of the handle which contains a target element.
             */
            SplitPanel.prototype._findHandle = function (target) {
                var layout = this.layout;
                for (var i = 0, n = layout.count; i < n; ++i) {
                    var handle = layout.handleAt(i);
                    if (handle.node.contains(target)) {
                        return { index: i, handle: handle };
                    }
                }
                return null;
            };
            /**
             * Release the mouse grab for the splitter.
             */
            SplitPanel.prototype._releaseMouse = function () {
                if (!this._pressData) {
                    return;
                }
                this._pressData.grab.dispose();
                this._pressData = null;
                document.removeEventListener('mouseup', this, true);
                document.removeEventListener('mousemove', this, true);
            };
            return SplitPanel;
        })(panels.Panel);
        panels.SplitPanel = SplitPanel;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var Signal = phosphor.core.Signal;
        /**
         * A layout in which only one child panel is visible at a time.
         */
        var StackLayout = (function (_super) {
            __extends(StackLayout, _super);
            /**
             * Construct a new stack layout.
             */
            function StackLayout() {
                _super.call(this);
                /**
                 * A signal emitted when the current index is changed.
                 */
                this.currentChanged = new Signal();
                /**
                 * A signal emitted when a panel is removed from the layout.
                 */
                this.panelRemoved = new Signal();
                this._dirty = true;
                this._currentIndex = -1;
                this._sizeHint = null;
                this._minSize = null;
                this._maxSize = null;
                this._items = [];
            }
            /**
             * Dispose of the resources held by the layout.
             */
            StackLayout.prototype.dispose = function () {
                this._items = null;
                this.currentChanged.disconnect();
                this.panelRemoved.disconnect();
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(StackLayout.prototype, "currentIndex", {
                /**
                 * Get the current index of the stack.
                 */
                get: function () {
                    return this._currentIndex;
                },
                /**
                 * Set the current index of the stack.
                 */
                set: function (index) {
                    var prev = this.currentPanel;
                    var next = this.panelAt(index);
                    if (prev === next) {
                        return;
                    }
                    index = next ? index : -1;
                    this._currentIndex = index;
                    if (prev)
                        prev.hide();
                    if (next)
                        next.show();
                    // IE repaints before firing the animation frame which processes
                    // the layout event triggered by the show/hide calls above. This
                    // causes unsightly flicker when changing the visible panel. To
                    // avoid this, the layout is updated immediately.
                    this.layout();
                    this.currentChanged.emit(this, { index: index, panel: next });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StackLayout.prototype, "currentPanel", {
                /**
                 * Get the current panel in the stack.
                 */
                get: function () {
                    return this.panelAt(this.currentIndex);
                },
                /**
                 * Set the current panel in the stack.
                 */
                set: function (panel) {
                    this.currentIndex = this.indexOf(panel);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StackLayout.prototype, "count", {
                /**
                 * Get the number of layout items in the layout.
                 */
                get: function () {
                    return this._items.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the layout item at the specified index.
             */
            StackLayout.prototype.itemAt = function (index) {
                return this._items[index];
            };
            /**
             * Remove and return the layout item at the specified index.
             */
            StackLayout.prototype.takeAt = function (index) {
                index = index | 0;
                if (index < 0 || index >= this._items.length) {
                    return void 0;
                }
                var item = this._items.splice(index, 1)[0];
                if (index === this._currentIndex) {
                    this._currentIndex = -1;
                    this.invalidate();
                    this.currentChanged.emit(this, { index: -1, panel: void 0 });
                }
                else if (index < this._currentIndex) {
                    this._currentIndex--;
                }
                this.panelRemoved.emit(this, { index: index, panel: item.panel });
                return item;
            };
            /**
             * Add a panel as the last item in the layout.
             *
             * If the panel already exists in the layout, it will be moved.
             *
             * Returns the index of the added panel.
             */
            StackLayout.prototype.addPanel = function (panel) {
                return this.insertPanel(this.count, panel);
            };
            /**
             * Insert a panel into the layout at the given index.
             *
             * If the panel already exists in the layout, it will be moved.
             *
             * Returns the index of the added panel.
             */
            StackLayout.prototype.insertPanel = function (index, panel) {
                var i = this.indexOf(panel);
                if (i !== -1) {
                    return this.movePanel(i, index);
                }
                panel.hide();
                this.ensureParent(panel);
                index = Math.max(0, Math.min(index, this._items.length));
                this._items.splice(index, 0, new panels.PanelItem(panel));
                if (index <= this._currentIndex) {
                    this._currentIndex++;
                }
                return index;
            };
            /**
             * Move a panel from one index to another.
             *
             * Returns the new index of the panel.
             */
            StackLayout.prototype.movePanel = function (fromIndex, toIndex) {
                fromIndex = fromIndex | 0;
                var n = this._items.length;
                if (fromIndex < 0 || fromIndex >= n) {
                    return -1;
                }
                toIndex = Math.max(0, Math.min(toIndex | 0, n - 1));
                if (fromIndex === toIndex) {
                    return toIndex;
                }
                var item = this._items.splice(fromIndex, 1)[0];
                this._items.splice(toIndex, 0, item);
                var current = this._currentIndex;
                if (fromIndex === current) {
                    current = toIndex;
                }
                else {
                    if (fromIndex < current)
                        current--;
                    if (toIndex <= current)
                        current++;
                }
                this._currentIndex = current;
                return toIndex;
            };
            /**
             * Invalidate the cached layout data and enqueue an update.
             */
            StackLayout.prototype.invalidate = function () {
                this._dirty = true;
                _super.prototype.invalidate.call(this);
            };
            /**
             * Compute the preferred size of the layout.
             */
            StackLayout.prototype.sizeHint = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._sizeHint;
            };
            /**
             * Compute the minimum size of the layout.
             */
            StackLayout.prototype.minSize = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._minSize;
            };
            /**
             * Compute the maximum size of the layout.
             */
            StackLayout.prototype.maxSize = function () {
                if (this._dirty) {
                    this._setupGeometry();
                }
                return this._maxSize;
            };
            /**
             * Update the geometry of the child layout items.
             */
            StackLayout.prototype.layout = function () {
                // Bail early when no work needs to be done.
                var parent = this.parent;
                var item = this._items[this._currentIndex];
                if (!parent || !item) {
                    return;
                }
                // Refresh the layout items if needed.
                if (this._dirty) {
                    this._setupGeometry();
                }
                // Update the geometry of the visible item.
                var boxD = parent.boxData;
                var x = boxD.paddingLeft;
                var y = boxD.paddingTop;
                var w = parent.width - boxD.horizontalSum;
                var h = parent.height - boxD.verticalSum;
                item.setGeometry(x, y, w, h);
            };
            /**
             * Initialize the layout items and internal sizes for the layout.
             */
            StackLayout.prototype._setupGeometry = function () {
                // Bail early when no work needs to be done.
                if (!this._dirty) {
                    return;
                }
                this._dirty = false;
                // No parent means the layout is not yet attached.
                var parent = this.parent;
                if (!parent) {
                    var zero = new panels.Size(0, 0);
                    this._sizeHint = zero;
                    this._minSize = zero;
                    this._maxSize = zero;
                    return;
                }
                // Compute the size bounds based on the visible item.
                var hintW = 0;
                var hintH = 0;
                var minW = 0;
                var minH = 0;
                var maxW = Infinity;
                var maxH = Infinity;
                var item = this._items[this._currentIndex];
                if (item) {
                    item.invalidate();
                    var itemHint = item.sizeHint();
                    var itemMin = item.minSize();
                    var itemMax = item.maxSize();
                    hintW = Math.max(hintW, itemHint.width);
                    hintH = Math.max(hintH, itemHint.height);
                    minW = Math.max(minW, itemMin.width);
                    minH = Math.max(minH, itemMin.height);
                    maxW = Math.min(maxW, itemMax.width);
                    maxH = Math.min(maxH, itemMax.height);
                }
                // Account for padding and border on the parent.
                var boxD = parent.boxData;
                var boxW = boxD.horizontalSum;
                var boxH = boxD.verticalSum;
                hintW += boxW;
                hintH += boxH;
                minW += boxW;
                minH += boxH;
                maxW += boxW;
                maxH += boxH;
                // Update the internal sizes.
                this._sizeHint = new panels.Size(hintW, hintH);
                this._minSize = new panels.Size(minW, minH);
                this._maxSize = new panels.Size(maxW, maxH);
            };
            return StackLayout;
        })(panels.Layout);
        panels.StackLayout = StackLayout;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var Signal = phosphor.core.Signal;
        /**
         * The class name added to StackPanel instances.
         */
        var STACK_PANEL_CLASS = 'p-StackPanel';
        /**
         * A panel where only one child is visible at a time.
         *
         * This panel delegates to a permanently installed stack layout and
         * can be used as a more convenient interface to a stack layout.
         */
        var StackPanel = (function (_super) {
            __extends(StackPanel, _super);
            /**
             * Construct a new stack panel.
             */
            function StackPanel() {
                _super.call(this);
                /**
                 * A signal emitted when the current index changes.
                 */
                this.currentChanged = new Signal();
                /**
                 * A signal emitted when a panel is removed from the stack.
                 */
                this.panelRemoved = new Signal();
                this.node.classList.add(STACK_PANEL_CLASS);
                var layout = this.layout = new panels.StackLayout();
                this.setFlag(16 /* DisallowLayoutChange */);
                layout.currentChanged.connect(this._sl_currentChanged, this);
                layout.panelRemoved.connect(this._sl_panelRemoved, this);
            }
            /**
             * Dispose of the resources held by the panel.
             */
            StackPanel.prototype.dispose = function () {
                this.currentChanged.disconnect();
                this.panelRemoved.disconnect();
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(StackPanel.prototype, "currentIndex", {
                /**
                 * Get the current index of the stack.
                 */
                get: function () {
                    return this.layout.currentIndex;
                },
                /**
                 * Set the current index of the stack.
                 */
                set: function (index) {
                    this.layout.currentIndex = index;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StackPanel.prototype, "currentPanel", {
                /**
                 * Get the current panel in the stack.
                 */
                get: function () {
                    return this.layout.currentPanel;
                },
                /**
                 * Set the current panel in the stack.
                 */
                set: function (panel) {
                    this.layout.currentPanel = panel;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StackPanel.prototype, "count", {
                /**
                 * Get the number of panels in the stack.
                 */
                get: function () {
                    return this.layout.count;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the index of the given panel.
             *
             * Returns -1 if the panel is not found.
             */
            StackPanel.prototype.indexOf = function (panel) {
                return this.layout.indexOf(panel);
            };
            /**
             * Get the panel at the given index.
             *
             * Returns `undefined` if there is no panel at the given index.
             */
            StackPanel.prototype.panelAt = function (index) {
                return this.layout.panelAt(index);
            };
            /**
             * Add a child panel to the end of the split panel.
             *
             * If the panel already exists, it will be moved.
             *
             * Returns the index of the added panel.
             */
            StackPanel.prototype.addPanel = function (panel) {
                return this.layout.addPanel(panel);
            };
            /**
             * Insert a child panel into the split panel at the given index.
             *
             * If the panel already exists, it will be moved.
             *
             * Returns the index of the added panel.
             */
            StackPanel.prototype.insertPanel = function (index, panel) {
                return this.layout.insertPanel(index, panel);
            };
            /**
             * Move a child panel from one index to another.
             *
             * Returns the new index of the panel.
             */
            StackPanel.prototype.movePanel = function (fromIndex, toIndex) {
                return this.layout.movePanel(fromIndex, toIndex);
            };
            /**
             * Handle the `currentChanged` signal for the stack layout.
             */
            StackPanel.prototype._sl_currentChanged = function (sender, args) {
                this.currentChanged.emit(this, args);
            };
            /**
             * Handle the `panelChanged` signal for the stack layout.
             */
            StackPanel.prototype._sl_panelRemoved = function (sender, args) {
                this.panelRemoved.emit(this, args);
            };
            return StackPanel;
        })(panels.Panel);
        panels.StackPanel = StackPanel;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        /**
         * The class name added to Tab instances.
         */
        var TAB_CLASS = 'p-Tab';
        /**
         * The class name assigned to a tab text sub element.
         */
        var TEXT_CLASS = 'p-Tab-text';
        /**
         * The class name assigned to a tab icon sub element.
         */
        var ICON_CLASS = 'p-Tab-icon';
        /**
         * The class name assigned to a tab close icon sub element.
         */
        var CLOSE_ICON_CLASS = 'p-Tab-close-icon';
        /**
         * The class name added to the selected tab.
         */
        var SELECTED_CLASS = 'p-mod-selected';
        /**
         * The class name added to a closable tab.
         */
        var CLOSABLE_CLASS = 'p-mod-closable';
        /**
         * A concrete implementation of ITab.
         */
        var Tab = (function () {
            /**
             * Construct a new tab.
             */
            function Tab(text) {
                this._node = this.createNode();
                if (text)
                    this.text = text;
            }
            Object.defineProperty(Tab.prototype, "text", {
                /**
                 * Get the text for the tab.
                 */
                get: function () {
                    return this._node.children[1].textContent;
                },
                /**
                 * Set the text for the tab.
                 */
                set: function (text) {
                    this._node.children[1].textContent = text;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tab.prototype, "selected", {
                /**
                 * Get whether the tab is selected.
                 */
                get: function () {
                    return this._node.classList.contains(SELECTED_CLASS);
                },
                /**
                 * Set whether the tab is selected.
                 */
                set: function (selected) {
                    if (selected) {
                        this._node.classList.add(SELECTED_CLASS);
                    }
                    else {
                        this._node.classList.remove(SELECTED_CLASS);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tab.prototype, "closable", {
                /**
                 * Get whether the tab is closable.
                 */
                get: function () {
                    return this._node.classList.contains(CLOSABLE_CLASS);
                },
                /**
                 * Set whether the tab is closable.
                 */
                set: function (closable) {
                    if (closable) {
                        this._node.classList.add(CLOSABLE_CLASS);
                    }
                    else {
                        this._node.classList.remove(CLOSABLE_CLASS);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tab.prototype, "node", {
                /**
                 * The DOM node for the tab.
                 */
                get: function () {
                    return this._node;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tab.prototype, "closeIconNode", {
                /**
                 * The DOM node for the close icon, if available.
                 */
                get: function () {
                    return this._node.lastChild;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Create the DOM node for the tab.
             */
            Tab.prototype.createNode = function () {
                var node = document.createElement('li');
                var icon = document.createElement('span');
                var text = document.createElement('span');
                var closeIcon = document.createElement('span');
                node.className = TAB_CLASS;
                icon.className = ICON_CLASS;
                text.className = TEXT_CLASS;
                closeIcon.className = CLOSE_ICON_CLASS;
                node.appendChild(icon);
                node.appendChild(text);
                node.appendChild(closeIcon);
                return node;
            };
            return Tab;
        })();
        panels.Tab = Tab;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var Signal = phosphor.core.Signal;
        var hitTest = phosphor.domutil.hitTest;
        var overrideCursor = phosphor.domutil.overrideCursor;
        /**
         * The class name added to TabBar instances.
         */
        var TAB_BAR_CLASS = 'p-TabBar';
        /**
         * The class name added to the tab bar inner div.
         */
        var INNER_CLASS = 'p-TabBar-inner';
        /**
         * The class name added to the inner div when transitioning tabs.
         */
        var TRANSITION_CLASS = 'p-mod-transition';
        /**
         * The class name added to a tab being inserted.
         */
        var INSERTING_CLASS = 'p-mod-inserting';
        /**
         * The class name added to a tab being removed.
         */
        var REMOVING_CLASS = 'p-mod-removing';
        /**
         * The overlap threshold before swapping tabs.
         */
        var OVERLAP_THRESHOLD = 0.6;
        /**
         * The start drag distance threshold.
         */
        var DRAG_THRESHOLD = 5;
        /**
         * The detach distance threshold.
         */
        var DETACH_THRESHOLD = 20;
        /**
         * The tab transition duration.
         */
        var TRANSITION_DURATION = 150;
        /**
         * The stub size of an overlapped tab.
         */
        var TAB_STUB_SIZE = 5;
        /**
         * A panel which displays a row of tabs.
         *
         * A tab bar should be treated as leaf content with no children.
         */
        var TabBar = (function (_super) {
            __extends(TabBar, _super);
            /**
             * Construct a new tab bar.
             */
            function TabBar() {
                _super.call(this);
                /**
                 * A signal emitted when a tab is moved.
                 */
                this.tabMoved = new Signal();
                /**
                 * A signal emitted when the currently selected tab is changed.
                 */
                this.currentChanged = new Signal();
                /**
                 * A signal emitted when the user clicks a tab close icon.
                 */
                this.tabCloseRequested = new Signal();
                /**
                 * A signal emitted when a tab is dragged beyond the detach threshold.
                 */
                this.tabDetachRequested = new Signal();
                this._movable = true;
                this._tabWidth = 175;
                this._tabOverlap = 1;
                this._minTabWidth = 45;
                this._currentTab = null;
                this._previousTab = null;
                this._dragData = null;
                this._tabs = [];
                this.node.classList.add(TAB_BAR_CLASS);
                this.verticalSizePolicy = 0 /* Fixed */;
            }
            /**
             * Dispose of the resources held by the panel.
             */
            TabBar.prototype.dispose = function () {
                this._releaseMouse();
                this._tabs = null;
                this.tabMoved.disconnect();
                this.currentChanged.disconnect();
                this.tabCloseRequested.disconnect();
                this.tabDetachRequested.disconnect();
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(TabBar.prototype, "currentIndex", {
                /**
                 * Get the index of the current tab.
                 */
                get: function () {
                    return this._tabs.indexOf(this._currentTab);
                },
                /**
                 * Set the selected tab index.
                 */
                set: function (index) {
                    var prev = this._currentTab;
                    var next = this._tabs[index] || null;
                    if (prev === next) {
                        return;
                    }
                    if (prev)
                        prev.selected = false;
                    if (next)
                        next.selected = true;
                    index = next ? index : -1;
                    this._currentTab = next;
                    this._previousTab = prev;
                    this._updateTabZOrder();
                    this.currentChanged.emit(this, { index: index, tab: next });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabBar.prototype, "currentTab", {
                /**
                 * Get the currently selected tab.
                 */
                get: function () {
                    return this._currentTab;
                },
                /**
                 * Set the currently selected tab.
                 */
                set: function (tab) {
                    this.currentIndex = this._tabs.indexOf(tab);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabBar.prototype, "previousTab", {
                /**
                 * Get the previously selected tab.
                 */
                get: function () {
                    return this._previousTab;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabBar.prototype, "tabsMovable", {
                /**
                 * Get whether the tabs are movable by the user.
                 */
                get: function () {
                    return this._movable;
                },
                /**
                 * Set whether the tabs are movable by the user.
                 */
                set: function (movable) {
                    this._movable = movable;
                    if (!movable)
                        this._releaseMouse();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabBar.prototype, "tabWidth", {
                /**
                 * Get the desired tab width in pixels.
                 */
                get: function () {
                    return this._tabWidth;
                },
                /**
                 * Set the desired tab width in pixels.
                 */
                set: function (width) {
                    width = Math.max(0, width);
                    if (width === this._tabWidth) {
                        return;
                    }
                    this._tabWidth = width;
                    if (this.isAttached) {
                        this._updateTabLayout();
                        this.updateGeometry();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabBar.prototype, "minTabWidth", {
                /**
                 * Get the minimum tab width in pixels.
                 */
                get: function () {
                    return this._minTabWidth;
                },
                /**
                 * Set the minimum tab width in pixels.
                 */
                set: function (width) {
                    width = Math.max(0, width);
                    if (width === this._minTabWidth) {
                        return;
                    }
                    this._minTabWidth = width;
                    if (this.isAttached) {
                        this._updateTabLayout();
                        this.updateGeometry();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabBar.prototype, "tabOverlap", {
                /**
                 * Get the tab overlap amount in pixels.
                 */
                get: function () {
                    return this._tabOverlap;
                },
                /**
                 * Set the tab overlap amount in pixels.
                 */
                set: function (overlap) {
                    if (overlap === this._tabOverlap) {
                        return;
                    }
                    this._tabOverlap = overlap;
                    if (this.isAttached) {
                        this._updateTabLayout();
                        this.updateGeometry();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabBar.prototype, "count", {
                /**
                 * Get the number of tabs in the tab bar.
                 */
                get: function () {
                    return this._tabs.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the tab at the given index.
             */
            TabBar.prototype.tabAt = function (index) {
                return this._tabs[index];
            };
            /**
             * Get the index of the given tab.
             */
            TabBar.prototype.tabIndex = function (tab) {
                return this._tabs.indexOf(tab);
            };
            /**
             * Add a tab to the end of the tab bar.
             *
             * Returns the index of the tab.
             */
            TabBar.prototype.addTab = function (tab) {
                return this.insertTab(this._tabs.length, tab);
            };
            /**
             * Insert a tab into the tab bar at the given index.
             *
             * Returns the index of the tab.
             */
            TabBar.prototype.insertTab = function (index, tab) {
                var tabs = this._tabs;
                index = Math.max(0, Math.min(index | 0, tabs.length));
                if (typeof tab === 'string') {
                    this._insertTab(index, new panels.Tab(tab), true);
                }
                else {
                    var curr = tabs.indexOf(tab);
                    if (curr !== -1) {
                        index = this.moveTab(curr, index);
                    }
                    else {
                        this._insertTab(index, tab, true);
                    }
                }
                return index;
            };
            /**
             * Move a tab from one index to another.
             *
             * Returns the new tab index.
             */
            TabBar.prototype.moveTab = function (fromIndex, toIndex) {
                fromIndex = fromIndex | 0;
                var count = this._tabs.length;
                if (fromIndex < 0 || fromIndex >= count) {
                    return -1;
                }
                toIndex = Math.max(0, Math.min(toIndex | 0, count - 1));
                if (fromIndex === toIndex) {
                    return toIndex;
                }
                this._moveTab(fromIndex, toIndex);
                return toIndex;
            };
            /**
             * Remove a tab from the tab bar by index.
             *
             * Returns the removed tab.
             */
            TabBar.prototype.takeAt = function (index, animate) {
                if (animate === void 0) { animate = true; }
                index = index | 0;
                var tabs = this._tabs;
                if (index < 0 || index >= tabs.length) {
                    return void 0;
                }
                var tab = this._tabs[index];
                this._removeTab(index, animate);
                return tab;
            };
            /**
             * Remove a tab from the tab bar by value.
             *
             * Returns the index of the removed item.
             */
            TabBar.prototype.removeTab = function (tab, animate) {
                if (animate === void 0) { animate = true; }
                var index = this._tabs.indexOf(tab);
                this.takeAt(index, animate);
                return index;
            };
            /**
             * Remove all of the tabs from the tab bar.
             *
             * This is more efficient than removing the tabs individually.
             */
            TabBar.prototype.clearTabs = function () {
                this._releaseMouse();
                if (this._currentTab) {
                    this._currentTab.selected = false;
                    this._currentTab = null;
                }
                this._previousTab = null;
                this._tabs.length = 0;
                this.node.firstChild.innerHTML = '';
                if (this.isAttached) {
                    this.updateGeometry();
                }
            };
            /**
             * Attach a tab to the tab bar.
             *
             * This will immediately insert the tab with no transition. It will
             * then grab the mouse to continue the tab drag. It assumes the left
             * mouse button is down.
             */
            TabBar.prototype.attachTab = function (args) {
                var curr = this._tabs.indexOf(args.tab);
                var inner = this.node.firstChild;
                var innerRect = inner.getBoundingClientRect();
                var localLeft = args.clientX - args.offsetX - innerRect.left;
                var index = localLeft / (this._tabLayoutWidth() - this._tabOverlap);
                index = Math.max(0, Math.min(Math.round(index), this._tabs.length));
                if (curr === -1) {
                    this._insertTab(index, args.tab, false);
                }
                else if (curr !== index) {
                    this._moveTab(curr, index);
                }
                this.currentIndex = index;
                document.addEventListener('mouseup', this, true);
                document.addEventListener('mousemove', this, true);
                if (!this._movable) {
                    return;
                }
                var node = args.tab.node;
                var tabWidth = this._tabLayoutWidth();
                var offsetX = tabWidth * (args.offsetX / args.tabWidth);
                var maxX = this.width - tabWidth;
                var localX = args.clientX - innerRect.left - offsetX;
                var targetX = Math.max(0, Math.min(localX, maxX));
                var grab = overrideCursor(window.getComputedStyle(node).cursor);
                this._dragData = {
                    node: node,
                    pressX: args.clientX,
                    pressY: args.clientY,
                    offsetX: offsetX,
                    offsetY: args.offsetY,
                    innerRect: innerRect,
                    cursorGrab: grab,
                    dragActive: true,
                    emitted: false,
                };
                inner.classList.add(TRANSITION_CLASS);
                node.style.transition = 'none';
                this._updateTabLayout();
                node.style.left = targetX + 'px';
            };
            /**
             * Compute the size hint for the tab bar.
             */
            TabBar.prototype.sizeHint = function () {
                var width = 0;
                var count = this._tabs.length;
                if (count > 0) {
                    var overlap = this._tabOverlap * (count - 1);
                    width = this._tabWidth * count - overlap;
                }
                var style = window.getComputedStyle(this.node);
                var height = parseInt(style.minHeight, 10) || 0;
                return new panels.Size(width, height);
            };
            /**
             * Compute the minimum size hint for the tab bar.
             */
            TabBar.prototype.minSizeHint = function () {
                var width = 0;
                var count = this._tabs.length;
                if (count > 0) {
                    var stub = TAB_STUB_SIZE * (count - 1);
                    width = this._minTabWidth + stub;
                }
                var style = window.getComputedStyle(this.node);
                var height = parseInt(style.minHeight, 10) || 0;
                return new panels.Size(width, height);
            };
            /**
             * Create the DOM node for the tab bar.
             */
            TabBar.prototype.createNode = function () {
                var node = document.createElement('div');
                var inner = document.createElement('ul');
                inner.className = INNER_CLASS;
                node.appendChild(inner);
                return node;
            };
            /**
             * A method invoked on an 'after-attach' message.
             */
            TabBar.prototype.onAfterAttach = function (msg) {
                var node = this.node;
                node.addEventListener('mousedown', this);
                node.addEventListener('click', this);
            };
            /**
             * A method invoked on an 'after-dettach' message.
             */
            TabBar.prototype.onAfterDetach = function (msg) {
                var node = this.node;
                node.removeEventListener('mousedown', this);
                node.removeEventListener('click', this);
            };
            /**
             * A method invoked on a 'resize' message.
             */
            TabBar.prototype.onResize = function (msg) {
                this._updateTabLayout();
            };
            /**
             * Handle the DOM events for the tab bar.
             */
            TabBar.prototype.handleEvent = function (event) {
                switch (event.type) {
                    case 'click':
                        this.domEvent_click(event);
                        break;
                    case 'mousedown':
                        this.domEvent_mousedown(event);
                        break;
                    case 'mousemove':
                        this.domEvent_mousemove(event);
                        break;
                    case 'mouseup':
                        this.domEvent_mouseup(event);
                        break;
                    default:
                        break;
                }
            };
            /**
             * Handle the click event for the tab bar.
             */
            TabBar.prototype.domEvent_click = function (event) {
                if (event.button !== 0) {
                    return;
                }
                var clientX = event.clientX;
                var clientY = event.clientY;
                var index = this._indexAtPos(clientX, clientY);
                if (index < 0) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                var tab = this._tabs[index];
                var icon = tab.closeIconNode;
                if (icon && icon === event.target && tab.closable) {
                    this.tabCloseRequested.emit(this, { index: index, tab: tab });
                }
            };
            /**
             * Handle the mousedown event for the tab bar.
             */
            TabBar.prototype.domEvent_mousedown = function (event) {
                if (event.button !== 0) {
                    return;
                }
                var clientX = event.clientX;
                var clientY = event.clientY;
                var index = this._indexAtPos(clientX, clientY);
                if (index < 0) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                var tab = this._tabs[index];
                var icon = tab.closeIconNode;
                if (icon && icon === event.target) {
                    return;
                }
                if (this._movable) {
                    var node = tab.node;
                    var rect = node.getBoundingClientRect();
                    this._dragData = {
                        node: node,
                        pressX: clientX,
                        pressY: clientY,
                        offsetX: clientX - rect.left,
                        offsetY: clientY - rect.top,
                        innerRect: null,
                        cursorGrab: null,
                        dragActive: false,
                        emitted: false,
                    };
                }
                this.currentIndex = index;
                document.addEventListener('mouseup', this, true);
                document.addEventListener('mousemove', this, true);
            };
            /**
             * Handle the mouse move event for the tab bar.
             */
            TabBar.prototype.domEvent_mousemove = function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (!this._movable || !this._dragData) {
                    return;
                }
                var clientX = event.clientX;
                var clientY = event.clientY;
                var data = this._dragData;
                if (!data.dragActive) {
                    var dx = Math.abs(clientX - data.pressX);
                    var dy = Math.abs(clientY - data.pressY);
                    if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
                        return;
                    }
                    var inner = this.node.firstChild;
                    var innerRect = inner.getBoundingClientRect();
                    var cursor = window.getComputedStyle(data.node).cursor;
                    var grab = overrideCursor(cursor);
                    data.innerRect = innerRect;
                    data.cursorGrab = grab;
                    data.dragActive = true;
                    inner.classList.add(TRANSITION_CLASS);
                    data.node.style.transition = 'none';
                }
                var tabWidth = this._tabLayoutWidth();
                if (!data.emitted) {
                    var innerRect = data.innerRect;
                    if (!inBounds(innerRect, DETACH_THRESHOLD, clientX, clientY)) {
                        var args = {
                            index: this.currentIndex,
                            tab: this.currentTab,
                            tabWidth: tabWidth,
                            offsetX: data.offsetX,
                            offsetY: data.offsetY,
                            clientX: clientX,
                            clientY: clientY,
                        };
                        data.emitted = true;
                        this.tabDetachRequested.emit(this, args);
                        if (!this._dragData) {
                            return;
                        }
                    }
                }
                var index = this.currentIndex;
                var naturalX = index * (tabWidth - this._tabOverlap);
                var lowerBound = naturalX - tabWidth * OVERLAP_THRESHOLD;
                var upperBound = naturalX + tabWidth * OVERLAP_THRESHOLD;
                var localX = event.clientX - data.innerRect.left - data.offsetX;
                var targetX = Math.max(0, Math.min(localX, this.width - tabWidth));
                if (targetX < lowerBound) {
                    this.moveTab(index, index - 1);
                }
                else if (targetX > upperBound) {
                    this.moveTab(index, index + 1);
                }
                data.node.style.left = targetX + 'px';
            };
            /**
             * Handle the mouse up event for the tab bar.
             */
            TabBar.prototype.domEvent_mouseup = function (event) {
                if (event.button !== 0) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                this._releaseMouse();
            };
            /**
             * Release the current mouse grab for the tab bar.
             */
            TabBar.prototype._releaseMouse = function () {
                var _this = this;
                var data = this._dragData;
                if (!data) {
                    return;
                }
                this._dragData = null;
                document.removeEventListener('mouseup', this, true);
                document.removeEventListener('mousemove', this, true);
                if (data && data.dragActive) {
                    data.cursorGrab.dispose();
                    data.node.style.transition = '';
                    this._withTransition(function () { return _this._updateTabLayout(); });
                }
            };
            /**
             * Insert a new tab into the tab bar at a valid index.
             */
            TabBar.prototype._insertTab = function (index, tab, animate) {
                var _this = this;
                tab.selected = false;
                this._tabs.splice(index, 0, tab);
                this.node.firstChild.appendChild(tab.node);
                if (!this._currentTab) {
                    this.currentTab = tab;
                }
                else {
                    this._updateTabZOrder();
                }
                if (!this.isAttached) {
                    return;
                }
                if (animate) {
                    this._withTransition(function () {
                        tab.node.classList.add(INSERTING_CLASS);
                        _this._updateTabLayout();
                    }, function () {
                        tab.node.classList.remove(INSERTING_CLASS);
                    });
                }
                else {
                    this._withTransition(function () { return _this._updateTabLayout(); });
                }
                this.updateGeometry();
            };
            /**
             * Move an item to a new index in the tab bar.
             */
            TabBar.prototype._moveTab = function (fromIndex, toIndex) {
                var _this = this;
                var tab = this._tabs.splice(fromIndex, 1)[0];
                this._tabs.splice(toIndex, 0, tab);
                this._updateTabZOrder();
                this.tabMoved.emit(this, { fromIndex: fromIndex, toIndex: toIndex });
                if (!this.isAttached) {
                    return;
                }
                this._withTransition(function () { return _this._updateTabLayout(); });
            };
            /**
             * Remove the tab at the given index from the tab bar.
             */
            TabBar.prototype._removeTab = function (index, animate) {
                var _this = this;
                this._releaseMouse();
                var tabs = this._tabs;
                var tab = tabs.splice(index, 1)[0];
                tab.selected = false;
                tab.node.style.zIndex = '0';
                if (tab === this._currentTab) {
                    var next = this._previousTab || tabs[index] || tabs[index - 1];
                    this._currentTab = null;
                    this._previousTab = null;
                    if (next) {
                        this.currentTab = next;
                    }
                    else {
                        this.currentChanged.emit(this, { index: -1, tab: void 0 });
                    }
                }
                else if (tab === this._previousTab) {
                    this._previousTab = null;
                    this._updateTabZOrder();
                }
                else {
                    this._updateTabZOrder();
                }
                var inner = this.node.firstChild;
                if (!this.isAttached) {
                    inner.removeChild(tab.node);
                    return;
                }
                if (animate) {
                    this._withTransition(function () {
                        tab.node.classList.add(REMOVING_CLASS);
                        _this._updateTabLayout();
                    }, function () {
                        tab.node.classList.remove(REMOVING_CLASS);
                        inner.removeChild(tab.node);
                    });
                }
                else {
                    inner.removeChild(tab.node);
                    this._withTransition(function () { return _this._updateTabLayout(); });
                }
                this.updateGeometry();
            };
            /**
             * Update the Z order of the tab nodes in the tab bar.
             */
            TabBar.prototype._updateTabZOrder = function () {
                var tabs = this._tabs;
                var index = tabs.length - 1;
                for (var i = 0, n = tabs.length; i < n; ++i) {
                    var tab = tabs[i];
                    if (tab === this._currentTab) {
                        tab.node.style.zIndex = tabs.length + '';
                    }
                    else {
                        tab.node.style.zIndex = index-- + '';
                    }
                }
            };
            /**
             * Get the index of the tab which covers the given client position.
             */
            TabBar.prototype._indexAtPos = function (clientX, clientY) {
                var tabs = this._tabs;
                for (var i = 0, n = tabs.length; i < n; ++i) {
                    if (hitTest(tabs[i].node, clientX, clientY)) {
                        return i;
                    }
                }
                return -1;
            };
            /**
             * Compute the layout width of a tab.
             *
             * This computes a tab size as close as possible to the preferred
             * tab size (but not less than the minimum), taking into account
             * the current tab bar inner div width and tab overlap setting.
             */
            TabBar.prototype._tabLayoutWidth = function () {
                var count = this._tabs.length;
                if (count === 0) {
                    return 0;
                }
                var totalOverlap = this._tabOverlap * (count - 1);
                var totalWidth = this._tabWidth * count - totalOverlap;
                if (this.width >= totalWidth) {
                    return this._tabWidth;
                }
                var ideal = (this.width + totalOverlap) / count;
                return Math.max(this._minTabWidth, ideal);
            };
            /**
             * Update the layout of the tabs in the tab bar.
             *
             * This will update the position and size of the tabs according to
             * the current inner width of the tab bar. The position of the drag
             * tab will not be updated.
             */
            TabBar.prototype._updateTabLayout = function () {
                var left = 0;
                var width = this.width;
                var tabs = this._tabs;
                var stub = TAB_STUB_SIZE;
                var data = this._dragData;
                var overlap = this._tabOverlap;
                var tabWidth = this._tabLayoutWidth();
                var dragNode = data && data.dragActive && data.node;
                for (var i = 0, n = tabs.length; i < n; ++i) {
                    var node = tabs[i].node;
                    var style = node.style;
                    if (node !== dragNode) {
                        var stubOffset = tabWidth + stub * (n - i - 1);
                        if (left + stubOffset > width) {
                            left = Math.max(0, width - stubOffset);
                        }
                        style.left = left + 'px';
                    }
                    style.width = tabWidth + 'px';
                    left += tabWidth - overlap;
                }
            };
            /**
             * A helper function to execute an animated transition.
             *
             * This will execute the enter after the transition class has been
             * added to the tab bar, and execute the exit callback after the
             * transition duration has expired and the transition class has
             * been removed from the tab bar.
             *
             * If there is an active drag in progress, the transition class
             * will not be removed from the inner div on exit.
             */
            TabBar.prototype._withTransition = function (enter, exit) {
                var _this = this;
                var inner = this.node.firstChild;
                inner.classList.add(TRANSITION_CLASS);
                if (enter)
                    enter();
                setTimeout(function () {
                    var data = _this._dragData;
                    if (!data || !data.dragActive) {
                        inner.classList.remove(TRANSITION_CLASS);
                    }
                    if (exit)
                        exit();
                }, TRANSITION_DURATION);
            };
            return TabBar;
        })(panels.Panel);
        panels.TabBar = TabBar;
        /**
         * Test whether a point lies within an expanded rect.
         */
        function inBounds(r, v, x, y) {
            if (x < r.left - v) {
                return false;
            }
            if (x >= r.right + v) {
                return false;
            }
            if (y < r.top - v) {
                return false;
            }
            if (y >= r.bottom + v) {
                return false;
            }
            return true;
        }
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

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
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var Signal = phosphor.core.Signal;
        /**
         * The class name added to tab panel instances.
         */
        var TAB_PANEL_CLASS = 'p-TabPanel';
        /**
         * A panel which provides a tabbed container for child panels.
         *
         * The TabPanel provides a convenient combination of a tab bar and
         * a stack panel which allows the user to toggle between panels by
         * selecting the tab associated with a tabbable panel.
         */
        var TabPanel = (function (_super) {
            __extends(TabPanel, _super);
            /**
             * Construct a new tab panel.
             */
            function TabPanel() {
                _super.call(this);
                /**
                 * A signal emitted when the current panel is changed.
                 */
                this.currentChanged = new Signal();
                this.node.classList.add(TAB_PANEL_CLASS);
                this.layout = new panels.BoxLayout(2 /* TopToBottom */, 0);
                this.setFlag(16 /* DisallowLayoutChange */);
                var bar = this._tabBar = new panels.TabBar();
                bar.tabMoved.connect(this._tb_tabMoved, this);
                bar.currentChanged.connect(this._tb_currentChanged, this);
                bar.tabCloseRequested.connect(this._tb_tabCloseRequested, this);
                var stack = this._stackPanel = new panels.StackPanel();
                stack.panelRemoved.connect(this._sw_panelRemoved, this);
                this.layout.addPanel(bar);
                this.layout.addPanel(stack);
            }
            /**
             * Dispose of the resources held by the panel.
             */
            TabPanel.prototype.dispose = function () {
                this._tabBar = null;
                this._stackPanel = null;
                this.currentChanged.disconnect();
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(TabPanel.prototype, "currentIndex", {
                /**
                 * Get the index of the currently selected panel.
                 */
                get: function () {
                    return this._stackPanel.currentIndex;
                },
                /**
                 * Set the index of the currently selected panel.
                 */
                set: function (index) {
                    this._tabBar.currentIndex = index;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabPanel.prototype, "currentPanel", {
                /**
                 * Get the currently selected panel.
                 */
                get: function () {
                    return this._stackPanel.currentPanel;
                },
                /**
                 * Set the currently selected panel.
                 */
                set: function (panel) {
                    this._tabBar.currentIndex = this.indexOf(panel);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabPanel.prototype, "count", {
                /**
                 * Get the number of panels in the tab panel.
                 */
                get: function () {
                    return this._stackPanel.count;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabPanel.prototype, "tabsMovable", {
                /**
                 * Get whether the tabs are movable by the user.
                 */
                get: function () {
                    return this._tabBar.tabsMovable;
                },
                /**
                 * Set whether the tabs are movable by the user.
                 */
                set: function (movable) {
                    this._tabBar.tabsMovable = movable;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabPanel.prototype, "tabBar", {
                /**
                 * Get the tab bar used by the tab panel.
                 */
                get: function () {
                    return this._tabBar;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TabPanel.prototype, "stackPanel", {
                /**
                 * Get the stack panel used by the tab panel.
                 */
                get: function () {
                    return this._stackPanel;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get the index of the given panel.
             */
            TabPanel.prototype.indexOf = function (panel) {
                return this._stackPanel.indexOf(panel);
            };
            /**
             * Add a panel to the end of the tab panel.
             *
             * If the panel has already been added, it will be moved.
             *
             * Returns the new index of the panel.
             */
            TabPanel.prototype.addPanel = function (panel) {
                return this.insertPanel(this.count, panel);
            };
            /**
             * Insert a panel into the tab panel at the given index.
             *
             * If the panel has already been added, it will be moved.
             *
             * Returns the new index of the panel.
             */
            TabPanel.prototype.insertPanel = function (index, panel) {
                var i = this.indexOf(panel);
                if (i >= 0) {
                    return this.movePanel(i, index);
                }
                index = this._stackPanel.insertPanel(index, panel);
                return this._tabBar.insertTab(index, panel.tab);
            };
            /**
             * Move a panel from one index to another.
             *
             * Returns the new index of the panel.
             */
            TabPanel.prototype.movePanel = function (fromIndex, toIndex) {
                return this._tabBar.moveTab(fromIndex, toIndex);
            };
            /**
             * Handle the `tabMoved` signal from the tab bar.
             */
            TabPanel.prototype._tb_tabMoved = function (sender, args) {
                this._stackPanel.movePanel(args.fromIndex, args.toIndex);
            };
            /**
             * Handle the `currentChanged` signal from the tab bar.
             */
            TabPanel.prototype._tb_currentChanged = function (sender, args) {
                this._stackPanel.currentIndex = args.index;
                var panel = this._stackPanel.currentPanel;
                this.currentChanged.emit(this, { index: args.index, panel: panel });
            };
            /**
             * Handle the `tabCloseRequested` signal from the tab bar.
             */
            TabPanel.prototype._tb_tabCloseRequested = function (sender, args) {
                this._stackPanel.panelAt(args.index).close();
            };
            /**
             * Handle the `panelRemoved` signal from the stack panel.
             */
            TabPanel.prototype._sw_panelRemoved = function (sender, args) {
                this._tabBar.takeAt(args.index);
            };
            return TabPanel;
        })(panels.Panel);
        panels.TabPanel = TabPanel;
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var phosphor;
(function (phosphor) {
    var panels;
    (function (panels) {
        var hitTest = phosphor.domutil.hitTest;
        var overrideCursor = phosphor.domutil.overrideCursor;
        /**
         * The class name added to DockArea instances.
         */
        var DOCK_AREA_CLASS = 'p-DockArea';
        /**
         * The class name added to floating tabs.
         */
        var FLOATING_CLASS = 'p-mod-floating';
        /**
         * A panel which provides a flexible layout area for panels.
         */
        var DockArea = (function (_super) {
            __extends(DockArea, _super);
            /**
             * Construct a new dock area.
             */
            function DockArea() {
                _super.call(this);
                this._handleSize = 3;
                this._tabWidth = 175;
                this._tabOverlap = 1;
                this._minTabWidth = 45;
                this._ignoreRemoved = false;
                this._root = null;
                this._dragData = null;
                this._items = [];
                this.node.classList.add(DOCK_AREA_CLASS);
                this._root = this._createSplitter(0 /* Horizontal */);
                this.layout = new panels.SingleLayout(this._root);
                this.setFlag(16 /* DisallowLayoutChange */);
            }
            /**
             * Dispose of the resources held by the panel.
             */
            DockArea.prototype.dispose = function () {
                this._abortDrag();
                this._root = null;
                this._items = null;
                _super.prototype.dispose.call(this);
            };
            Object.defineProperty(DockArea.prototype, "tabWidth", {
                /**
                 * Get the width of the tabs in the dock area.
                 */
                get: function () {
                    return this._tabWidth;
                },
                /**
                 * Get the width of the tabs in the dock area.
                 */
                set: function (width) {
                    width = Math.max(0, width);
                    if (width === this._tabWidth) {
                        return;
                    }
                    this._tabWidth = width;
                    iterPanels(this._root, function (panel) {
                        panel.tabBar.tabWidth = width;
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DockArea.prototype, "minTabWidth", {
                /**
                 * Get the minimum tab width in pixels.
                 */
                get: function () {
                    return this._minTabWidth;
                },
                /**
                 * Set the minimum tab width in pixels.
                 */
                set: function (width) {
                    width = Math.max(0, width);
                    if (width === this._minTabWidth) {
                        return;
                    }
                    this._minTabWidth = width;
                    iterPanels(this._root, function (panel) {
                        panel.tabBar.minTabWidth = width;
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DockArea.prototype, "tabOverlap", {
                /**
                 * Get the tab overlap amount in pixels.
                 */
                get: function () {
                    return this._tabOverlap;
                },
                /**
                 * Set the tab overlap amount in pixels.
                 */
                set: function (overlap) {
                    if (overlap === this._tabOverlap) {
                        return;
                    }
                    this._tabOverlap = overlap;
                    iterPanels(this._root, function (panel) {
                        panel.tabBar.tabOverlap = overlap;
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DockArea.prototype, "handleSize", {
                /**
                 * Get the handle size of the dock splitters.
                 */
                get: function () {
                    return this._handleSize;
                },
                /**
                 * Set the handle size of the dock splitters.
                 */
                set: function (size) {
                    if (size === this._handleSize) {
                        return;
                    }
                    this._handleSize = size;
                    iterSplitters(this._root, function (splitter) {
                        splitter.handleSize = size;
                    });
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Add a panel to the dock area.
             *
             * The panel is positioned in the area according to the given dock
             * mode and reference panel. If the dock panel is already added to
             * the area, it will be moved to the new location.
             *
             * The default mode inserts the panel on the left side of the area.
             */
            DockArea.prototype.addPanel = function (panel, mode, ref) {
                switch (mode) {
                    case 0 /* Top */:
                        this._addWidget(panel, 1 /* Vertical */, false);
                        break;
                    case 1 /* Left */:
                        this._addWidget(panel, 0 /* Horizontal */, false);
                        break;
                    case 2 /* Right */:
                        this._addWidget(panel, 0 /* Horizontal */, true);
                        break;
                    case 3 /* Bottom */:
                        this._addWidget(panel, 1 /* Vertical */, true);
                        break;
                    case 4 /* SplitTop */:
                        this._splitWidget(panel, ref, 1 /* Vertical */, false);
                        break;
                    case 5 /* SplitLeft */:
                        this._splitWidget(panel, ref, 0 /* Horizontal */, false);
                        break;
                    case 6 /* SplitRight */:
                        this._splitWidget(panel, ref, 0 /* Horizontal */, true);
                        break;
                    case 7 /* SplitBottom */:
                        this._splitWidget(panel, ref, 1 /* Vertical */, true);
                        break;
                    case 8 /* TabBefore */:
                        this._tabifyWidget(panel, ref, false);
                        break;
                    case 9 /* TabAfter */:
                        this._tabifyWidget(panel, ref, true);
                        break;
                    default:
                        this._addWidget(panel, 0 /* Horizontal */, false);
                        break;
                }
            };
            // /**
            //  * Ensure the given widget is activated.
            //  *
            //  * If the widget does not exist, this is a no-op.
            //  *
            //  * Returns true if the widget was activated, false otherwise.
            //  */
            // activateWidget(widget: Widget): boolean {
            //   var item = find(this._items, it => it.widget === widget);
            //   if (!item) {
            //     return false;
            //   }
            //   item.panel.tabBar.currentTab = item.widget.tab;
            //   return true;
            // }
            // /**
            //  * Get an array of the active widgets in the dock area.
            //  */
            // activeWidgets(): Widget[] {
            //   var result: Widget[] = [];
            //   iterPanels(this._root, panel => {
            //     var current = panel.stackPanel.currentPanel;
            //     if (current) result.push(current);
            //   });
            //   return result;
            // }
            /**
             * Handle the DOM events for the dock area.
             */
            DockArea.prototype.handleEvent = function (event) {
                switch (event.type) {
                    case 'mousemove':
                        this.domEvent_mousemove(event);
                        break;
                    case 'mouseup':
                        this.domEvent_mouseup(event);
                        break;
                    case 'contextmenu':
                        event.preventDefault();
                        event.stopPropagation();
                        break;
                    default:
                        break;
                }
            };
            /**
             * Handle the 'mousemove' event for the dock area.
             *
             * This is triggered on the document during a tab move operation.
             */
            DockArea.prototype.domEvent_mousemove = function (event) {
                event.preventDefault();
                event.stopPropagation();
                var dragData = this._dragData;
                if (!dragData) {
                    return;
                }
                // Hit test the panels using the current mouse position.
                var clientX = event.clientX;
                var clientY = event.clientY;
                var hitPanel = iterPanels(this._root, function (p) {
                    return hitTest(p.node, clientX, clientY) ? p : void 0;
                });
                // If the last hit panel is not this hit panel, clear the overlay.
                if (dragData.lastHitPanel && dragData.lastHitPanel !== hitPanel) {
                    dragData.lastHitPanel.hideOverlay();
                }
                // Clear the reference to the hit panel. It will be updated again
                // if the mouse is over a panel, but not over the panel's tab bar.
                dragData.lastHitPanel = null;
                // Compute the new X and Y tab coordinates.
                var x = clientX - dragData.offsetX;
                var y = clientY - dragData.offsetY;
                // If the mouse is not over a dock panel, simply update the tab.
                var item = dragData.item;
                var itemTab = item.widget.tab;
                var tabStyle = itemTab.node.style;
                if (!hitPanel) {
                    tabStyle.left = x + 'px';
                    tabStyle.top = y + 'px';
                    return;
                }
                // Handle the case where the mouse is not over a tab bar. This
                // saves a reference to the hit panel so that its overlay can be
                // hidden once the mouse leaves the area, and shows the overlay
                // provided that the split target is not the current widget.
                if (!hitTest(hitPanel.tabBar.node, clientX, clientY)) {
                    dragData.lastHitPanel = hitPanel;
                    if (hitPanel !== item.panel || hitPanel.tabBar.count > 0) {
                        hitPanel.showOverlay(clientX, clientY);
                    }
                    tabStyle.left = x + 'px';
                    tabStyle.top = y + 'px';
                    return;
                }
                // Otherwise the mouse is positioned over a tab bar. Hide the
                // overlay before attaching the tab to the new tab bar.
                hitPanel.hideOverlay();
                // If the hit panel is not the current owner, the current hit
                // panel and tab are saved so that they can be restored later.
                if (hitPanel !== item.panel) {
                    dragData.tempPanel = hitPanel;
                    dragData.tempTab = hitPanel.tabBar.currentTab;
                }
                // Reset the tab style before attaching the tab to the tab bar.
                floatTab(itemTab, false);
                tabStyle.top = '';
                tabStyle.left = '';
                tabStyle.width = '';
                // Attach the tab to the hit tab bar.
                hitPanel.tabBar.attachTab({
                    tab: itemTab,
                    clientX: clientX,
                    clientY: clientY,
                    offsetX: dragData.offsetX,
                    offsetY: dragData.offsetY,
                    tabWidth: dragData.tabWidth,
                });
                // The tab bar takes over movement of the tab. The dock area still
                // listens for the mouseup event in order to complete the move.
                document.removeEventListener('mousemove', this, true);
            };
            /**
             * Handle the 'mouseup' event for the dock area.
             *
             * This is triggered on the document during a tab move operation.
             */
            DockArea.prototype.domEvent_mouseup = function (event) {
                if (event.button !== 0) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                document.removeEventListener('mouseup', this, true);
                document.removeEventListener('mousemove', this, true);
                document.removeEventListener('contextmenu', this, true);
                var dragData = this._dragData;
                if (!dragData) {
                    return;
                }
                this._dragData = null;
                // Restore the application cursor and hide the overlay.
                dragData.grab.dispose();
                if (dragData.lastHitPanel) {
                    dragData.lastHitPanel.hideOverlay();
                }
                // Fetch common variables.
                var item = dragData.item;
                var ownPanel = item.panel;
                var ownBar = ownPanel.tabBar;
                var ownCount = ownBar.count;
                var itemTab = item.widget.tab;
                // If the tab was being temporarily borrowed by another panel,
                // make that relationship permanent by moving the dock widget.
                // If the original owner panel becomes empty, it is removed.
                // Otherwise, its current index is updated to the next widget.
                //
                // The ignoreRemoved flag is set during the widget swap since
                // the widget is not actually being removed from the area.
                if (dragData.tempPanel) {
                    item.panel = dragData.tempPanel;
                    this._ignoreRemoved = true;
                    item.panel.stackPanel.addPanel(item.widget);
                    this._ignoreRemoved = false;
                    item.panel.stackPanel.currentPanel = item.widget;
                    if (ownPanel.stackPanel.count === 0) {
                        this._removePanel(ownPanel);
                    }
                    else {
                        var i = ownBar.tabIndex(dragData.prevTab);
                        if (i === -1)
                            i = Math.min(dragData.index, ownCount - 1);
                        ownBar.currentIndex = i;
                    }
                    return;
                }
                // Snap the split mode before modifying the DOM with the tab insert.
                var mode = 4 /* Invalid */;
                var hitPanel = dragData.lastHitPanel;
                if (hitPanel && (hitPanel !== ownPanel || ownCount !== 0)) {
                    mode = hitPanel.splitModeAt(event.clientX, event.clientY);
                }
                // If the mouse was not released over a panel, or if the hit panel
                // is the empty owner panel, restore the tab to its position.
                var tabStyle = itemTab.node.style;
                if (mode === 4 /* Invalid */) {
                    if (ownBar.currentTab !== itemTab) {
                        floatTab(itemTab, false);
                        tabStyle.top = '';
                        tabStyle.left = '';
                        tabStyle.width = '';
                        ownBar.insertTab(dragData.index, itemTab);
                    }
                    return;
                }
                // Remove the tab from the document body and reset its style.
                document.body.removeChild(itemTab.node);
                floatTab(itemTab, false);
                tabStyle.top = '';
                tabStyle.left = '';
                tabStyle.width = '';
                // Split the target panel with the dock widget.
                var after = mode === 2 /* Right */ || mode === 3 /* Bottom */;
                var horiz = mode === 1 /* Left */ || mode === 2 /* Right */;
                var orientation = horiz ? 0 /* Horizontal */ : 1 /* Vertical */;
                this._splitPanel(hitPanel, item.widget, orientation, after);
                var i = ownBar.tabIndex(dragData.prevTab);
                if (i === -1)
                    i = Math.min(dragData.index, ownCount - 1);
                ownBar.currentIndex = i;
            };
            /**
             * Add the widget to a new root dock panel along the given orientation.
             *
             * If the widget already exists in the area, it will be removed.
             */
            DockArea.prototype._addWidget = function (widget, orientation, after) {
                widget.parent = null;
                var panel = this._createPanel();
                this._addItem(widget, panel);
                panel.stackPanel.addPanel(widget);
                panel.tabBar.addTab(widget.tab);
                this._ensureRoot(orientation);
                if (after) {
                    this._root.addPanel(panel);
                }
                else {
                    this._root.insertPanel(0, panel);
                }
            };
            /**
             * Add the dock widget as a new split panel next to the reference.
             *
             * If the reference does not exist in the area, this is a no-op.
             *
             * If the dock widget already exists in the area, it will be moved.
             */
            DockArea.prototype._splitWidget = function (widget, ref, orientation, after) {
                if (widget === ref) {
                    return;
                }
                var refItem = find(this._items, function (it) { return it.widget === ref; });
                if (!refItem) {
                    return;
                }
                this._splitPanel(refItem.panel, widget, orientation, after);
            };
            /**
             * Split the panel with the given widget along the given orientation.
             *
             * If the widget already exists in the area, it will be moved.
             */
            DockArea.prototype._splitPanel = function (panel, widget, orientation, after) {
                widget.parent = null;
                var newPanel = this._createPanel();
                this._addItem(widget, newPanel);
                newPanel.stackPanel.addPanel(widget);
                newPanel.tabBar.addTab(widget.tab);
                var splitter = panel.parent;
                if (splitter.orientation !== orientation) {
                    if (splitter.count <= 1) {
                        splitter.orientation = orientation;
                        splitter.insertPanel(after ? 1 : 0, newPanel);
                        splitter.setSizes([1, 1]);
                    }
                    else {
                        var sizes = splitter.sizes();
                        var index = splitter.indexOf(panel);
                        panel.parent = null;
                        var newSplitter = this._createSplitter(orientation);
                        newSplitter.addPanel(panel);
                        newSplitter.insertPanel(after ? 1 : 0, newPanel);
                        splitter.insertPanel(index, newSplitter);
                        splitter.setSizes(sizes);
                        newSplitter.setSizes([1, 1]);
                    }
                }
                else {
                    var sizes = splitter.sizes();
                    var index = splitter.indexOf(panel);
                    splitter.insertPanel(index + (after ? 1 : 0), newPanel);
                    sizes.splice(index, 0, 1 / sizes.length);
                    splitter.setSizes(sizes);
                }
            };
            /**
             * Add the dock widget as a tab next to the reference.
             *
             * If the reference does not exist in the area, this is a no-op.
             *
             * If the dock widget already exists in the area, it will be moved.
             */
            DockArea.prototype._tabifyWidget = function (widget, ref, after) {
                if (widget === ref) {
                    return;
                }
                var refItem = find(this._items, function (it) { return it.widget === ref; });
                if (!refItem) {
                    return;
                }
                widget.parent = null;
                var panel = refItem.panel;
                var index = panel.tabBar.tabIndex(ref.tab) + (after ? 1 : 0);
                this._addItem(widget, panel);
                panel.stackPanel.addPanel(widget);
                panel.tabBar.insertTab(index, widget.tab);
            };
            /**
             * Ensure the root splitter has the given orientation.
             *
             * If the current root has the given orientation, this is a no-op.
             *
             * If the root has <= 1 child, its orientation will be updated.
             *
             * Otherwise, a new root will be created with the proper orientation
             * and the current root will be added as the new root's first child.
             */
            DockArea.prototype._ensureRoot = function (orientation) {
                var root = this._root;
                if (root.orientation === orientation) {
                    return;
                }
                if (root.count <= 1) {
                    root.orientation = orientation;
                }
                else {
                    this._root = this._createSplitter(orientation);
                    this._root.addPanel(root);
                    this.layout.panel = this._root;
                }
            };
            /**
             * Add a new item to the dock area and install its signal handlers.
             */
            DockArea.prototype._addItem = function (widget, panel) {
                this._items.push({ widget: widget, panel: panel });
            };
            /**
             * Create a new panel and setup the signal handlers.
             */
            DockArea.prototype._createPanel = function () {
                var panel = new DockPanel();
                var tabBar = panel.tabBar;
                tabBar.tabWidth = this._tabWidth;
                tabBar.tabOverlap = this._tabOverlap;
                tabBar.minTabWidth = this._minTabWidth;
                tabBar.currentChanged.connect(this._tb_currentChanged, this);
                tabBar.tabCloseRequested.connect(this._tb_tabCloseRequested, this);
                tabBar.tabDetachRequested.connect(this._tb_tabDetachRequested, this);
                panel.stackPanel.panelRemoved.connect(this._sw_widgetRemoved, this);
                return panel;
            };
            /**
             * Create a new dock splitter for the dock area.
             */
            DockArea.prototype._createSplitter = function (orientation) {
                var splitter = new DockSplitter(orientation);
                splitter.handleSize = this._handleSize;
                return splitter;
            };
            /**
             * Remove an empty dock panel from the hierarchy.
             *
             * This ensures that the hierarchy is kept consistent by merging an
             * ancestor splitter when it contains only a single child widget.
             */
            DockArea.prototype._removePanel = function (panel) {
                // The parent of a dock panel is always a splitter.
                var splitter = panel.parent;
                // Dispose the panel. It is possible that this method is executing
                // on the path of the panel's child stack widget event handler, so
                // the panel is disposed in a deferred fashion to avoid disposing
                // the child stack widget while its processing events.
                panel.parent = null;
                setTimeout(function () { return panel.dispose(); }, 0);
                // If the splitter still has multiple children after removing
                // the target panel, nothing else needs to be done.
                if (splitter.count > 1) {
                    return;
                }
                // If the splitter is the root splitter and has a remaining
                // child which is a splitter, that child becomes the root.
                if (splitter === this._root) {
                    if (splitter.count === 1) {
                        var child = splitter.panelAt(0);
                        if (child instanceof DockSplitter) {
                            var layout = this.layout;
                            var sizes = child.sizes();
                            this._root = child;
                            splitter.parent = null;
                            layout.panel = child;
                            child.setSizes(sizes);
                            splitter.dispose();
                        }
                    }
                    return;
                }
                // Non-root splitters always have a splitter parent and are always
                // created with 2 children, so the splitter is guaranteed to have
                // a single child at this point. Furthermore, splitters always have
                // an orthogonal orientation to their parent, so a grandparent and
                // a grandhild splitter will have the same orientation. This means
                // the children of the granchild can be merged into the grandparent.
                var gParent = splitter.parent;
                var gSizes = gParent.sizes();
                var gChild = splitter.panelAt(0);
                var index = gParent.indexOf(splitter);
                splitter.parent = null;
                if (gChild instanceof DockPanel) {
                    gParent.insertPanel(index, gChild);
                }
                else {
                    var gcsp = gChild;
                    var gcspSizes = gcsp.sizes();
                    var sizeShare = gSizes.splice(index, 1)[0];
                    for (var i = 0; gcsp.count !== 0; ++i) {
                        gParent.insertPanel(index + i, gcsp.panelAt(0));
                        gSizes.splice(index + i, 0, sizeShare * gcspSizes[i]);
                    }
                }
                gParent.setSizes(gSizes);
                splitter.dispose();
            };
            /**
             * Abort the tab drag operation if one is in progress.
             */
            DockArea.prototype._abortDrag = function () {
                var dragData = this._dragData;
                if (!dragData) {
                    return;
                }
                this._dragData = null;
                // Release the mouse grab and restore the application cursor.
                document.removeEventListener('mouseup', this, true);
                document.removeEventListener('mousemove', this, true);
                document.removeEventListener('contextmenu', this, true);
                dragData.grab.dispose();
                // Hide the overlay for the last hit panel.
                if (dragData.lastHitPanel) {
                    dragData.lastHitPanel.hideOverlay();
                }
                // If the tab is borrowed by another tab bar, remove it from
                // that tab bar and restore that tab bar's previous tab.
                if (dragData.tempPanel) {
                    var tabBar = dragData.tempPanel.tabBar;
                    tabBar.takeAt(tabBar.currentIndex, false);
                    tabBar.currentTab = dragData.tempTab;
                }
                // Restore the tab to its original location in its owner panel.
                var item = dragData.item;
                var itemTab = item.widget.tab;
                var ownBar = item.panel.tabBar;
                if (ownBar.currentTab !== itemTab) {
                    var tabStyle = itemTab.node.style;
                    floatTab(itemTab, false);
                    tabStyle.top = '';
                    tabStyle.left = '';
                    tabStyle.width = '';
                    ownBar.insertTab(dragData.index, itemTab);
                }
            };
            /**
             * Handle the `currentChanged` signal from a tab bar.
             */
            DockArea.prototype._tb_currentChanged = function (sender, args) {
                var item = find(this._items, function (it) { return it.widget.tab === args.tab; });
                if (item && item.panel.tabBar === sender) {
                    item.panel.stackPanel.currentPanel = item.widget;
                }
            };
            /**
             * Handle the `tabCloseRequested` signal from a tab bar.
             */
            DockArea.prototype._tb_tabCloseRequested = function (sender, args) {
                var item = find(this._items, function (it) { return it.widget.tab === args.tab; });
                if (item)
                    item.widget.close();
            };
            /**
             * Handle the `tabDetachRequested` signal from the tab bar.
             */
            DockArea.prototype._tb_tabDetachRequested = function (sender, args) {
                // Find the dock item for the detach operation.
                var tab = args.tab;
                var item = find(this._items, function (it) { return it.widget.tab === tab; });
                if (!item) {
                    return;
                }
                // Create the drag data the first time a tab is detached.
                // The drag data will be cleared on the mouse up event.
                if (!this._dragData) {
                    var prevTab = sender.previousTab;
                    var grab = overrideCursor(window.getComputedStyle(tab.node).cursor);
                    this._dragData = {
                        item: item,
                        index: args.index,
                        tabWidth: 0,
                        offsetX: 0,
                        offsetY: 0,
                        grab: grab,
                        prevTab: prevTab,
                        lastHitPanel: null,
                        tempPanel: null,
                        tempTab: null,
                    };
                }
                // Update the drag data with the current tab geometry.
                var dragData = this._dragData;
                dragData.tabWidth = args.tabWidth;
                dragData.offsetX = args.offsetX;
                dragData.offsetY = args.offsetY;
                // The tab being detached will have one of two states:
                //
                // 1) The tab is being detached from its owner tab bar. The current
                //    index is unset before detaching the tab so that the content
                //    widget does not change during the drag operation.
                // 2) The tab is being detached from a tab bar which was borrowing
                //    the tab temporarily. Its previously selected tab is restored.
                if (item.panel.tabBar === sender) {
                    sender.currentIndex = -1;
                    sender.takeAt(args.index, false);
                }
                else {
                    sender.takeAt(args.index, false);
                    sender.currentTab = dragData.tempTab;
                }
                // Clear the temp panel and tab
                dragData.tempPanel = null;
                dragData.tempTab = null;
                // Setup the initial style and position for the floating tab.
                var style = tab.node.style;
                style.left = args.clientX - args.offsetX + 'px';
                style.top = args.clientY - args.offsetY + 'px';
                style.width = args.tabWidth + 'px';
                style.zIndex = '';
                // Add the floating tab to the document body.
                floatTab(tab, true);
                document.body.appendChild(tab.node);
                // Attach the necessary mouse event listeners.
                document.addEventListener('mouseup', this, true);
                document.addEventListener('mousemove', this, true);
                document.addEventListener('contextmenu', this, true);
            };
            /**
             * Handle the `widgetRemoved` signal from a stack widget.
             */
            DockArea.prototype._sw_widgetRemoved = function (sender, args) {
                if (this._ignoreRemoved) {
                    return;
                }
                var item = remove(this._items, function (it) { return it.widget === args.panel; });
                if (!item) {
                    return;
                }
                this._abortDrag();
                item.panel.tabBar.removeTab(item.widget.tab);
                if (item.panel.stackPanel.count === 0) {
                    this._removePanel(item.panel);
                }
            };
            return DockArea;
        })(panels.Panel);
        panels.DockArea = DockArea;
        /**
         * Set or remove the floating class on the given tab.
         */
        function floatTab(tab, on) {
            if (on) {
                tab.node.classList.add(FLOATING_CLASS);
            }
            else {
                tab.node.classList.remove(FLOATING_CLASS);
            }
        }
        /**
         * Iterate over the DockPanels starting with the given root splitter.
         *
         * Iteration stops when the callback returns anything but undefined.
         */
        function iterPanels(root, cb) {
            for (var i = 0, n = root.count; i < n; ++i) {
                var result;
                var panel = root.panelAt(i);
                if (panel instanceof DockPanel) {
                    result = cb(panel);
                }
                else {
                    result = iterPanels(panel, cb);
                }
                if (result !== void 0) {
                    return result;
                }
            }
            return void 0;
        }
        /**
         * Iterate over the DockSplitters starting with the given root splitter.
         *
         * Iteration stops when the callback returns anything but undefined.
         */
        function iterSplitters(root, cb) {
            var result = cb(root);
            if (result !== void 0) {
                return result;
            }
            for (var i = 0, n = root.count; i < n; ++i) {
                var panel = root.panelAt(i);
                if (panel instanceof DockSplitter) {
                    result = iterSplitters(panel, cb);
                    if (result !== void 0) {
                        return result;
                    }
                }
            }
            return void 0;
        }
        function find(items, cb) {
            for (var i = 0, n = items.length; i < n; ++i) {
                var v = items[i];
                if (cb(v))
                    return v;
            }
            return void 0;
        }
        function remove(items, cb) {
            for (var i = 0, n = items.length; i < n; ++i) {
                var v = items[i];
                if (cb(v)) {
                    items.splice(i, 1);
                    return v;
                }
            }
            return void 0;
        }
        /**
         * The class name added to DockPanel instances.
         */
        var DOCK_PANEL_CLASS = 'p-DockPanel';
        /**
         * The class name added to the DockPanel overlay div.
         */
        var OVERLAY_CLASS = 'p-DockPanel-overlay';
        /**
         * The split modes used to indicate a dock panel split direction.
         */
        var SplitMode;
        (function (SplitMode) {
            SplitMode[SplitMode["Top"] = 0] = "Top";
            SplitMode[SplitMode["Left"] = 1] = "Left";
            SplitMode[SplitMode["Right"] = 2] = "Right";
            SplitMode[SplitMode["Bottom"] = 3] = "Bottom";
            SplitMode[SplitMode["Invalid"] = 4] = "Invalid";
        })(SplitMode || (SplitMode = {}));
        /**
         * An panel used by a DockArea.
         *
         * A dock panel acts as a simple container for a tab bar and stack
         * panel, plus a bit of logic to manage a drop indicator overlay.
         * The dock area manages the tab bar and stack panel directly, as
         * there is not always a 1:1 association between a tab and panel.
         *
         * This class is not part of the public Phosphor API.
         */
        var DockPanel = (function (_super) {
            __extends(DockPanel, _super);
            /**
             * Construct a new dock panel.
             */
            function DockPanel() {
                _super.call(this);
                this._overlayTimer = 0;
                this._overlayHidden = true;
                this._overlayNode = null;
                this.node.classList.add(DOCK_PANEL_CLASS);
                this._tabBar = new panels.TabBar();
                this._stackPanel = new panels.StackPanel();
                this._overlayNode = this.createOverlay();
                var layout = new panels.BoxLayout(2 /* TopToBottom */, 0);
                layout.addPanel(this._tabBar);
                layout.addPanel(this._stackPanel);
                this.layout = layout;
                this.setFlag(16 /* DisallowLayoutChange */);
                this.node.appendChild(this._overlayNode);
            }
            Object.defineProperty(DockPanel.prototype, "tabBar", {
                /**
                 * Get the tab bar child of the dock panel.
                 */
                get: function () {
                    return this._tabBar;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DockPanel.prototype, "stackPanel", {
                /**
                 * Get the stack panel child of the dock panel.
                 */
                get: function () {
                    return this._stackPanel;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Dispose of the resources held by the panel.
             */
            DockPanel.prototype.dispose = function () {
                this._clearOverlayTimer();
                this._tabBar = null;
                this._stackPanel = null;
                this._overlayNode = null;
                _super.prototype.dispose.call(this);
            };
            /**
             * Compute the split mode for the given client position.
             */
            DockPanel.prototype.splitModeAt = function (clientX, clientY) {
                var rect = this.node.getBoundingClientRect();
                var fracX = (clientX - rect.left) / rect.width;
                var fracY = (clientY - rect.top) / rect.height;
                if (fracX < 0.0 || fracX > 1.0 || fracY < 0.0 || fracY > 1.0) {
                    return 4 /* Invalid */;
                }
                var mode;
                var normX = fracX > 0.5 ? 1 - fracX : fracX;
                var normY = fracY > 0.5 ? 1 - fracY : fracY;
                if (normX < normY) {
                    mode = fracX <= 0.5 ? 1 /* Left */ : 2 /* Right */;
                }
                else {
                    mode = fracY <= 0.5 ? 0 /* Top */ : 3 /* Bottom */;
                }
                return mode;
            };
            /**
             * Show the dock overlay for the given client position.
             *
             * If the overlay is already visible, it will be adjusted.
             */
            DockPanel.prototype.showOverlay = function (clientX, clientY) {
                this._clearOverlayTimer();
                var box = this.boxData;
                var top = box.paddingTop;
                var left = box.paddingLeft;
                var right = box.paddingRight;
                var bottom = box.paddingBottom;
                switch (this.splitModeAt(clientX, clientY)) {
                    case 1 /* Left */:
                        right = this.width / 2;
                        break;
                    case 2 /* Right */:
                        left = this.width / 2;
                        break;
                    case 0 /* Top */:
                        bottom = this.height / 2;
                        break;
                    case 3 /* Bottom */:
                        top = this.height / 2;
                        break;
                    default:
                        return;
                }
                // The first time the overlay is made visible, it is positioned at
                // the cursor with zero size before being displayed. This allows
                // for a nice transition to the normally computed size. Since the
                // elements starts with display: none, a restyle must be forced.
                var style = this._overlayNode.style;
                if (this._overlayHidden) {
                    this._overlayHidden = false;
                    var rect = this.node.getBoundingClientRect();
                    style.top = clientY - rect.top + 'px';
                    style.left = clientX - rect.left + 'px';
                    style.right = rect.right - clientX + 'px';
                    style.bottom = rect.bottom - clientY + 'px';
                    style.display = '';
                    this._overlayNode.offsetWidth; // force restyle
                }
                style.opacity = '1';
                style.top = top + 'px';
                style.left = left + 'px';
                style.right = right + 'px';
                style.bottom = bottom + 'px';
            };
            /**
             * Hide the dock overlay.
             *
             * If the overlay is already hidden, this is a no-op.
             */
            DockPanel.prototype.hideOverlay = function () {
                var _this = this;
                if (this._overlayHidden) {
                    return;
                }
                this._clearOverlayTimer();
                this._overlayHidden = true;
                this._overlayNode.style.opacity = '0';
                this._overlayTimer = setTimeout(function () {
                    _this._overlayTimer = 0;
                    _this._overlayNode.style.display = 'none';
                }, 150);
            };
            /**
             * Create the overlay node for the dock panel.
             */
            DockPanel.prototype.createOverlay = function () {
                var overlay = document.createElement('div');
                overlay.className = OVERLAY_CLASS;
                overlay.style.display = 'none';
                return overlay;
            };
            /**
             * Clear the overlay timer.
             */
            DockPanel.prototype._clearOverlayTimer = function () {
                if (this._overlayTimer) {
                    clearTimeout(this._overlayTimer);
                    this._overlayTimer = 0;
                }
            };
            return DockPanel;
        })(panels.Panel);
        /**
         * The class name added to DockSplitter instances.
         */
        var DOCK_SPLITTER_CLASS = 'p-DockSplitter';
        /**
         * A split panel used by a DockArea.
         *
         * This class is not part of the public Phosphor API.
         */
        var DockSplitter = (function (_super) {
            __extends(DockSplitter, _super);
            /**
             * Construct a new dock splitter.
             */
            function DockSplitter(orientation) {
                _super.call(this, orientation);
                this.node.classList.add(DOCK_SPLITTER_CLASS);
            }
            return DockSplitter;
        })(panels.SplitPanel);
    })(panels = phosphor.panels || (phosphor.panels = {}));
})(phosphor || (phosphor = {})); // module phosphor.panels

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
/**
 * Execute a callback for each element in an array.
 *
 * @param array - The array of values to iterate.
 *
 * @param callback - The callback to invoke for the array elements.
 *
 * @param fromIndex - The starting index for iteration.
 *
 * @param wrap - Whether iteration wraps around at the end of the array.
 *
 * @returns The first value returned by `callback` which is not
 *   equal to `undefined`, or `undefined` if the callback does
 *   not return a value or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function logger(value: number): void {
 *   console.log(value);
 * }
 *
 * var data = [1, 2, 3, 4];
 * arrays.forEach(data, logger);           // logs 1, 2, 3, 4
 * arrays.forEach(data, logger, 2);        // logs 3, 4
 * arrays.forEach(data, logger, 2, true);  // logs 3, 4, 1, 2
 * arrays.forEach(data, (v, i) => {        // 2
 *   if (v === 3) return i;
 * });
 * ```
 *
 * **See also** [[rforEach]]
 */
function forEach(array, callback, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return void 0;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start + i) % n;
            var result = callback(array[j], j);
            if (result !== void 0)
                return result;
        }
    }
    else {
        for (var i = start, n = array.length; i < n; ++i) {
            var result = callback(array[i], i);
            if (result !== void 0)
                return result;
        }
    }
    return void 0;
}
exports.forEach = forEach;
/**
 * Execute a callback for each element in an array, in reverse.
 *
 * @param array - The array of values to iterate.
 *
 * @param callback - The callback to invoke for the array elements.
 *
 * @param fromIndex - The starting index for iteration.
 *
 * @param wrap - Whether iteration wraps around at the end of the array.
 *
 * @returns The first value returned by `callback` which is not
 *   equal to `undefined`, or `undefined` if the callback does
 *   not return a value or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function logger(value: number): void {
 *   console.log(value);
 * }
 *
 * var data = [1, 2, 3, 4];
 * arrays.rforEach(data, logger);           // logs 4, 3, 2, 1
 * arrays.rforEach(data, logger, 2);        // logs 3, 2, 1
 * arrays.rforEach(data, logger, 2, true);  // logs 3, 2, 1, 4
 * arrays.rforEach(data, (v, i) => {        // 2
 *   if (v === 3) return i;
 * });
 * ```
 * **See also** [[forEach]]
 */
function rforEach(array, callback, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = array.length - 1; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return void 0;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start - i + n) % n;
            var result = callback(array[j], j);
            if (result !== void 0)
                return result;
        }
    }
    else {
        for (var i = start; i >= 0; --i) {
            var result = callback(array[i], i);
            if (result !== void 0)
                return result;
        }
    }
    return void 0;
}
exports.rforEach = rforEach;
/**
 * Find the index of the first value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *
 * @returns The index of the first matching value, or `-1` if no value
 *   matches the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.findIndex(data, isEven);           // 1
 * arrays.findIndex(data, isEven, 4);        // 5
 * arrays.findIndex(data, isEven, 6);        // -1
 * arrays.findIndex(data, isEven, 6, true);  // 1
 * ```
 *
 * **See also** [[rfindIndex]].
 */
function findIndex(array, pred, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return -1;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start + i) % n;
            if (pred(array[j], j))
                return j;
        }
    }
    else {
        for (var i = start, n = array.length; i < n; ++i) {
            if (pred(array[i], i))
                return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
/**
 * Find the index of the last value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the front of the array.
 *
 * @returns The index of the last matching value, or `-1` if no value
 *   matches the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.rfindIndex(data, isEven);           // 5
 * arrays.rfindIndex(data, isEven, 4);        // 3
 * arrays.rfindIndex(data, isEven, 0);        // -1
 * arrays.rfindIndex(data, isEven, 0, true);  // 5
 * ```
 *
 * **See also** [[findIndex]].
 */
function rfindIndex(array, pred, fromIndex, wrap) {
    if (fromIndex === void 0) { fromIndex = array.length - 1; }
    if (wrap === void 0) { wrap = false; }
    var start = fromIndex | 0;
    if (start < 0 || start >= array.length) {
        return -1;
    }
    if (wrap) {
        for (var i = 0, n = array.length; i < n; ++i) {
            var j = (start - i + n) % n;
            if (pred(array[j], j))
                return j;
        }
    }
    else {
        for (var i = start; i >= 0; --i) {
            if (pred(array[i], i))
                return i;
        }
    }
    return -1;
}
exports.rfindIndex = rfindIndex;
/**
 * Find the first value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *
 * @returns The first matching value, or `undefined` if no value matches
 *   the predicate or if the start index is out of range.
 *
 * #### Notes
 * It is not safe to modify the size of the array while iterating.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.find(data, isEven);           // 2
 * arrays.find(data, isEven, 4);        // 2
 * arrays.find(data, isEven, 6);        // undefined
 * arrays.find(data, isEven, 6, true);  // 2
 * ```
 *
 * **See also** [[rfind]].
 */
function find(array, pred, fromIndex, wrap) {
    var i = findIndex(array, pred, fromIndex, wrap);
    return i !== -1 ? array[i] : void 0;
}
exports.find = find;
/**
 * Find the last value which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search.
 *
 * @param wrap - Whether the search wraps around at the front of the array.
 *
 * @returns The last matching value, or `undefined` if no value matches
 *   the predicate or if the start index is out of range.
 *
 * #### Notes
 * The range of visited indices is set before the first invocation of
 * `pred`. It is not safe for `pred` to change the length of `array`.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * arrays.rfind(data, isEven);           // 2
 * arrays.rfind(data, isEven, 4);        // 4
 * arrays.rfind(data, isEven, 0);        // undefined
 * arrays.rfind(data, isEven, 0, true);  // 2
 * ```
 *
 * **See also** [[find]].
 */
function rfind(array, pred, fromIndex, wrap) {
    var i = rfindIndex(array, pred, fromIndex, wrap);
    return i !== -1 ? array[i] : void 0;
}
exports.rfind = rfind;
/**
 * Insert an element into an array at a specified index.
 *
 * @param array - The array of values to modify.
 *
 * @param index - The index at which to insert the value. This value
 *   is clamped to the bounds of the array.
 *
 * @param value - The value to insert into the array.
 *
 * @returns The index at which the value was inserted.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.insert(data, 0, 12);  // 0
 * arrays.insert(data, 3, 42);  // 3
 * arrays.insert(data, -9, 9);  // 0
 * arrays.insert(data, 12, 8);  // 8
 * console.log(data);           // [9, 12, 0, 1, 42, 2, 3, 4, 8]
 * ```
 *
 * **See also** [[removeAt]] and [[remove]]
 */
function insert(array, index, value) {
    var j = Math.max(0, Math.min(index | 0, array.length));
    for (var i = array.length; i > j; --i) {
        array[i] = array[i - 1];
    }
    array[j] = value;
    return j;
}
exports.insert = insert;
/**
 * Move an element in an array from one index to another.
 *
 * @param array - The array of values to modify.
 *
 * @param fromIndex - The index of the element to move.
 *
 * @param toIndex - The target index of the element.
 *
 * @returns `true` if the element was moved, or `false` if either
 *   index is out of range.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.move(data, 1, 2);   // true
 * arrays.move(data, -1, 0);  // false
 * arrays.move(data, 4, 2);   // true
 * arrays.move(data, 10, 0);  // false
 * console.log(data);         // [0, 2, 4, 1, 3]
 * ```
 */
function move(array, fromIndex, toIndex) {
    var j = fromIndex | 0;
    if (j < 0 || j >= array.length) {
        return false;
    }
    var k = toIndex | 0;
    if (k < 0 || k >= array.length) {
        return false;
    }
    var value = array[j];
    if (j > k) {
        for (var i = j; i > k; --i) {
            array[i] = array[i - 1];
        }
    }
    else if (j < k) {
        for (var i = j; i < k; ++i) {
            array[i] = array[i + 1];
        }
    }
    array[k] = value;
    return true;
}
exports.move = move;
/**
 * Remove an element from an array at a specified index.
 *
 * @param array - The array of values to modify.
 *
 * @param index - The index of the element to remove.
 *
 * @returns The removed value, or `undefined` if the index is out
 *   of range.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.removeAt(data, 1);   // 1
 * arrays.removeAt(data, 3);   // 4
 * arrays.removeAt(data, 10);  // undefined
 * console.log(data);          // [0, 2, 3]
 * ```
 *
 * **See also** [[remove]] and [[insert]]
 */
function removeAt(array, index) {
    var j = index | 0;
    if (j < 0 || j >= array.length) {
        return void 0;
    }
    var value = array[j];
    for (var i = j + 1, n = array.length; i < n; ++i) {
        array[i - 1] = array[i];
    }
    array.length -= 1;
    return value;
}
exports.removeAt = removeAt;
/**
 * Remove the first occurrence of a value from an array.
 *
 * @param array - The array of values to modify.
 *
 * @param value - The value to remove from the array.
 *
 * @returns The index where the value was located, or `-1` if the
 *   value is not the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.remove(data, 1);  // 1
 * arrays.remove(data, 3);  // 2
 * arrays.remove(data, 7);  // -1
 * console.log(data);       // [0, 2, 4]
 * ```
 *
 * **See also** [[removeAt]] and [[insert]]
 */
function remove(array, value) {
    var j = -1;
    for (var i = 0, n = array.length; i < n; ++i) {
        if (array[i] === value) {
            j = i;
            break;
        }
    }
    if (j === -1) {
        return -1;
    }
    for (var i = j + 1, n = array.length; i < n; ++i) {
        array[i - 1] = array[i];
    }
    array.length -= 1;
    return j;
}
exports.remove = remove;
/**
 * Reverse an array in-place subject to an optional range.
 *
 * @param array - The array to reverse.
 *
 * @param fromIndex - The index of the first element of the range.
 *   This value will be clamped to the array bounds.
 *
 * @param toIndex - The index of the last element of the range.
 *   This value will be clamped to the array bounds.
 *
 * @returns A reference to the original array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.reverse(data, 1, 3);    // [0, 3, 2, 1, 4]
 * arrays.reverse(data, 3);       // [0, 3, 2, 4, 1]
 * arrays.reverse(data);          // [1, 4, 2, 3, 0]
 * ```
 *
 * **See also** [[rotate]]
 */
function reverse(array, fromIndex, toIndex) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (toIndex === void 0) { toIndex = array.length; }
    var i = Math.max(0, Math.min(fromIndex | 0, array.length - 1));
    var j = Math.max(0, Math.min(toIndex | 0, array.length - 1));
    if (j < i)
        i = j + (j = i, 0);
    while (i < j) {
        var tmpval = array[i];
        array[i++] = array[j];
        array[j--] = tmpval;
    }
    return array;
}
exports.reverse = reverse;
/**
 * Rotate the elements of an array by a positive or negative delta.
 *
 * @param array - The array to rotate.
 *
 * @param delta - The amount of rotation to apply to the elements. A
 *   positive delta will shift the elements to the left. A negative
 *   delta will shift the elements to the right.
 *
 * @returns A reference to the original array.
 *
 * #### Notes
 * This executes in `O(n)` time and `O(1)` space.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * var data = [0, 1, 2, 3, 4];
 * arrays.rotate(data, 2);    // [2, 3, 4, 0, 1]
 * arrays.rotate(data, -2);   // [0, 1, 2, 3, 4]
 * arrays.rotate(data, 10);   // [0, 1, 2, 3, 4]
 * arrays.rotate(data, 9);    // [4, 0, 1, 2, 3]
 * ```
 *
 * **See also** [[reverse]]
 */
function rotate(array, delta) {
    var n = array.length;
    if (n <= 1) {
        return array;
    }
    var d = delta | 0;
    if (d > 0) {
        d = d % n;
    }
    else if (d < 0) {
        d = ((d % n) + n) % n;
    }
    if (d === 0) {
        return array;
    }
    reverse(array, 0, d - 1);
    reverse(array, d, n - 1);
    reverse(array, 0, n - 1);
    return array;
}
exports.rotate = rotate;
/**
 * Using a binary search, find the index of the first element in an
 * array which compares `>=` to a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparison function which returns `true` if an
 *   array element is less than the given value.
 *
 * @returns The index of the first element in `array` which compares
 *   `>=` to `value`, or `array.length` if there is no such element.
 *
 * #### Notes
 * It is not safe for the comparison function to modify the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function numberCmp(a: number, b: number): boolean {
 *   return a < b;
 * }
 *
 * var data = [0, 3, 4, 7, 7, 9];
 * arrays.lowerBound(data, 0, numberCmp);   // 0
 * arrays.lowerBound(data, 6, numberCmp);   // 3
 * arrays.lowerBound(data, 7, numberCmp);   // 3
 * arrays.lowerBound(data, -1, numberCmp);  // 0
 * arrays.lowerBound(data, 10, numberCmp);  // 6
 * ```
 *
 * **See also** [[upperBound]]
 */
function lowerBound(array, value, cmp) {
    var begin = 0;
    var half;
    var middle;
    var n = array.length;
    while (n > 0) {
        half = n >> 1;
        middle = begin + half;
        if (cmp(array[middle], value)) {
            begin = middle + 1;
            n -= half + 1;
        }
        else {
            n = half;
        }
    }
    return begin;
}
exports.lowerBound = lowerBound;
/**
 * Using a binary search, find the index of the first element in an
 * array which compares `>` than a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparison function which returns `true` if the
 *   the given value is less than an array element.
 *
 * @returns The index of the first element in `array` which compares
 *   `>` than `value`, or `array.length` if there is no such element.
 *
 * #### Notes
 * It is not safe for the comparison function to modify the array.
 *
 * #### Example
 * ```typescript
 * import * as arrays from 'phosphor-arrays';
 *
 * function numberCmp(a: number, b: number): number {
 *   return a < b;
 * }
 *
 * var data = [0, 3, 4, 7, 7, 9];
 * arrays.upperBound(data, 0, numberCmp);   // 1
 * arrays.upperBound(data, 6, numberCmp);   // 3
 * arrays.upperBound(data, 7, numberCmp);   // 5
 * arrays.upperBound(data, -1, numberCmp);  // 0
 * arrays.upperBound(data, 10, numberCmp);  // 6
 * ```
 *
 * **See also** [[lowerBound]]
 */
function upperBound(array, value, cmp) {
    var begin = 0;
    var half;
    var middle;
    var n = array.length;
    while (n > 0) {
        half = n >> 1;
        middle = begin + half;
        if (cmp(value, array[middle])) {
            n = half;
        }
        else {
            begin = middle + 1;
            n -= half + 1;
        }
    }
    return begin;
}
exports.upperBound = upperBound;
//# sourceMappingURL=index.js.map
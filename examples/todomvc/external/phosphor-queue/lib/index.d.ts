/**
 * A generic FIFO queue data structure.
 *
 * #### Notes
 * This queue is implemented internally using a singly linked list and
 * can grow to arbitrary size.
 *
 * #### Example
 * ```typescript
 * var q = new Queue<number>([0, 1, 2]);
 * q.size;      // 3
 * q.empty;     // false
 * q.pop();     // 0
 * q.pop();     // 1
 * q.push(42);  // undefined
 * q.size;      // 2
 * q.pop();     // 2
 * q.pop();     // 42
 * q.pop();     // undefined
 * q.size;      // 0
 * q.empty;     // true
 * ```
 */
export declare class Queue<T> {
    /**
     * Construct a new queue.
     *
     * @param items - The initial items for the queue.
     */
    constructor(items?: T[]);
    /**
     * Get the number of elements in the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     */
    size: number;
    /**
     * Test whether the queue is empty.
     *
     * #### Notes
     * This has `O(1)` complexity.
     */
    empty: boolean;
    /**
     * Get the value at the front of the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     *
     * If the queue is empty, this value will be `undefined`.
     */
    front: T;
    /**
     * Get the value at the back of the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     *
     * If the queue is empty, this value will be `undefined`.
     */
    back: T;
    /**
     * Push a value onto the back of the queue.
     *
     * @param value - The value to add to the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     */
    push(value: T): void;
    /**
     * Pop and return the value at the front of the queue.
     *
     * @returns The value at the front of the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     *
     * If the queue is empty, the return value will be `undefined`.
     */
    pop(): T;
    /**
     * Remove the first occurrence of a value from the queue.
     *
     * @param value - The value to remove from the queue.
     *
     * @returns `true` on success, `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    remove(value: T): boolean;
    /**
     * Remove all occurrences of a value from the queue.
     *
     * @param value - The value to remove from the queue.
     *
     * @returns The number of occurrences removed.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    removeAll(value: T): number;
    /**
     * Remove all values from the queue.
     *
     * #### Notes
     * This has `O(1)` complexity.
     */
    clear(): void;
    /**
     * Create an array from the values in the queue.
     *
     * @returns An array of all values in the queue.
     *
     * #### Notes
     * This has `O(N)` complexity.
     */
    toArray(): T[];
    /**
     * Test whether any value in the queue passes a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns `true` if any value in the queue passes the predicate,
     *   or `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    some(pred: (value: T, index: number) => boolean): boolean;
    /**
     * Test whether all values in the queue pass a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns `true` if all values in the queue pass the predicate,
     *   or `false` otherwise.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    every(pred: (value: T, index: number) => boolean): boolean;
    /**
     * Create an array of the values which pass a predicate function.
     *
     * @param pred - The predicate to apply to the values.
     *
     * @returns The array of values which pass the predicate.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the predicate to modify the queue while
     * iterating.
     */
    filter(pred: (value: T, index: number) => boolean): T[];
    /**
     * Create an array of mapped values for the values in the queue.
     *
     * @param callback - The map function to apply to the values.
     *
     * @returns The array of values returned by the map function.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * It is **not** safe for the callback to modify the queue while
     * iterating.
     */
    map<U>(callback: (value: T, index: number) => U): U[];
    /**
     * Execute a callback for each value in the queue.
     *
     * @param callback - The function to apply to the values.
     *
     * @returns The first value returned by the callback which is not
     *   `undefined`.
     *
     * #### Notes
     * This has `O(N)` complexity.
     *
     * Iteration will terminate immediately if the callback returns any
     * value other than `undefined`.
     *
     * It is **not** safe for the callback to modify the queue while
     * iterating.
     */
    forEach<U>(callback: (value: T, index: number) => U): U;
    private _size;
    private _front;
    private _back;
}

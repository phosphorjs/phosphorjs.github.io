/**
 * An object which implements the disposable pattern.
 */
export interface IDisposable {
    /**
     * Test whether the object has been disposed.
     *
     * #### Notes
     * This is a read-only property which is always safe to access.
     */
    isDisposed: boolean;
    /**
     * Dispose of the resources held by the object.
     *
     * #### Notes
     * It is generally unsafe to use the object after it has been
     * disposed.
     *
     * If the object's `dispose` method is called more than once, all
     * calls made after the first will be a no-op.
     */
    dispose(): void;
}
/**
 * A disposable object which delegates to a callback.
 */
export declare class DisposableDelegate implements IDisposable {
    /**
     * Construct a new disposable delegate.
     *
     * @param callback - The function to invoke when the delegate is
     *   disposed.
     */
    constructor(callback: () => void);
    /**
     * Test whether the delegate has been disposed.
     *
     * #### Notes
     * This is a read-only property which is always safe to access.
     */
    isDisposed: boolean;
    /**
     * Dispose of the delegate and invoke its callback.
     *
     * #### Notes
     * If this method is called more than once, all calls made after the
     * first will be a no-op.
     */
    dispose(): void;
    private _callback;
}
/**
 * An object which manages a collection of disposable items.
 */
export declare class DisposableSet implements IDisposable {
    /**
     * Construct a new disposable set.
     *
     * @param items - The initial disposable items for the set.
     */
    constructor(items?: IDisposable[]);
    /**
     * Test whether the set has been disposed.
     *
     * #### Notes
     * This is a read-only property which is always safe to access.
     */
    isDisposed: boolean;
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
    dispose(): void;
    /**
     * Add a disposable item to the set.
     *
     * @param item - The disposable item to add to the set. If the item
     *   is already contained in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    add(item: IDisposable): void;
    /**
     * Remove a disposable item from the set.
     *
     * @param item - The disposable item to remove from the set. If the
     *   item does not exist in the set, this is a no-op.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    remove(item: IDisposable): void;
    /**
     * Clear all disposable items from the set.
     *
     * @throws Will throw an error if the set has been disposed.
     */
    clear(): void;
    private _set;
}

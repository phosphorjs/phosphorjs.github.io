declare module phosphor.collections {
    /**
     * An object which iterates over elements in an iterable.
     *
     * The `moveNext` method must be called after creating the iterator to
     * advance it to the first element or `current` will return `undefined`.
     *
     * The behavior of an iterator is undefined if the underlying collection
     * is modified during iteration. It is not safe to modify a collection
     * while using an iterator to iterate over its values.
     */
    interface IIterator<T> extends IIterable<T> {
        /**
         * The current value of the iterable.
         *
         * Returns `undefined` if there is no current value.
         */
        current: T;
        /**
         * Move the iterator to the next value.
         *
         * Returns true on success, false when the iterator is exhausted.
         */
        moveNext(): boolean;
    }
}

declare module phosphor.collections {
    /**
     * An object which supports iteration over its elements.
     *
     * In general, it is not safe to modify the iterable while iterating.
     */
    interface IIterable<T> {
        /**
         * Get an iterator for the elements in the iterable.
         */
        iterator(): IIterator<T>;
    }
}

declare module phosphor.collections {
    /**
     * A collection of elements with a definite size.
     */
    interface ICollection<T> extends IIterable<T> {
        /**
         * True if the collection has elements, false otherwise.
         */
        empty: boolean;
        /**
         * The number of elements in the collection.
         */
        size: number;
        /**
         * Test whether the collection contains the given value.
         */
        contains(value: T): boolean;
        /**
         * Add a value to the collection.
         *
         * Returns true if the collection was changed, false otherwise.
         */
        add(value: T): boolean;
        /**
         * Remove a value from the collection.
         *
         * Returns true if the collection was changed, false otherwise.
         */
        remove(value: T): boolean;
        /**
         * Remove all elements from the collection.
         */
        clear(): void;
    }
}

declare module phosphor.collections {
    /**
     * A double ended queue with constant time access to both ends.
     */
    interface IDeque<T> extends IQueue<T> {
        /**
         * Push a value onto the front of the queue.
         */
        pushFront(value: T): void;
        /**
         * Pop and return the value at the back of the queue.
         */
        popBack(): T;
    }
}

declare module phosphor.collections {
    /**
     * A collection of elements which can be accessed by index.
     */
    interface IList<T> extends ICollection<T> {
        /**
         * Get the index of the given value.
         *
         * Returns -1 if the value is not in the list.
         */
        indexOf(value: T): number;
        /**
         * Get the element at the given index.
         *
         * Returns `undefined` if the index is out of range.
         */
        get(index: number): T;
        /**
         * Set the value at the given index.
         *
         * Returns false if the index is out of range.
         */
        set(index: number, value: T): boolean;
        /**
         * Insert a value at the given index.
         *
         * Returns false if the index is out of range.
         */
        insert(index: number, value: T): boolean;
        /**
         * Remove and return the value at the given index.
         *
         * Returns `undefined` if the index is out of range.
         */
        removeAt(index: number): T;
    }
}

declare module phosphor.collections {
    /**
     * A collection with first-in-first-out semantics.
     */
    interface IQueue<T> extends ICollection<T> {
        /**
         * The value at the front of the queue.
         */
        front: T;
        /**
         * The value at the back of the queue.
         */
        back: T;
        /**
         * Push a value onto the back of the queue.
         */
        pushBack(value: T): void;
        /**
         * Pop and return the value at the front of the queue.
         */
        popFront(): T;
    }
}

declare module phosphor.collections {
    /**
     * A collection with first-in-last-out semantics.
     */
    interface IStack<T> extends ICollection<T> {
        /**
         * The value at the back of the stack.
         */
        back: T;
        /**
         * Push a value onto the back of the stack.
         */
        pushBack(value: T): void;
        /**
         * Pop and return the value at the back of the stack.
         */
        popBack(): T;
    }
}

declare module phosphor.collections {
    /**
     * Create an iterator for an iterable or array.
     */
    function iter<T>(iterable: IIterable<T> | T[]): IIterator<T>;
    /**
     * Create an array from the values in an iterable.
     */
    function toArray<T>(iterable: IIterable<T> | T[]): T[];
    /**
     * Invoke a function once for each element in an iterable.
     *
     * If the callback returns anything but `undefined`, iteration
     * will stop and that value will be returned from the function.
     */
    function forEach<T, U>(iterable: IIterable<T> | T[], callback: (value: T, index: number) => U): U;
    /**
     * Returns true if any element in the iterable passes the given test.
     */
    function some<T>(iterable: IIterable<T> | T[], callback: (value: T, index: number) => boolean): boolean;
    /**
     * Returns true if all elements in the iterable pass the given test.
     */
    function every<T>(iterable: IIterable<T> | T[], callback: (value: T, index: number) => boolean): boolean;
    /**
     * Create an array of the iterable elements which pass the given test.
     */
    function filter<T>(iterable: IIterable<T> | T[], callback: (value: T, index: number) => boolean): T[];
    /**
     * Create an array of callback results for each element in an iterable.
     */
    function map<T, U>(iterable: IIterable<T> | T[], callback: (value: T, index: number) => U): U[];
    /**
     * Find the first element in the iterable which passes the given test.
     *
     * Returns `undefined` if no element passes the test.
     */
    function find<T>(iterable: IIterable<T> | T[], callback: (value: T, index: number) => boolean): T;
    /**
     * Find the index of the first element which passes the given test.
     *
     * Returns -1 if no element passes the test.
     */
    function findIndex<T>(iterable: IIterable<T> | T[], callback: (value: T, index: number) => boolean): number;
    /**
     * Find the index of the first element which compares `>=` to `value`.
     *
     * This uses a binary search algorithm which must be applied to a
     * sorted list in order for the results to be correct.
     *
     * Returns `list.size` if all elements compare `<` than `value`.
     */
    function lowerBound<T, U>(list: IList<T>, value: U, compare: (a: T, b: U) => number): number;
    /**
     * Find the index of the first element which compares `>` than `value`.
     *
     * This uses a binary search algorithm which must be applied to a
     * sorted list in order for the results to be correct.
     *
     * Returns `0` if all elements compare `<=` than `value`.
     */
    function upperBound<T, U>(list: IList<T>, value: U, compare: (a: T, b: U) => number): number;
    /**
     * Find the index of the first element which compares `==` to `value`.
     *
     * This uses a binary search algorithm which must be applied to a
     * sorted list in order for the results to be correct.
     *
     * Returns `-1` if no matching value is found.
     */
    function lowerFind<T, U>(list: IList<T>, value: U, compare: (a: T, b: U) => number): number;
    /**
     * Find the index of the last element which compares `==` to `value`.
     *
     * This uses a binary search algorithm which must be applied to a
     * sorted list in order for the results to be correct.
     *
     * Returns `-1` if no matching value is found.
     */
    function upperFind<T, U>(list: IList<T>, value: U, compare: (a: T, b: U) => number): number;
}

declare module phosphor.collections {
    /**
     * A read only view of a collection.
     */
    class ReadOnlyCollection<T> implements ICollection<T> {
        /**
         * Construct a new read only collection.
         */
        constructor(collection: ICollection<T>);
        /**
         * True if the collection has elements, false otherwise.
         */
        empty: boolean;
        /**
         * The number of elements in the collection.
         */
        size: number;
        /**
         * Get an iterator for the elements in the collection.
         */
        iterator(): IIterator<T>;
        /**
         * Test whether the collection contains the given value.
         */
        contains(value: T): boolean;
        /**
         * Add a value to the collection.
         *
         * This method always throws.
         */
        add(value: T): boolean;
        /**
         * Remove a value from the collection.
         *
         * This method always throws.
         */
        remove(value: T): boolean;
        /**
         * Remove all elements from the collection.
         *
         * This method always throws.
         */
        clear(): void;
        protected _collection: ICollection<T>;
    }
}

declare module phosphor.collections {
    /**
     * A read only view of a list.
     */
    class ReadOnlyList<T> extends ReadOnlyCollection<T> implements IList<T> {
        /**
         * Construct a new read only list.
         */
        constructor(list: IList<T>);
        /**
         * Get the index of the given value.
         *
         * Returns -1 if the value is not in the list.
         */
        indexOf(value: T): number;
        /**
         * Get the value at the given index.
         *
         * Returns `undefined` if the index is out of range.
         */
        get(index: number): T;
        /**
         * Set the value at the given index.
         *
         * This method always throws.
         */
        set(index: number, value: T): boolean;
        /**
         * Insert a value at the given index.
         *
         * This method always throws.
         */
        insert(index: number, value: T): boolean;
        /**
         * Remove and return the value at the given index.
         *
         * This method always throws.
         */
        removeAt(index: number): T;
    }
}

declare module phosphor.collections {
    /**
     * An iterator for a generic array.
     */
    class ArrayIterator<T> implements IIterator<T> {
        /**
         * Construct a new array iterator.
         */
        constructor(array: T[]);
        /**
         * The current value of the iterable.
         *
         * Returns `undefined` if there is no current value.
         */
        current: T;
        /**
         * Move the iterator to the next value.
         *
         * Returns true on success, false when the iterator is exhausted.
         */
        moveNext(): boolean;
        /**
         * Returns `this` to make the iterator iterable.
         */
        iterator(): IIterator<T>;
        private _index;
        private _array;
        private _current;
    }
}

declare module phosphor.collections {
    /**
     * A collection of elements which can be accessed by index.
     */
    class List<T> implements IList<T>, IStack<T> {
        /**
         * Construct a new list.
         */
        constructor(items?: IIterable<T> | T[]);
        /**
         * True if the list has elements, false otherwise.
         */
        empty: boolean;
        /**
         * The number of elements in the list.
         */
        size: number;
        /**
         * The value at the back of the list.
         */
        back: T;
        /**
         * Get an iterator for the elements in the list.
         */
        iterator(): IIterator<T>;
        /**
         * Test whether the list contains the given value.
         */
        contains(value: T): boolean;
        /**
         * Get the index of the given value.
         *
         * Returns -1 if the value is not in the list.
         */
        indexOf(value: T): number;
        /**
         * Get the value at the given index.
         *
         * Returns `undefined` if the index is out of range.
         */
        get(index: number): T;
        /**
         * Set the value at the given index.
         *
         * Returns false if the index is out of range.
         */
        set(index: number, value: T): boolean;
        /**
         * Add a value to the end of the list.
         *
         * This method always succeeds.
         */
        add(value: T): boolean;
        /**
         * Push a value onto the back of the list.
         */
        pushBack(value: T): void;
        /**
         * Insert a value at the given index.
         *
         * Returns false if the index is out of range.
         */
        insert(index: number, value: T): boolean;
        /**
         * Pop and return the value at the back of the list.
         */
        popBack(): T;
        /**
         * Remove the first matching value from the list.
         *
         * Returns false if the value is not in the list.
         */
        remove(value: T): boolean;
        /**
         * Remove and return the value at the given index.
         *
         * Returns `undefined` if the index is out of range.
         */
        removeAt(index: number): T;
        /**
         * Remove all elements from the list.
         */
        clear(): void;
        private _array;
    }
}

declare module phosphor.collections {
    /**
     * An iterator for a generic list.
     */
    class ListIterator<T> implements IIterator<T> {
        /**
         * Construct a new list iterator.
         */
        constructor(list: IList<T>);
        /**
         * The current value of the iterable.
         *
         * Returns `undefined` if there is no current value.
         */
        current: T;
        /**
         * Move the iterator to the next value.
         *
         * Returns true on success, false when the iterator is exhausted.
         */
        moveNext(): boolean;
        /**
         * Returns `this` to make the iterator iterable.
         */
        iterator(): IIterator<T>;
        private _index;
        private _list;
        private _current;
    }
}

declare module phosphor.collections {
    /**
     * A circular buffer with a fixed maximum size.
     *
     * A circular buffer is a buffer with constant time access to its
     * elements and constant times inserts and deletes from the front
     * and back of the buffer. When the buffer reaches its maximum
     * size, newly added elements will overwrite existing elements.
     */
    class CircularBuffer<T> implements IDeque<T>, IList<T>, IStack<T> {
        /**
         * Construct a new circular buffer.
         */
        constructor(maxSize: number, items?: IIterable<T> | T[]);
        /**
         * The maximum size of the buffer.
         */
        maxSize: number;
        /**
         * True if the buffer has elements, false otherwise.
         */
        empty: boolean;
        /**
         * The number of elements in the buffer.
         */
        size: number;
        /**
         * The value at the front of the buffer.
         */
        front: T;
        /**
         * The value at the back of the buffer.
         */
        back: T;
        /**
         * Get an iterator for the elements in the buffer.
         */
        iterator(): IIterator<T>;
        /**
         * Test whether the buffer contains the given value.
         */
        contains(value: T): boolean;
        /**
         * Get the index of the given value.
         *
         * Returns -1 if the value is not in the buffer.
         */
        indexOf(value: T): number;
        /**
         * Get the element at the given index.
         *
         * Returns `undefined` if the index is out of range.
         */
        get(index: number): T;
        /**
         * Set the value at the given index.
         *
         * Returns false if the index is out of range.
         */
        set(index: number, value: T): boolean;
        /**
         * Push a value onto the back of the buffer.
         *
         * If the buffer is full, the front element will be overwritten.
         */
        pushBack(value: T): void;
        /**
         * Push a value onto the front of the buffer.
         *
         * If the buffer is full, the back element will be overwritten.
         */
        pushFront(value: T): void;
        /**
         * Pop and return the value at the back of the buffer.
         */
        popBack(): T;
        /**
         * Pop and return the value at the front of the buffer.
         */
        popFront(): T;
        /**
         * Add a value to the back of the buffer.
         *
         * This method always succeeds.
         */
        add(value: T): boolean;
        /**
         * Insert a value at the given index.
         *
         * If the buffer is full, the first element will be overwritten.
         *
         * Returns false if the index is out of range.
         */
        insert(index: number, value: T): boolean;
        /**
         * Remove the first matching value from the buffer.
         *
         * Returns false if the value is not in the buffer.
         */
        remove(value: T): boolean;
        /**
         * Remove and return the value at the given index.
         *
         * Returns `undefined` if the index is out of range.
         */
        removeAt(index: number): T;
        /**
         * Remove all elements from the buffer.
         */
        clear(): void;
        /**
         * Get the value for the apparent index.
         *
         * The index is assumed to be in-range.
         */
        private _get(index);
        /**
         * Set the value for the apparent index.
         *
         * The index is assumed to be in-range.
         */
        private _set(index, value);
        /**
         * Clear and return the value at the apparent index.
         *
         * The index is assumed to be in-range.
         */
        private _del(index);
        /**
         * Increment the offset by one.
         */
        private _increment();
        /**
         * Decrement the offset by one.
         */
        private _decrement();
        private _size;
        private _offset;
        private _array;
    }
}

declare module phosphor.collections {
    /**
     * A canonical singly linked FIFO queue.
     */
    class Queue<T> implements IQueue<T> {
        /**
         * Construct a new queue.
         */
        constructor(items?: IIterable<T> | T[]);
        /**
         * True if the queue has elements, false otherwise.
         */
        empty: boolean;
        /**
         * The number of elements in the queue.
         */
        size: number;
        /**
         * The value at the front of the queue.
         */
        front: T;
        /**
         * The value at the back of the queue.
         */
        back: T;
        /**
         * Get an iterator for the elements in the queue.
         */
        iterator(): IIterator<T>;
        /**
         * Test whether the queue contains the given value.
         */
        contains(value: T): boolean;
        /**
         * Add a value to the end of the queue.
         *
         * This method always succeeds.
         */
        add(value: T): boolean;
        /**
         * Push a value onto the back of the queue.
         */
        pushBack(value: T): void;
        /**
         * Pop and return the value at the front of the queue.
         */
        popFront(): T;
        /**
         * Remove the first matching value from the queue.
         *
         * Returns false if the value is not in the queue.
         */
        remove(value: T): boolean;
        /**
         * Remove all values from the queue.
         */
        clear(): void;
        private _size;
        private _front;
        private _back;
    }
}

declare module phosphor.core {
    /**
     * An object which holds disposable resources.
     */
    interface IDisposable {
        /**
         * Dispose of the resources held by the object.
         *
         * It is not safe to use an object after it has been disposed.
         */
        dispose(): void;
    }
}

declare module phosphor.core {
    /**
     * The base message object which can be sent to a message handler.
     */
    interface IMessage {
        /**
         * The type of the message.
         */
        type: string;
    }
}

declare module phosphor.core {
    /**
     * An object which filters messages sent to a message handler.
     */
    interface IMessageFilter {
        /**
         * Filter a message sent to a message handler.
         *
         * Returns true if the message should be filtered, false otherwise.
         */
        filterMessage(handler: IMessageHandler, msg: IMessage): boolean;
    }
}

declare module phosphor.core {
    import IIterable = collections.IIterable;
    /**
     * An object which processes messages.
     */
    interface IMessageHandler {
        /**
         * Process a message sent to the handler.
         */
        processMessage(msg: IMessage): void;
        /**
         * Compress a message posted to the handler.
         *
         * This optional method allows the handler to merge a posted message
         * with a message which is already pending. It should return true if
         * the message was compressed and should be dropped, or false if the
         * message should be enqueued for delivery as normal.
         */
        compressMessage?(msg: IMessage, pending: IIterable<IMessage>): boolean;
    }
}

declare module phosphor.core {
    module dispatch {
        /**
         * Send a message to the message handler to process immediately.
         */
        function sendMessage(handler: IMessageHandler, msg: IMessage): void;
        /**
         * Post a message to the message handler to process in the future.
         */
        function postMessage(handler: IMessageHandler, msg: IMessage): void;
        /**
         * Test whether the message handler has pending messages.
         */
        function hasPendingMessages(handler: IMessageHandler): boolean;
        /**
         * Send the first pending message to the message handler.
         */
        function sendPendingMessage(handler: IMessageHandler): void;
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
        function installMessageFilter(handler: IMessageHandler, filter: IMessageFilter): void;
        /**
         * Remove a message filter added for a message handler.
         *
         * It is safe to call this function while the filter is executing.
         *
         * If the filter is not installed, this is a no-op.
         */
        function removeMessageFilter(handler: IMessageHandler, filter: IMessageFilter): void;
        /**
         * Clear all message data associated with the message handler.
         *
         * This removes all pending messages and filters for the handler.
         */
        function clearMessageData(handler: IMessageHandler): void;
    }
}

declare module phosphor.core {
    /**
     * A singleton frozen empty object.
     */
    var emptyObject: any;
    /**
     * A singleton frozen empty array.
     */
    var emptyArray: any[];
    /**
     * A singleton empty no-op function.
     */
    var emptyFunction: () => void;
}

declare module phosphor.core {
    /**
     * A concrete implementation of IDisposable.
     *
     * A Disposable invokes a user provided callback when disposed.
     */
    class Disposable implements IDisposable {
        /**
         * Construct a new disposable.
         */
        constructor(callback: () => void);
        /**
         * Dispose the object and invoke the user provided callback.
         */
        dispose(): void;
        private _callback;
    }
}

declare module phosphor.core {
    /**
     * A concrete implementation of IMessage.
     *
     * This may be subclassed to create complex message types.
     */
    class Message implements IMessage {
        /**
         * Construct a new message.
         */
        constructor(type: string);
        /**
         * The type of the message.
         */
        type: string;
        private _type;
    }
}

declare module phosphor.core {
    /**
     * An object used for loosely coupled inter-object communication.
     *
     * A signal is emitted by an object in response to some event. User
     * code may connect callback functions to the signal to be notified
     * when that event occurs.
     */
    class Signal<T, U> {
        /**
         * Construct a new signal.
         */
        constructor();
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
        connect(callback: (sender: T, args: U) => void, thisArg?: any): void;
        /**
         * Disconnect a callback from the signal.
         *
         * This will remove all instances of the callback from the signal.
         * If no callback is provided, all callbacks will be disconnected.
         *
         * It is safe to disconnect a callback from the signal while the
         * signal is being emitted. The callback will not be invoked.
         */
        disconnect(callback?: (sender: T, args: U) => void, thisArg?: any): void;
        /**
         * Test whether a callback is connected to the signal.
         */
        isConnected(callback: (sender: T, args: U) => void, thisArg?: any): boolean;
        /**
         * Emit the signal and invoke its connected callbacks.
         *
         * Callbacks are invoked in the order in which they are connected.
         */
        emit(sender: T, args: U): void;
        private _callbacks;
    }
}

declare module phosphor.di {
    /**
     * A token object which holds compile-time type information.
     */
    interface IToken<T> {
        /**
         * A human readable name for the token.
         */
        name: string;
        /**
         * A hidden property which makes a token structurally unique.
         */
        __itoken_structural_property: any;
    }
    /**
     * Create a token with the given name.
     */
    function createToken<T>(name: string): IToken<T>;
}

declare module phosphor.di {
    /**
     * A class type which declares its injection dependencies.
     */
    interface IInjectable<T> {
        /**
         * The constructor signature for the class.
         */
        new (...args: any[]): T;
        /**
         * The type ids of the dependencies needed to instantiate the type.
         */
        $inject?: IToken<any>[];
    }
}

declare module phosphor.di {
    /**
     * An object which manages dependency injection.
     */
    interface IContainer {
        /**
         * Test whether a type is registered with the container.
         */
        isRegistered<T>(token: IToken<T>): boolean;
        /**
         * Register a type mapping with the container.
         *
         * An exception will be thrown if the token is already registered.
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
        registerType<T>(token: IToken<T>, type: IInjectable<T>, lifetime?: string): void;
        /**
         * Register an instance mapping with the container.
         *
         * This is the same as a 'singleton' type registration, except
         * that the user creates the instance of the type beforehand.
         *
         * This will throw an exception if the token is already registered.
         */
        registerInstance<T>(token: IToken<T>, instance: T): void;
        /**
         * Resolve an instance for the given token or type.
         *
         * An error is thrown if no type mapping is registered for the
         * token or if the injection dependencies cannot be fulfilled.
         */
        resolve<T>(token: IToken<T> | IInjectable<T>): T;
    }
    var IContainer: IToken<IContainer>;
}

declare module phosphor.di {
    /**
     * A lightweight dependency injection container.
     */
    class Container implements IContainer {
        /**
         * Construct a new container.
         */
        constructor();
        /**
         * Test whether a type is registered with the container.
         */
        isRegistered<T>(token: IToken<T>): boolean;
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
        registerType<T>(token: IToken<T>, type: IInjectable<T>, lifetime?: string): void;
        /**
         * Register an instance mapping with the container.
         *
         * This is the same as a 'singleton' type registration, except
         * that the user creates the instance of the type beforehand.
         *
         * This will throw an exception if the token is already registered.
         */
        registerInstance<T>(token: IToken<T>, instance: T): void;
        /**
         * Resolve an instance for the given token or type.
         *
         * An error is thrown if no type mapping is registered for the
         * token or if the injection dependencies cannot be fulfilled.
         */
        resolve<T>(token: IToken<T> | IInjectable<T>): T;
        /**
         * Resolve an instance for the given token.
         *
         * An error is thrown if the token is not registered.
         */
        private _resolveToken<T>(token, key);
        /**
         * Resolve an instance of the given type.
         *
         * An error is thrown if the type dependencies cannot be fulfilled.
         */
        private _resolveType<T>(type, key);
        private _registry;
    }
}

declare module phosphor.domutil {
    /**
     * The box sizing data for an HTML element.
     */
    interface IBoxData {
        /**
         * The top border width, in pixels.
         */
        borderTop: number;
        /**
         * The left border width, in pixels.
         */
        borderLeft: number;
        /**
         * The right border width, in pixels.
         */
        borderRight: number;
        /**
         * The bottom border width, in pixels.
         */
        borderBottom: number;
        /**
         * The top padding width, in pixels.
         */
        paddingTop: number;
        /**
         * The left padding width, in pixels.
         */
        paddingLeft: number;
        /**
         * The right padding width, in pixels.
         */
        paddingRight: number;
        /**
         * The bottom padding width, in pixels.
         */
        paddingBottom: number;
        /**
         * The sum of the vertical padding and border.
         */
        verticalSum: number;
        /**
         * The sum of the horizontal padding and border.
         */
        horizontalSum: number;
    }
    /**
     * Create a box data object for the given node.
     *
     * The values of the returned object are read only.
     */
    function createBoxData(node: HTMLElement): IBoxData;
}

declare module phosphor.domutil {
    /**
     * Test whether a client position lies within a node.
     */
    function hitTest(node: HTMLElement, x: number, y: number): boolean;
}

declare module phosphor.domutil {
    import IDisposable = core.IDisposable;
    /**
     * Override the cursor for the entire document.
     *
     * Returns an IDisposable which will clear the override.
     */
    function overrideCursor(cursor: string): IDisposable;
}

declare module phosphor.virtualdom {
    import IDisposable = core.IDisposable;
    /**
     * An object which manages its own node in a virtual DOM tree.
     */
    interface IComponent<T extends IData> extends IDisposable {
        /**
         * The DOM node for the component.
         *
         * The component should render its content using this node as a host.
         */
        node: HTMLElement;
        /**
         * Initialize the component with new data and children.
         *
         * This is called whenever the component is rendered by its parent.
         *
         * A component is resposible for updating the content of its node.
         */
        init(data: T, children: IElement[]): void;
    }
    /**
     * A component class type.
     */
    interface IComponentClass<T extends IData> {
        /**
         * Construct a new component.
         */
        new (): IComponent<T>;
    }
}

declare module phosphor.virtualdom {
    /**
     * A base data object for a virtual element.
     */
    interface IData {
        /**
         * The key id for the element.
         *
         * If an element is given a key id, the generated node will not be
         * recreated during a rendering update if it moves in the render
         * tree provided the type of the node does not change.
         */
        key?: string;
        /**
         * The ref id for the element.
         *
         * If an element is given a ref id, the generated node or component
         * will be added to the ref mapping created by the virtual renderer.
         */
        ref?: string;
    }
}

declare module phosphor.virtualdom {
    /**
     * An enum of supported virtual element types.
     */
    enum ElementType {
        /**
         * The element represents a text node.
         */
        Text = 0,
        /**
         * The element represents an HTMLElement node.
         */
        Node = 1,
        /**
         * The element represents a component.
         */
        Component = 2,
    }
    /**
     * An object which represents a node or component in virtual DOM tree.
     *
     * User code will typically create an element indirectly by calling an
     * element factory function. The framework provides default factories
     * for all standard DOM nodes, and new factories may be created with
     * the `createFactory` function.
     *
     * An element *must* be treated as immutable. Mutating element state
     * lead to undefined rendering behavior.
     */
    interface IElement {
        /**
         * The type of the element.
         */
        type: ElementType;
        /**
         * The tag for the element.
         *
         * The interpretation of the tag depends on the element type:
         *   Text - the text content
         *   Node - the node tag name
         *   Component - the component constructor
         */
        tag: string | IComponentClass<any>;
        /**
         * The data object for the element.
         *
         * The interpretation of the data depends on the element type:
         *   Text - an empty object
         *   Node - the node attributes object
         *   Component - the component data object
         */
        data: IData;
        /**
         * The array of child elements.
         */
        children: IElement[];
        /**
         * A prototype property used to quickly type-check an element.
         */
        __isElement: boolean;
    }
}

declare module phosphor.virtualdom {
    /**
     * A typedef of the child types for an element factory.
     */
    type FactoryChildType = string | IElement;
    /**
     * A typedef for the factory child argument type.
     */
    type FactoryChildArgType = FactoryChildType | FactoryChildType[];
    /**
     * A factory function which creates a virtual element.
     */
    interface IElementFactory<T extends IData> {
        /**
         * Create a virtual element with the given children.
         */
        (...children: FactoryChildArgType[]): IElement;
        /**
         * Create a virtual element with the given data and children.
         */
        (data: T, ...children: FactoryChildArgType[]): IElement;
    }
    /**
     * Create a virtual element factory function for the given tag.
     *
     * This will typically be used to create an element factory for a user
     * defined component. The `virtualdom` module exports a `dom` object
     * which contains factories for the standard DOM elements.
     */
    function createFactory<T extends IData>(tag: string | IComponentClass<T>): IElementFactory<T>;
}

declare module phosphor.virtualdom {
    /**
     * The attributes available for all elements.
     */
    interface IElementAttributes extends IData {
        accessKey?: string;
        className?: string;
        contentEditable?: string;
        dataset?: any;
        dir?: string;
        draggable?: boolean;
        hidden?: any;
        id?: string;
        lang?: string;
        spellcheck?: boolean;
        style?: any;
        tabIndex?: number;
        title?: string;
        onabort?: (ev: UIEvent) => any;
        onbeforecopy?: (ev: DragEvent) => any;
        onbeforecut?: (ev: DragEvent) => any;
        onbeforepaste?: (ev: DragEvent) => any;
        onblur?: (ev: FocusEvent) => any;
        oncanplay?: (ev: Event) => any;
        oncanplaythrough?: (ev: Event) => any;
        onchange?: (ev: Event) => any;
        onclick?: (ev: MouseEvent) => any;
        oncontextmenu?: (ev: MouseEvent) => any;
        oncopy?: (ev: DragEvent) => any;
        oncuechange?: (ev: Event) => any;
        oncut?: (ev: DragEvent) => any;
        ondblclick?: (ev: MouseEvent) => any;
        ondrag?: (ev: DragEvent) => any;
        ondragend?: (ev: DragEvent) => any;
        ondragenter?: (ev: DragEvent) => any;
        ondragleave?: (ev: DragEvent) => any;
        ondragover?: (ev: DragEvent) => any;
        ondragstart?: (ev: DragEvent) => any;
        ondrop?: (ev: DragEvent) => any;
        ondurationchange?: (ev: Event) => any;
        onended?: (ev: Event) => any;
        onemptied?: (ev: Event) => any;
        onerror?: (ev: ErrorEvent) => any;
        onfocus?: (ev: FocusEvent) => any;
        onhelp?: (ev: Event) => any;
        oninput?: (ev: Event) => any;
        onkeydown?: (ev: KeyboardEvent) => any;
        onkeypress?: (ev: KeyboardEvent) => any;
        onkeyup?: (ev: KeyboardEvent) => any;
        onload?: (ev: Event) => any;
        onloadeddata?: (ev: Event) => any;
        onloadedmetadata?: (ev: Event) => any;
        onloadstart?: (ev: Event) => any;
        onmousedown?: (ev: MouseEvent) => any;
        onmouseenter?: (ev: MouseEvent) => any;
        onmouseleave?: (ev: MouseEvent) => any;
        onmousemove?: (ev: MouseEvent) => any;
        onmouseout?: (ev: MouseEvent) => any;
        onmouseover?: (ev: MouseEvent) => any;
        onmouseup?: (ev: MouseEvent) => any;
        onmousewheel?: (ev: MouseWheelEvent) => any;
        onpaste?: (ev: DragEvent) => any;
        onpause?: (ev: Event) => any;
        onplay?: (ev: Event) => any;
        onplaying?: (ev: Event) => any;
        onprogress?: (ev: ProgressEvent) => any;
        onratechange?: (ev: Event) => any;
        onreadystatechange?: (ev: Event) => any;
        onreset?: (ev: Event) => any;
        onscroll?: (ev: UIEvent) => any;
        onseeked?: (ev: Event) => any;
        onseeking?: (ev: Event) => any;
        onselect?: (ev: UIEvent) => any;
        onselectstart?: (ev: Event) => any;
        onstalled?: (ev: Event) => any;
        onsubmit?: (ev: Event) => any;
        onsuspend?: (ev: Event) => any;
        ontimeupdate?: (ev: Event) => any;
        onvolumechange?: (ev: Event) => any;
        onwaiting?: (ev: Event) => any;
    }
    /**
     * The attributes for <a> elements.
     */
    interface IAnchorAttributes extends IElementAttributes {
        download?: string;
        href?: string;
        hreflang?: string;
        media?: string;
        rel?: string;
        target?: string;
        type?: string;
    }
    /**
     * The attributes for <area> elements.
     */
    interface IAreaAttributes extends IElementAttributes {
        alt?: string;
        coords?: string;
        download?: string;
        href?: string;
        hreflang?: string;
        media?: string;
        rel?: string;
        shape?: string;
        target?: string;
        type?: string;
    }
    /**
     * The attributes for <button> elements.
     */
    interface IButtonAttributes extends IElementAttributes {
        autofocus?: boolean;
        disabled?: boolean;
        form?: string;
        formAction?: string;
        formEnctype?: string;
        formMethod?: string;
        formNoValidate?: boolean;
        formTarget?: string;
        name?: string;
        type?: string;
        value?: string;
    }
    /**
     * The attributes for <canvas> elements.
     */
    interface ICanvasAttributes extends IElementAttributes {
        width?: number;
        height?: number;
    }
    /**
     * The attributes for <data> elements.
     */
    interface IDataAttributes extends IElementAttributes {
        value?: string;
    }
    /**
     * The attributes for <embed> elements.
     */
    interface IEmbedAttributes extends IElementAttributes {
        height?: string;
        src?: string;
        type?: string;
        width?: string;
    }
    /**
     * The attributes for <fieldset> elements.
     */
    interface IFieldSetAttributes extends IElementAttributes {
        disabled?: boolean;
        form?: string;
        name?: string;
    }
    /**
     * The attributes for <form> elements.
     */
    interface IFormAttributes extends IElementAttributes {
        acceptCharset?: string;
        action?: string;
        autocomplete?: string;
        enctype?: string;
        method?: string;
        name?: string;
        noValidate?: boolean;
        target?: string;
    }
    /**
     * The attributes for <iframe> elements.
     */
    interface IIFrameAttributes extends IElementAttributes {
        allowFullscreen?: boolean;
        height?: string;
        name?: string;
        sandbox?: string;
        seamless?: boolean;
        src?: string;
        srcdoc?: string;
        width?: string;
    }
    /**
     * The attributes for <img> elements.
     */
    interface IImageAttributes extends IElementAttributes {
        alt?: string;
        crossOrigin?: string;
        height?: number;
        isMap?: boolean;
        src?: string;
        sizes?: string;
        srcset?: string;
        width?: number;
        useMap?: string;
    }
    /**
     * The attributes for <input> elements.
     */
    interface IInputAttributes extends IElementAttributes {
        accept?: string;
        alt?: string;
        autocomplete?: string;
        autofocus?: boolean;
        checked?: boolean;
        disabled?: boolean;
        form?: string;
        formAction?: string;
        formEnctype?: string;
        formMethod?: string;
        formNoValidate?: boolean;
        formTarget?: string;
        height?: string;
        inputMode?: string;
        list?: string;
        max?: string;
        maxLength?: number;
        min?: string;
        minLength?: number;
        multiple?: boolean;
        name?: string;
        pattern?: string;
        placeholder?: string;
        readOnly?: boolean;
        required?: boolean;
        size?: number;
        spellcheck?: boolean;
        src?: string;
        step?: string;
        type?: string;
        value?: string;
        width?: string;
    }
    /**
     * The attributes for <label> elements.
     */
    interface ILabelAttributes extends IElementAttributes {
        form?: string;
        htmlFor?: string;
    }
    /**
     * The attributes for <li> elements.
     */
    interface ILIAttributes extends IElementAttributes {
        value?: number;
    }
    /**
     * The attributes for <map> elements.
     */
    interface IMapAttributes extends IElementAttributes {
        name?: string;
    }
    /**
     * The attributes for <meter> elements.
     */
    interface IMeterAttributes extends IElementAttributes {
        high?: number;
        low?: number;
        max?: number;
        min?: number;
        optimum?: number;
        value?: number;
    }
    /**
     * The attributes for <audio> and <video> elements.
     */
    interface IMediaAttributes extends IElementAttributes {
        autoplay?: boolean;
        controls?: boolean;
        crossOrigin?: string;
        loop?: boolean;
        mediaGroup?: string;
        muted?: boolean;
        preload?: string;
        src?: string;
        volume?: number;
    }
    /**
     * The attributes for <del> and <ins> elements.
     */
    interface IModAttributes extends IElementAttributes {
        cite?: string;
        dateTime?: string;
    }
    /**
     * The attributes for <object> elements.
     */
    interface IObjectAttributes extends IElementAttributes {
        data?: string;
        form?: string;
        height?: string;
        name?: string;
        type?: string;
        typeMustMatch?: boolean;
        useMap?: string;
        width?: string;
    }
    /**
     * The attributes for <ol> elements.
     */
    interface IOListAttributes extends IElementAttributes {
        reversed?: boolean;
        start?: number;
        type?: string;
    }
    /**
     * The attributes for <optgroup> elements.
     */
    interface IOptGroupAttributes extends IElementAttributes {
        disabled?: boolean;
        label?: string;
    }
    /**
     * The attributes for <option> elements.
     */
    interface IOptionAttributes extends IElementAttributes {
        disabled?: boolean;
        label?: string;
        selected?: boolean;
        value?: string;
    }
    /**
     * The attributes for <output> elements.
     */
    interface IOutputAttributes extends IElementAttributes {
        form?: string;
        htmlFor?: string;
        name?: string;
    }
    /**
     * The attributes for <param> elements.
     */
    interface IParamAttributes extends IElementAttributes {
        name?: string;
        value?: string;
    }
    /**
     * The attributes for <progress> elements.
     */
    interface IProgressAttributes extends IElementAttributes {
        max?: number;
        value?: number;
    }
    /**
     * The attributes for <blockquote> elements.
     */
    interface IQuoteAttributes extends IElementAttributes {
        cite?: string;
    }
    /**
     * The attributes for <select> elements.
     */
    interface ISelectAttributes extends IElementAttributes {
        autofocus?: boolean;
        disabled?: boolean;
        form?: string;
        multiple?: boolean;
        name?: string;
        required?: boolean;
        size?: number;
    }
    /**
     * The attributes for <source> elements.
     */
    interface ISourceAttributes extends IElementAttributes {
        media?: string;
        sizes?: string;
        src?: string;
        srcset?: string;
        type?: string;
    }
    /**
     * The attributes for <col> elements.
     */
    interface ITableColAttributes extends IElementAttributes {
        span?: number;
    }
    /**
     * The attributes for <td> elements.
     */
    interface ITableDataCellAttributes extends IElementAttributes {
        colSpan?: number;
        headers?: number;
        rowSpan?: number;
    }
    /**
     * The attributes for <th> elements.
     */
    interface ITableHeaderCellAttributes extends IElementAttributes {
        colSpan?: number;
        headers?: string;
        rowSpan?: number;
        scope?: string;
        sorted?: string;
    }
    /**
     * The attributes for <textarea> elements.
     */
    interface ITextAreaAttributes extends IElementAttributes {
        autocomplete?: string;
        autofocus?: boolean;
        cols?: number;
        dirName?: string;
        disabled?: boolean;
        form?: string;
        inputMode?: string;
        maxLength?: number;
        minLength?: number;
        name?: string;
        placeholder?: string;
        readOnly?: boolean;
        required?: boolean;
        rows?: number;
        wrap?: string;
    }
    /**
     * The attributes for <time> elements.
     */
    interface ITimeAttributes extends IElementAttributes {
        dateTime?: string;
    }
    /**
     * The attributes for <track> elements.
     */
    interface ITrackAttributes extends IElementAttributes {
        default?: boolean;
        kind?: string;
        label?: string;
        src?: string;
        srclang?: string;
    }
    /**
     * The attributes for <video> elements.
     */
    interface IVideoAttributes extends IMediaAttributes {
        height?: number;
        poster?: string;
        width?: number;
    }
    /**
     * The virtual dom factory functions.
     */
    var dom: {
        a: IElementFactory<IAnchorAttributes>;
        abbr: IElementFactory<IElementAttributes>;
        address: IElementFactory<IElementAttributes>;
        area: IElementFactory<IAreaAttributes>;
        article: IElementFactory<IElementAttributes>;
        aside: IElementFactory<IElementAttributes>;
        audio: IElementFactory<IMediaAttributes>;
        b: IElementFactory<IElementAttributes>;
        bdi: IElementFactory<IElementAttributes>;
        bdo: IElementFactory<IElementAttributes>;
        blockquote: IElementFactory<IQuoteAttributes>;
        br: IElementFactory<IElementAttributes>;
        button: IElementFactory<IButtonAttributes>;
        canvas: IElementFactory<ICanvasAttributes>;
        caption: IElementFactory<IElementAttributes>;
        cite: IElementFactory<IElementAttributes>;
        code: IElementFactory<IElementAttributes>;
        col: IElementFactory<ITableColAttributes>;
        colgroup: IElementFactory<ITableColAttributes>;
        data: IElementFactory<IDataAttributes>;
        datalist: IElementFactory<IElementAttributes>;
        dd: IElementFactory<IElementAttributes>;
        del: IElementFactory<IModAttributes>;
        dfn: IElementFactory<IElementAttributes>;
        div: IElementFactory<IElementAttributes>;
        dl: IElementFactory<IElementAttributes>;
        dt: IElementFactory<IElementAttributes>;
        em: IElementFactory<IElementAttributes>;
        embed: IElementFactory<IEmbedAttributes>;
        fieldset: IElementFactory<IFieldSetAttributes>;
        figcaption: IElementFactory<IElementAttributes>;
        figure: IElementFactory<IElementAttributes>;
        footer: IElementFactory<IElementAttributes>;
        form: IElementFactory<IFormAttributes>;
        h1: IElementFactory<IElementAttributes>;
        h2: IElementFactory<IElementAttributes>;
        h3: IElementFactory<IElementAttributes>;
        h4: IElementFactory<IElementAttributes>;
        h5: IElementFactory<IElementAttributes>;
        h6: IElementFactory<IElementAttributes>;
        header: IElementFactory<IElementAttributes>;
        hr: IElementFactory<IElementAttributes>;
        i: IElementFactory<IElementAttributes>;
        iframe: IElementFactory<IIFrameAttributes>;
        img: IElementFactory<IImageAttributes>;
        input: IElementFactory<IInputAttributes>;
        ins: IElementFactory<IModAttributes>;
        kbd: IElementFactory<IElementAttributes>;
        label: IElementFactory<ILabelAttributes>;
        legend: IElementFactory<IElementAttributes>;
        li: IElementFactory<ILIAttributes>;
        main: IElementFactory<IElementAttributes>;
        map: IElementFactory<IMapAttributes>;
        mark: IElementFactory<IElementAttributes>;
        meter: IElementFactory<IMeterAttributes>;
        nav: IElementFactory<IElementAttributes>;
        object: IElementFactory<IObjectAttributes>;
        ol: IElementFactory<IOListAttributes>;
        optgroup: IElementFactory<IOptGroupAttributes>;
        option: IElementFactory<IOptionAttributes>;
        output: IElementFactory<IOutputAttributes>;
        p: IElementFactory<IElementAttributes>;
        param: IElementFactory<IElementAttributes>;
        pre: IElementFactory<IElementAttributes>;
        progress: IElementFactory<IProgressAttributes>;
        q: IElementFactory<IElementAttributes>;
        rp: IElementFactory<IElementAttributes>;
        rt: IElementFactory<IElementAttributes>;
        ruby: IElementFactory<IElementAttributes>;
        s: IElementFactory<IElementAttributes>;
        samp: IElementFactory<IElementAttributes>;
        section: IElementFactory<IElementAttributes>;
        select: IElementFactory<ISelectAttributes>;
        small: IElementFactory<IElementAttributes>;
        source: IElementFactory<ISourceAttributes>;
        span: IElementFactory<IElementAttributes>;
        strong: IElementFactory<IElementAttributes>;
        sub: IElementFactory<IElementAttributes>;
        summary: IElementFactory<IElementAttributes>;
        sup: IElementFactory<IElementAttributes>;
        table: IElementFactory<IElementAttributes>;
        tbody: IElementFactory<IElementAttributes>;
        td: IElementFactory<ITableDataCellAttributes>;
        textarea: IElementFactory<ITextAreaAttributes>;
        tfoot: IElementFactory<IElementAttributes>;
        th: IElementFactory<ITableHeaderCellAttributes>;
        thead: IElementFactory<IElementAttributes>;
        time: IElementFactory<ITimeAttributes>;
        title: IElementFactory<IElementAttributes>;
        tr: IElementFactory<IElementAttributes>;
        track: IElementFactory<ITrackAttributes>;
        u: IElementFactory<IElementAttributes>;
        ul: IElementFactory<IElementAttributes>;
        var: IElementFactory<IElementAttributes>;
        video: IElementFactory<IVideoAttributes>;
        wbr: IElementFactory<IElementAttributes>;
    };
}

declare module phosphor.virtualdom {
    /**
     * Render virtual content into a host node.
     *
     * This renders the delta from the previous rendering. It assumes that
     * the contents of the host node are not manipulated by external code.
     * Modifying the host node will result in undefined rendering behavior.
     *
     * Returns an object which maps ref names to nodes and components.
     */
    function render(content: IElement | IElement[], host: HTMLElement): any;
}

declare module phosphor.components {
    import IComponent = virtualdom.IComponent;
    import IElement = virtualdom.IElement;
    import IData = virtualdom.IData;
    /**
     * A concrete base implementation of IComponent.
     *
     * This class should be used by subclasses that want to manage their
     * own DOM content outside the virtual DOM, but still be embeddable
     * inside a virtual DOM hierarchy.
     */
    class BaseComponent<T extends IData> implements IComponent<T> {
        /**
         * The tag name used to create the component's DOM node.
         *
         * A subclass may redefine this property.
         */
        static tagName: string;
        /**
         * The initial class name for the component's DOM node.
         *
         * A subclass may redefine this property.
         */
        static className: string;
        /**
         * Construct a new base component.
         */
        constructor();
        /**
         * Dispose of the resources held by the component.
         */
        dispose(): void;
        /**
         * Get the DOM node for the component.
         */
        node: HTMLElement;
        /**
         * Get the current data object for the component.
         */
        data: T;
        /**
         * Get the current children for the component.
         */
        children: IElement[];
        /**
         * Initialize the component with new data and children.
         *
         * This is called whenever the component is rendered by its parent.
         */
        init(data: T, children: IElement[]): void;
        private _node;
        private _data;
        private _children;
    }
}

declare module phosphor.components {
    import IElement = virtualdom.IElement;
    import IData = virtualdom.IData;
    /**
     * A concrete implementation of IComponent with virtual DOM rendering.
     *
     * User code should subclass this class to create a custom component.
     * The subclasses should reimplement the `render` method to generate
     * the virtual DOM content for the component.
     */
    class Component<T extends IData> extends BaseComponent<T> {
        /**
         * Dispose of the resources held by the component.
         */
        dispose(): void;
        /**
         * Get the refs mapping for the component.
         *
         * This is an object which maps a ref name to the corresponding node
         * or component instance created for the most recent rendering pass.
         */
        refs: any;
        /**
         * Initialize the component with new data and children.
         *
         * This is called whenever the component is rendered by its parent.
         *
         * The method will normally not be reimplemented by a subclass.
         */
        init(data: T, children: IElement[]): void;
        /**
         * Create the virtual content for the component.
         *
         * The rendered content is used to populate the component's node.
         *
         * This should be reimplemented by a subclass.
         */
        render(): IElement | IElement[];
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
        update(immediate?: boolean): void;
        /**
         * A method invoked immediately before the component is rendered.
         *
         * The default implementation is a no-op.
         */
        protected beforeRender(): void;
        /**
         * A method invoked immediately after the component is rendered.
         *
         * The default implementation is a no-op.
         */
        protected afterRender(): void;
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
        protected shouldUpdate(data: T, children: IElement[]): boolean;
        /**
         * Perform an immediate rendering of the component.
         */
        private _render();
        /**
         * Clear the pending animation frame.
         */
        private _cancelFrame();
        private _frameId;
        private _refs;
    }
}

declare module phosphor.components {
    import IData = virtualdom.IData;
    import IElement = virtualdom.IElement;
    /**
     * The data object for a code mirror component.
     */
    interface ICodeMirrorData extends IData {
        config: CodeMirror.EditorConfiguration;
    }
    /**
     * A component which hosts a CodeMirror editor.
     */
    class CodeMirrorComponent extends BaseComponent<ICodeMirrorData> {
        /**
         * The default class name for a code mirror component.
         */
        static className: string;
        /**
         * Dispose of the resources held by the component.
         */
        dispose(): void;
        /**
         * Initialize the component with new data and children.
         */
        init(data: ICodeMirrorData, children: IElement[]): void;
        /**
         * Get the code mirror editor for the component.
         *
         * This component does not attempt to wrap the extensive code mirror
         * api. User code should interact with the editor object directly.
         */
        editor: CodeMirror.Editor;
        /**
         * Create the editor for the component.
         *
         * This can be reimplemented by subclasses which require custom
         * creation of the editor instance. The default implementation
         * assumes `CodeMirror` is available in the global scope.
         */
        protected createEditor(): CodeMirror.Editor;
        private _editor;
    }
    /**
     * The default virtual element factory for the CodeMirrorComponent.
     */
    var CodeMirrorFactory: virtualdom.IElementFactory<ICodeMirrorData>;
}

declare module phosphor.panels {
    /**
     * An enum of alignment bit flags.
     */
    enum Alignment {
        /**
         * Align with the left edge.
         */
        Left = 1,
        /**
         * Align with the right edge.
         */
        Right = 2,
        /**
         * Align with the horizontal center.
         */
        HorizontalCenter = 4,
        /**
         * Align with the top edge.
         */
        Top = 16,
        /**
         * Align with the bottom edge.
         */
        Bottom = 32,
        /**
         * Align with the vertical center.
         */
        VerticalCenter = 64,
        /**
         * Align with the horizontal and vertical center.
         */
        Center,
        /**
         * A mask of horizontal alignment values.
         */
        Horizontal_Mask,
        /**
         * A mask of vertical alignment values.
         */
        Vertical_Mask,
    }
    /**
     * An enum of direction values.
     */
    enum Direction {
        /**
         * Left to right direction.
         */
        LeftToRight = 0,
        /**
         * Right to left direction.
         */
        RightToLeft = 1,
        /**
         * Top to bottom direction.
         */
        TopToBottom = 2,
        /**
         * Bottom to top direction.
         */
        BottomToTop = 3,
    }
    /**
     * The available docking modes for a dock area.
     */
    enum DockMode {
        /**
         * Insert the panel at the top of the dock area.
         */
        Top = 0,
        /**
         * Insert the panel at the left of the dock area.
         */
        Left = 1,
        /**
         * Insert the panel at the right of the dock area.
         */
        Right = 2,
        /**
         * Insert the panel at the bottom of the dock area.
         */
        Bottom = 3,
        /**
         * Insert the panel as a new split item above the reference.
         */
        SplitTop = 4,
        /**
         * Insert the panel as a new split item to the left of the reference.
         */
        SplitLeft = 5,
        /**
         * Insert the panel as a new split item to the right of the reference.
         */
        SplitRight = 6,
        /**
         * Insert the panel as a new split item below the reference.
         */
        SplitBottom = 7,
        /**
         * Insert the panel as a new tab before the reference.
         */
        TabBefore = 8,
        /**
         * Insert the panel as a new tab after the reference.
         */
        TabAfter = 9,
    }
    /**
     * An enum of orientation values.
     */
    enum Orientation {
        /**
         * Horizontal orientation.
         */
        Horizontal = 0,
        /**
         * Vertical orientation.
         */
        Vertical = 1,
    }
    /**
     * An enum of panel bit flags.
     *
     * Panel flags are used to control various low-level behaviors of
     * a panel. They are typcially not used directly by user code.
     */
    enum PanelFlag {
        /**
         * The panel is attached to the DOM.
         */
        IsAttached = 1,
        /**
         * The panel is explicitly hidden.
         */
        IsHidden = 2,
        /**
         * The panel is visible.
         */
        IsVisible = 4,
        /**
         * The panel has been disposed.
         */
        IsDisposed = 8,
        /**
         * Changing the panel layout is disallowed.
         */
        DisallowLayoutChange = 16,
    }
    /**
     * An enum of size policy values.
     *
     * A size policy controls how a layout interprets a panel's `sizeHint`.
     */
    enum SizePolicy {
        /**
         * A policy indicating that the `sizeHint` is the only acceptable
         * size for the panel.
         */
        Fixed = 0,
        /**
         * A bit flag indicating the panel can grow beyond `sizeHint`.
         */
        GrowFlag = 1,
        /**
         * A bit flag indicating the panel can shrink below `sizeHint`.
         */
        ShrinkFlag = 2,
        /**
         * A bit flag indicating the panel should expand beyond `sizeHint`.
         */
        ExpandFlag = 4,
        /**
         * A bit flag indicating the `sizeHint` is ignored.
         */
        IgnoreFlag = 8,
        /**
         * A policy indicating that the `sizeHint` is a minimum, but the
         * panel can be expanded if needed and still be useful.
         */
        Minimum,
        /**
         * A policy indicating that the `sizeHint` is a maximum, but the
         * panel can be shrunk if needed and still be useful.
         */
        Maximum,
        /**
         * A policy indicating that the `sizeHint` is preferred, but the
         * panel can grow or shrink if needed and still be useful.
         *
         * This is the default size policy.
         */
        Preferred,
        /**
         * A policy indicating that `sizeHint` is reasonable, but the panel
         * can shrink if needed and still be useful. It can also make use of
         * extra space and should expand as much as possible.
         */
        Expanding,
        /**
         * A policy indicating that `sizeHint` is a minimum. The panel can
         * make use of extra space and should expand as much as possible.
         */
        MinimumExpanding,
        /**
         * A policy indicating the `sizeHint` is ignored.
         */
        Ignored,
    }
}

declare module phosphor.panels {
    /**
     * The position of a two dimensional object.
     */
    class Point {
        /**
         * Construct a new point.
         */
        constructor(x: number, y: number);
        /**
         * The X coordinate of the point.
         */
        x: number;
        /**
         * The Y coordinate of the point.
         */
        y: number;
        /**
         * Test whether the point is equivalent to another.
         */
        equals(other: Point): boolean;
        private _x;
        private _y;
    }
    /**
     * The size of a 2-dimensional object.
     */
    class Size {
        /**
         * Construct a new size.
         */
        constructor(width: number, height: number);
        /**
         * The width of the size.
         */
        width: number;
        /**
         * The height of the size.
         */
        height: number;
        /**
         * Test whether the size is equivalent to another.
         */
        equals(other: Size): boolean;
        private _width;
        private _height;
    }
    /**
     * The position and size of a 2-dimensional object.
     */
    class Rect {
        /**
         * Construct a new rect.
         */
        constructor(x: number, y: number, width: number, height: number);
        /**
         * The X coordinate of the rect.
         *
         * This is equivalent to `left`.
         */
        x: number;
        /**
         * The Y coordinate of the rect.
         *
         * This is equivalent to `top`.
         */
        y: number;
        /**
         * The width of the rect.
         */
        width: number;
        /**
         * The height of the rect.
         */
        height: number;
        /**
         * The position of the rect.
         *
         * This is equivalent to `topLeft`.
         */
        pos: Point;
        /**
         * The size of the rect.
         */
        size: Size;
        /**
         * The top edge of the rect.
         *
         * This is equivalent to `y`.
         */
        top: number;
        /**
         * The left edge of the rect.
         *
         * This is equivalent to `x`.
         */
        left: number;
        /**
         * The right edge of the rect.
         *
         * This is equivalent to `x + width`.
         */
        right: number;
        /**
         * The bottom edge of the rect.
         *
         * This is equivalent to `y + height`.
         */
        bottom: number;
        /**
         * The position of the top left corner of the rect.
         *
         * This is equivalent to `pos`.
         */
        topLeft: Point;
        /**
         * The position of the top right corner of the rect.
         */
        topRight: Point;
        /**
         * The position bottom left corner of the rect.
         */
        bottomLeft: Point;
        /**
         * The position bottom right corner of the rect.
         */
        bottomRight: Point;
        /**
         * Test whether the rect is equivalent to another.
         */
        equals(other: Rect): boolean;
        private _x;
        private _y;
        private _width;
        private _height;
    }
}

declare module phosphor.panels {
    /**
     * An object which manages an item in a layout.
     */
    interface ILayoutItem {
        /**
         * Test whether the item manages a panel.
         */
        isPanel: boolean;
        /**
         * Test whether the item manages empty space.
         */
        isSpacer: boolean;
        /**
         * Test whether the item should be treated as hidden.
         */
        isHidden: boolean;
        /**
         * The panel the item manages, if any.
         */
        panel: Panel;
        /**
         * Test whether the item should be expanded horizontally.
         *
         * If this is true, the item will get as much space as possible
         * in the horizontal direction up to its maximum size.
         */
        expandHorizontal: boolean;
        /**
         * Test Whether the item should be expanded vertically.
         *
         * If this is true, the item will get as much space as possible
         * in the vertical direction up to its maximum size.
         */
        expandVertical: boolean;
        /**
         * The horizontal stretch factor for the item.
         */
        horizontalStretch: number;
        /**
         * The vertical stretch factor for the item.
         */
        verticalStretch: number;
        /**
         * Invalidate the cached data for the item.
         */
        invalidate(): void;
        /**
         * Compute the preferred size of the item.
         */
        sizeHint(): Size;
        /**
         * Compute the minimum allowed size of the item.
         */
        minSize(): Size;
        /**
         * Compute the maximum allowed size of the item.
         */
        maxSize(): Size;
        /**
         * Set the geometry of the item using the given values.
         */
        setGeometry(x: number, y: number, width: number, height: number): void;
    }
}

declare module phosphor.panels {
    /**
     * An object which can be used as a tab in a tab bar.
     */
    interface ITab {
        /**
         * The text for the tab.
         */
        text: string;
        /**
         * Whether the tab is currently selected.
         */
        selected: boolean;
        /**
         * Whether the tab is closable.
         */
        closable: boolean;
        /**
         * The DOM node for the tab.
         */
        node: HTMLElement;
        /**
         * The DOM node for the close icon, if available.
         */
        closeIconNode: HTMLElement;
    }
}

declare module phosphor.panels {
    /**
     * A panel which owns and manages its own tab.
     */
    interface ITabbable extends Panel {
        /**
         * The tab to associate with the panel.
         */
        tab: ITab;
    }
}

declare module phosphor.panels {
    import IDisposable = core.IDisposable;
    import IMessage = core.IMessage;
    import IMessageHandler = core.IMessageHandler;
    import IMessageFilter = core.IMessageFilter;
    /**
     * The base class of phosphor layouts.
     *
     * The Layout class does not define an interface for adding panels to
     * the layout. A subclass should define that API in a manner suitable
     * for its intended use.
     */
    class Layout implements IMessageFilter, IDisposable {
        /**
         * Construct a new layout.
         */
        constructor();
        /**
         * Dispose of the resources held by the layout.
         */
        dispose(): void;
        /**
         * Get the parent panel of the layout.
         */
        /**
         * Set the parent panel of the layout.
         *
         * The parent panel can only be set once, and is done automatically
         * when the layout is installed on a panel. This should not be set
         * directly by user code.
         */
        parent: Panel;
        /**
         * Get the number of layout items in the layout.
         *
         * This must be implemented by a subclass.
         */
        count: number;
        /**
         * Get the layout item at the given index.
         *
         * This must be implemented by a subclass.
         */
        itemAt(index: number): ILayoutItem;
        /**
         * Remove and return the layout item at the given index.
         *
         * This must be implemented by a subclass.
         */
        takeAt(index: number): ILayoutItem;
        /**
         * Compute the preferred size of the layout.
         *
         * This must be implemented by a subclass.
         */
        sizeHint(): Size;
        /**
         * Compute the minimum required size for the layout.
         *
         * This must be implemented by a subclass.
         */
        minSize(): Size;
        /**
         * Compute the maximum allowed size for the layout.
         *
         * This must be implemented by a subclass.
         */
        maxSize(): Size;
        /**
         * Get the panel at the given index.
         *
         * Returns `undefined` if there is no panel at the given index.
         */
        panelAt(index: number): Panel;
        /**
         * Get the index of the given panel or layout item.
         *
         * Returns -1 if the panel or item does not exist in the layout.
         */
        indexOf(value: Panel | ILayoutItem): number;
        /**
         * Remove the given panel or layout item from the layout.
         */
        remove(value: Panel | ILayoutItem): void;
        /**
         * Invalidate the cached layout data and enqueue an update.
         *
         * This should be reimplemented by a subclass as needed.
         */
        invalidate(): void;
        /**
         * Filter a message sent to a message handler.
         */
        filterMessage(handler: IMessageHandler, msg: IMessage): boolean;
        /**
         * Process a message dispatched to the parent panel.
         *
         * Subclasses may reimplement this method as needed.
         */
        protected processPanelMessage(msg: IMessage): void;
        /**
         * Ensure a child panel is parented to the layout parent.
         *
         * This should be called by a subclass when adding a panel.
         */
        protected ensureParent(panel: Panel): void;
        /**
         * Reparent the child panels to the current layout parent.
         *
         * This is typically called automatically at the proper times.
         */
        protected reparentChildPanels(): void;
        /**
         * A method invoked on parent 'resize' and 'layout-request' messages.
         *
         * Subclasses should reimplement this method to update the layout.
         *
         * The default implementation is a no-op.
         */
        protected layout(): void;
        private _parent;
    }
}

declare module phosphor.panels {
    /**
     * A sizer object for the `layoutCalc` function.
     *
     * Instances of this class are used internally by the panel layouts
     * to implement their layout logic. User code will not typically use
     * this class directly.
     */
    class LayoutSizer {
        /**
         * The preferred size of the sizer.
         */
        sizeHint: number;
        /**
         * The minimum size of the sizer.
         *
         * The sizer will never sized less than this value.
         *
         * Limits: [0, Infinity) && <= maxSize
         */
        minSize: number;
        /**
         * The maximum size of the sizer.
         *
         * The sizer will never be sized greater than this value.
         *
         * Limits: [0, Infinity] && >= minSize
         */
        maxSize: number;
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
        stretch: number;
        /**
         * Whether the sizer should consume extra space if available.
         *
         * Expansive sizers will absorb any remaining space after all
         * stretch sizers have been resized to their limits.
         */
        expansive: boolean;
        /**
         * The computed size of the sizer.
         *
         * This value is the output of the algorithm.
         */
        size: number;
        /**
         * An internal storage property for the layout algorithm.
         */
        done: boolean;
    }
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
    function layoutCalc(sizers: LayoutSizer[], space: number): void;
}

declare module phosphor.panels {
    import Message = core.Message;
    /**
     * A message class for child panel related messages.
     */
    class ChildMessage extends Message {
        /**
         * Construct a new child message.
         */
        constructor(type: string, child: Panel);
        /**
         * The child panel for the message.
         */
        child: Panel;
        private _child;
    }
    /**
     * A message class for 'move' messages.
     */
    class MoveMessage extends Message {
        /**
         * Construct a new move message.
         */
        constructor(oldX: number, oldY: number, x: number, y: number);
        /**
         * The previous X coordinate of the panel.
         */
        oldX: number;
        /**
         * The previous Y coordinate of the panel.
         */
        oldY: number;
        /**
         * The current X coordinate of the panel.
         */
        x: number;
        /**
         * The current Y coordinate of the panel.
         */
        y: number;
        private _oldX;
        private _oldY;
        private _x;
        private _y;
    }
    /**
     * A message class for 'resize' messages.
     */
    class ResizeMessage extends Message {
        /**
         * Construct a new resize message.
         */
        constructor(oldWidth: number, oldHeight: number, width: number, height: number);
        /**
         * The previous width of the panel.
         */
        oldWidth: number;
        /**
         * The previous height of the panel.
         */
        oldHeight: number;
        /**
         * The current width of the panel.
         */
        width: number;
        /**
         * The current height of the panel.
         */
        height: number;
        private _oldWidth;
        private _oldHeight;
        private _width;
        private _height;
    }
}

declare module phosphor.panels {
    import IIterable = collections.IIterable;
    import IList = collections.IList;
    import IDisposable = core.IDisposable;
    import IMessage = core.IMessage;
    import IMessageHandler = core.IMessageHandler;
    import Signal = core.Signal;
    import IBoxData = domutil.IBoxData;
    /**
     * The base class of the Phosphor panel hierarchy.
     *
     * A panel wraps an absolutely positioned DOM node. It can be used with
     * a Phosphor layout manager to layout its child panels, or it can also
     * be used to host any other leaf DOM content.
     */
    class Panel implements IMessageHandler, IDisposable {
        /**
         * A signal emitted when the panel is disposed.
         */
        disposed: Signal<Panel, void>;
        /**
         * Construct a new panel.
         */
        constructor();
        /**
         * Dispose of the panel and its descendants.
         */
        dispose(): void;
        /**
         * Get the DOM node managed by the panel.
         */
        node: HTMLElement;
        /**
         * Get the X position of the panel.
         */
        /**
         * Set the X position of the panel.
         */
        x: number;
        /**
         * Get the Y position of the panel.
         */
        /**
         * Set the Y position of the panel.
         */
        y: number;
        /**
         * Get the width of the panel.
         */
        /**
         * Set the width of the panel.
         */
        width: number;
        /**
         * Get the height of the panel.
         */
        /**
         * Set the height of the panel.
         */
        height: number;
        /**
         * Get the position of the panel.
         */
        /**
         * Set the position of the panel.
         */
        pos: Point;
        /**
         * Get the size of the panel.
         */
        /**
         * Set the size of the panel.
         */
        size: Size;
        /**
         * Get the geometry of the panel.
         */
        /**
         * Set the geometry of the panel.
         */
        geometry: Rect;
        /**
         * Get the minimum width of the panel.
         */
        /**
         * Set the minimum width of the panel.
         */
        minWidth: number;
        /**
         * Get the minimum height of the panel.
         */
        /**
         * Set the minimum height of the panel.
         */
        minHeight: number;
        /**
         * Get the maximum width of the panel.
         */
        /**
         * Set the maximum width of the panel.
         */
        maxWidth: number;
        /**
         * Get the maximum height of the panel.
         */
        /**
         * Set the maxmimum height of the panel.
         */
        maxHeight: number;
        /**
         * Get the minimum size of the panel.
         */
        /**
         * Set the minimum size of the panel.
         */
        minSize: Size;
        /**
         * Get the maximum size of the panel.
         */
        /**
         * Set the maximum size of the panel.
         */
        maxSize: Size;
        /**
         * Get the horizontal stretch factor for the panel.
         */
        /**
         * Set the horizontal stretch factor for the panel.
         */
        horizontalStretch: number;
        /**
         * Get the vertical stretch factor for the panel.
         */
        /**
         * Set the vertical stretch factor for the panel.
         */
        verticalStretch: number;
        /**
         * Get the horizontal size policy for the panel.
         */
        /**
         * Set the horizontal size policy for the panel.
         */
        horizontalSizePolicy: SizePolicy;
        /**
         * Get the vertical size policy for the panel.
         */
        /**
         * Set the vertical size policy for the panel.
         */
        verticalSizePolicy: SizePolicy;
        /**
         * Get the alignment flags for the panel.
         */
        /**
         * Set the alignment flags for the panel.
         */
        alignment: Alignment;
        /**
         * Get the box data for the panel's node.
         */
        boxData: IBoxData;
        /**
         * Test whether the panel's node is attached to the DOM.
         */
        isAttached: boolean;
        /**
         * Test whether the panel has been disposed.
         */
        isDisposed: boolean;
        /**
         * Test whether the panel is explicitly hidden.
         */
        isHidden: boolean;
        /**
         * Test whether the panel is visible.
         *
         * A panel is visible under the following conditions:
         *   - it is attached to the DOM
         *   - it is not explicitly hidden
         *   - it has no explicitly hidden ancestors
         */
        isVisible: boolean;
        /**
         * Get the parent panel of the panel.
         */
        /**
         * Set the parent panel of the panel.
         */
        parent: Panel;
        /**
         * Get a read only list of the child panels.
         */
        children: IList<Panel>;
        /**
         * Get the layout attached to the panel.
         */
        /**
         * Set the layout for the panel.
         *
         * The given layout must be a new layout not assigned to any other
         * panel or an exception will be thrown. A null layout is allowed.
         *
         * The current layout will be disposed and cannot be reused.
         */
        layout: Layout;
        /**
         * Test whether the given panel flag is set.
         */
        testFlag(flag: PanelFlag): boolean;
        /**
         * Set the given panel flag.
         */
        setFlag(flag: PanelFlag): void;
        /**
         * Clear the given panel flag.
         */
        clearFlag(flag: PanelFlag): void;
        /**
         * Make the panel visible to its parent.
         *
         * If the panel is not explicitly hidden, this is a no-op.
         */
        show(): void;
        /**
         * Make the panel invisible to its parent.
         *
         * If the panel is already hidden, this is a no-op.
         */
        hide(): void;
        /**
         * Close the panel by sending it a 'close' message.
         *
         * Subclasses may reimplement the `onClose` method to perform custom
         * actions before removing the panel from the hierarchy. The default
         * close message handler will unparent the panel.
         */
        close(): void;
        /**
         * Attach the panel's node to a host DOM element.
         *
         * The `fit` method can be called to resize the panel to fill its
         * host node. It should be called whenever the size of host node
         * is known to have changed.
         *
         * Only a root panel can be attached to a host node.
         */
        attach(host: HTMLElement): void;
        /**
         * Detach the panel's node from the DOM.
         *
         * Only a root panel can be detached from its host node.
         */
        detach(): void;
        /**
         * Resize the panel so that its fills its host node.
         *
         * Only a root panel can be fit to its host.
         *
         * If the size of the host node is known, it can be provided. This
         * will prevent a read from the DOM and avoid a potential reflow.
         */
        fit(width?: number, height?: number, box?: IBoxData): void;
        /**
         * Calculate the preferred size for the panel.
         *
         * The default implementation returns the layout size hint if
         * a layout is installed, otherwise it returns a zero size.
         */
        sizeHint(): Size;
        /**
         * Calculate the preferred minimum size for the panel.
         *
         * The default implementation returns the layout min size if
         * a layout is installed, otherwise it returns a zero size.
         */
        minSizeHint(): Size;
        /**
         * Calculate the preferred maximum size for the panel.
         *
         * The default implementation returns the layout max size if
         * a layout is installed, otherwise it returns an inf size.
         */
        maxSizeHint(): Size;
        /**
         * Notify the layout system that the panel geometry needs updating.
         *
         * This should be called if the panel's size hint(s) have changed.
         *
         * If the `force` flag is false and the panel is explicitly hidden,
         * this is a no-op. The geometry will update automatically when the
         * panel is made visible.
         */
        updateGeometry(force?: boolean): void;
        /**
         * Notify the layout system that the panel box data needs updating.
         *
         * This should be called if the node's padding or border has changed.
         */
        updateBoxData(): void;
        /**
         * Move the panel to the given X-Y position.
         */
        move(x: number, y: number): void;
        /**
         * Resize the panel to the given width and height.
         */
        resize(width: number, height: number): void;
        /**
         * Set the geometry of the panel.
         */
        setGeometry(x: number, y: number, width: number, height: number): void;
        /**
         * Set the minimum size of the panel.
         */
        setMinSize(width: number, height: number): void;
        /**
         * Set the maximum size of the panel.
         */
        setMaxSize(width: number, height: number): void;
        /**
         * Set the minimum and maximum size of the panel.
         */
        setMinMaxSize(minW: number, minH: number, maxW: number, maxH: number): void;
        /**
         * Set the stretch factors for the panel.
         */
        setStretch(horizontal: number, vertical: number): void;
        /**
         * Set the size policy values for the panel.
         */
        setSizePolicy(horizontal: SizePolicy, vertical: SizePolicy): void;
        /**
         * Process a message dispatched to the handler.
         */
        processMessage(msg: IMessage): void;
        /**
         * Compress a message posted to the handler.
         *
         * By default 'layout-request' messages are compressed.
         */
        compressEvent(msg: IMessage, posted: IIterable<IMessage>): boolean;
        /**
         * Create the DOM node which represents the panel.
         *
         * The default implementation creates an empty div.
         */
        protected createNode(): HTMLElement;
        /**
         * A method invoked on a 'child-added' message.
         *
         * The default implementation attaches the child node.
         */
        protected onChildAdded(msg: ChildMessage): void;
        /**
         * A method invoked on a 'child-removed' message.
         *
         * The default implementation detaches the child node.
         */
        protected onChildRemoved(msg: ChildMessage): void;
        /**
         * A method invoked on a 'close' message.
         *
         * The default implementation sets the parent to null.
         */
        protected onClose(msg: IMessage): void;
        /**
         * A method invoked on a 'move' message.
         *
         * The default implementation is a no-op.
         */
        protected onMove(msg: MoveMessage): void;
        /**
         * A method invoked on a 'resize' message.
         *
         * The default implementation is a no-op.
         */
        protected onResize(msg: ResizeMessage): void;
        /**
         * A method invoked on a 'before-show' message.
         *
         * The default implementation is a no-op.
         */
        protected onBeforeShow(msg: IMessage): void;
        /**
         * A method invoked on an 'after-show' message.
         *
         * The default implementation is a no-op.
         */
        protected onAfterShow(msg: IMessage): void;
        /**
         * A method invoked on a 'before-hide' message.
         *
         * The default implementation is a no-op.
         */
        protected onBeforeHide(msg: IMessage): void;
        /**
         * A method invoked on an 'after-hide' message.
         *
         * The default implementation is a no-op.
         */
        protected onAfterHide(msg: IMessage): void;
        /**
         * A method invoked on a 'before-attach' message.
         *
         * The default implementation is a no-op.
         */
        protected onBeforeAttach(msg: IMessage): void;
        /**
         * A method invoked on an 'after-attach' message.
         *
         * The default implementation is a no-op.
         */
        protected onAfterAttach(msg: IMessage): void;
        /**
         * A method invoked on a 'before-detach' message.
         *
         * The default implementation is a no-op.
         */
        protected onBeforeDetach(msg: IMessage): void;
        /**
         * A method invoked on an 'after-detach' message.
         *
         * The default implementation is a no-op.
         */
        protected onAfterDetach(msg: IMessage): void;
        private _flags;
        private _node;
        private _parent;
        private _layout;
        private _children;
        private _x;
        private _y;
        private _width;
        private _height;
        private _minWidth;
        private _minHeight;
        private _maxWidth;
        private _maxHeight;
        private _boxData;
        private _stretch;
        private _alignment;
        private _sizePolicy;
    }
}

declare module phosphor.panels {
    import IMessage = core.IMessage;
    import IElement = virtualdom.IElement;
    /**
     * A panel which hosts a virtual element.
     *
     * This is used to embed a virtual element into a panel hierarchy. This
     * is a simple panel which disallows an external layout. The intent is
     * that the element will provide the content for the panel, typically
     * in the form of a component which manages its own updates.
     */
    class ElementHost extends Panel {
        /**
         * Construct a new element host.
         */
        constructor(element?: IElement, width?: number, height?: number);
        /**
         * Get the virtual element hosted by the panel.
         */
        /**
         * Set the virtual element hosted by the panel.
         */
        element: IElement;
        /**
         * Calculate the preferred size of the panel.
         */
        sizeHint(): Size;
        /**
         * Set the preferred size for the panel.
         */
        setSizeHint(width: number, height: number): void;
        /**
         * A method invoked on an 'after-attach' message.
         */
        protected onAfterAttach(msg: IMessage): void;
        /**
         * A method invoked on an 'after-detach' message.
         */
        protected onAfterDetach(msg: IMessage): void;
        private _size;
        private _element;
    }
}

declare module phosphor.panels {
    /**
     * A concrete implementation of ILayoutItem which manages a panel.
     *
     * User code will not typically use this class directly.
     */
    class PanelItem implements ILayoutItem {
        /**
         * Construct a new panel item.
         */
        constructor(panel: Panel);
        /**
         * Test whether the item manages a panel.
         */
        isPanel: boolean;
        /**
         * Test whether the item manages empty space.
         */
        isSpacer: boolean;
        /**
         * Test whether the item should be treated as hidden.
         */
        isHidden: boolean;
        /**
         * The panel the item manages, if any.
         */
        panel: Panel;
        /**
         * Test whether the item should be expanded horizontally.
         */
        expandHorizontal: boolean;
        /**
         * Test Whether the item should be expanded vertically.
         */
        expandVertical: boolean;
        /**
         * The horizontal stretch factor for the item.
         */
        horizontalStretch: number;
        /**
         * The vertical stretch factor for the item.
         */
        verticalStretch: number;
        /**
         * Invalidate the cached data for the item.
         */
        invalidate(): void;
        /**
         * Compute the preferred size of the item.
         */
        sizeHint(): Size;
        /**
         * Compute the minimum size of the item.
         */
        minSize(): Size;
        /**
         * Compute the maximum size of the item.
         */
        maxSize(): Size;
        /**
         * Set the geometry of the item.
         */
        setGeometry(x: number, y: number, width: number, height: number): void;
        /**
         * Update the computed sizes for the panel item.
         */
        private _updateSizes();
        private _panel;
        private _origHint;
        private _sizeHint;
        private _minSize;
        private _maxSize;
    }
}

declare module phosphor.panels {
    /**
     * A concrete implementation of ILayoutItem which manages empty space.
     *
     * User code will not typically create instances of this class directly.
     */
    class SpacerItem implements ILayoutItem {
        /**
         * Construct a new spacer item.
         */
        constructor(width: number, height: number, hStretch: number, vStretch: number, hPolicy: SizePolicy, vPolicy: SizePolicy);
        /**
         * Test whether the item manages a panel.
         */
        isPanel: boolean;
        /**
         * Test whether the item manages empty space.
         */
        isSpacer: boolean;
        /**
         * Test whether the item should be treated as hidden.
         */
        isHidden: boolean;
        /**
         * The panel the item manages, if any.
         */
        panel: Panel;
        /**
         * Test whether the item should be expanded horizontally.
         */
        expandHorizontal: boolean;
        /**
         * Test Whether the item should be expanded vertically.
         */
        expandVertical: boolean;
        /**
         * The horizontal stretch factor for the item.
         */
        horizontalStretch: number;
        /**
         * The vertical stretch factor for the item.
         */
        verticalStretch: number;
        /**
         * Change the sizing of the spacer item.
         *
         * The owner layout must be invalidated to reflect the change.
         */
        setSizing(width: number, height: number, hStretch: number, vStretch: number, hPolicy: SizePolicy, vPolicy: SizePolicy): void;
        /**
         * Transpose the effective orientation of the spacer item.
         */
        transpose(): void;
        /**
         * Invalidate the cached data for the item.
         */
        invalidate(): void;
        /**
         * Compute the preferred size of the item.
         */
        sizeHint(): Size;
        /**
         * Compute the minimum size of the item.
         */
        minSize(): Size;
        /**
         * Compute the maximum size of the item.
         */
        maxSize(): Size;
        /**
         * Set the geometry of the item.
         */
        setGeometry(x: number, y: number, width: number, height: number): void;
        private _size;
        private _stretch;
        private _sizePolicy;
    }
}

declare module phosphor.panels {
    /**
     * A layout which arranges panels in a row or column.
     */
    class BoxLayout extends Layout {
        /**
         * Construct a new box layout.
         */
        constructor(direction: Direction, spacing?: number);
        /**
         * Dispose of the resources held by the layout.
         */
        dispose(): void;
        /**
         * Get the layout direction for the box layout.
         */
        /**
         * Set the layout direction for the box layout.
         */
        direction: Direction;
        /**
         * Get the inter-element fixed spacing for the box layout.
         */
        /**
         * Set the inter-element fixed spacing for the box layout.
         */
        spacing: number;
        /**
         * Get the number of layout items in the layout.
         */
        count: number;
        /**
         * Get the layout item at the specified index.
         */
        itemAt(index: number): ILayoutItem;
        /**
         * Remove and return the layout item at the specified index.
         */
        takeAt(index: number): ILayoutItem;
        /**
         * Add a panel as the last item in the layout.
         *
         * If the panel already exists in the layout, it will be moved.
         *
         * Returns the index of the added panel.
         */
        addPanel(panel: Panel): number;
        /**
         * Insert a panel into the layout at the given index.
         *
         * If the panel already exists in the layout, it will be moved.
         *
         * Returns the index of the added panel.
         */
        insertPanel(index: number, panel: Panel): number;
        /**
         * Add a fixed amount of spacing to the end of the layout.
         *
         * Returns the index of the added space.
         */
        addSpacing(size: number): number;
        /**
         * Insert a fixed amount of spacing at the given index.
         *
         * Returns the index of the added space.
         */
        insertSpacing(index: number, size: number): number;
        /**
         * Add stretchable space to the end of the layout.
         *
         * Returns the index of the added space.
         */
        addStretch(stretch?: number): number;
        /**
         * Insert stretchable space at the given index.
         */
        insertStretch(index: number, stretch?: number): number;
        /**
         * Invalidate the cached layout data and enqueue an update.
         */
        invalidate(): void;
        /**
         * Compute the preferred size of the layout.
         */
        sizeHint(): Size;
        /**
         * Compute the minimum size of the layout.
         */
        minSize(): Size;
        /**
         * Compute the maximum size of the layout.
         */
        maxSize(): Size;
        /**
         * Update the geometry of the child layout items.
         */
        protected layout(): void;
        /**
         * Initialize the layout items and internal sizes for the layout.
         */
        private _setupGeometry();
        /**
         * Insert a layout item at the given index.
         *
         * Returns the index of the added item.
         */
        private _insert(index, item);
        private _dirty;
        private _fixedSpace;
        private _spacing;
        private _lastSpaceIndex;
        private _direction;
        private _sizeHint;
        private _minSize;
        private _maxSize;
        private _items;
        private _sizers;
    }
}

declare module phosphor.panels {
    /**
     * A panel which arranges its children in a row or column
     *
     * This panel delegates to a permanently installed box layout and
     * can be used as a more convenient interface to a box layout.
     */
    class BoxPanel extends Panel {
        /**
         * Construct a new box panel.
         */
        constructor(direction?: Direction, spacing?: number);
        /**
         * Get the layout direction for the box.
         */
        /**
         * Set the layout direction for the box.
         */
        direction: Direction;
        /**
         * Get the inter-element fixed spacing for the box.
         */
        /**
         * Set the inter-element fixed spacing for the box.
         */
        spacing: number;
        /**
         * Get the number of items (panels + spacers) in the box.
         */
        count: number;
        /**
         * Get the index of the given panel.
         *
         * Returns -1 if the panel is not found.
         */
        indexOf(panel: Panel): number;
        /**
         * Get the panel at the given index.
         *
         * Returns `undefined` if there is no panel at the given index.
         */
        panelAt(index: number): Panel;
        /**
         * Add a child panel to the end of the split panel.
         *
         * If the panel already exists, it will be moved.
         *
         * Returns the index of the added panel.
         */
        addPanel(panel: Panel): number;
        /**
         * Insert a child panel into the split panel at the given index.
         *
         * If the panel already exists, it will be moved.
         *
         * Returns the index of the added panel.
         */
        insertPanel(index: number, panel: Panel): number;
        /**
         * Add a fixed amount of spacing to the end of the box.
         *
         * Returns the index of the added space.
         */
        addSpacing(size: number): number;
        /**
         * Insert a fixed amount of spacing at the given index.
         *
         * Returns the index of the added space.
         */
        insertSpacing(index: number, size: number): number;
        /**
         * Add stretchable space to the end of the box.
         *
         * Returns the index of the added space.
         */
        addStretch(stretch?: number): number;
        /**
         * Insert stretchable space at the given index.
         *
         * Returns the index of the added space.
         */
        insertStretch(index: number, stretch?: number): number;
    }
}

declare module phosphor.panels {
    import Signal = core.Signal;
    /**
     * An options object for initializing a menu item.
     */
    interface IMenuItemOptions {
        /**
         * The type of the menu item.
         */
        type?: string;
        /**
         * The text for the menu item.
         */
        text?: string;
        /**
         * The mnemonic for the menu item.
         */
        mnemonic?: string;
        /**
         * The shortcut combo for the menu item.
         */
        shortcut?: string;
        /**
         * Whether the menu item is enabled.
         */
        enabled?: boolean;
        /**
         * Whether a 'check' type menu item is checked.
         */
        checked?: boolean;
        /**
         * The submenu for the menu item.
         */
        submenu?: Menu;
        /**
         * The extra class name to associate with the menu item.
         */
        className?: string;
        /**
         * A callback to invoke when the menu item is toggled.
         */
        onToggled?: (item: MenuItem) => void;
        /**
         * A callback to invoke when the menu item is triggered.
         */
        onTriggered?: (item: MenuItem) => void;
    }
    /**
     * An object which can be added to a menu or menu bar.
     */
    class MenuItem {
        /**
         * A signal emitted when the state of the menu item is changed.
         */
        changed: Signal<MenuItem, void>;
        /**
         * A signal emitted when a `check` type menu item is toggled.
         */
        toggled: Signal<MenuItem, void>;
        /**
         * A signal emitted when the menu item is triggered.
         */
        triggered: Signal<MenuItem, void>;
        /**
         * Construct a new menu item.
         */
        constructor(opts?: IMenuItemOptions);
        /**
         * Get the type of the menu item: 'normal' | 'check' | 'separator'.
         */
        /**
         * Set the type of the menu item: 'normal' | 'check' | 'separator'.
         */
        type: string;
        /**
         * Get the text for the menu item.
         */
        /**
         * Set the text for the menu item.
         */
        text: string;
        /**
         * Get the mnemonic key for the menu item.
         */
        /**
         * Set the mnemonic key for the menu item.
         */
        mnemonic: string;
        /**
         * Get the shortcut key for the menu item (decoration only).
         */
        /**
         * Set the shortcut key for the menu item (decoration only).
         */
        shortcut: string;
        /**
         * Get whether the menu item is enabled.
         */
        /**
         * Set whether the menu item is enabled.
         */
        enabled: boolean;
        /**
         * Get whether the 'check' type menu item is checked.
         */
        /**
         * Set whether the 'check' type menu item is checked.
         */
        checked: boolean;
        /**
         * Get the submenu for the menu item.
         */
        /**
         * Set the submenu for the menu item.
         */
        submenu: Menu;
        /**
         * Get the class name for the menu item.
         */
        /**
         * Set the class name for the menu item.
         */
        className: string;
        /**
         * Trigger the menu item.
         *
         * This will emit the `triggered` signal.
         *
         * If the item is a `check` type, it will also be toggled.
         */
        trigger(): void;
        /**
         * Initialize the menu item from the given options object.
         */
        private _initFrom(opts);
        private _text;
        private _mnemonic;
        private _shortcut;
        private _className;
        private _enabled;
        private _type;
        private _checked;
        private _submenu;
    }
}

declare module phosphor.panels {
    import IMessage = core.IMessage;
    import Signal = core.Signal;
    /**
     * A panel which displays an array of menu items as a menu.
     */
    class Menu extends Panel {
        /**
         * Find the root menu of a menu hierarchy.
         */
        static rootMenu(menu: Menu): Menu;
        /**
         * Find the leaf menu of the menu hierarchy.
         */
        static leafMenu(menu: Menu): Menu;
        /**
         * A signal emitted when the menu is closed.
         */
        closed: Signal<Menu, void>;
        /**
         * Construct a new menu.
         */
        constructor(items?: MenuItem[]);
        /**
         * Dispose of the resources held by the panel.
         */
        dispose(): void;
        /**
         * Get the parent menu of the menu.
         *
         * This will be null if the menu is not an open submenu.
         */
        parentMenu: Menu;
        /**
         * Get the child menu of the menu.
         *
         * This will be null if the menu does not have an open submenu.
         */
        childMenu: Menu;
        /**
         * Get the index of the active (highlighted) item.
         */
        /**
         * Set the index of the active (highlighted) menu item.
         *
         * Only a non-separator item can be set as the active item.
         */
        activeIndex: number;
        /**
         * Get the active (highlighted) item.
         */
        /**
         * Set the active (highlighted) item.
         *
         * Only a non-separator item can be set as the active item.
         */
        activeItem: MenuItem;
        /**
         * Get the number of menu items in the menu.
         */
        count: number;
        /**
         * Get the menu item at the given index.
         */
        itemAt(index: number): MenuItem;
        /**
         * Get the index of the given menu item.
         */
        itemIndex(item: MenuItem): number;
        /**
         * Add a menu item to the end of the menu.
         *
         * Returns the new index of the item.
         */
        addItem(item: MenuItem): number;
        /**
         * Insert a menu item into the menu at the given index.
         *
         * Returns the new index of the item.
         */
        insertItem(index: number, item: MenuItem): number;
        /**
         * Remove the menu item at the given index from the menu.
         *
         * Returns the removed item.
         */
        takeItem(index: number): MenuItem;
        /**
         * Remove the given menu item from the menu.
         *
         * Returns the index of the removed item.
         */
        removeItem(item: MenuItem): number;
        /**
         * Remove all menu items from the menu.
         */
        clearItems(): void;
        /**
         * Activate the next non-separator menu item.
         *
         * This is equivalent to pressing the down arrow key.
         */
        activateNextItem(): void;
        /**
         * Activate the previous non-separator menu item.
         *
         * This is equivalent to pressing the up arrow key.
         */
        activatePreviousItem(): void;
        /**
         * Activate the next menu item with the given mnemonic key.
         *
         * This is equivalent to pressing the mnemonic key.
         */
        activateMnemonicItem(key: string): void;
        /**
         * Open the submenu of the active menu item.
         *
         * This is equivalent to pressing the right arrow key.
         *
         * Returns true if the item was opened, false otherwise.
         */
        openActiveItem(): boolean;
        /**
         * Trigger (or open) the active menu item.
         *
         * This is equivalent to pressing the enter key.
         *
         * Returns true if the item was triggered, false otherwise.
         */
        triggerActiveItem(): boolean;
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
        popup(x: number, y: number, forceX?: boolean, forceY?: boolean): void;
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
        open(x: number, y: number, forceX?: boolean, forceY?: boolean): void;
        /**
         * Handle the 'close' message for the menu.
         *
         * If the menu is currently attached, this will detach the menu
         * and emit the `closed` signal. The super handler is not called.
         */
        protected onClose(msg: IMessage): void;
        /**
         * A method invoked when a menu item is inserted into the menu.
         */
        protected itemInserted(index: number, item: MenuItem): void;
        /**
         * A method invoked when a menu item is removed from the menu.
         */
        protected itemRemoved(index: number, item: MenuItem): void;
        /**
         * Create the DOM node for the panel.
         */
        protected createNode(): HTMLElement;
        /**
         * A method invoked on an 'after-attach' message.
         */
        protected onAfterAttach(msg: IMessage): void;
        /**
         * A method invoked on an 'after-detach' message.
         */
        protected onAfterDetach(msg: IMessage): void;
        /**
         * Handle the DOM events for the menu.
         */
        protected handleEvent(event: Event): void;
        /**
         * Handle the 'mouseenter' event for the menu.
         *
         * This event listener is attached to the child item nodes.
         */
        protected domEvent_mouseenter(event: MouseEvent): void;
        /**
         * Handle the 'mouseleave' event for the menu.
         *
         * The event listener is only attached to the menu node.
         */
        protected domEvent_mouseleave(event: MouseEvent): void;
        /**
         * Handle the 'mouseup' event for the menu.
         *
         * This event listener is attached to the menu node.
         */
        protected domEvent_mouseup(event: MouseEvent): void;
        /**
         * Handle the 'contextmenu' event for the menu.
         *
         * This event listener is attached to the menu node.
         */
        protected domEvent_contextmenu(event: Event): void;
        /**
         * Handle the 'mousedown' event for the menu.
         *
         * This event listener is attached to the document for the root
         * menu only when it is opened as a popup menu.
         */
        protected domEvent_mousedown(event: MouseEvent): void;
        /**
         * Handle the key down event for the menu.
         *
         * This event listener is attached to the document for the root
         * menu only when it is opened as a popup menu.
         */
        protected domEvent_keydown(event: KeyboardEvent): void;
        /**
         * Handle the 'keypress' event for the menu.
         *
         * This event listener is attached to the document for the root
         * menu only when it is opened as a popup menu.
         */
        protected domEvent_keypress(event: KeyboardEvent): void;
        /**
         * Set the active item index for the menu.
         *
         * This updates the class name of the relevant item nodes.
         */
        private _setActiveIndex(index);
        /**
         * Synchronize the active item hierarchy starting with the parent.
         *
         * This ensures that the proper child items are activated for the
         * ancestor menu hierarchy and that any pending open or close
         * tasks are cleared.
         */
        private _syncAncestors();
        /**
         * Synchronize the active item with the item for the child menu.
         *
         * This ensures that the active item is the child menu item.
         */
        private _syncChildItem();
        /**
         * Open the menu item's submenu using the node for location.
         *
         * If the given item is already open, this is a no-op.
         *
         * Any pending open operation will be cancelled before opening
         * the menu or queueing the delayed task to open the menu.
         */
        private _openChildMenu(item, node, delayed);
        /**
         * Close the currently open child menu using a delayed task.
         *
         * If a task is pending or if there is no child menu, this is a no-op.
         */
        private _closeChildMenu();
        /**
         * Reset the state of the menu.
         *
         * This deactivates the current item and closes the child menu.
         */
        private _reset();
        /**
         * Remove the menu from its parent menu.
         */
        private _removeFromParentMenu();
        /**
         * Cancel any pending child menu open task.
         */
        private _cancelPendingOpen();
        /**
         * Cancel any pending child menu close task.
         */
        private _cancelPendingClose();
        /**
         * Handle the `changed` signal from a menu item.
         */
        private _mi_changed(sender);
        private _childItem;
        private _childMenu;
        private _parentMenu;
        private _items;
        private _nodes;
        private _activeIndex;
        private _openTimer;
        private _closeTimer;
    }
}

declare module phosphor.panels {
    import IMessage = core.IMessage;
    /**
     * A panel which displays menu items as a menu bar.
     */
    class MenuBar extends Panel {
        /**
         * Construct a new menu bar.
         */
        constructor(items?: MenuItem[]);
        /**
         * Dispose of the resources held by the panel.
         */
        dispose(): void;
        /**
         * Get the child menu of the menu bar.
         *
         * This will be null if the menu bar does not have an open menu.
         */
        childMenu: Menu;
        /**
         * Get the index of the active (highlighted) item.
         */
        /**
         * Set the index of the active (highlighted) menu item.
         *
         * Only an enabled non-separator item can be set as the active item.
         */
        activeIndex: number;
        /**
         * Get the active (highlighted) item.
         */
        /**
         * Set the active (highlighted) item.
         *
         * Only an enabled non-separator item can be set as the active item.
         */
        activeItem: MenuItem;
        /**
         * Get the number of menu items in the menu bar.
         */
        count: number;
        /**
         * Get the menu item at the given index.
         */
        itemAt(index: number): MenuItem;
        /**
         * Get the index of the given menu item.
         */
        itemIndex(item: MenuItem): number;
        /**
         * Add a menu item to the end of the menu bar.
         *
         * Returns the new index of the item.
         */
        addItem(item: MenuItem): number;
        /**
         * Insert a menu item into the menu bar at the given index.
         *
         * Returns the new index of the item.
         */
        insertItem(index: number, item: MenuItem): number;
        /**
         * Remove the menu item at the given index from the menu bar.
         *
         * Returns the removed item.
         */
        takeItem(index: number): MenuItem;
        /**
         * Remove the given menu item from the menu bar.
         *
         * Returns the index of the removed item.
         */
        removeItem(item: MenuItem): number;
        /**
         * Remove all menu items from the menu bar.
         */
        clearItems(): void;
        /**
         * Activate the next non-separator menu item.
         *
         * This is equivalent to pressing the right arrow key.
         */
        activateNextItem(): void;
        /**
         * Activate the previous non-separator menu item.
         *
         * This is equivalent to pressing the left arrow key.
         */
        activatePreviousItem(): void;
        /**
         * Activate the next menu item with the given mnemonic key.
         *
         * This is equivalent to pressing the mnemonic key.
         */
        activateMnemonicItem(key: string): void;
        /**
         * Open the submenu of the active menu item.
         *
         * This is equivalent to pressing the down arrow key.
         *
         * Returns true if the item was opened, false otherwise.
         */
        openActiveItem(): boolean;
        /**
         * Compute the size hint for the menu bar.
         */
        sizeHint(): Size;
        /**
         * Compute the minimum size hint for the menu bar.
         */
        minSizeHint(): Size;
        /**
         * A method called when a menu item is inserted into the menu bar.
         */
        protected itemInserted(index: number, item: MenuItem): void;
        /**
         * A method called when a menu item is removed from the menu bar.
         */
        protected itemRemoved(index: number, item: MenuItem): void;
        /**
         * Create the DOM node for the panel.
         */
        protected createNode(): HTMLElement;
        /**
         * A method invoked on the 'after-attach' event.
         */
        protected onAfterAttach(msg: IMessage): void;
        /**
         * A method invoked on the 'after-detach' event.
         */
        protected onAfterDetach(msg: IMessage): void;
        /**
         * Handle the DOM events for the menu bar.
         */
        protected handleEvent(event: Event): void;
        /**
         * Handle the 'mousedown' event for the menu bar.
         */
        protected domEvent_mousedown(event: MouseEvent): void;
        /**
         * Handle the 'mousemove' event for the menu bar.
         */
        protected domEvent_mousemove(event: MouseEvent): void;
        /**
         * Handle the 'mouseleave' event for the menu bar.
         */
        protected domEvent_mouseleave(event: MouseEvent): void;
        /**
         * Handle the 'keydown' event for the menu bar.
         */
        protected domEvent_keydown(event: KeyboardEvent): void;
        /**
         * Handle the 'keypress' event for the menu bar.
         */
        protected domEvent_keypress(event: KeyboardEvent): void;
        /**
         * Set the active item index for the menu bar.
         *
         * If the index points to an item, it is assumed to be selectable.
         *
         * This will take the appropriate action based on the menu bar state.
         */
        private _setActiveIndex(index);
        /**
         * Open the menu item's submenu using the node for location.
         */
        private _openChildMenu(menu, node);
        /**
         * Close the current child menu, if one exists.
         */
        private _closeChildMenu();
        /**
         * Set the state mode for the menu bar.
         *
         * This will update the menu bar event listeners accordingly.
         */
        private _setState(state);
        /**
         * Update the event listeners for the inactive state.
         */
        private _useInactiveListeners();
        /**
         * Update the event listeners for the active and open states.
         */
        private _useActiveListeners();
        /**
         * Handle the `closed` signal from the child menu.
         */
        private _mn_closed(sender);
        /**
         * Handle the `changed` signal from a menu item.
         */
        private _mi_changed(sender);
        private _childMenu;
        private _items;
        private _nodes;
        private _state;
        private _activeIndex;
    }
}

declare module phosphor.panels {
    /**
     * A layout in which positions a single child at time.
     *
     * This is useful for panels which hold a single content child.
     */
    class SingleLayout extends Layout {
        /**
         * Construct a new single layout.
         */
        constructor(panel?: Panel);
        /**
         * Dispose of the resources held by the layout.
         */
        dispose(): void;
        /**
         * Get the panel managed by the layout.
         */
        /**
         * Set the panel managed by the layout.
         */
        panel: Panel;
        /**
         * Get the number of layout items in the layout.
         */
        count: number;
        /**
         * Get the layout item at the specified index.
         */
        itemAt(index: number): ILayoutItem;
        /**
         * Remove and return the layout item at the specified index.
         */
        takeAt(index: number): ILayoutItem;
        /**
         * Invalidate the cached layout data and enqueue an update.
         */
        invalidate(): void;
        /**
         * Compute the preferred size of the layout.
         */
        sizeHint(): Size;
        /**
         * Compute the minimum size of the layout.
         */
        minSize(): Size;
        /**
         * Compute the maximum size of the layout.
         */
        maxSize(): Size;
        /**
         * Update the geometry of the child layout items.
         */
        protected layout(): void;
        /**
         * Initialize the layout items and internal sizes for the layout.
         */
        private _setupGeometry();
        private _dirty;
        private _sizeHint;
        private _minSize;
        private _maxSize;
        private _item;
    }
}

declare module phosphor.panels {
    /**
     * A panel which holds a single child.
     *
     * This panel delegates to a permanently installed single layout and
     * can be used as a more convenient interface to a single layout.
     */
    class SinglePanel extends Panel {
        /**
         * Construct a new single panel.
         */
        constructor(panel?: Panel);
        /**
         * Get the managed child panel.
         */
        /**
         * Set the managed child panel.
         */
        panel: Panel;
    }
}

declare module phosphor.panels {
    /**
     * A class which manages a handle node for a split panel.
     */
    class SplitHandle {
        /**
         * Construct a new split handle.
         */
        constructor(orientation: Orientation);
        /**
         * Get whether the handle is hidden.
         */
        /**
         * Set whether the handle is hidden.
         */
        hidden: boolean;
        /**
         * Get the orientation of the handle.
         */
        /**
         * Set the orientation of the handle.
         */
        orientation: Orientation;
        /**
         * Get the DOM node for the handle.
         */
        node: HTMLElement;
        /**
         * Create the DOM node for the handle.
         */
        protected createNode(): HTMLElement;
        private _hidden;
        private _node;
        private _orientation;
    }
}

declare module phosphor.panels {
    /**
     * A layout which arranges its panels in resizable sections.
     */
    class SplitLayout extends Layout {
        /**
         * Construct a new split layout.
         */
        constructor(orientation: Orientation);
        /**
         * Dispose of the resources held by the layout.
         */
        dispose(): void;
        /**
         * Get the orientation of the split layout.
         */
        /**
         * Set the orientation of the split layout.
         */
        orientation: Orientation;
        /**
         * Get the size of the split handles.
         */
        /**
         * Set the the size of the split handles.
         */
        handleSize: number;
        /**
         * Get the number of layout items in the layout.
         */
        count: number;
        /**
         * Get the normalized sizes of the items in the layout.
         */
        sizes(): number[];
        /**
         * Set the relative sizes for the split items.
         *
         * Extra values are ignored, too few will yield an undefined layout.
         */
        setSizes(sizes: number[]): void;
        /**
         * Get the splitter handle at the given index.
         */
        handleAt(index: number): SplitHandle;
        /**
         * Get the layout item at the specified index.
         */
        itemAt(index: number): ILayoutItem;
        /**
         * Remove and return the layout item at the specified index.
         */
        takeAt(index: number): ILayoutItem;
        /**
         * Add a panel as the last item in the layout.
         *
         * If the panel already exists in the layout, it will be moved.
         *
         * Returns the index of the added panel.
         */
        addPanel(panel: Panel): number;
        /**
         * Insert a panel into the layout at the given index.
         *
         * If the panel already exists in the layout, it will be moved.
         *
         * Returns the index of the added panel.
         */
        insertPanel(index: number, panel: Panel): number;
        /**
         * Move the handle at the given index to the offset position.
         *
         * This will move the handle as close as possible to the given
         * offset position, without violating item size constraints.
         */
        moveHandle(index: number, pos: number): void;
        /**
         * Invalidate the cached layout data and enqueue an update.
         */
        invalidate(): void;
        /**
         * Compute the preferred size of the layout.
         */
        sizeHint(): Size;
        /**
         * Compute the minimum size of the layout.
         */
        minSize(): Size;
        /**
         * Compute the maximum size of the layout.
         */
        maxSize(): Size;
        /**
         * Update the geometry of the child layout items.
         */
        protected layout(): void;
        /**
         * Initialize the layout items and internal sizes for the layout.
         */
        private _setupGeometry();
        private _dirty;
        private _handleSize;
        private _fixedSpace;
        private _sizeHint;
        private _minSize;
        private _maxSize;
        private _orientation;
        private _items;
        private _sizers;
    }
    /**
     * A custom panel item used by a split layout.
     */
    class SplitItem extends PanelItem {
        /**
         * Construct a new split item.
         */
        constructor(panel: Panel, handle: SplitHandle);
        /**
         * Get the split handle for the item.
         */
        handle: SplitHandle;
        private _handle;
    }
}

declare module phosphor.panels {
    import IMessage = core.IMessage;
    /**
     * A panel which separates its children into resizable sections.
     *
     * This panel delegates to a permanently installed split layout and
     * can be used as a more convenient interface to a split layout.
     */
    class SplitPanel extends Panel {
        /**
         * Construct a new split panel.
         */
        constructor(orientation?: Orientation);
        /**
         * Dispose of the resources held by the panel.
         */
        dispose(): void;
        /**
         * Get the orientation of the split panel.
         */
        /**
         * Set the orientation of the split panel.
         */
        orientation: Orientation;
        /**
         * Get the size of the split handles.
         */
        /**
         * Set the the size of the split handles.
         */
        handleSize: number;
        /**
         * Get the number of child panels in the split panel.
         */
        count: number;
        /**
         * Get the normalized sizes of the children in the split panel.
         */
        sizes(): number[];
        /**
         * Set the relative sizes for the split panel children.
         *
         * Extra values are ignored, too few will yield an undefined layout.
         */
        setSizes(sizes: number[]): void;
        /**
         * Get the index of the given panel.
         *
         * Returns -1 if the panel is not found.
         */
        indexOf(panel: Panel): number;
        /**
         * Get the panel at the given index.
         *
         * Returns `undefined` if there is no panel at the given index.
         */
        panelAt(index: number): Panel;
        /**
         * Add a child panel to the end of the split panel.
         *
         * If the panel already exists, it will be moved.
         *
         * Returns the index of the added panel.
         */
        addPanel(panel: Panel): number;
        /**
         * Insert a child panel into the split panel at the given index.
         *
         * If the panel already exists, it will be moved.
         *
         * Returns the index of the added panel.
         */
        insertPanel(index: number, panel: Panel): number;
        /**
         * A method invoked after the node is attached to the DOM.
         */
        protected onAfterAttach(msg: IMessage): void;
        /**
         * A method invoked after the node is detached from the DOM.
         */
        protected onAfterDetach(msg: IMessage): void;
        /**
         * Handle the DOM events for the splitter.
         */
        protected handleEvent(event: Event): void;
        /**
         * Handle the 'mousedown' event for the splitter.
         */
        protected domEvent_mousedown(event: MouseEvent): void;
        /**
         * Handle the 'mouseup' event for the splitter.
         */
        protected domEvent_mouseup(event: MouseEvent): void;
        /**
         * Handle the 'mousemove' event for the splitter.
         */
        protected domEvent_mousemove(event: MouseEvent): void;
        /**
         * Find the index of the handle which contains a target element.
         */
        private _findHandle(target);
        /**
         * Release the mouse grab for the splitter.
         */
        private _releaseMouse();
        private _pressData;
    }
}

declare module phosphor.panels {
    import Signal = core.Signal;
    /**
     * The arguments object for stack layout signals.
     */
    interface IStackIndexArgs {
        /**
         * The stack layout index of interest.
         */
        index: number;
        /**
         * The panel associated with the index.
         */
        panel: Panel;
    }
    /**
     * A layout in which only one child panel is visible at a time.
     */
    class StackLayout extends Layout {
        /**
         * A signal emitted when the current index is changed.
         */
        currentChanged: Signal<StackLayout, IStackIndexArgs>;
        /**
         * A signal emitted when a panel is removed from the layout.
         */
        panelRemoved: Signal<StackLayout, IStackIndexArgs>;
        /**
         * Construct a new stack layout.
         */
        constructor();
        /**
         * Dispose of the resources held by the layout.
         */
        dispose(): void;
        /**
         * Get the current index of the stack.
         */
        /**
         * Set the current index of the stack.
         */
        currentIndex: number;
        /**
         * Get the current panel in the stack.
         */
        /**
         * Set the current panel in the stack.
         */
        currentPanel: Panel;
        /**
         * Get the number of layout items in the layout.
         */
        count: number;
        /**
         * Get the layout item at the specified index.
         */
        itemAt(index: number): ILayoutItem;
        /**
         * Remove and return the layout item at the specified index.
         */
        takeAt(index: number): ILayoutItem;
        /**
         * Add a panel as the last item in the layout.
         *
         * If the panel already exists in the layout, it will be moved.
         *
         * Returns the index of the added panel.
         */
        addPanel(panel: Panel): number;
        /**
         * Insert a panel into the layout at the given index.
         *
         * If the panel already exists in the layout, it will be moved.
         *
         * Returns the index of the added panel.
         */
        insertPanel(index: number, panel: Panel): number;
        /**
         * Move a panel from one index to another.
         *
         * Returns the new index of the panel.
         */
        movePanel(fromIndex: number, toIndex: number): number;
        /**
         * Invalidate the cached layout data and enqueue an update.
         */
        invalidate(): void;
        /**
         * Compute the preferred size of the layout.
         */
        sizeHint(): Size;
        /**
         * Compute the minimum size of the layout.
         */
        minSize(): Size;
        /**
         * Compute the maximum size of the layout.
         */
        maxSize(): Size;
        /**
         * Update the geometry of the child layout items.
         */
        protected layout(): void;
        /**
         * Initialize the layout items and internal sizes for the layout.
         */
        private _setupGeometry();
        private _dirty;
        private _currentIndex;
        private _sizeHint;
        private _minSize;
        private _maxSize;
        private _items;
    }
}

declare module phosphor.panels {
    import Signal = core.Signal;
    /**
     * A panel where only one child is visible at a time.
     *
     * This panel delegates to a permanently installed stack layout and
     * can be used as a more convenient interface to a stack layout.
     */
    class StackPanel extends Panel {
        /**
         * A signal emitted when the current index changes.
         */
        currentChanged: Signal<StackPanel, IStackIndexArgs>;
        /**
         * A signal emitted when a panel is removed from the stack.
         */
        panelRemoved: Signal<StackPanel, IStackIndexArgs>;
        /**
         * Construct a new stack panel.
         */
        constructor();
        /**
         * Dispose of the resources held by the panel.
         */
        dispose(): void;
        /**
         * Get the current index of the stack.
         */
        /**
         * Set the current index of the stack.
         */
        currentIndex: number;
        /**
         * Get the current panel in the stack.
         */
        /**
         * Set the current panel in the stack.
         */
        currentPanel: Panel;
        /**
         * Get the number of panels in the stack.
         */
        count: number;
        /**
         * Get the index of the given panel.
         *
         * Returns -1 if the panel is not found.
         */
        indexOf(panel: Panel): number;
        /**
         * Get the panel at the given index.
         *
         * Returns `undefined` if there is no panel at the given index.
         */
        panelAt(index: number): Panel;
        /**
         * Add a child panel to the end of the split panel.
         *
         * If the panel already exists, it will be moved.
         *
         * Returns the index of the added panel.
         */
        addPanel(panel: Panel): number;
        /**
         * Insert a child panel into the split panel at the given index.
         *
         * If the panel already exists, it will be moved.
         *
         * Returns the index of the added panel.
         */
        insertPanel(index: number, panel: Panel): number;
        /**
         * Move a child panel from one index to another.
         *
         * Returns the new index of the panel.
         */
        movePanel(fromIndex: number, toIndex: number): number;
        /**
         * Handle the `currentChanged` signal for the stack layout.
         */
        private _sl_currentChanged(sender, args);
        /**
         * Handle the `panelChanged` signal for the stack layout.
         */
        private _sl_panelRemoved(sender, args);
    }
}

declare module phosphor.panels {
    /**
     * A concrete implementation of ITab.
     */
    class Tab implements ITab {
        /**
         * Construct a new tab.
         */
        constructor(text?: string);
        /**
         * Get the text for the tab.
         */
        /**
         * Set the text for the tab.
         */
        text: string;
        /**
         * Get whether the tab is selected.
         */
        /**
         * Set whether the tab is selected.
         */
        selected: boolean;
        /**
         * Get whether the tab is closable.
         */
        /**
         * Set whether the tab is closable.
         */
        closable: boolean;
        /**
         * The DOM node for the tab.
         */
        node: HTMLElement;
        /**
         * The DOM node for the close icon, if available.
         */
        closeIconNode: HTMLElement;
        /**
         * Create the DOM node for the tab.
         */
        protected createNode(): HTMLElement;
        private _node;
    }
}

declare module phosphor.panels {
    import IMessage = core.IMessage;
    import Signal = core.Signal;
    /**
     * The arguments object for the `attachTab` method.
     */
    interface ITabAttachArgs {
        /**
         * The tab to add to the tab bar.
         */
        tab: ITab;
        /**
         * The current width of the tab.
         */
        tabWidth: number;
        /**
         * The X press position in tab coordinates.
         */
        offsetX: number;
        /**
         * The Y press position in tab coordinates.
         */
        offsetY: number;
        /**
         * The current mouse client X position.
         */
        clientX: number;
        /**
         * The current mouse client Y position.
         */
        clientY: number;
    }
    /**
     * The arguments object for various tab bar signals.
     */
    interface ITabIndexArgs {
        /**
         * The index of interest.
         */
        index: number;
        /**
         * The tab associated with the index.
         */
        tab: ITab;
    }
    /**
     * The arguments object for the `tabMoved` signal.
     */
    interface ITabMoveArgs {
        /**
         * The original tab index.
         */
        fromIndex: number;
        /**
         * The new tab index.
         */
        toIndex: number;
    }
    /**
     * The arguments object for the `tabDetachRequested` signal.
     */
    interface ITabDetachArgs {
        /**
         * The index of the tab to detach.
         */
        index: number;
        /**
         * The tab to detach.
         */
        tab: ITab;
        /**
         * The current width of the tab.
         */
        tabWidth: number;
        /**
         * The X press position in tab coordinates.
         */
        offsetX: number;
        /**
         * The Y press position in tab coordinates.
         */
        offsetY: number;
        /**
         * The current client mouse X position.
         */
        clientX: number;
        /**
         * The current client mouse Y position.
         */
        clientY: number;
    }
    /**
     * A panel which displays a row of tabs.
     *
     * A tab bar should be treated as leaf content with no children.
     */
    class TabBar extends Panel {
        /**
         * A signal emitted when a tab is moved.
         */
        tabMoved: Signal<TabBar, ITabMoveArgs>;
        /**
         * A signal emitted when the currently selected tab is changed.
         */
        currentChanged: Signal<TabBar, ITabIndexArgs>;
        /**
         * A signal emitted when the user clicks a tab close icon.
         */
        tabCloseRequested: Signal<TabBar, ITabIndexArgs>;
        /**
         * A signal emitted when a tab is dragged beyond the detach threshold.
         */
        tabDetachRequested: Signal<TabBar, ITabDetachArgs>;
        /**
         * Construct a new tab bar.
         */
        constructor();
        /**
         * Dispose of the resources held by the panel.
         */
        dispose(): void;
        /**
         * Get the index of the current tab.
         */
        /**
         * Set the selected tab index.
         */
        currentIndex: number;
        /**
         * Get the currently selected tab.
         */
        /**
         * Set the currently selected tab.
         */
        currentTab: ITab;
        /**
         * Get the previously selected tab.
         */
        previousTab: ITab;
        /**
         * Get whether the tabs are movable by the user.
         */
        /**
         * Set whether the tabs are movable by the user.
         */
        tabsMovable: boolean;
        /**
         * Get the desired tab width in pixels.
         */
        /**
         * Set the desired tab width in pixels.
         */
        tabWidth: number;
        /**
         * Get the minimum tab width in pixels.
         */
        /**
         * Set the minimum tab width in pixels.
         */
        minTabWidth: number;
        /**
         * Get the tab overlap amount in pixels.
         */
        /**
         * Set the tab overlap amount in pixels.
         */
        tabOverlap: number;
        /**
         * Get the number of tabs in the tab bar.
         */
        count: number;
        /**
         * Get the tab at the given index.
         */
        tabAt(index: number): ITab;
        /**
         * Get the index of the given tab.
         */
        tabIndex(tab: ITab): number;
        /**
         * Add a tab to the end of the tab bar.
         *
         * Returns the index of the tab.
         */
        addTab(tab: string | ITab): number;
        /**
         * Insert a tab into the tab bar at the given index.
         *
         * Returns the index of the tab.
         */
        insertTab(index: number, tab: string | ITab): number;
        /**
         * Move a tab from one index to another.
         *
         * Returns the new tab index.
         */
        moveTab(fromIndex: number, toIndex: number): number;
        /**
         * Remove a tab from the tab bar by index.
         *
         * Returns the removed tab.
         */
        takeAt(index: number, animate?: boolean): ITab;
        /**
         * Remove a tab from the tab bar by value.
         *
         * Returns the index of the removed item.
         */
        removeTab(tab: ITab, animate?: boolean): number;
        /**
         * Remove all of the tabs from the tab bar.
         *
         * This is more efficient than removing the tabs individually.
         */
        clearTabs(): void;
        /**
         * Attach a tab to the tab bar.
         *
         * This will immediately insert the tab with no transition. It will
         * then grab the mouse to continue the tab drag. It assumes the left
         * mouse button is down.
         */
        attachTab(args: ITabAttachArgs): void;
        /**
         * Compute the size hint for the tab bar.
         */
        sizeHint(): Size;
        /**
         * Compute the minimum size hint for the tab bar.
         */
        minSizeHint(): Size;
        /**
         * Create the DOM node for the tab bar.
         */
        protected createNode(): HTMLElement;
        /**
         * A method invoked on an 'after-attach' message.
         */
        protected onAfterAttach(msg: IMessage): void;
        /**
         * A method invoked on an 'after-dettach' message.
         */
        protected onAfterDetach(msg: IMessage): void;
        /**
         * A method invoked on a 'resize' message.
         */
        protected onResize(msg: ResizeMessage): void;
        /**
         * Handle the DOM events for the tab bar.
         */
        protected handleEvent(event: Event): void;
        /**
         * Handle the click event for the tab bar.
         */
        protected domEvent_click(event: MouseEvent): void;
        /**
         * Handle the mousedown event for the tab bar.
         */
        protected domEvent_mousedown(event: MouseEvent): void;
        /**
         * Handle the mouse move event for the tab bar.
         */
        protected domEvent_mousemove(event: MouseEvent): void;
        /**
         * Handle the mouse up event for the tab bar.
         */
        protected domEvent_mouseup(event: MouseEvent): void;
        /**
         * Release the current mouse grab for the tab bar.
         */
        private _releaseMouse();
        /**
         * Insert a new tab into the tab bar at a valid index.
         */
        private _insertTab(index, tab, animate);
        /**
         * Move an item to a new index in the tab bar.
         */
        private _moveTab(fromIndex, toIndex);
        /**
         * Remove the tab at the given index from the tab bar.
         */
        private _removeTab(index, animate);
        /**
         * Update the Z order of the tab nodes in the tab bar.
         */
        private _updateTabZOrder();
        /**
         * Get the index of the tab which covers the given client position.
         */
        private _indexAtPos(clientX, clientY);
        /**
         * Compute the layout width of a tab.
         *
         * This computes a tab size as close as possible to the preferred
         * tab size (but not less than the minimum), taking into account
         * the current tab bar inner div width and tab overlap setting.
         */
        private _tabLayoutWidth();
        /**
         * Update the layout of the tabs in the tab bar.
         *
         * This will update the position and size of the tabs according to
         * the current inner width of the tab bar. The position of the drag
         * tab will not be updated.
         */
        private _updateTabLayout();
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
        private _withTransition(enter?, exit?);
        private _movable;
        private _tabWidth;
        private _tabOverlap;
        private _minTabWidth;
        private _currentTab;
        private _previousTab;
        private _dragData;
        private _tabs;
    }
}

declare module phosphor.panels {
    import Signal = core.Signal;
    /**
     * A panel which provides a tabbed container for child panels.
     *
     * The TabPanel provides a convenient combination of a tab bar and
     * a stack panel which allows the user to toggle between panels by
     * selecting the tab associated with a tabbable panel.
     */
    class TabPanel extends Panel {
        /**
         * A signal emitted when the current panel is changed.
         */
        currentChanged: Signal<TabPanel, IStackIndexArgs>;
        /**
         * Construct a new tab panel.
         */
        constructor();
        /**
         * Dispose of the resources held by the panel.
         */
        dispose(): void;
        /**
         * Get the index of the currently selected panel.
         */
        /**
         * Set the index of the currently selected panel.
         */
        currentIndex: number;
        /**
         * Get the currently selected panel.
         */
        /**
         * Set the currently selected panel.
         */
        currentPanel: Panel;
        /**
         * Get the number of panels in the tab panel.
         */
        count: number;
        /**
         * Get whether the tabs are movable by the user.
         */
        /**
         * Set whether the tabs are movable by the user.
         */
        tabsMovable: boolean;
        /**
         * Get the tab bar used by the tab panel.
         */
        tabBar: TabBar;
        /**
         * Get the stack panel used by the tab panel.
         */
        stackPanel: StackPanel;
        /**
         * Get the index of the given panel.
         */
        indexOf(panel: Panel): number;
        /**
         * Add a panel to the end of the tab panel.
         *
         * If the panel has already been added, it will be moved.
         *
         * Returns the new index of the panel.
         */
        addPanel(panel: ITabbable): number;
        /**
         * Insert a panel into the tab panel at the given index.
         *
         * If the panel has already been added, it will be moved.
         *
         * Returns the new index of the panel.
         */
        insertPanel(index: number, panel: ITabbable): number;
        /**
         * Move a panel from one index to another.
         *
         * Returns the new index of the panel.
         */
        movePanel(fromIndex: number, toIndex: number): number;
        /**
         * Handle the `tabMoved` signal from the tab bar.
         */
        private _tb_tabMoved(sender, args);
        /**
         * Handle the `currentChanged` signal from the tab bar.
         */
        private _tb_currentChanged(sender, args);
        /**
         * Handle the `tabCloseRequested` signal from the tab bar.
         */
        private _tb_tabCloseRequested(sender, args);
        /**
         * Handle the `panelRemoved` signal from the stack panel.
         */
        private _sw_panelRemoved(sender, args);
        private _tabBar;
        private _stackPanel;
    }
}

declare module phosphor.panels {
    /**
     * A panel which provides a flexible layout area for panels.
     */
    class DockArea extends Panel {
        /**
         * Construct a new dock area.
         */
        constructor();
        /**
         * Dispose of the resources held by the panel.
         */
        dispose(): void;
        /**
         * Get the width of the tabs in the dock area.
         */
        /**
         * Get the width of the tabs in the dock area.
         */
        tabWidth: number;
        /**
         * Get the minimum tab width in pixels.
         */
        /**
         * Set the minimum tab width in pixels.
         */
        minTabWidth: number;
        /**
         * Get the tab overlap amount in pixels.
         */
        /**
         * Set the tab overlap amount in pixels.
         */
        tabOverlap: number;
        /**
         * Get the handle size of the dock splitters.
         */
        /**
         * Set the handle size of the dock splitters.
         */
        handleSize: number;
        /**
         * Add a panel to the dock area.
         *
         * The panel is positioned in the area according to the given dock
         * mode and reference panel. If the dock panel is already added to
         * the area, it will be moved to the new location.
         *
         * The default mode inserts the panel on the left side of the area.
         */
        addPanel(panel: ITabbable, mode?: DockMode, ref?: ITabbable): void;
        /**
         * Handle the DOM events for the dock area.
         */
        protected handleEvent(event: Event): void;
        /**
         * Handle the 'mousemove' event for the dock area.
         *
         * This is triggered on the document during a tab move operation.
         */
        protected domEvent_mousemove(event: MouseEvent): void;
        /**
         * Handle the 'mouseup' event for the dock area.
         *
         * This is triggered on the document during a tab move operation.
         */
        protected domEvent_mouseup(event: MouseEvent): void;
        /**
         * Add the widget to a new root dock panel along the given orientation.
         *
         * If the widget already exists in the area, it will be removed.
         */
        private _addWidget(widget, orientation, after);
        /**
         * Add the dock widget as a new split panel next to the reference.
         *
         * If the reference does not exist in the area, this is a no-op.
         *
         * If the dock widget already exists in the area, it will be moved.
         */
        private _splitWidget(widget, ref, orientation, after);
        /**
         * Split the panel with the given widget along the given orientation.
         *
         * If the widget already exists in the area, it will be moved.
         */
        private _splitPanel(panel, widget, orientation, after);
        /**
         * Add the dock widget as a tab next to the reference.
         *
         * If the reference does not exist in the area, this is a no-op.
         *
         * If the dock widget already exists in the area, it will be moved.
         */
        private _tabifyWidget(widget, ref, after);
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
        private _ensureRoot(orientation);
        /**
         * Add a new item to the dock area and install its signal handlers.
         */
        private _addItem(widget, panel);
        /**
         * Create a new panel and setup the signal handlers.
         */
        private _createPanel();
        /**
         * Create a new dock splitter for the dock area.
         */
        private _createSplitter(orientation);
        /**
         * Remove an empty dock panel from the hierarchy.
         *
         * This ensures that the hierarchy is kept consistent by merging an
         * ancestor splitter when it contains only a single child widget.
         */
        private _removePanel(panel);
        /**
         * Abort the tab drag operation if one is in progress.
         */
        private _abortDrag();
        /**
         * Handle the `currentChanged` signal from a tab bar.
         */
        private _tb_currentChanged(sender, args);
        /**
         * Handle the `tabCloseRequested` signal from a tab bar.
         */
        private _tb_tabCloseRequested(sender, args);
        /**
         * Handle the `tabDetachRequested` signal from the tab bar.
         */
        private _tb_tabDetachRequested(sender, args);
        /**
         * Handle the `widgetRemoved` signal from a stack widget.
         */
        private _sw_widgetRemoved(sender, args);
        private _handleSize;
        private _tabWidth;
        private _tabOverlap;
        private _minTabWidth;
        private _ignoreRemoved;
        private _root;
        private _dragData;
        private _items;
    }
}

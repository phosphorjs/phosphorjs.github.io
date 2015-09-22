/**
 * An object used for type-safe inter-object communication.
 *
 * Signals provide a type-safe implementation of the publish-subscribe
 * pattern. An object (publisher) declares which signals it will emit,
 * and consumers connect callbacks (subscribers) to those signals. The
 * subscribers are invoked whenever the publisher emits the signal.
 *
 * A `Signal` object must be bound to a sender in order to be useful.
 * A common pattern is to declare a `Signal` object as a static class
 * member, along with a convenience getter which binds the signal to
 * the `this` instance on-demand.
 *
 * #### Example
 * ```typescript
 * import { ISignal, Signal } from 'phosphor-signaling';
 *
 * class MyClass {
 *
 *   static valueChangedSignal = new Signal<MyClass, number>();
 *
 *   constructor(name: string) {
 *     this._name = name;
 *   }
 *
 *   get valueChanged(): ISignal<MyClass, number> {
 *     return MyClass.valueChangedSignal.bind(this);
 *   }
 *
 *   get name(): string {
 *     return this._name;
 *   }
 *
 *   get value(): number {
 *     return this._value;
 *   }
 *
 *   set value(value: number) {
 *     if (value !== this._value) {
 *       this._value = value;
 *       this.valueChanged.emit(value);
 *     }
 *   }
 *
 *   private _name: string;
 *   private _value = 0;
 * }
 *
 * function logger(sender: MyClass, value: number): void {
 *   console.log(sender.name, value);
 * }
 *
 * var m1 = new MyClass('foo');
 * var m2 = new MyClass('bar');
 *
 * m1.valueChanged.connect(logger);
 * m2.valueChanged.connect(logger);
 *
 * m1.value = 42;  // logs: foo 42
 * m2.value = 17;  // logs: bar 17
 * ```
 */
export declare class Signal<T, U> {
    /**
     * Bind the signal to a specific sender.
     *
     * @param sender - The sender object to bind to the signal.
     *
     * @returns The bound signal object which can be used for connecting,
     *   disconnecting, and emitting the signal.
     */
    bind(sender: T): ISignal<T, U>;
}
/**
 * A typedef for a signal callback function.
 *
 * @param T - The type of the sender.
 *
 * @param U - The type of the signal args.
 */
export declare type Slot<T, U> = (sender: T, args: U) => void;
/**
 * A signal object which is bound to a specific sender.
 *
 * User code will not create instances of `ISignal` directly. They are
 * created on demand by calling the [[bind]] method of a [[Signal]].
 */
export interface ISignal<T, U> {
    /**
     * Connect a callback to the signal.
     *
     * @param callback - The function to invoke whenever the signal is
     *   emitted. It will be passed the sender object and the emit args.
     *
     * @param thisArg - The object to use as the `this` context in the
     *   callback. If provided, this must be a non-primitive object.
     *
     * @returns `true` if the connection succeeds, `false` otherwise.
     *
     * #### Notes
     * Connected callbacks are invoked synchronously, in the order in
     * which they are connected.
     *
     * Signal connections are unique. If a connection already exists for
     * the given `callback` and `thisArg`, this function returns `false`.
     *
     * A newly connected callback will not be invoked until the next time
     * the signal is emitted, even if it is connected while the signal is
     * being emitted.
     *
     * #### Example
     * ```typescript
     * // connect a method
     * someObject.valueChanged.connect(myObject.onValueChanged, myObject);
     *
     * // connect a plain function
     * someObject.valueChanged.connect(myCallback);
     * ```
     */
    connect(callback: Slot<T, U>, thisArg?: any): boolean;
    /**
     * Disconnect a callback from the signal.
     *
     * @param callback - The function connected to the signal.
     *
     * @param thisArg - The `this` context for the callback.
     *
     * @returns `true` if the connection is broken, `false` otherwise.
     *
     * #### Notes
     * A disconnected callback will no longer be invoked, even if it
     * is disconnected while the signal is being emitted.
     *
     * If no connection exists for the given `callback` and `thisArg`,
     * this function returns `false`.
     *
     * #### Example
     * ```typescript
     * // disconnect a method
     * someObject.valueChanged.disconnect(myObject.onValueChanged, myObject);
     *
     * // disconnect a plain function
     * someObject.valueChanged.disconnect(myCallback);
     * ```
     */
    disconnect(callback: Slot<T, U>, thisArg?: any): boolean;
    /**
     * Emit the signal and invoke the connected callbacks.
     *
     * @param args - The args object to pass to the callbacks.
     *
     * #### Notes
     * If a connected callback throws an exception, dispatching of the
     * signal will stop immediately and the exception will be propagated
     * to the call site of this function.
     *
     * #### Example
     * ```typescript
     * this.valueChanged.emit(42);
     * ```
     */
    emit(args: U): void;
}
/**
 * Remove all connections where the given object is the sender.
 *
 * @param sender - The sender object of interest.
 *
 * #### Example
 * ```typescript
 * disconnectSender(someObject);
 * ```
 */
export declare function disconnectSender(sender: any): void;
/**
 * Remove all connections where the given object is the receiver.
 *
 * @param receiver - The receiver object of interest.
 *
 * #### Notes
 * If a `thisArg` is provided when connecting a signal, that object
 * is considered the receiver. Otherwise, the `callback` is used as
 * the receiver.
 *
 * #### Example
 * ```typescript
 * // disconnect a regular object receiver
 * disconnectReceiver(myObject);
 *
 * // disconnect a plain callback receiver
 * disconnectReceiver(myCallback);
 * ```
 */
export declare function disconnectReceiver(receiver: any): void;
/**
 * Clear all signal data associated with the given object.
 *
 * @param obj - The object for which the signal data should be cleared.
 *
 * #### Notes
 * This removes all signal connections where the object is used as
 * either the sender or the receiver.
 *
 * #### Example
 * ```typescript
 * clearSignalData(someObject);
 * ```
 */
export declare function clearSignalData(obj: any): void;

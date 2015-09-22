import { ISignal, Signal } from 'phosphor-signaling';
/**
 * The arguments object emitted with a [[changedSignal]].
 */
export interface IChangedArgs {
    /**
     * The property descriptor associated with the change.
     */
    property: Property<any, any>;
    /**
     * The old value of the property.
     */
    oldValue: any;
    /**
     * The new value of the property.
     */
    newValue: any;
}
/**
 * The options object used to initialize a property descriptor.
 */
export interface IPropertyOptions<T, U> {
    /**
     * The default value for the property.
     *
     * #### Notes
     * This value will be shared among all property owner instances. It
     * should be an immutable value unless a mutable shared singleton
     * is explicitly desired.
     */
    value?: U;
    /**
     * A factory function used to create the default property value.
     *
     * If provided, this takes precedence over the [[value]] option.
     * It will be called whenever the property value is required,
     * but has not yet been set.
     */
    create?: (owner: T) => U;
    /**
     * A function used to coerce a supplied value into the final value.
     *
     * This will be called whenever the property value is changed, or
     * when the property is explicitly coerced. The return value will
     * be used as the final value of the property.
     *
     * #### Notes
     * This will **not** be called for the initial default value.
     */
    coerce?: (owner: T, value: U) => U;
    /**
     * A function used to compare two values for equality.
     *
     * This is called to determine if the property value has changed.
     * It should return `true` if the given values are equivalent, or
     * `false` if they are different.
     *
     * #### Notes
     * If this is not provided, the comparison uses the `===` operator.
     */
    compare?: (oldValue: U, newValue: U) => boolean;
    /**
     * A function called when the property value has changed.
     *
     * This will be invoked when the property value is changed and the
     * comparitor indicates that the old value is not equal to the new
     * value.
     *
     * #### Notes
     * This will **not** be called for the initial default value.
     *
     * This will be invoked **before** the [[changedSignal]] is emitted
     * on the property owner.
     */
    changed?: (owner: T, oldValue: U, newValue: U) => void;
}
/**
 * A property descriptor for a property on an object.
 *
 * Properties descriptors can be used to expose a rich interface for an
 * object which encapsulates value creation, coercion, and notification.
 * They can also be used to extend the state of an object with semantic
 * data from another class.
 *
 * #### Example
 * ```typescript
 * import { Property } from 'phosphor-properties';
 *
 * class MyClass {
 *
 *   static myValueProperty = new Property<MyClass, number>({
 *      value: 0,
 *      coerce: (owner, value) => Math.max(0, value),
 *      changed: (owner, oldValue, newValue) => { console.log(newValue); },
 *   });
 *
 *   get myValue(): number {
 *     return MyClass.myValueProperty.get(this);
 *   }
 *
 *   set myValue(value: number) {
 *     MyClass.myValueProperty.set(this, value);
 *   }
 * }
 * ```
 */
export declare class Property<T, U> {
    /**
     * A signal emitted when a property value changes.
     *
     * #### Notes
     * This is an attached signal which will be emitted using the
     * owner of the property value as the sender.
     *
     * **See also:** [[getChanged]]
     */
    static changedSignal: Signal<any, IChangedArgs>;
    /**
     * Get a bound [[changedSignal]] for a given property owner.
     *
     * @param owner - The object to bind to the changed signal.
     *
     * @returns The bound changed signal for the owner.
     *
     * #### Notes
     * This signal will be emitted whenever any property value
     * for the specified owner is changed.
     */
    static getChanged<V>(owner: V): ISignal<V, IChangedArgs>;
    /**
     * Construct a new property descriptor.
     *
     * @param options - The options for initializing the property.
     */
    constructor(options?: IPropertyOptions<T, U>);
    /**
     * Get the current value of the property for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * @returns The current value of the property.
     *
     * #### Notes
     * If the value has not yet been set, the default value will be
     * computed and assigned as the current value of the property.
     */
    get(owner: T): U;
    /**
     * Set the current value of the property for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * @param value - The value for the property.
     *
     * #### Notes
     * If this operation causes the property value to change, the
     * [[changedSignal]] will be emitted with the owner as sender.
     *
     * If the value has not yet been set, the default value will be
     * computed and used as the previous value for the comparison.
     */
    set(owner: T, value: U): void;
    /**
     * Explicitly coerce the current property value for a given owner.
     *
     * @param owner - The property owner of interest.
     *
     * #### Notes
     * If this operation causes the property value to change, the
     * [[changedSignal]] will be emitted with the owner as sender.
     *
     * If the value has not yet been set, the default value will be
     * computed and used as the previous value for the comparison.
     */
    coerce(owner: T): void;
    /**
     * Get or create the default value for the given owner.
     */
    private _createValue(owner);
    /**
     * Coerce the value for the given owner.
     */
    private _coerceValue(owner, value);
    /**
     * Compare the old value and new value for equality.
     */
    private _compareValue(oldValue, newValue);
    /**
     * Run the change notification if the given values are different.
     */
    private _maybeNotify(owner, oldValue, newValue);
    private _value;
    private _pid;
    private _create;
    private _coerce;
    private _compare;
    private _changed;
}
/**
 * Clear the stored property data for the given property owner.
 *
 * @param owner - The property owner of interest.
 *
 * #### Notes
 * This will clear all property values for the owner, but it will
 * **not** emit any change notifications.
 */
export declare function clearPropertyData(owner: any): void;

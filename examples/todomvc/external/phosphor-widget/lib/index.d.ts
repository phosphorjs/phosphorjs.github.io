import { IDisposable } from 'phosphor-disposable';
import { IBoxSizing, ISizeLimits } from 'phosphor-domutil';
import { IMessageHandler, Message } from 'phosphor-messaging';
import { NodeWrapper } from 'phosphor-nodewrapper';
import { Property } from 'phosphor-properties';
import { Queue } from 'phosphor-queue';
import { ISignal, Signal } from 'phosphor-signaling';
/**
 * `p-Widget`: the class name added to Widget instances.
 */
export declare const WIDGET_CLASS: string;
/**
 * `p-mod-hidden`: the class name added to hidden widgets.
 */
export declare const HIDDEN_CLASS: string;
/**
 * A singleton `'update-request'` message.
 *
 * #### Notes
 * This message can be dispatched to supporting widgets in order to
 * update their content. Not all widgets will respond to messages of
 * this type.
 *
 * This message is typically used to update the position and size of
 * a widget's children, or to update a widget's content to reflect the
 * current state of the widget.
 *
 * Messages of this type are compressed by default.
 *
 * **See also:** [[update]], [[onUpdateRequest]]
 */
export declare const MSG_UPDATE_REQUEST: Message;
/**
 * A singleton `'layout-request'` message.
 *
 * #### Notes
 * This message can be dispatched to supporting widgets in order to
 * update their layout. Not all widgets will respond to messages of
 * this type.
 *
 * This message is typically used to update the size contraints of
 * a widget and to update the position and size of its children.
 *
 * Messages of this type are compressed by default.
 *
 * **See also:** [[onLayoutRequest]]
 */
export declare const MSG_LAYOUT_REQUEST: Message;
/**
 * A singleton `'close-request'` message.
 *
 * #### Notes
 * This message should be dispatched to a widget when it should close
 * and remove itself from the widget hierarchy.
 *
 * Messages of this type are compressed by default.
 *
 * **See also:** [[close]], [[onCloseRequest]]
 */
export declare const MSG_CLOSE_REQUEST: Message;
/**
 * A singleton `'after-show'` message.
 *
 * #### Notes
 * This message is sent to a widget when it becomes visible.
 *
 * This message is **not** sent when the widget is attached.
 *
 * **See also:** [[isVisible]], [[onAfterShow]]
 */
export declare const MSG_AFTER_SHOW: Message;
/**
 * A singleton `'before-hide'` message.
 *
 * #### Notes
 * This message is sent to a widget when it becomes not-visible.
 *
 * This message is **not** sent when the widget is detached.
 *
 * **See also:** [[isVisible]], [[onBeforeHide]]
 */
export declare const MSG_BEFORE_HIDE: Message;
/**
 * A singleton `'after-attach'` message.
 *
 * #### Notes
 * This message is sent to a widget after it is attached to the DOM.
 *
 * **See also:** [[isAttached]], [[onAfterAttach]]
 */
export declare const MSG_AFTER_ATTACH: Message;
/**
 * A singleton `'before-detach'` message.
 *
 * #### Notes
 * This message is sent to a widget before it is detached from the DOM.
 *
 * **See also:** [[isAttached]], [[onBeforeDetach]]
 */
export declare const MSG_BEFORE_DETACH: Message;
/**
 * The base class of the Phosphor widget hierarchy.
 *
 * #### Notes
 * This class will typically be subclassed in order to create a useful
 * widget. However, it can be used by itself to host foreign content
 * such as a React or Bootstrap component. Simply instantiate an empty
 * widget and add the content directly to its [[node]]. The widget and
 * its content can then be embedded within a Phosphor widget hierarchy.
 */
export declare class Widget extends NodeWrapper implements IDisposable, IMessageHandler {
    /**
     * A signal emitted when the widget is disposed.
     *
     * **See also:** [[disposed]], [[isDisposed]]
     */
    static disposedSignal: Signal<Widget, void>;
    /**
     * A property descriptor which controls the hidden state of a widget.
     *
     * #### Notes
     * This property controls whether a widget is explicitly hidden.
     *
     * Hiding a widget will cause the widget and all of its descendants
     * to become not-visible.
     *
     * This property will toggle the presence of [[HIDDEN_CLASS]] on a
     * widget according to the property value. It will also dispatch
     * `'after-show'` and `'before-hide'` messages as appropriate.
     *
     * The default property value is `false`.
     *
     * **See also:** [[hidden]], [[isVisible]]
     */
    static hiddenProperty: Property<Widget, boolean>;
    /**
     * Construct a new widget.
     *
     * #### Notes
     * The [[WIDGET_CLASS]] is added to the widget during construction.
     */
    constructor();
    /**
     * Dispose of the widget and its descendant widgets.
     *
     * #### Notes
     * It is generally unsafe to use the widget after it has been
     * disposed.
     *
     * If this method is called more than once, all calls made after
     * the first will be a no-op.
     */
    dispose(): void;
    /**
     * A signal emitted when the widget is disposed.
     *
     * #### Notes
     * This is a pure delegate to the [[disposedSignal]].
     */
    disposed: ISignal<Widget, void>;
    /**
     * Test whether the widget's node is attached to the DOM.
     *
     * #### Notes
     * This is a read-only property which is always safe to access.
     *
     * **See also:** [[attachWidget]], [[detachWidget]]
     */
    isAttached: boolean;
    /**
     * Test whether the widget has been disposed.
     *
     * #### Notes
     * This is a read-only property which is always safe to access.
     *
     * **See also:** [[disposed]]
     */
    isDisposed: boolean;
    /**
     * Test whether the widget is visible.
     *
     * #### Notes
     * A widget is visible when it is attached to the DOM, is not
     * explicitly hidden, and has no explicitly hidden ancestors.
     *
     * This is a read-only property which is always safe to access.
     *
     * **See also:** [[hidden]]
     */
    isVisible: boolean;
    /**
     * Get whether the widget is explicitly hidden.
     *
     * #### Notes
     * This is a pure delegate to the [[hiddenProperty]].
     *
     * **See also:** [[isVisible]]
     */
    /**
     * Set whether the widget is explicitly hidden.
     *
     * #### Notes
     * This is a pure delegate to the [[hiddenProperty]].
     *
     * **See also:** [[isVisible]]
     */
    hidden: boolean;
    /**
     * Get the box sizing for the widget's DOM node.
     *
     * #### Notes
     * This value is computed once and then cached in order to avoid
     * excessive style recomputations. The cache can be cleared via
     * [[clearBoxSizing]].
     *
     * Layout widgets rely on this property when computing their layout.
     * If a layout widget's box sizing changes at runtime, the box sizing
     * cache should be cleared and the layout widget should be posted a
     *`'layout-request'` message.
     *
     * This is a read-only property.
     *
     * **See also:** [[clearBoxSizing]]
     */
    boxSizing: IBoxSizing;
    /**
     * Get the size limits for the widget's DOM node.
     *
     * #### Notes
     * This value is computed once and then cached in order to avoid
     * excessive style recomputations. The cache can be cleared by
     * calling [[clearSizeLimits]].
     *
     * Layout widgets rely on this property of their child widgets when
     * computing the layout. If a child widget's size limits change at
     * runtime, the size limits should be cleared and the layout widget
     * should be posted a `'layout-request'` message.
     *
     * This is a read-only property.
     *
     * **See also:** [[setSizeLimits]], [[clearSizeLimits]]
     */
    sizeLimits: ISizeLimits;
    /**
     * Get the current offset geometry rect for the widget.
     *
     * #### Notes
     * If the widget geometry has been set using [[setOffsetGeometry]],
     * those values will be used to populate the rect, and no data will
     * be read from the DOM. Otherwise, the offset geometry of the node
     * **will** be read from the DOM, which may cause a reflow.
     *
     * This is a read-only property.
     *
     * **See also:** [[setOffsetGeometry]], [[clearOffsetGeometry]]
     */
    offsetRect: IOffsetRect;
    /**
     * Get the parent of the widget.
     *
     * #### Notes
     * This will be `null` if the widget does not have a parent.
     */
    /**
     * Set the parent of the widget.
     *
     * @throws Will throw an error if the widget is the parent.
     *
     * #### Notes
     * If the specified parent is the current parent, this is a no-op.
     *
     * If the specified parent is `null`, this is equivalent to the
     * expression `widget.parent.removeChild(widget)`, otherwise it
     * is equivalent to the expression `parent.addChild(widget)`.
     *
     * **See also:** [[addChild]], [[insertChild]], [[removeChild]]
     */
    parent: Widget;
    /**
     * Get a shallow copy of the array of child widgets.
     *
     * #### Notes
     * When only iterating over the children, it can be faster to use
     * the child query methods, which do not perform a copy.
     *
     * **See also:** [[childCount]], [[childAt]]
     */
    /**
     * Set the children of the widget.
     *
     * #### Notes
     * This will clear the current child widgets and add the specified
     * child widgets. Depending on the desired outcome, it can be more
     * efficient to use one of the child manipulation methods.
     *
     * **See also:** [[addChild]], [[insertChild]], [[removeChild]]
     */
    children: Widget[];
    /**
     * Get the number of children of the widget.
     *
     * #### Notes
     * This is a read-only property.
     *
     * **See also:** [[children]], [[childAt]]
     */
    childCount: number;
    /**
     * Get the child widget at a specific index.
     *
     * @param index - The index of the child of interest.
     *
     * @returns The child widget at the specified index, or `undefined`
     *  if the index is out of range.
     *
     * **See also:** [[childCount]], [[childIndex]]
     */
    childAt(index: number): Widget;
    /**
     * Get the index of a specific child widget.
     *
     * @param child - The child widget of interest.
     *
     * @returns The index of the specified child widget, or `-1` if
     *   the widget is not a child of this widget.
     *
     * **See also:** [[childCount]], [[childAt]]
     */
    childIndex(child: Widget): number;
    /**
     * Add a child widget to the end of the widget's children.
     *
     * @param child - The child widget to add to this widget.
     *
     * @returns The new index of the child.
     *
     * @throws Will throw an error if a widget is added to itself.
     *
     * #### Notes
     * The child will be automatically removed from its current parent
     * before being added to this widget.
     *
     * **See also:** [[insertChild]], [[moveChild]]
     */
    addChild(child: Widget): number;
    /**
     * Insert a child widget at a specific index.
     *
     * @param index - The target index for the widget. This will be
     *   clamped to the bounds of the children.
     *
     * @param child - The child widget to insert into the widget.
     *
     * @returns The new index of the child.
     *
     * @throws Will throw an error if a widget is inserted into itself.
     *
     * #### Notes
     * The child will be automatically removed from its current parent
     * before being added to this widget.
     *
     * **See also:** [[addChild]], [[moveChild]]
     */
    insertChild(index: number, child: Widget): number;
    /**
     * Move a child widget from one index to another.
     *
     * @param fromIndex - The index of the child of interest.
     *
     * @param toIndex - The target index for the child.
     *
     * @returns 'true' if the child was moved, or `false` if either
     *   of the given indices are out of range.
     *
     * #### Notes
     * This method can be more efficient than re-inserting an existing
     * child, as some widgets may be able to optimize child moves and
     * avoid making unnecessary changes to the DOM.
     *
     * **See also:** [[addChild]], [[insertChild]]
     */
    moveChild(fromIndex: number, toIndex: number): boolean;
    /**
     * Remove the child widget at a specific index.
     *
     * @param index - The index of the child of interest.
     *
     * @returns The removed child widget, or `undefined` if the index
     *   is out of range.
     *
     * **See also:** [[removeChild]], [[clearChildren]]
     */
    removeChildAt(index: number): Widget;
    /**
     * Remove a specific child widget from this widget.
     *
     * @param child - The child widget of interest.
     *
     * @returns The index which the child occupied, or `-1` if the
     *   child is not a child of this widget.
     *
     * **See also:** [[removeChildAt]], [[clearChildren]]
     */
    removeChild(child: Widget): number;
    /**
     * Remove all child widgets from the widget.
     *
     * #### Notes
     * This will continue to remove children until the `childCount`
     * reaches zero. It is therefore possible to enter an infinite
     * loop if a message handler causes a child widget to be added
     * in response to one being removed.
     *
     * **See also:** [[removeChild]], [[removeChildAt]]
     */
    clearChildren(): void;
    /**
     * Dispatch an `'update-request'` message to the widget.
     *
     * @param immediate - Whether to dispatch the message immediately
     *   (`true`) or in the future (`false`). The default is `false`.
     *
     * **See also:** [[MSG_UPDATE_REQUEST]], [[onUpdateRequest]]
     */
    update(immediate?: boolean): void;
    /**
     * Dispatch a `'close-request'` message to the widget.
     *
     * @param immediate - Whether to dispatch the message immediately
     *   (`true`) or in the future (`false`). The default is `false`.
     *
     * **See also:** [[MSG_CLOSE_REQUEST]], [[onCloseRequest]]
     */
    close(immediate?: boolean): void;
    /**
     * Clear the cached box sizing for the widget.
     *
     * #### Notes
     * This method does **not** read from the DOM.
     *
     * This method does **not** write to the DOM.
     *
     * **See also:** [[boxSizing]]
     */
    clearBoxSizing(): void;
    /**
     * Set the size limits for the widget's DOM node.
     *
     * @param minWidth - The min width for the widget, in pixels.
     *
     * @param minHeight - The min height for the widget, in pixels.
     *
     * @param maxWidth - The max width for the widget, in pixels.
     *
     * @param maxHeight - The max height for the widget, in pixels.
     *
     * #### Notes
     * This method does **not** read from the DOM.
     *
     * **See also:** [[sizeLimits]], [[clearSizeLimits]]
     */
    setSizeLimits(minWidth: number, minHeight: number, maxWidth: number, maxHeight: number): void;
    /**
     * Clear the cached size limits for the widget.
     *
     * #### Notes
     * This method does **not** read from the DOM.
     *
     * **See also:** [[sizeLimits]], [[setSizeLimits]]
     */
    clearSizeLimits(): void;
    /**
     * Set the offset geometry for the widget.
     *
     * @param left - The offset left edge of the widget, in pixels.
     *
     * @param top - The offset top edge of the widget, in pixels.
     *
     * @param width - The offset width of the widget, in pixels.
     *
     * @param height - The offset height of the widget, in pixels.
     *
     * #### Notes
     * This method is only useful when using absolute positioning to set
     * the layout geometry of the widget. It will update the inline style
     * of the widget with the specified values. If the width or height is
     * different from the previous value, a [[ResizeMessage]] will be sent
     * to the widget.
     *
     * This method does **not** take into account the size limits of the
     * widget. It is assumed that the specified width and height do not
     * violate the size constraints of the widget.
     *
     * This method does **not** read any data from the DOM.
     *
     * Code which uses this method to layout a widget is responsible for
     * calling [[clearOffsetGeometry]] when it is finished managing the
     * widget.
     *
     * **See also:** [[offsetRect]], [[clearOffsetGeometry]]
     */
    setOffsetGeometry(left: number, top: number, width: number, height: number): void;
    /**
     * Clear the offset geometry for the widget.
     *
     * #### Notes
     * This method is only useful when using absolute positioning to set
     * the layout geometry of the widget. It will reset the inline style
     * of the widget and clear the stored offset geometry values.
     *
     * This method will **not** dispatch a [[ResizeMessage]].
     *
     * This method does **not** read any data from the DOM.
     *
     * This method should be called by the widget's layout manager when
     * it no longer manages the widget. It allows the widget to be added
     * to another layout panel without conflict.
     *
     * **See also:** [[offsetRect]], [[setOffsetGeometry]]
     */
    clearOffsetGeometry(): void;
    /**
     * Process a message sent to the widget.
     *
     * @param msg - The message sent to the widget.
     *
     * #### Notes
     * Subclasses may reimplement this method as needed.
     */
    processMessage(msg: Message): void;
    /**
     * Compress a message posted to the widget.
     *
     * @param msg - The message posted to the widget.
     *
     * @param pending - The queue of pending messages for the widget.
     *
     * @returns `true` if the message was compressed and should be
     *   dropped, or `false` if the message should be enqueued for
     *   delivery as normal.
     *
     * #### Notes
     * The default implementation compresses the following messages:
     * `'update-request'`, `'layout-request'`, and `'close-request'`.
     *
     * Subclasses may reimplement this method as needed.
     */
    compressMessage(msg: Message, pending: Queue<Message>): boolean;
    /**
     * A message handler invoked on a `'child-added'` message.
     *
     * #### Notes
     * The default implementation adds the child node to the widget
     * node at the proper location and dispatches an `'after-attach'`
     * message if appropriate.
     *
     * Subclasses may reimplement this method to control how the child
     * node is added, but they must dispatch an `'after-attach'` message
     * if appropriate.
     */
    protected onChildAdded(msg: ChildMessage): void;
    /**
     * A message handler invoked on a `'child-removed'` message.
     *
     * #### Notes
     * The default implementation removes the child node from the widget
     * node and dispatches a `'before-detach'` message if appropriate.
     *
     * Subclasses may reimplement this method to control how the child
     * node is removed, but they must  dispatch a `'before-detach'`
     * message if appropriate.
     */
    protected onChildRemoved(msg: ChildMessage): void;
    /**
     * A message handler invoked on a `'child-moved'` message.
     *
     * #### Notes
     * The default implementation moves the child node to the proper
     * location in the widget node and dispatches a `'before-detach'`
     * and `'after-attach'` message if appropriate.
     *
     * Subclasses may reimplement this method to control how the child
     * node is moved, but they must dispatch a `'before-detach'` and
     * `'after-attach'` message if appropriate.
     */
    protected onChildMoved(msg: ChildMessage): void;
    /**
     * A message handler invoked on a `'resize'` message.
     *
     * #### Notes
     * The default implementation of this handler sends an [[UnknownSize]]
     * resize message to each child. This ensures that the resize messages
     * propagate through all widgets in the hierarchy.
     *
     * Subclasses may reimplement this method as needed, but they must
     * dispatch `'resize'` messages to their children as appropriate.
     */
    protected onResize(msg: ResizeMessage): void;
    /**
     * A message handler invoked on an `'update-request'` message.
     *
     * #### Notes
     * The default implementation of this handler sends an [[UnknownSize]]
     * resize message to each child. This ensures that the resize messages
     * propagate through all widgets in the hierarchy.
     *
     * Subclass may reimplement this method as needed, but they should
     * dispatch `'resize'` messages to their children as appropriate.
     *
     * **See also:** [[update]], [[MSG_UPDATE_REQUEST]]
     */
    protected onUpdateRequest(msg: Message): void;
    /**
     * A message handler invoked on a `'close-request'` message.
     *
     * #### Notes
     * The default implementation of this handler will unparent or detach
     * the widget as appropriate. Subclasses may reimplement this handler
     * for custom close behavior.
     *
     * **See also:** [[close]], [[MSG_CLOSE_REQUEST]]
     */
    protected onCloseRequest(msg: Message): void;
    /**
     * A message handler invoked on a `'layout-request'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MSG_LAYOUT_REQUEST]]
     */
    protected onLayoutRequest(msg: Message): void;
    /**
     * A message handler invoked on an `'after-show'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MSG_AFTER_SHOW]]
     */
    protected onAfterShow(msg: Message): void;
    /**
     * A message handler invoked on a `'before-hide'` message.
     *
     * The default implementation of this handler is a no-op.
     *
     * **See also:** [[MSG_BEFORE_HIDE]]
     */
    protected onBeforeHide(msg: Message): void;
    /**
     * A message handler invoked on an `'after-attach'` message.
     *
     * **See also:** [[MSG_AFTER_ATTACH]]
     */
    protected onAfterAttach(msg: Message): void;
    /**
     * A message handler invoked on a `'before-detach'` message.
     *
     * **See also:** [[MSG_BEFORE_DETACH]]
     */
    protected onBeforeDetach(msg: Message): void;
    /**
     * A message handler invoked on a `'child-shown'` message.
     *
     * The default implementation of this handler is a no-op.
     */
    protected onChildShown(msg: ChildMessage): void;
    /**
     * A message handler invoked on a `'child-hidden'` message.
     *
     * The default implementation of this handler is a no-op.
     */
    protected onChildHidden(msg: ChildMessage): void;
    private _flags;
    private _parent;
    private _children;
    private _box;
    private _rect;
    private _limits;
}
/**
 * Attach a widget to a host DOM node.
 *
 * @param widget - The widget to attach to the DOM.
 *
 * @param host - The node to use as the widget's host.
 *
 * @throws Will throw an error if the widget is not a root widget,
 *   if the widget is already attached to the DOM, or if the host
 *   is not attached to the DOM.
 *
 * #### Notes
 * This function ensures that an `'after-attach'` message is dispatched
 * to the hierarchy. It should be used in lieu of manual DOM attachment.
 */
export declare function attachWidget(widget: Widget, host: HTMLElement): void;
/**
 * Detach a widget from its host DOM node.
 *
 * @param widget - The widget to detach from the DOM.
 *
 * @throws Will throw an error if the widget is not a root widget,
 *   or if the widget is not attached to the DOM.
 *
 * #### Notes
 * This function ensures that a `'before-detach'` message is dispatched
 * to the hierarchy. It should be used in lieu of manual DOM detachment.
 */
export declare function detachWidget(widget: Widget): void;
/**
 * A message class for child-related messages.
 */
export declare class ChildMessage extends Message {
    /**
     * Construct a new child message.
     *
     * @param type - The message type.
     *
     * @param child - The child widget for the message.
     *
     * @param previousIndex - The previous index of the child, if known.
     *   The default index is `-1` and indicates an unknown index.
     *
     * @param currentIndex - The current index of the child, if known.
     *   The default index is `-1` and indicates an unknown index.
     */
    constructor(type: string, child: Widget, previousIndex?: number, currentIndex?: number);
    /**
     * The child widget for the message.
     *
     * #### Notes
     * This is a read-only property.
     */
    child: Widget;
    /**
     * The current index of the child.
     *
     * #### Notes
     * This will be `-1` if the current index is unknown.
     *
     * This is a read-only property.
     */
    currentIndex: number;
    /**
     * The previous index of the child.
     *
     * #### Notes
     * This will be `-1` if the previous index is unknown.
     *
     * This is a read-only property.
     */
    previousIndex: number;
    private _child;
    private _currentIndex;
    private _previousIndex;
}
/**
 * A message class for 'resize' messages.
 */
export declare class ResizeMessage extends Message {
    /**
     * A singleton 'resize' message with an unknown size.
     */
    static UnknownSize: ResizeMessage;
    /**
     * Construct a new resize message.
     *
     * @param width - The **offset width** of the widget, or `-1` if
     *   the width is not known.
     *
     * @param height - The **offset height** of the widget, or `-1` if
     *   the height is not known.
     */
    constructor(width: number, height: number);
    /**
     * The offset width of the widget.
     *
     * #### Notes
     * This will be `-1` if the width is unknown.
     *
     * This is a read-only property.
     */
    width: number;
    /**
     * The offset height of the widget.
     *
     * #### Notes
     * This will be `-1` if the height is unknown.
     *
     * This is a read-only property.
     */
    height: number;
    private _width;
    private _height;
}
/**
 * An object which stores offset geometry information.
 */
export interface IOffsetRect {
    /**
     * The offset top edge, in pixels.
     */
    top: number;
    /**
     * The offset left edge, in pixels.
     */
    left: number;
    /**
     * The offset width, in pixels.
     */
    width: number;
    /**
     * The offset height, in pixels.
     */
    height: number;
}

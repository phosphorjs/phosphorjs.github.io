import { Message } from 'phosphor-messaging';
import { Property } from 'phosphor-properties';
import { ChildMessage, ResizeMessage, Widget } from 'phosphor-widget';
/**
 * `p-SplitPanel`: the class name added to SplitPanel instances.
 */
export declare const SPLIT_PANEL_CLASS: string;
/**
 * `p-SplitHandle`: the class name for a split handle.
 */
export declare const SPLIT_HANDLE_CLASS: string;
/**
 * `p-SplitHandle-overlay`: the class name for a split handle overlay.
 */
export declare const OVERLAY_CLASS: string;
/**
 * `p-mod-horizontal`: the class name added to horizontal panels and handles.
 */
export declare const HORIZONTAL_CLASS: string;
/**
 * `p-mod-vertical`: the class name added to vertical panels and handles.
 */
export declare const VERTICAL_CLASS: string;
/**
 * `p-mod-hidden`: The class name added to hidden split handles.
 */
export declare const HIDDEN_CLASS: string;
/**
 * The layout orientation of a split panel.
 */
export declare enum Orientation {
    /**
     * Left-to-right horizontal orientation.
     */
    Horizontal = 0,
    /**
     * Top-to-bottom vertical orientation.
     */
    Vertical = 1,
}
/**
 * A widget which arranges its children into resizable sections.
 */
export declare class SplitPanel extends Widget {
    /**
     * A convenience alias of the `Horizontal` [[Orientation]].
     */
    static Horizontal: Orientation;
    /**
     * A convenience alias of the `Vertical` [[Orientation]].
     */
    static Vertical: Orientation;
    /**
     * The property descriptor for the split panel orientation.
     *
     * The controls whether the child widgets are arranged lef-to-right
     * (`Horizontal` the default) or top-to-bottom (`Vertical`).
     *
     * **See also:** [[orientation]]
     */
    static orientationProperty: Property<SplitPanel, Orientation>;
    /**
     * The property descriptor for the split panel handle size.
     *
     * The controls the size of the split handles placed between the
     * children of the panel, in pixels. The default value is `3`.
     *
     * **See also:** [[handleSize]]
     */
    static handleSizeProperty: Property<SplitPanel, number>;
    /**
     * The property descriptor for a widget stretch factor.
     *
     * This is an attached property which controls how much a child widget
     * stretches or shrinks relative to its siblings when the split panel
     * is resized. The default value is `0`.
     *
     * **See also:** [[getStretch]], [[setStretch]]
     */
    static stretchProperty: Property<Widget, number>;
    /**
     * Get the split panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The split panel stretch factor for the widget.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    static getStretch(widget: Widget): number;
    /**
     * Set the split panel stretch factor for the given widget.
     *
     * @param widget - The widget of interest.
     *
     * @param value - The value for the stretch factor.
     *
     * #### Notes
     * This is a pure delegate to the [[stretchProperty]].
     */
    static setStretch(widget: Widget, value: number): void;
    /**
     * Construct a new split panel.
     */
    constructor();
    /**
     * Dispose of the resources held by the panel.
     */
    dispose(): void;
    /**
     * Get the orientation of the split panel.
     *
     * #### Notes
     * This is a pure delegate to the [[orientationProperty]].
     */
    /**
     * Set the orientation of the split panel.
     *
     * #### Notes
     * This is a pure delegate to the [[orientationProperty]].
     */
    orientation: Orientation;
    /**
     * Get the size of the split handles.
     *
     * #### Notes
     * This is a pure delegate to the [[handleSizeProperty]].
     */
    /**
     * Set the the size of the split handles.
     *
     * #### Notes
     * This is a pure delegate to the [[handleSizeProperty]].
     */
    handleSize: number;
    /**
     * Get the normalized sizes of the widgets in the panel.
     *
     * @returns The normalized sizes of the widgets in the panel.
     */
    sizes(): number[];
    /**
     * Set the relative sizes for the child widgets in the panel.
     *
     * @param sizes - The relative sizes for the children in the panel.
     *   These values will be normalized to the available layout space.
     *
     * #### Notes
     * Extra values are ignored, too few will yield an undefined layout.
     */
    setSizes(sizes: number[]): void;
    /**
     * Handle the DOM events for the split panel.
     *
     * @param event - The DOM event sent to the panel.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    handleEvent(event: Event): void;
    /**
     * A message handler invoked on a `'child-added'` message.
     */
    protected onChildAdded(msg: ChildMessage): void;
    /**
     * A message handler invoked on a `'child-removed'` message.
     */
    protected onChildRemoved(msg: ChildMessage): void;
    /**
     * A message handler invoked on a `'child-moved'` message.
     */
    protected onChildMoved(msg: ChildMessage): void;
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    protected onAfterShow(msg: Message): void;
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    protected onAfterAttach(msg: Message): void;
    /**
     * A message handler invoked on a `'before-detach'` message.
     */
    protected onBeforeDetach(msg: Message): void;
    /**
     * A message handler invoked on a `'child-shown'` message.
     */
    protected onChildShown(msg: ChildMessage): void;
    /**
     * A message handler invoked on a `'child-hidden'` message.
     */
    protected onChildHidden(msg: ChildMessage): void;
    /**
     * A message handler invoked on a `'resize'` message.
     */
    protected onResize(msg: ResizeMessage): void;
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    protected onUpdateRequest(msg: Message): void;
    /**
     * A message handler invoked on a `'layout-request'` message.
     */
    protected onLayoutRequest(msg: Message): void;
    /**
     * Update the size constraints of the panel.
     */
    private _setupGeometry();
    /**
     * Layout the children using the given offset width and height.
     */
    private _layoutChildren(offsetWidth, offsetHeight);
    /**
     * Handle the `'mousedown'` event for the split panel.
     */
    private _evtMouseDown(event);
    /**
     * Handle the `'mouseup'` event for the split panel.
     */
    private _evtMouseUp(event);
    /**
     * Handle the `'mousemove'` event for the split panel.
     */
    private _evtMouseMove(event);
    /**
     * Release the mouse grab for the split panel.
     */
    private _releaseMouse();
    /**
     * Move a splitter handle to the specified client position.
     */
    private _moveHandle(index, pos);
    /**
     * Find the index of the split handle which contains the given target.
     */
    private _findHandleIndex(target);
    /**
     * The change handler for the [[orientationProperty]].
     */
    private _onOrientationChanged(old, value);
    /**
     * The handler for the child property changed signal.
     */
    private _onPropertyChanged(sender, args);
    private _fixedSpace;
    private _pendingSizes;
    private _sizers;
    private _pressData;
}

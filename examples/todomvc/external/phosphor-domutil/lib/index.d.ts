import { IDisposable } from 'phosphor-disposable';
/**
 * `p-mod-override-cursor`: the class name added to the document body
 *   during cursor override.
 */
export declare const OVERRIDE_CURSOR_CLASS: string;
/**
 * Override the cursor for the entire document.
 *
 * @param cursor - The string representing the cursor style.
 *
 * @returns A disposable which will clear the override when disposed.
 *
 * #### Notes
 * The most recent call to `overrideCursor` takes precendence. Disposing
 * an old override is a no-op and will not effect the current override.
 *
 * #### Example
 * ```typescript
 * import { overrideCursor } from 'phosphor-domutil';
 *
 * // force the cursor to be 'wait' for the entire document
 * var override = overrideCursor('wait');
 *
 * // clear the override by disposing the return value
 * override.dispose();
 * ```
 */
export declare function overrideCursor(cursor: string): IDisposable;
/**
 * Test whether a client position lies within a node.
 *
 * @param node - The DOM node of interest.
 *
 * @param clientX - The client X coordinate of interest.
 *
 * @param clientY - The client Y coordinate of interest.
 *
 * @returns `true` if the node covers the position, `false` otherwise.
 *
 * #### Example
 * ```typescript
 * import { hitTest } from 'phosphor-domutil';
 *
 * var div = document.createElement('div');
 * div.style.position = 'absolute';
 * div.style.left = '0px';
 * div.style.top = '0px';
 * div.style.width = '100px';
 * div.style.height = '100px';
 * document.body.appendChild(div);
 *
 * hitTest(div, 50, 50);   // true
 * hitTest(div, 150, 150); // false
 * ```
 */
export declare function hitTest(node: HTMLElement, clientX: number, clientY: number): boolean;
/**
 * The box sizing (border and padding) for a a DOM node.
 */
export interface IBoxSizing {
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
     * The sum of horizontal border and padding.
     */
    horizontalSum: number;
    /**
     * The sum of vertical border and padding.
     */
    verticalSum: number;
}
/**
 * Compute the box sizing for a DOM node.
 *
 * @param node - The DOM node for which to compute the box sizing.
 *
 * @returns The box sizing data for the specified DOM node.
 *
 * #### Example
 * ```typescript
 * import { boxSizing } from 'phosphor-domutil';
 *
 * var div = document.createElement('div');
 * div.style.borderTop = 'solid 10px black';
 * document.body.appendChild(div);
 *
 * var sizing = boxSizing(div);
 * sizing.borderTop;    // 10
 * sizing.paddingLeft;  // 0
 * // etc...
 * ```
 */
export declare function boxSizing(node: HTMLElement): IBoxSizing;
/**
 * The size limits for a DOM node.
 */
export interface ISizeLimits {
    /**
     * The minimum width, in pixels.
     */
    minWidth: number;
    /**
     * The minimum height, in pixels.
     */
    minHeight: number;
    /**
     * The maximum width, in pixels.
     */
    maxWidth: number;
    /**
     * The maximum height, in pixels.
     */
    maxHeight: number;
}
/**
 * Compute the size limits for a DOM node.
 *
 * @param node - The node for which to compute the size limits.
 *
 * @returns The size limit data for the specified DOM node.
 *
 * #### Example
 * ```typescript
 * import { sizeLimits } from 'phosphor-domutil';
 *
 * var div = document.createElement('div');
 * div.style.minWidth = '90px';
 * document.body.appendChild(div);
 *
 * var limits = sizeLimits(div);
 * limits.minWidth;   // 90
 * limits.maxHeight;  // Infinity
 * // etc...
 * ```
 */
export declare function sizeLimits(node: HTMLElement): ISizeLimits;

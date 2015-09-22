import { Queue } from 'phosphor-queue';
/**
 * A mesage which can be sent or posted to a message handler.
 *
 * #### Notes
 * This class may be subclassed to create complex message types.
 *
 * **See Also** [[postMessage]] and [[sendMessage]].
 */
export declare class Message {
    /**
     * Construct a new message.
     *
     * @param type - The type of the message. Consumers of a message will
     *   use this value to cast the message to the appropriately derived
     *   message type.
     */
    constructor(type: string);
    /**
     * Get the type of the message.
     */
    type: string;
    private _type;
}
/**
 * An object which handles messages.
 *
 * #### Notes
 * User objects should implement this interface in order to be used
 * as the target handler of sent or posted messages.
 *
 * **See Also** [[postMessage]] and [[sendMessage]].
 */
export interface IMessageHandler {
    /**
     * Process a message dispatched to the handler.
     *
     * @param msg - The message which was dispatched to the handler.
     */
    processMessage(msg: Message): void;
    /**
     * Compress a message posted to the handler.
     *
     * @param msg - The message which was posted to the handler.
     *
     * @param queue - The queue of pending messages for the handler.
     *
     * @returns `true` if the message was compressed and should be
     *   dropped, or `false` if the message should be enqueued for
     *   delivery as normal.
     *
     * #### Notes
     * This method allows the handler to merge a posted message with a
     * message which is already pending. This is usefull for 'collapsing'
     * messages where the resulting action should only occur once per
     * event look cycle.
     */
    compressMessage?(msg: Message, pending: Queue<Message>): boolean;
}
/**
 * An object which filters messages dispatched to a message handler.
 *
 * #### Notes
 * User objects should implement this interface in order to be used
 * as a message filter for a message handler.
 *
 * **See Also** [[installMessageFilter]].
 */
export interface IMessageFilter {
    /**
     * Filter a message sent to a message handler.
     *
     * @param handler - The target handler of the message.
     *
     * @param msg - The message dispatched to the handler.
     *
     * @returns `true` if the message should be filtered, of `false`
     *   if the message should be dispatched to the handler as normal.
     */
    filterMessage(handler: IMessageHandler, msg: Message): boolean;
}
/**
 * Send a message to the message handler to process immediately.
 *
 * @param handler - The handler which should process the message.
 *
 * @param msg - The message to send to the handler.
 *
 * #### Notes
 * Unlike [[postMessage]], [[sendMessage]] delivers the message to
 * the handler immediately. The handler will not have the opportunity
 * to compress the message, however the message will still be sent
 * through any installed message filters.
 *
 * **See Also** [[postMessage]].
 */
export declare function sendMessage(handler: IMessageHandler, msg: Message): void;
/**
 * Post a message to the message handler to process in the future.
 *
 * @param handler - The handler which should process the message.
 *
 * @param msg - The message to post to the handler.
 *
 * #### Notes
 * Unlike [[sendMessage]], [[postMessage]] will schedule the deliver of
 * the message for the next cycle of the event loop. The handler will
 * have the opportunity to compress the message in order to optimize
 * its handling of similar messages. The message will be sent through
 * any installed message filters before being delivered to the handler.
 *
 * **See Also** [[sendMessage]].
 */
export declare function postMessage(handler: IMessageHandler, msg: Message): void;
/**
 * Test whether a message handler has posted messages pending delivery.
 *
 * @param handler - The message handler of interest.
 *
 * @returns `true` if the handler has pending posted messages, `false`
 *   otherwise.
 *
 * **See Also** [[sendPendingMessage]].
 */
export declare function hasPendingMessages(handler: IMessageHandler): boolean;
/**
 * Send the first pending posted message to the message handler.
 *
 * @param handler - The message handler of interest.
 *
 * #### Notes
 * If the handler has no pending messages, this is a no-op.
 *
 * **See Also** [[hasPendingMessages]].
 */
export declare function sendPendingMessage(handler: IMessageHandler): void;
/**
 * Install a message filter for a message handler.
 *
 * A message filter is invoked before the message handler processes a
 * message. If the filter returns `true` from its [[filterMessage]] method,
 * no other filters will be invoked, and the message will not be delivered.
 *
 * The most recently installed message filter is executed first.
 *
 * @param handler - The handler whose messages should be filtered.
 *
 * @param filter - The filter to install for the handler.
 *
 * #### Notes
 * It is possible to install the same filter multiple times. If the
 * filter should be unique, call [[removeMessageFilter]] first.
 *
 * **See Also** [[removeMessageFilter]].
 */
export declare function installMessageFilter(handler: IMessageHandler, filter: IMessageFilter): void;
/**
 * Remove a previously installed message filter for a message handler.
 *
 * @param handler - The handler for which the filter is installed.
 *
 * @param filter - The filter to remove.
 *
 * #### Notes
 * This will remove **all** occurrences of the filter. If the filter is
 * not installed, this is a no-op.
 *
 * It is safe to call this function while the filter is executing.
 *
 * **See Also** [[installMessageFilter]].
 */
export declare function removeMessageFilter(handler: IMessageHandler, filter: IMessageFilter): void;
/**
 * Clear all message data associated with the message handler.
 *
 * @param handler - The message handler for which to clear the data.
 *
 * #### Notes
 * This will remove all pending messages and filters for the handler.
 */
export declare function clearMessageData(handler: IMessageHandler): void;

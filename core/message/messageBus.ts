import {IMessageHandler} from "./IMessageHandler.js";
import {MessageSubscriptionNode} from "./messageSubscriptionNode.js";
import {Message, MessagePriority} from "./message.js";

export class MessageBus {

    public static subscriptions: { [code: string]: IMessageHandler[] } = {};

    private static normalQueueMessagePerUpdate: number = 10;

    private static normalMessageQueue: MessageSubscriptionNode[] = [];

    private constructor() {
    }

    public static addSubscription(code: string, handler: IMessageHandler): void {
        if (MessageBus.subscriptions[code] === undefined) {
            MessageBus.subscriptions[code] = [];
        }

        if (MessageBus.subscriptions[code].indexOf(handler) !== -1) {
            console.warn("Attempting to add a duplicate handler to code : " + code + "subscription not added");
        } else {
            MessageBus.subscriptions[code].push(handler);
        }

    }

    public static removeSubscription(code: string, handler: IMessageHandler): void {
        if (MessageBus.subscriptions[code] === undefined) {
            console.warn("Cannot unsubscribe handler from code : " + code + "Because that code is not subscribed to");
            return;
        }
        let nodeIndex = MessageBus.subscriptions[code].indexOf(handler);
        if (nodeIndex !== -1) {
            MessageBus.subscriptions[code].splice(nodeIndex, 1);
        }
    }

    public static post(message: Message): void {
        console.log("Message Posted : ", message);
        let handlers = MessageBus.subscriptions[message.code];
        if (handlers === undefined) {
            return
        }
        for (let handler of handlers) {
            if (message.priority === MessagePriority.HIGH) {
                handler.onMessage(message);
            } else {
                MessageBus.normalMessageQueue.push(new MessageSubscriptionNode(message, handler));
            }
        }
    }

    public static update(time: number): void {
        if (MessageBus.normalMessageQueue.length === 0) {
            return;
        }
        let messageLimit = Math.min(MessageBus.normalQueueMessagePerUpdate, MessageBus.normalMessageQueue.length);

        for (let i = 0; i < messageLimit; i++) {
            let node = MessageBus.normalMessageQueue.pop();
            if (node !== undefined) {
                node.handler.onMessage(node.message);
            } else {
                console.warn("popped an undefined node from the message queue")
            }
        }
    }

}
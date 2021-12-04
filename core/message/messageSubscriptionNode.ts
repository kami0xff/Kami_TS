import {Message} from "./message.js";
import {IMessageHandler} from "./IMessageHandler.js";

export class MessageSubscriptionNode {
    public message: Message;
    public handler: IMessageHandler;

    public constructor(message: Message, handler:IMessageHandler) {
        this.message = message;
        this.handler = handler;
    }
}
import {MessageBus} from "./messageBus.js";
import {IMessageHandler} from "./IMessageHandler.js";

export enum MessagePriority {
    NORMAL,
    HIGH
}

export class Message{
    public code : string;
    public context : any;
    public sender : any;
    public priority: MessagePriority;

    public constructor(code: string, sender:any, context?: any, priority: MessagePriority = MessagePriority.NORMAL) {
        this.code = code;
        this.sender = sender;
        this.context = context;
        this.priority = priority;
    }


    //these 4 functions are strange they don't even make use of the properties of the class
    public static send(code:string, sender:any, context:any): void{
        MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL)); //tight coupling of the Message and the
        //MessageBus class occurs here well these just look like convienience functions it looks like we could do without them
    }
    public static sendPriority(code:string, sender:any, context:any): void{
        MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH));
    }

    public static subscribe(code:string, handler:IMessageHandler):void{
        MessageBus.addSubscription(code,handler);
    }

    public static unsubscribe(code:string, handler:IMessageHandler):void{
        MessageBus.removeSubscription(code,handler);
    }
}
import {IComponentBuilder} from "./IComponentBuilder.js";
import {IComponent} from "./IComponent.js";

export class ComponentManager {
    private static registeredBuilders: { [type: string]: IComponentBuilder } = {}

    public static registerBuilder(builder: IComponentBuilder): void {
        ComponentManager.registeredBuilders[builder.type] = builder;
    }

    public static extractComponent(jsom:any):IComponent{
        if(json.type !== undefined){

        }
    }
}
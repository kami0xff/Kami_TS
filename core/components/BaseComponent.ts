import {SimObject} from "../world/SimObject.js";
import {Shader} from "../gl/shader.js";
import {IComponent} from "./IComponent.js";
import {IComponentData} from "./IComponentData";

export abstract class BaseComponent implements IComponent{
    protected owner: SimObject | undefined;
    protected data: IComponentData;

    public name: string;

    public constructor(data:IComponentData) {
        this.data = data;
        this.data = data.name
    }

    public getOwner(): SimObject | undefined {
        return this.owner;
    }

    public setOwner(owner: SimObject): void {
        this.owner = owner;
    }

    public load() {

    }

    public update(time: number): void {

    }

    public render(shader: Shader): void {

    }
}

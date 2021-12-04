import {SimObject} from "./SimObject.js";
import {Shader} from "../gl/shader.js";

export class Scene {
    private root: SimObject;

    public constructor() {
        this.root = new SimObject(0, "__ROOT__", this);
    }

    public getRoot(): SimObject {
        return this.root;
    }

    public getIsLoaded(): boolean {
        return this.root.getIsLoaded();
    }

    public addObject(object: SimObject): void {
        this.root.addChild(object);
    }

    public getObjectByName(name: string): SimObject | undefined{
        return this.root.getObjectByName(name);
    }

    public load(): void {
        this.root.load();
    }

    public update(time: number): void {
        this.root.update(time)
    }

    public render(shader: Shader): void {
        this.root.render(shader);
    }
}
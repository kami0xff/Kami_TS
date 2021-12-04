import {Transform} from "../math/Transform.js";
import {Matrix4x4} from "../math/matrix4x4.js";
import {Shader} from "../gl/shader.js";
import {Scene} from "./Scene.js";
import {BaseComponent} from "../components/BaseComponent.js";

export class SimObject {
    private id: number;
    private children: SimObject[] = [];
    private parent: SimObject | undefined;
    private isLoaded: boolean = false;
    private scene: Scene | undefined;
    private components: BaseComponent[] = []

    private localMatrix: Matrix4x4 = Matrix4x4.identity();
    private worldMatrix: Matrix4x4 = Matrix4x4.identity();

    public name: string;
    public transform: Transform = new Transform();

    public constructor(id: number, name: string, scene?: Scene) {
        this.id = id;
        this.name = name;
        this.scene = scene;
    }

    public getId(): number {
        return this.id;
    }

    public getParent(): SimObject | undefined {
        return this.parent;
    }

    public getWorldMatrix() {
        return this.worldMatrix;
    }

    public getIsLoaded(): boolean {
        return this.isLoaded;
    }

    public addChild(child: SimObject): void {
        child.parent = this;
        this.children.push(child);
        child.onAdded(this.scene!);
    }

    public removeChild(child: SimObject) {
        let index = this.children.indexOf(child);
        if (index !== -1) {
            child.parent = undefined;
            this.children.splice(index, 1);
        }
    }

    public getObjectByName(name: string): SimObject | undefined {
        if (this.name === name) {
            return this;
        }
        for (let child of this.children) {
            let result = child.getObjectByName(name);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }

    public addComponent(component: BaseComponent): void {
        component.setOwner(this);
        this.components.push(component);
    }

    public load(): void {
        this.isLoaded = true;

        for (let component of this.components) {
            component.load();
        }
        for (let children of this.children) {
            children.load();
        }
    }

    public update(time: number): void {

        this.localMatrix = this.transform.getTransformationMatrix();
        this.updateWorldMatrix((this.parent !== undefined) ? this.parent.worldMatrix : undefined)

        for (let component of this.components) {
            component.update(time);
        }
        for (let children of this.children) {
            children.update(time);
        }
    }

    public render(shader: Shader): void {
        for (let component of this.components) {
            component.render(shader);
        }
        for (let children of this.children) {
            children.render(shader);
        }
    }

    protected onAdded(scene: Scene): void {
        this.scene = scene;
    }

    private updateWorldMatrix(parentWorldMatrix: Matrix4x4 | undefined):void{
        if (parentWorldMatrix !== undefined){
            this.worldMatrix = Matrix4x4.multiply(parentWorldMatrix, this.localMatrix);
        }else{
            this.worldMatrix.copyFrom(this.localMatrix);
        }
    }
}
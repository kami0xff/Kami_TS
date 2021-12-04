import {Scene} from "./Scene.js";
import {Shader} from "../gl/shader.js";
import {ZoneManager} from "./ZoneManager";
import {SimObject} from "./SimObject.js";

export enum ZoneState {
    UNINITIALIZED,
    LOADING,
    UPDATING
}

export class Zone {
    private id: number;
    private name: string;
    private description: string;
    private scene: Scene;
    private state: ZoneState = ZoneState.UNINITIALIZED;
    private globalId: number = -1;

    public constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.scene = new Scene();
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getScene(): Scene | undefined {
        return this.scene;
    }

    public initialize(zoneData: any): void {
        if (zoneData.objects === undefined) {
            throw new Error("Zone initialization error objects not present");
        }
        for (let o in zoneData.objects) {
            let object = zoneData.objects[o];
            this.loadSimObject(object, this.scene.getRoot());
        }
    }

    public load(): void {
        this.state = ZoneState.LOADING;
        this.scene.load();
        this.state = ZoneState.UPDATING;
    }

    public unload(): void {

    }

    public update(time: number): void {
        if (this.state === ZoneState.UPDATING) {
            this.scene.update(time);
        }
    }

    public render(shader: Shader): void {
        if (this.state === ZoneState.UPDATING) {
            this.scene.render(shader);
        }
    }

    public onActivated(): void {

    }

    public onDeactivated(): void {

    }


    private loadSimObject(dataSection: any, parent: SimObject): void {
        let name: string;
        if (dataSection.name !== undefined) {
            name = String(dataSection.name);
        }

        this.globalId++;
        // @ts-ignore
        let simObject = new SimObject(this.globalId,name, this.scene);

        if(dataSection.transform !== undefined) {
            simObject.transform.setFromJson(dataSection.transform);
        }

        if (dataSection.children !== undefined) {
            for (let o in dataSection.children) {
                let obj = dataSection.children[o];
                this.loadSimObject(obj, simObject);
            }
        }

        if(parent !== undefined){
            parent.addChild(simObject);
        }
    }

}
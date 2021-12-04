import {Zone} from "./Zone.js";
import {Shader} from "../gl/shader.js";
import {TestZone} from "./TestZone.js";
import {AssetManager, MESSAGE_ASSET_LOADER_ASSET_LOADED} from "../assets/assetManager.js";
import {JsonAsset} from "../assets/JsonAssetLoader.js";
import {IMessageHandler} from "../message/IMessageHandler.js";
import {Message} from "../message/message.js";

export class ZoneManager implements IMessageHandler {

    private static globalZoneId = -1;
    // private static zones: { [id: number]: Zone } = {};
    private static registeredZones: { [id: number]: string } = {}; //contains the json files we can request
    private static activeZone: Zone | undefined;
    private static instance: ZoneManager;

    private constructor() {
    }

    public static initialize() {
        ZoneManager.instance = new ZoneManager();
        ZoneManager.registeredZones[0] = "assets/zones/TestZone.json";
    }

    public static changeZone(id: number): void {
        if (ZoneManager.activeZone !== undefined) {
            ZoneManager.activeZone.onDeactivated();
            ZoneManager.activeZone.unload();
        }
        if (ZoneManager.registeredZones[id] !== undefined) {
            if (AssetManager.isAssetLoaded(ZoneManager.registeredZones[id])) {
                let asset = AssetManager.getAsset(ZoneManager.registeredZones[id]);
                //@ts-ignore idk i see that there is a type problem here i am not sure how i would fix that yet tho TODO
                ZoneManager.loadZone(asset);
                ZoneManager.activeZone = undefined;
            }else{
                Message.subscribe(MESSAGE_ASSET_LOADER_ASSET_LOADED + ZoneManager.registeredZones[id], ZoneManager.instance);
                AssetManager.loadAsset(ZoneManager.registeredZones[id]);
            }
        } else {
            throw new Error("Zone id: " + id.toString() + " does not exist");
        }
    }

    public static update(time: number): void {
        if (ZoneManager.activeZone !== undefined) {
            ZoneManager.activeZone.update(time);
        }
    }

    public static render(shader: Shader): void {
        if (ZoneManager.activeZone !== undefined) {
            ZoneManager.activeZone.render(shader);
        }
    }

    private static loadZone(asset: JsonAsset): void {
        let zoneData = asset.data;
        let zoneId:number;
        if(zoneData.id === undefined){
            throw new Error("Zone file format exception: Zone id not present");
        }else{
            zoneId = Number(zoneData.id);
        }

        let zoneName:string;
        if(zoneData.name === undefined){
            throw new Error("Zone file format exception: Zone name not present");
        }else{
            zoneName = String(zoneData.name);
        }

        let zoneDescription:string;
        if(zoneData.description !== undefined){
            zoneDescription = String(zoneData.description);
        }

        // @ts-ignore
        ZoneManager.activeZone = new Zone(zoneId, zoneName, zoneDescription);
        ZoneManager.activeZone.initialize(zoneData);
        ZoneManager.activeZone.onActivated();
        ZoneManager.activeZone.load();
    }

    public onMessage(message: Message): void {

        if(message.code.indexOf(MESSAGE_ASSET_LOADER_ASSET_LOADED)){
            let assset = message.context as JsonAsset;
            ZoneManager.loadZone(assset);
        }
    }

}
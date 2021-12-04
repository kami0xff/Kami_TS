import {IAssetLoader} from "./IAssetLoader.js";
import {IAsset} from "./IAssets.js";
import {Message} from "../message/message.js";
import {ImageAssetLoader} from "./imageAssetLoader.js"
import {JsonAsset, JsonAssetLoader} from "./JsonAssetLoader.js";

export const MESSAGE_ASSET_LOADER_ASSET_LOADED = "MESSAGE_ASSET_LOADER_ASSET_LOADED::";

export class AssetManager{

    private static loaders: IAssetLoader[] = [];
    private static loadedAssets: {[name:string]:IAsset} = {};

    private constructor() {
    }

    public static initialize(): void{
        AssetManager.loaders.push(new ImageAssetLoader());
        AssetManager.loaders.push(new JsonAssetLoader())
    }

    public static registerLoader(loader:IAssetLoader):void{
        AssetManager.loaders.push(loader);
    }

    public static onAssetLoaded(asset:IAsset):void{
        AssetManager.loadedAssets[asset.name] = asset;
        Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset)

    }

    public static loadAsset(assetName:string):void{
        let extension = assetName.split(".").pop()!.toLowerCase();
        for (let loader of AssetManager.loaders){
            if(loader.supportedExtensions.indexOf(extension) !== -1){
                loader.loadAsset(assetName);
                return;
            }
        }

        console.warn("Unable to load asset with extension " + extension + " because there is no loader associated with it");
    }

    public static isAssetLoaded(assetName:string):boolean{
        return AssetManager.loadedAssets[assetName] !== undefined;
    }

    public static getAsset(assetName:string): IAsset | undefined {
        if(AssetManager.loadedAssets[assetName] !== undefined){
            return AssetManager.loadedAssets[assetName];
        }else {
            AssetManager.loadAsset(assetName);
        }
        return undefined;
    }
}
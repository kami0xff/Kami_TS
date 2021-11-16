import {IAssetLoader} from "./IAssetLoader.js";
import {IAsset} from "./IAssets.js";

export class AssetManager{

    private static loaders: IAssetLoader[] = [];
    private static loadedAssets: {[name:string]:IAsset} = {};

    private constructor() {
    }

    public static initialize(): void{

    }

    public static registerLoader(loader:IAssetLoader):void{
        AssetManager.loaders.push(loader);
    }

    public static loadAsset(assetName:string):void{

    }

    public static isAssetLoaded(assetName:string):boolean{
        return AssetManager.loadedAssets[assetName] !== undefined;
    }
}
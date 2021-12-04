import {IAsset} from "./IAssets.js";

export interface IAssetLoader{
    readonly supportedExtensions: string[];//file extensions supported
    loadAsset(assetName:string): void;
}
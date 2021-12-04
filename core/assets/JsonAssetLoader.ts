import {IAssetLoader} from "./IAssetLoader.js";
import {IAsset} from "./IAssets.js";
import {AssetManager} from "./assetManager.js";

export class JsonAsset implements IAsset {
    public readonly name: string;
    public readonly data: any;


    public constructor(name: string, data: any) {
        this.name = name;
        this.data = data;
    }
}


export class JsonAssetLoader implements IAssetLoader {

    public supportedExtensions: string[] = ["json"];

    public getSupportedExtensions(): string[] {
        return this.supportedExtensions;
    }

    loadAsset(assetName: string): void {

        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open("GET", assetName);
        request.addEventListener("load", this.onJsonLoaded.bind(this, assetName, request));
        request.send();
    }

    private onJsonLoaded(assetName: string, request: XMLHttpRequest, event: ProgressEvent): void {
        console.log("OnJsonLoaded assetName/image", assetName, request);

        if(request.readyState === request.DONE){
            let json = JSON.parse(request.responseText);
            let asset = new JsonAsset(assetName, json);
            AssetManager.onAssetLoaded(asset);
        }
    }

}
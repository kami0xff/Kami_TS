import {IAssetLoader} from "./IAssetLoader.js";
import {IAsset} from "./IAssets.js";
import {AssetManager} from "./assetManager.js";

export class ImageAsset implements IAsset {
    public readonly name: string;
    public readonly data: HTMLImageElement;

    public constructor(name:string, data:HTMLImageElement) {
        this.name = name;
        this.data = data;
    }

    public getWidth():number{
        return this.data.width;
    }

    public getHeight():number {
        return this.data.height;
    }
}


export class ImageAssetLoader implements IAssetLoader{

    public supportedExtensions: string[] = ["png", "gif", "jpg"];

    public getSupportedExtensions(): string[]{
        return this.supportedExtensions;
    }

    loadAsset(assetName: string): void {
        let image: HTMLImageElement = new Image();
        image.onload = this.onImageLoaded.bind(this,assetName, image);
        image.src = assetName;
    }

    private onImageLoaded(assetName:string, image:HTMLImageElement):void{
        console.log("OnImageLoaded assetName/image", assetName, image);
        let asset = new ImageAsset(assetName, image);
        AssetManager.onAssetLoaded(asset);
    }

}
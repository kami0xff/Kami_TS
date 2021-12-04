import {gl} from "../gl/gl.js";
import {IMessageHandler} from "../message/IMessageHandler.js";
import {Message} from "../message/message.js";
import {AssetManager, MESSAGE_ASSET_LOADER_ASSET_LOADED} from "../assets/assetManager.js";
import {ImageAsset} from "../assets/imageAssetLoader.js";

const LEVEL: number = 0
const BORDER: number = 0;
const TEMP_IMAGE_DATA: Uint8Array = new Uint8Array([255, 255, 255, 255]);


export class Texture implements IMessageHandler {
    private name: string;
    private handle: WebGLTexture;
    private isLoaded: boolean = false;
    private width: number;
    private height: number;

    public constructor(name: string, width: number = 1, height: number = 1) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.handle = gl.createTexture()!;

        Message.subscribe(MESSAGE_ASSET_LOADER_ASSET_LOADED + this.name, this);
        this.bind();

        gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA,1,1,BORDER, gl.RGBA, gl.UNSIGNED_BYTE, TEMP_IMAGE_DATA);

        let asset = AssetManager.getAsset(this.name) as ImageAsset;
        if (asset !== undefined) {
            this.loadTextureFromAsset(asset);
        }

    }


    public bind(): void {
        gl.bindTexture(gl.TEXTURE_2D, this.handle);
    }

    public unbind(): void {
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    public getName(): string {
        return this.name;
    }

    public getIsLoaded(): boolean {
        return this.isLoaded;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height

    }

    public destroy(): void {
        gl.deleteTexture(this.handle);
    }

    public activateAndBind(textureUnit: number = 0): void {
        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        this.bind();
    }

    public onMessage(message: Message): void {
        if (message.code === MESSAGE_ASSET_LOADER_ASSET_LOADED + this.name) {
            this.loadTextureFromAsset(message.context as ImageAsset);
        }
    }

    private loadTextureFromAsset(asset: ImageAsset): void {
        this.width = asset.getWidth();
        this.height = asset.getHeight();
        this.bind();
        gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, asset.data);

        if(this.isPoweof2()){
            gl.generateMipmap(gl.TEXTURE_2D);
        }else{
            //do not generate a mipmap and clamp wraping to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }

        this.isLoaded = true;


    }

    private isPoweof2():boolean{
        return (this.isValuePowerof2(this.width) && this.isValuePowerof2(this.height));
    }

    private isValuePowerof2(value:number):boolean{
        return (value &(value-1)) == 0;
    }
}
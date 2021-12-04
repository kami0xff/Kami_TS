import {Texture} from "./Texture.js";

class TextureReferenceNode{
    public texture: Texture;
    public referenceCount: number = 1;

    public constructor(texture:Texture) {
        this.texture = texture;
    }



}

export class TextureManager{

    private static textures: {[name:string]:TextureReferenceNode} = {};

    private constructor() {
    }

    public static getTexture(textureName:string):Texture{
        if(TextureManager.textures[textureName] === undefined){
            let texture = new Texture( textureName);
            TextureManager.textures[textureName] = new TextureReferenceNode(texture);
        }
        else{
            TextureManager.textures[textureName].referenceCount++;
        }
        return TextureManager.textures[textureName].texture;
    }

    public static releaseTexture(textureName:string):void{
        if(TextureManager.textures[textureName] === undefined){
            console.warn("a textureName " + textureName + "does not exist and therefore cannot be released");
        }
        else{
            TextureManager.textures[textureName].referenceCount--;
            if(TextureManager.textures[textureName].referenceCount < 1){
                TextureManager.textures[textureName].texture.destroy();
                // @ts-ignore yeah i don't know why it complains about me adding undefined to it here
                TextureManager.textures[textureName] = undefined;
                delete TextureManager.textures[textureName];

            }
        }
    }


}
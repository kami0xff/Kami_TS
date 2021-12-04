import {Texture} from "./Texture.js";
import {Color} from "./Color.js";
import {TextureManager} from "./textureManager.js";

export class Material {
    private name: string;
    private diffuseTextureName: string;
    private diffuseTexture: Texture | undefined;
    private tint: Color;

    public constructor(name: string, diffuseTextureName: string, tint: Color) {
        this.name = name;
        this.diffuseTextureName = diffuseTextureName;
        this.tint = tint;
        if (this.diffuseTextureName !== undefined) {
            this.diffuseTexture = TextureManager.getTexture(diffuseTextureName);
        }
    }

    public getName(): string {
        return this.name;
    }

    public getDiffuseTextureName(): string {
        return this.diffuseTextureName;
    }

    public setDiffuseTextureName(value: string) {
        if (this.diffuseTextureName !== undefined) {
            TextureManager.releaseTexture(this.diffuseTextureName);
        }
        this.diffuseTextureName = value;
        if (this.diffuseTextureName !== undefined) {
            this.diffuseTexture = TextureManager.getTexture(this.diffuseTextureName);
        }
    }

    public getDiffuseTexture(): Texture | undefined {
        if (this.diffuseTexture !== undefined) {
            return this.diffuseTexture;
        } else {
            console.warn("trying to get undefined texture");
            return undefined;
        }
    }

    public getTint(): Color {
        return this.tint;
    }

    public destroy(): void {
        TextureManager.releaseTexture(this.diffuseTextureName);
        this.diffuseTexture = undefined;
    }

}
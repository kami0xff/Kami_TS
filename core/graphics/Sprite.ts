import {AttributeInfo, GlBuffer} from "../gl/GlBuffer.js";
import {Vector3} from "../math/vector3.js";
import {Texture} from "./Texture.js";
import {TextureManager} from "./textureManager.js";
import {Shader} from "../gl/shader.js";
import {gl} from "../gl/gl.js";
import {Matrix4x4} from "../math/matrix4x4.js";
import {Material} from "./Material.js";
import {MaterialManager} from "./MaterialManager.js";

export class Sprite {
    private name: string;
    private width: number;
    private height: number;
    private buffer: GlBuffer | undefined;

    private material: Material | undefined;
    private materialName: string


    public constructor(name: string, materialName: string, width: number = 100, height: number = 100) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.materialName = materialName;
        this.material = MaterialManager.getMaterial(materialName);
    }

    public getName(): string {
        return this.name;
    }

    public destroy(): void {
        this.buffer?.destroy();
        MaterialManager.releaseMaterial(this.materialName);
        this.material = undefined;
        // @ts-ignore :(
        this.materialName = undefined;
    }


    public load(): void {
        this.buffer = new GlBuffer(5);
        let positionAttribute = new AttributeInfo();
        positionAttribute.location = 0;
        positionAttribute.offset = 0;
        positionAttribute.size = 3;
        this.buffer.addAttributeLocation(positionAttribute)

        let texCoordAttribute = new AttributeInfo();
        texCoordAttribute.location = 1;
        texCoordAttribute.offset = 3;
        texCoordAttribute.size = 2;
        this.buffer.addAttributeLocation(texCoordAttribute);


        let vertices: number[] = [
            //x y z first triangle of the quand
            //we add u and v to each line for the textures
            0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, this.height, 0.0, 0.0, 1.0,
            this.width, this.height, 0.0, 1.0, 1.0,


            //second triangle of the quad
            this.width, this.height, 0.0, 1.0, 1.0,
            this.width, 0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0

        ];

        this.buffer.pushBackData(vertices);
        this.buffer.upload();
        this.buffer.unbind();
    }

    public update(time: number) {

    }

    public draw(shader: Shader, model: Matrix4x4): void {

        let modelLocation = shader.getUniformLocation("u_model");
        // @ts-ignore
        gl.uniformMatrix4fv(modelLocation, false, model.toFloat32Array());

        let colorLocation = shader.getUniformLocation("u_tint");
        //the problem is that material can be undefined and here i have the !
        gl.uniform4fv(colorLocation, this.material!.getTint().toFloat32Array());


        //feels like i am using this ? operator a lot this needs to fixed
        //there will for sure be bugs here i think
        if (this.material?.getDiffuseTexture() !== undefined) {
            this.material?.getDiffuseTexture()?.activateAndBind(0);
            let diffuseLocation = shader.getUniformLocation("u_diffuse");
            gl.uniform1i(diffuseLocation, 0);
        }

        this.buffer?.bind();
        this.buffer?.draw();
    }


}
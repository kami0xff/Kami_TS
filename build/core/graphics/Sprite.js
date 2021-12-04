import { AttributeInfo, GlBuffer } from "../gl/GlBuffer.js";
import { gl } from "../gl/gl.js";
import { MaterialManager } from "./MaterialManager.js";
export class Sprite {
    constructor(name, materialName, width = 100, height = 100) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.materialName = materialName;
        this.material = MaterialManager.getMaterial(materialName);
    }
    getName() {
        return this.name;
    }
    destroy() {
        var _a;
        (_a = this.buffer) === null || _a === void 0 ? void 0 : _a.destroy();
        MaterialManager.releaseMaterial(this.materialName);
        this.material = undefined;
        // @ts-ignore :(
        this.materialName = undefined;
    }
    load() {
        this.buffer = new GlBuffer(5);
        let positionAttribute = new AttributeInfo();
        positionAttribute.location = 0;
        positionAttribute.offset = 0;
        positionAttribute.size = 3;
        this.buffer.addAttributeLocation(positionAttribute);
        let texCoordAttribute = new AttributeInfo();
        texCoordAttribute.location = 1;
        texCoordAttribute.offset = 3;
        texCoordAttribute.size = 2;
        this.buffer.addAttributeLocation(texCoordAttribute);
        let vertices = [
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
    update(time) {
    }
    draw(shader, model) {
        var _a, _b, _c, _d, _e;
        let modelLocation = shader.getUniformLocation("u_model");
        // @ts-ignore
        gl.uniformMatrix4fv(modelLocation, false, model.toFloat32Array());
        let colorLocation = shader.getUniformLocation("u_tint");
        //the problem is that material can be undefined and here i have the !
        gl.uniform4fv(colorLocation, this.material.getTint().toFloat32Array());
        //feels like i am using this ? operator a lot this needs to fixed
        //there will for sure be bugs here i think
        if (((_a = this.material) === null || _a === void 0 ? void 0 : _a.getDiffuseTexture()) !== undefined) {
            (_c = (_b = this.material) === null || _b === void 0 ? void 0 : _b.getDiffuseTexture()) === null || _c === void 0 ? void 0 : _c.activateAndBind(0);
            let diffuseLocation = shader.getUniformLocation("u_diffuse");
            gl.uniform1i(diffuseLocation, 0);
        }
        (_d = this.buffer) === null || _d === void 0 ? void 0 : _d.bind();
        (_e = this.buffer) === null || _e === void 0 ? void 0 : _e.draw();
    }
}

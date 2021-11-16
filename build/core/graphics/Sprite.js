import { AttributeInfo, GlBuffer } from "../gl/GlBuffer.js";
import { Vector3 } from "../math/vector3.js";
export class Sprite {
    constructor(name, width = 100, height = 100) {
        this.position = new Vector3();
        this.name = name;
        this.width = width;
        this.height = height;
    }
    load() {
        this.buffer = new GlBuffer(3);
        let positionAttribute = new AttributeInfo();
        positionAttribute.location = 0;
        positionAttribute.offset = 0;
        positionAttribute.size = 3;
        this.buffer.addAttributeLocation(positionAttribute);
        let vertices = [
            //x y z first triangle of the quand
            0.0, 0.0, 0.0,
            0.0, this.height, 0.0,
            this.width, this.height, 0.0,
            //second triangle of the quad
            this.width, this.height, 0.0,
            this.width, 0.0, 0.0,
            0.0, 0.0, 0.0
        ];
        this.buffer.pushBackData(vertices);
        this.buffer.upload();
        this.buffer.unbind();
    }
    update(time) {
    }
    draw() {
        var _a, _b;
        (_a = this.buffer) === null || _a === void 0 ? void 0 : _a.bind();
        (_b = this.buffer) === null || _b === void 0 ? void 0 : _b.draw();
    }
}

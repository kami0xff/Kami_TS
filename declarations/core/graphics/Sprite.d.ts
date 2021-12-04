import { Shader } from "../gl/shader.js";
import { Matrix4x4 } from "../math/matrix4x4.js";
export declare class Sprite {
    private name;
    private width;
    private height;
    private buffer;
    private material;
    private materialName;
    constructor(name: string, materialName: string, width?: number, height?: number);
    getName(): string;
    destroy(): void;
    load(): void;
    update(time: number): void;
    draw(shader: Shader, model: Matrix4x4): void;
}

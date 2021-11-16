import { Vector3 } from "../math/vector3.js";
export declare class Sprite {
    private name;
    private width;
    private height;
    private buffer;
    position: Vector3;
    constructor(name: string, width?: number, height?: number);
    load(): void;
    update(time: number): void;
    draw(): void;
}

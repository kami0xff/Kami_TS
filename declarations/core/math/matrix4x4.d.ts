import { Vector3 } from "./vector3";
export declare class Matrix4x4 {
    private data;
    private constructor();
    getdata(): number[];
    static identity(): Matrix4x4;
    static orthographic(left: number, right: number, bottom: number, top: number, nearClip: number, farClip: number): Matrix4x4;
    static translation(position: Vector3): Matrix4x4;
}

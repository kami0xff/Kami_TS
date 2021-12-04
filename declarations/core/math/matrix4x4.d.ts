import { Vector3 } from "./vector3.js";
export declare class Matrix4x4 {
    private data;
    private constructor();
    getdata(): number[];
    static identity(): Matrix4x4;
    static orthographic(left: number, right: number, bottom: number, top: number, nearClip: number, farClip: number): Matrix4x4;
    static translation(position: Vector3): Matrix4x4;
    static rotationX(angleInRadians: number): Matrix4x4;
    static rotationY(angleInRadians: number): Matrix4x4;
    static rotationZ(angleInRadians: number): Matrix4x4;
    static rotationXYZ(xRadians: number, yRadians: number, zRadians: number): Matrix4x4;
    static scale(scale: Vector3): Matrix4x4;
    static multiply(a: Matrix4x4, b: Matrix4x4): Matrix4x4;
    toFloat32Array(): Float32Array;
    copyFrom(matrix: Matrix4x4): void;
}

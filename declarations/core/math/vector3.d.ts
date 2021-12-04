export declare class Vector3 {
    private x;
    private y;
    private z;
    constructor(x?: number, y?: number, z?: number);
    getx(): number;
    setx(value: number): void;
    gety(): number;
    sety(value: number): void;
    getz(): number;
    setz(value: number): void;
    static zero(): Vector3;
    static one(): Vector3;
    toArray(): number[];
    toFloat32Array(): Float32Array;
    copyFrom(vector: Vector3): void;
    setFromJson(json: any): void;
}

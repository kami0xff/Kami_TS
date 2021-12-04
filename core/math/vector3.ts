export class Vector3 {

    private x: number;
    private y: number;
    private z: number

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public getx(): number {
        return this.x;
    }

    public setx(value: number): void {
        this.x = value;
    }

    public gety(): number {
        return this.y;
    }

    public sety(value: number): void {
        this.y = value;
    }

    public getz(): number {
        return this.z;
    }

    public setz(value: number): void {
        this.z = value;
    }

    public static zero(): Vector3 {
        return new Vector3();
    }

    public static one(): Vector3 {
        return new Vector3(1, 1, 1);
    }

    public toArray(): number[] {
        return [this.x, this.y, this.z];
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }

    public copyFrom(vector: Vector3): void {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    }

    public setFromJson(json: any): void {
        if(json.x !== undefined){
            this.x = Number(json.x);
        }
        if(json.y !== undefined){
            this.y = Number(json.y);
        }
        if(json.z !== undefined){
            this.z = Number(json.z);
        }
    }
}
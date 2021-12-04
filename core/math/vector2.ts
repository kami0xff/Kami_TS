export class Vector2 {

    private x: number;
    private y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
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

    public toArray(): number[] {
        return [this.x, this.y];
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }

    public setFromJson(json: any): void {
        if(json.x !== undefined){
            this.x = Number(json.x);
        }
        if(json.y !== undefined){
            this.y = Number(json.y);
        }
    }
}
export class Vector3{

    private x: number;
    private y: number;
    private z: number

    constructor(x:number = 0, y:number = 0, z:number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public getx():number{
        return this.x;
    }

    public setx(value:number):void{
        this.x = value;
    }

    public gety():number{
        return this.y;
    }

    public sety(value:number):void{
        this.y = value;
    }

    public getz():number{
        return this.z;
    }

    public setz(value:number):void{
        this.z = value;
    }


    public toArray(): number[] {
        return [this.x, this.y, this.z];
    }

    public toFloat32Array():Float32Array{
        return new Float32Array(this.toArray());
    }

}
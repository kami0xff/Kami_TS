import {Vector3} from "./vector3";

export class Matrix4x4{
    private data: number[];

    private constructor() {
        this.data = [
          1,0,0,0,
          0,1,0,0,
          0,0,1,0,
          0,0,0,1
        ];
    }

    public getdata(): number[]{
        return this.data;
    }

    public static identity():Matrix4x4{
        return new Matrix4x4();
    }

    public static orthographic(left:number, right:number, bottom:number, top:number, nearClip:number, farClip:number):Matrix4x4{
        let m = new Matrix4x4();

        let lr: number = 1.0/(left-right);
        let bt: number = 1.0/(bottom-top);
        let nf: number = 1.0 /(nearClip-farClip);

        m.data[0] = -2.0 * lr;
        m.data[5] = -2.0 * bt;
        m.data[10] = 2.0 * nf;
        m.data[12] = (left + right) * lr;
        m.data[13] = (top + bottom) * bt;
        m.data[14] = (farClip + nearClip) * nf;
        return m;
    }

    public static translation(position: Vector3):Matrix4x4{
        let m = new Matrix4x4();
        m.data[12] = position.getx();
        m.data[13] = position.gety();
        m.data[14] = position.getz();
        return m;
    }

}
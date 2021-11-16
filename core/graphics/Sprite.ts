import {AttributeInfo, GlBuffer} from "../gl/GlBuffer.js";
import {Vector3} from "../math/vector3.js";

export class Sprite{
    private name: string;
    private width: number;
    private height: number;
    private buffer: GlBuffer | undefined;

    public position: Vector3 = new Vector3();

    public constructor(name: string, width:number = 100, height:number = 100){
        this.name = name;
        this.width = width;
        this.height = height;
    }

    public load():void{
        this.buffer = new GlBuffer(3);
        let positionAttribute = new AttributeInfo();
        positionAttribute.location = 0;
        positionAttribute.offset = 0;
        positionAttribute.size = 3;
        this.buffer.addAttributeLocation(positionAttribute)
        let vertices : number[] = [
            //x y z first triangle of the quand
            0.0,0.0,0.0,
            0.0,this.height,0.0,
            this.width,this.height,0.0,


            //second triangle of the quad
            this.width,this.height,0.0,
            this.width,0.0,0.0,
            0.0,0.0,0.0

        ];

        this.buffer.pushBackData(vertices);
        this.buffer.upload();
        this.buffer.unbind();
    }

    public update(time:number){

    }

    public draw(): void {
        this.buffer?.bind();
        this.buffer?.draw();
    }


}
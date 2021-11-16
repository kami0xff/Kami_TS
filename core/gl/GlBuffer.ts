import {gl} from './gl.js'

/**
 * represents the information needed for a GLBuffer attribute.
 */
export class AttributeInfo {
    public location: number | undefined;
    //the number of elements in this attribute vec3 = 3
    public size: number | undefined;
    //the number of elements from the beginning of the buffer
    public offset: number | undefined;
}


/**
 * Represents a WebGL buffer
 */
export class GlBuffer {
    private hasAttributeLocation: boolean = false;
    private elementSize: number;
    private stride: number;
    private buffer: WebGLBuffer | null;
    private targetBufferType: number;

    private dataType: number;
    private mode: number;
    private typeSize: number;

    private data: number[] = [];

    private attributes: AttributeInfo[] = [];

    /**
     * Creates a new Gl Buffer
     * @param elementSize The size of each individual element in this buffer
     * @param dataType The data type of this buffer. Default Gl.FLOAT
     * @param targetBufferType The buffer target type gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER. Default is gl.ARRAY_BUFFER
     * @param mode The drawing mode of this buffer gl.TRIANGLES or gl.LINES. Default gl.TRIANGLES
     */
    public constructor(elementSize: number, dataType: number = gl.FLOAT, targetBufferType: number = gl.ARRAY_BUFFER, mode: number = gl.TRIANGLES) {
        this.elementSize = elementSize;
        this.dataType = dataType;
        this.targetBufferType = targetBufferType;
        this.mode = mode;

        //determine byte size
        switch (this.dataType) {
            case gl.FLOAT:
            case gl.INT:
            case gl.UNSIGNED_INT:
                this.typeSize = 4;
                break;
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
                this.typeSize = 2;
                break;
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
                this.typeSize = 1;
                break;
            default:
                throw new Error("Unrecognized data type : " + dataType.toString());
        }

        this.stride = this.elementSize * this.typeSize
        this.buffer = gl.createBuffer();


    }

    /**
     * destroys this buffer
     */
    public destroy(): void {
        gl.deleteBuffer(this.buffer);
    }

    /**
     * binds this buffer
     * @param normalized indicates if the data should be normalized
     */
    public bind(normalized: boolean = false): void {
        gl.bindBuffer(this.targetBufferType, this.buffer);
        if (this.hasAttributeLocation) {
            for (let it of this.attributes) {
                gl.vertexAttribPointer(it.location!, it.size!, this.dataType, normalized, this.stride, it.offset! * this.typeSize);
                gl.enableVertexAttribArray(it.location!);
            }
        }
    }

    /**
     * unbinds this buffer
     */
    public unbind(): void {
        for (let it of this.attributes) {
            gl.disableVertexAttribArray(it.location!);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    }


    /**
     * adds an attribute with teh provided information to this buffer
     * @param info The information to be added
     */
    public addAttributeLocation(info:AttributeInfo):void{
        this.hasAttributeLocation = true;
        this.attributes.push(info);
    }

    public pushBackData(data: number[]): void {
        for(let d of data){
            this.data.push(d);
        }
    }

    /**
     * Uploads this buffer's data to the gpu
     */
    public upload():void{
        gl.bindBuffer(this.targetBufferType, this.buffer);
        let bufferData: ArrayBuffer;
        switch (this.dataType) {
            case gl.FLOAT:
                bufferData = new Float32Array(this.data);
                break;
            case gl.INT:
                bufferData = new Int32Array(this.data);
                break;
            case gl.UNSIGNED_INT:
                bufferData = new Uint32Array(this.data);
                break;
            case gl.SHORT:
                bufferData = new Int16Array(this.data);
                break;
            case gl.UNSIGNED_SHORT:
                bufferData = new Uint16Array(this.data);
                break;
            case gl.BYTE:
                bufferData = new Int8Array(this.data);
                break;
            case gl.UNSIGNED_BYTE:
                bufferData = new Uint8Array(this.data);
                break;
            default:
                throw new Error("Unrecognized data type : " + this.dataType.toString());
        }
        gl.bufferData(this.targetBufferType, bufferData, gl.STATIC_DRAW);
    }

    /**
     * Draws this buffer.
     */
    public draw():void{
        if(this.targetBufferType === gl.ARRAY_BUFFER){
            gl.drawArrays(this.mode, 0, this.data.length/this.elementSize);
        }else if(this.targetBufferType === gl.ELEMENT_ARRAY_BUFFER){
            gl.drawElements(this.mode, this.data.length, this.dataType,0);
        }
    }


}
/**
 * represents the information needed for a GLBuffer attribute.
 */
export declare class AttributeInfo {
    location: number | undefined;
    size: number | undefined;
    offset: number | undefined;
}
/**
 * Represents a WebGL buffer
 */
export declare class GlBuffer {
    private hasAttributeLocation;
    private elementSize;
    private stride;
    private buffer;
    private targetBufferType;
    private dataType;
    private mode;
    private typeSize;
    private data;
    private attributes;
    /**
     * Creates a new Gl Buffer
     * @param elementSize The size of each individual element in this buffer
     * @param dataType The data type of this buffer. Default Gl.FLOAT
     * @param targetBufferType The buffer target type gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER. Default is gl.ARRAY_BUFFER
     * @param mode The drawing mode of this buffer gl.TRIANGLES or gl.LINES. Default gl.TRIANGLES
     */
    constructor(elementSize: number, dataType?: number, targetBufferType?: number, mode?: number);
    /**
     * destroys this buffer
     */
    destroy(): void;
    /**
     * binds this buffer
     * @param normalized indicates if the data should be normalized
     */
    bind(normalized?: boolean): void;
    /**
     * unbinds this buffer
     */
    unbind(): void;
    /**
     * adds an attribute with teh provided information to this buffer
     * @param info The information to be added
     */
    addAttributeLocation(info: AttributeInfo): void;
    pushBackData(data: number[]): void;
    /**
     * Uploads this buffer's data to the gpu
     */
    upload(): void;
    /**
     * Draws this buffer.
     */
    draw(): void;
}

/**
 * Represents a webGl shader
 */
export declare class Shader {
    private name;
    private program;
    private attributes;
    private uniforms;
    /**
     *
     * @param name
     * @param vertexSource vertex source as in the actual source code of the vertex shader
     * @param fragmentSource same as above
     */
    constructor(name: string, vertexSource: string, fragmentSource: string);
    getName(): string;
    /**
     * gets the location of an attribute with the provided name
     * @param name the name of teh attribute whose location to retrieve
     */
    getAttributeLocation(name: string): number;
    getUniformLocation(name: string): WebGLUniformLocation;
    use(): void;
    private loadShader;
    private createProgram;
    private detectAttributes;
    private detectUniforms;
}

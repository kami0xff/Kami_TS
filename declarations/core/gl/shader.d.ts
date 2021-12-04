/**
 * Represents a webGl shader
 */
export declare abstract class Shader {
    private name;
    private program;
    private attributes;
    private uniforms;
    /**
     *
     * @param name
     */
    constructor(name: string);
    getName(): string;
    /**
     * gets the location of an attribute with the provided name
     * @param name the name of teh attribute whose location to retrieve
     */
    getAttributeLocation(name: string): number;
    getUniformLocation(name: string): WebGLUniformLocation;
    use(): void;
    load(vertexSource: string, fragmentSource: string): void;
    private loadShader;
    private createProgram;
    private detectAttributes;
    private detectUniforms;
}

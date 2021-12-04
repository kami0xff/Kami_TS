import { gl } from "./gl.js";
/**
 * Represents a webGl shader
 */
export class Shader {
    /**
     *
     * @param name
     */
    constructor(name) {
        this.attributes = {};
        this.uniforms = {};
        this.name = name;
    }
    getName() {
        return this.name;
    }
    /**
     * gets the location of an attribute with the provided name
     * @param name the name of teh attribute whose location to retrieve
     */
    getAttributeLocation(name) {
        if (this.attributes[name] === undefined) {
            throw new Error(`Unable to find Attribute named ${name} in shader named : ${this.name}`);
        }
        return this.attributes[name];
    }
    getUniformLocation(name) {
        if (this.uniforms[name] === undefined) {
            throw new Error(`Unable to find Uniform named ${name} in shader named : ${this.name}`);
        }
        return this.uniforms[name];
    }
    use() {
        // @ts-ignore
        gl.useProgram(this.program);
    }
    load(vertexSource, fragmentSource) {
        let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
        let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);
        this.createProgram(vertexShader, fragmentShader);
        this.detectAttributes();
        this.detectUniforms();
    }
    loadShader(source, shaderType) {
        let shader = gl.createShader(shaderType);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let error = gl.getShaderInfoLog(shader); //this captures an error if there is one
        if (error !== "") {
            throw new Error("Error compiling shader '" + this.name + "': " + error);
        }
        return shader;
    }
    createProgram(vertexShader, fragmentShader) {
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        let error = gl.getProgramInfoLog(this.program);
        if (error !== "") {
            throw new Error("Error linking shader '" + this.name + "' : " + error);
        }
    }
    detectAttributes() {
        let attributeCount = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attributeCount; ++i) {
            let attributeInfo = gl.getActiveAttrib(this.program, i);
            if (!attributeInfo) {
                // @ts-ignore
                break;
            }
            else {
                if (this.program) {
                    this.attributes[attributeInfo.name] = gl.getAttribLocation(this.program, attributeInfo.name);
                }
            }
        }
    }
    detectUniforms() {
        let uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; ++i) {
            let uniformInfo = gl.getActiveUniform(this.program, i);
            if (!uniformInfo) {
                // @ts-ignore
                break;
            }
            else {
                if (this.program) { //what does this type assertion do here
                    this.uniforms[uniformInfo.name] = gl.getUniformLocation(this.program, uniformInfo.name);
                }
            }
        }
    }
}

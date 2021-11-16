import {gl} from "./gl.js"


/**
 * Represents a webGl shader
 */
export class Shader{

    private name:string;
    private program: WebGLProgram | undefined;
    private attributes: {[name:string]:number} = {}
    private uniforms: {[name:string]:WebGLUniformLocation} = {}

    /**
     *
     * @param name
     * @param vertexSource vertex source as in the actual source code of the vertex shader
     * @param fragmentSource same as above
     */
    public constructor(name: string, vertexSource:string, fragmentSource:string) {
        this.name = name;
        let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
        let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);
        this.createProgram(vertexShader, fragmentShader);
        this.detectAttributes();
        this.detectUniforms();
    }

    public getName(): string {
        return this.name;
    }


    /**
     * gets the location of an attribute with the provided name
     * @param name the name of teh attribute whose location to retrieve
     */
    public getAttributeLocation(name:string): number{
        if(this.attributes[name] === undefined){
            throw new Error(`Unable to find Attribute named ${name} in shader named : ${this.name}`);
        }
        return this.attributes[name];
    }

    public getUniformLocation(name:string): WebGLUniformLocation{
        if(this.uniforms[name] === undefined){
            throw new Error(`Unable to find Uniform named ${name} in shader named : ${this.name}`);
        }
        return this.uniforms[name];
    }



    public use(): void {
        // @ts-ignore
        gl.useProgram(this.program);
    }

    private loadShader(source:string, shaderType:number): WebGLShader{
        let shader: WebGLShader = gl.createShader(shaderType)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let error = gl.getShaderInfoLog(shader); //this captures an error if there is one

        if(error !== ""){
            throw new Error("Error compiling shader '" + this.name + "': " + error);
        }

        return shader;
    }


    private createProgram(vertexShader:WebGLShader, fragmentShader: WebGLShader): void{
        this.program = gl.createProgram()!;
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        let error = gl.getProgramInfoLog(this.program);
        if(error !== ""){
            throw new Error("Error linking shader '"+ this.name +"' : "+ error);
        }

    }

    private detectAttributes(): void{
        let attributeCount = gl.getProgramParameter(this.program!, gl.ACTIVE_ATTRIBUTES);
        for(let i = 0; i < attributeCount; ++i){
            let attributeInfo: WebGLActiveInfo | null = gl.getActiveAttrib(this.program!, i);
            if(!attributeInfo){
                // @ts-ignore
                break;
            }else{
                if (this.program) {
                    this.attributes[attributeInfo.name] = gl.getAttribLocation(this.program, attributeInfo.name);
                }
            }
        }
    }

    private detectUniforms():void{
        let uniformCount = gl.getProgramParameter(this.program!, gl.ACTIVE_UNIFORMS);
        for(let i = 0; i < uniformCount; ++i){
            let uniformInfo: WebGLActiveInfo | null = gl.getActiveUniform(this.program!, i);
            if(!uniformInfo){
                // @ts-ignore
                break;
            }else{
                if (this.program) { //what does this type assertion do here
                    this.uniforms[uniformInfo.name] = <WebGLUniformLocation>gl.getUniformLocation(this.program, uniformInfo.name);
                }
            }
        }
    }

}
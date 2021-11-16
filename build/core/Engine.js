// @ts-ignore
import { GlUtilities, gl } from "./gl/gl.js";
import { Shader } from "./gl/shader.js";
import { Sprite } from "./graphics/Sprite.js";
import { Matrix4x4 } from "./math/matrix4x4.js";
/**
 * The main game engine class
 */
export class Engine {
    /**
     * Creates a new engine
     */
    constructor() {
        console.log("Hello engine object created");
    }
    /**
     * Starts up this engine
     */
    start() {
        this.canvas = GlUtilities.initialize();
        gl.clearColor(0, 0, 0, 1);
        this.loadShaders();
        // @ts-ignore // i want to get rid of these
        this.shader.use();
        this.projection = Matrix4x4.orthographic(0, this.canvas.width, 0, this.canvas.height, -100.0, 100.0);
        //load
        this.sprite = new Sprite("Test");
        this.sprite.load();
        // this.sprite.position.setx(200);
        this.resize();
        this.loop();
    }
    /**
     * The main game loop
     * @private
     */
    loop() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        //Set uniformat
        let colorPosition = this.shader.getUniformLocation("u_color");
        gl.uniform4f(colorPosition, 1, 0.5, 0, 1);
        let projectionPosition = this.shader.getUniformLocation("u_projection");
        // @ts-ignore
        gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this.projection.getdata()));
        let modelLocation = this.shader.getUniformLocation("u_model");
        // @ts-ignore
        gl.uniformMatrix4fv(modelLocation, false, new Float32Array(Matrix4x4.translation(this.sprite.position).getdata()));
        // @ts-ignore
        this.sprite.draw();
        requestAnimationFrame(this.loop.bind(this)); //this bind and requestAnimation frame look up the docs
        //its about instances of objects
    }
    /**
     * Resizes the canvas to fit the window
     */
    resize() {
        if (this.canvas !== undefined) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            gl.viewport(-1, 1, -1, 1);
        }
    }
    loadShaders() {
        let vertexShaderSource = `

attribute vec3 a_position;

uniform mat4 u_projection;

uniform mat4 u_model;

void main(){
    gl_Position = u_projection * u_model * vec4(a_position, 1.0);
}`;
        let fragmentShaderSource = `
precision mediump float;

uniform vec4 u_color;

void main(){
    gl_FragColor = u_color;
}
`;
        this.shader = new Shader("basic", vertexShaderSource, fragmentShaderSource);
    }
}

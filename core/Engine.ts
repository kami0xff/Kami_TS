// @ts-ignore
import {GlUtilities, gl} from "./gl/gl.js";
import {Shader} from "./gl/shader.js";
import {AttributeInfo, GlBuffer} from "./gl/GlBuffer.js";
import {Sprite} from "./graphics/Sprite.js"
import {Matrix4x4} from "./math/matrix4x4.js";
import {AssetManager} from "./assets/assetManager.js";
import {MessageBus} from "./message/messageBus.js";
import {BasicShader} from "./gl/shaders/BasicShader.js";
import {MaterialManager} from "./graphics/MaterialManager.js";
import {Material} from "./graphics/Material.js";
import {Color} from "./graphics/Color.js";
import {ZoneManager} from "./world/ZoneManager.js";

/**
 * The main game engine class
 */
export class Engine {
    private canvas: HTMLCanvasElement | undefined;
    private basicShader!: BasicShader // why do i need this | undefined thing here can i fix that ?
    private projection: Matrix4x4 | undefined;

    /**
     * Creates a new engine
     */
    public constructor() {
    }

    /**
     * Starts up this engine
     */
    public start(): void {
        this.canvas = GlUtilities.initialize(); //initialise the window
        AssetManager.initialize();
        ZoneManager.initialize();

        gl.clearColor(0, 0, 0, 1);

        this.basicShader = new BasicShader();
        // @ts-ignore // i want to get rid of these
        this.basicShader.use();

        MaterialManager.registerMaterial(new Material("crate", "../assets/textures/wood.jpg", new Color(255, 128, 0, 255)));

        this.projection = Matrix4x4.orthographic(0, this.canvas.width, this.canvas.height, 0, -100.0, 100.0);

        ZoneManager.changeZone(0);

        this.resize();
        this.loop();
    }

    /**
     * The main game loop
     * @private
     */
    private loop(): void {
        MessageBus.update(0);

        ZoneManager.update(0);

        gl.clear(gl.COLOR_BUFFER_BIT);

        ZoneManager.render(this.basicShader);

        let projectionPosition = this.basicShader!.getUniformLocation("u_projection");
        // @ts-ignore
        gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this.projection.getdata()));

        // @ts-ignore
        requestAnimationFrame(this.loop.bind(this)); //this bind and requestAnimation frame look up the docs
        //its about instances of objects
    }

    /**
     * Resizes the canvas to fit the window
     */
    public resize(): void {
        if (this.canvas !== undefined) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.projection = Matrix4x4.orthographic(0, this.canvas!.width, this.canvas!.height, 0, -100.0, 100.0);
        }
    }
}
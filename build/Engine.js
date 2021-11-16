// @ts-ignore
import { GlUtilities, gl } from "./gl.js";
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
        this.loop();
    }
    /**
     * The main game loop
     * @private
     */
    loop() {
        gl.clear(gl.COLOR_BUFFER_BIT);
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
        }
    }
}

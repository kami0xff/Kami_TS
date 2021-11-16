/**
 * The main game engine class
 */
export declare class Engine {
    private canvas;
    private shader;
    private sprite;
    private projection;
    /**
     * Creates a new engine
     */
    constructor();
    /**
     * Starts up this engine
     */
    start(): void;
    /**
     * The main game loop
     * @private
     */
    private loop;
    /**
     * Resizes the canvas to fit the window
     */
    resize(): void;
    private loadShaders;
}

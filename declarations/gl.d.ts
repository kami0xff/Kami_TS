/**
 * Globally exported webgl rendering context
 */
export declare var gl: WebGLRenderingContext;
/**
 * Responsible for setting up a WebGl rendering context
 */
export declare class GlUtilities {
    /**
     * Initialises WebGl context, potentially using an already existing canvas given an existing id or creates a new canvas
     * @param elementId
     */
    static initialize(elementId?: string): HTMLCanvasElement;
}

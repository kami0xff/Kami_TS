/**
 * Globally exported webgl rendering context
 */
export var gl;
/**
 * Responsible for setting up a WebGl rendering context
 */
export class GlUtilities {
    //static here means you don't need an instance of GlUtilities to call this method/member variable
    /**
     * Initialises WebGl context, potentially using an already existing canvas given an existing id or creates a new canvas
     * @param elementId
     */
    static initialize(elementId) {
        let canvas;
        if (elementId != null) {
            canvas = document.getElementById(elementId);
            if (canvas === undefined) {
                throw new Error("Cannot find a canvas element named: " + elementId);
            }
        }
        else {
            canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
        }
        gl = canvas.getContext("webgl");
        if (gl == null) { // i want both null or undefined to fail here not just undefined
            throw new Error("Unable to initialize WebGl");
        }
        return canvas;
    }
}

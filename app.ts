import {Engine} from "./core/Engine.js"

var engine:Engine;
/**
 * The main entry point to the application.
 */
window.onload = function() {
    engine = new Engine();
    engine.start();
}

window.onresize = function () {
    engine.resize();
}
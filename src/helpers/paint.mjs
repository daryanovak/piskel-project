import { globalState } from '../piskelState.mjs';

export function drawRectangle(x, y, width, height, color) {
    let mainCanvas = document.getElementsByClassName('main-canvas-area__frame')[0];
    let mainContext = mainCanvas.getContext("2d");
    let smallCanvas = globalState.getCurrentFrame().frameCanvas;
    let smallContext = smallCanvas.getContext("2d");

    mainContext.fillStyle = color;
    smallContext.fillStyle = color;

    mainContext.fillRect(x, y, width, height);
    let scale = globalState.canvasSize / globalState.smallCanvasSize;
    smallContext.fillRect(x / scale, y / scale, width / scale, height / scale);
}

import { newFrame, arrayOfCanvasImages } from './newFrame.mjs'
import { drawOnCanvasByFrameState } from '../helpers/drawOnCanvasByFrameState.mjs'

export function copyFrame() {
    let element = event.target.parentNode.parentNode;
    let id = element.childNodes[0].id;
    newFrame();
    drawOnCanvasByFrameState(id);

    let canvas = document.getElementsByClassName('main-canvas-area__frame')[0];
    var url = canvas.toDataURL();
    arrayOfCanvasImages.push(url);
}

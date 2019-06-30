import { globalState } from '../piskelState.mjs'
import {renderCanvas} from '../eventHandlers.mjs'

let count = 0;

export function removeFrame() {
    let canvas = document.getElementsByClassName('main-canvas-area__frame')[0];
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    let element = event.target.parentNode.parentNode;
    let index = element.childNodes[0].id;
    var message = confirm("Do you want to delete this frame?");

    if (message) {
        count++;
        globalState.removeCurrentFrame(index - count);
        ctx.clearRect(0, 0, width, height);
        globalState.removeCurrentFrame(index);
        renderCanvas();
        element.style.display = 'none';
    }

}

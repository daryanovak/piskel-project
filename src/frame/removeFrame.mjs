import { globalState } from '../piskelState.mjs'
import {renderCanvas} from '../eventHandlers.mjs'
import { createLayerDOM } from '../layers/addNewLayer.mjs'


export function removeFrame() {
    let canvas = document.getElementsByClassName('main-canvas-area__frame')[0];
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    let element = event.target.parentNode.parentNode;
    let index = element.childNodes[0].id;
    var message = confirm("Do you want to delete this frame?");
    alert(index);

    if (message) {
        globalState.removeCurrentFrame(index);
        let layerList = document.getElementsByClassName("list-of-layers")[0];
        layerList.innerHTML = '';
        ctx.clearRect(0, 0, width, height);
        if(!globalState.empty()) {
            renderCanvas();
            for(let key in globalState.getCurrentFrame().frameData) {
                createLayerDOM(key);
              }
        }
        element.style.display = 'none';
    }

}

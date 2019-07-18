import { removeFrame } from './removeFrame.mjs';
import { copyFrame } from './copyFrame.mjs';
import { generateCanvasState } from '../helpers/generateCanvasState.mjs';
import { globalState } from '../piskelState.mjs';
import { FrameState } from './frameState.mjs';
import { renderCanvas } from '../eventHandlers.mjs';
export let frameNumber = -1;

export let arrayOfCanvasImages = [];


export function newFrame() {
    frameNumber++;
    var canvas = document.createElement('canvas');
    canvas.classList.add("frame-tool__frames")
    canvas.id = frameNumber;
    canvas.style.height = "210px"
    canvas.style.width = "300px";
    let layerList = document.getElementsByClassName("list-of-layers")[0];

    layerList.innerHTML = '';


    let mainCanvas = document.getElementsByClassName("main-canvas-area__frame")[0];
    let ctx = mainCanvas.getContext("2d");
    

    let url = mainCanvas.toDataURL();
    arrayOfCanvasImages.push(url);

    ctx.clearRect(0, 0, globalState.canvasSize, globalState.canvasSize);
    let frameData = generateCanvasState(globalState.canvasPixelSize, globalState.canvasSize);
    let frame  = new FrameState(frameNumber, canvas, frameData, 0);//TODO LAYER ID
    globalState.addFrame(frame);

    let layer = document.createElement('button');
    let layerTrash = document.createElement('button');
    layer.classList.add("layer");
    layerTrash.className = "far fa-trash-alt";
    layerTrash.id = 0;
    layer.textContent =`0`;
    layer.id = 0;
    layer.appendChild(layerTrash);
    
    layerList.appendChild(layer);

    function a (){ ///Todo
        globalState.getCurrentFrame().setCurrentLayer(0);
        if(globalState.currentDrawComponent)  {
            globalState.currentDrawComponent.reset();
        }  
        renderCanvas();
        
    }
    
    function deleteLayer(e){
        if(Object.keys(globalState.getCurrentFrame().frameData).length <= 1) {
            return;
        }
        globalState.getCurrentFrame().removeLayer(e.target.id);
        if(globalState.currentDrawComponent)  {
            globalState.currentDrawComponent.reset();
        }    
        e.target.parentElement.remove();
        renderCanvas();
    }
    layerTrash.addEventListener('click', deleteLayer )
    layer.addEventListener('click', a );

    if(globalState.currentDrawComponent)  {
        globalState.currentDrawComponent.reset();
    }
    
    let frameTool = document.getElementsByClassName('frame-tool')[0];
    let newDiv = document.createElement('div');
    newDiv.classList.add("frame-tool__frames");
    let trashButton = document.createElement('button');
    trashButton.classList.add('frame-tool__trash-button');
    let copyButton = document.createElement('button');
    copyButton.classList.add('frame-tool__copy-button');
    let copyIcon = document.createElement('i');
    copyIcon.className = "far fa-copy";
    let icon = document.createElement('i');
    icon.className = "far fa-trash-alt";

    newDiv.appendChild(canvas);
    newDiv.appendChild(trashButton);
    newDiv.appendChild(copyButton);
    trashButton.appendChild(icon);
    frameTool.appendChild(newDiv);
    copyButton.appendChild(copyIcon);

    trashButton.addEventListener('click', removeFrame);
    copyButton.addEventListener('click', copyFrame);
}


import { globalState } from  '../piskelState.mjs'
import {renderCanvas} from '../eventHandlers.mjs'
import { generateCanvasState } from '../helpers/generateCanvasState.mjs';

export let layerId = 0;

export function addNewLayer() {
    layerId++;
    let layer = document.createElement('button');
    let layerTrash = document.createElement('button');
    layer.classList.add("layer");
    layerTrash.className = "far fa-trash-alt";
    layerTrash.id = layerId;
    layer.textContent =`${layerId}`;
    layer.id = layerId;
    layer.appendChild(layerTrash);

    function deleteLayer(e){  
        globalState.getCurrentFrame().removeLayer(e.target.id);
        if(globalState.currentDrawComponent)  {
            globalState.currentDrawComponent.reset();
        }  
        e.target.parentElement.remove();
    }

    layerTrash.addEventListener('click', deleteLayer )
    let frameData = generateCanvasState(globalState.canvasPixelSize, globalState.canvasSize);
    globalState.getCurrentFrame().addLayer(layerId, frameData);
    renderCanvas();
    function setCurrentLayer (){  
        globalState.getCurrentFrame().setCurrentLayer(layer.id);
        if(globalState.currentDrawComponent)  {
            globalState.currentDrawComponent.reset();
        } 
        renderCanvas();
    }
    layer.addEventListener('click', setCurrentLayer );

    let layerList = document.getElementsByClassName("list-of-layers")[0];
    layerList.appendChild(layer);
    if(globalState.currentDrawComponent)  {
        globalState.currentDrawComponent.reset();
    }
}

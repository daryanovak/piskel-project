
import { globalState } from  '../piskelState.mjs'
import {renderCanvas} from '../eventHandlers.mjs'
import { generateCanvasState } from '../helpers/generateCanvasState.mjs';

export function addNewLayer() {
    let layerId = globalState.getCurrentFrame().getNextLayerId();
    createLayerDOM(layerId);
    let frameData = generateCanvasState(globalState.canvasPixelSize, globalState.canvasSize);
    globalState.getCurrentFrame().addLayer(layerId, frameData);
    if(globalState.currentDrawComponent)  {
        globalState.currentDrawComponent.reset();
    }
    renderCanvas();
}

export function createLayerDOM(layerId) {
    let layer = document.createElement('div');
    let layerTrash = document.createElement('div');
    layer.classList.add("layer");
    layerTrash.className = "far fa-trash-alt";
    layerTrash.id = layerId;
    layer.textContent =`${layerId}`;
    layer.id = layerId;
    layer.appendChild(layerTrash);

    function deleteLayer(e){  
        if(Object.keys(globalState.getCurrentFrame().frameData).length <= 1){
            return;
        }
        globalState.getCurrentFrame().removeLayer(e.target.id);
        if(globalState.currentDrawComponent)  {
            globalState.currentDrawComponent.reset();
        }  
        e.target.parentElement.remove();
        renderCanvas();
    }

    layerTrash.addEventListener('click', deleteLayer );

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
    
}

import { globalState } from './piskelState.mjs'

export function onMouseMove(e){
    let canvas = document.getElementsByClassName('main-canvas-area__frame')[0];
    if(!globalState.currentDrawComponent) {
        return;
    }
    let currX = e.clientX - canvas.offsetLeft;
    let currY = e.clientY - canvas.offsetTop;
    let needRender = globalState.currentDrawComponent.onMouseMove(currX, currY);
    if(needRender) {
        let componentState = globalState.currentDrawComponent.getComponentState();
        renderCanvas(componentState);
    }

}

export function onMouseDown(e){
    let canvas = document.getElementsByClassName('main-canvas-area__frame')[0];
    if(!globalState.currentDrawComponent) {
        return;
    }
    let currX = e.clientX - canvas.offsetLeft;
    let currY = e.clientY - canvas.offsetTop;
    let needRender = globalState.currentDrawComponent.onMouseDown(currX, currY);
    if(needRender) {
        let componentState = globalState.currentDrawComponent.getComponentState();
        renderCanvas(componentState);
    }
}

export function onMouseUp(e){
    let canvas = document.getElementsByClassName('main-canvas-area__frame')[0];
    if(!globalState.currentDrawComponent) {
        return;
    }
    let currX = e.clientX - canvas.offsetLeft;
    let currY = e.clientY - canvas.offsetTop;
    let needRender = globalState.currentDrawComponent.onMouseUp(currX, currY);
    if(needRender) {
        let componentState = globalState.currentDrawComponent.getComponentState();
        renderCanvas(componentState);
    }
}

export function onMouseOut(e){
    let canvas = document.getElementsByClassName('main-canvas-area__frame')[0];
    if(!globalState.currentDrawComponent) {
        return;
    }
    let currX = e.clientX - canvas.offsetLeft;
    let currY = e.clientY - canvas.offsetTop;
    let needRender = globalState.currentDrawComponent.onMouseOut(currX, currY);
    if(needRender) {
        let componentState = globalState.currentDrawComponent.getComponentState();
        renderCanvas(componentState);
    }
}

export function onClick(e){
    let canvas = document.getElementsByClassName('main-canvas-area__frame')[0];
    if(!globalState.currentDrawComponent) {
        return;
    }
    let currX = e.clientX - canvas.offsetLeft;
    let currY = e.clientY - canvas.offsetTop;
    let needRender = globalState.currentDrawComponent.onClick(currX, currY);
    if(needRender) {
        let componentState = globalState.currentDrawComponent.getComponentState();
        renderCanvas(componentState);
    }
}

export function renderCanvas(componentState) {
    let currentFrameData = globalState.getCurrentFrame().getCurrentLayer();
    let currentSmallCanvas = globalState.getCurrentFrame().frameCanvas;
    let smallContext = currentSmallCanvas.getContext("2d");

    let mainCanvas = document.getElementsByClassName("main-canvas-area__frame")[0];
    let ctx = mainCanvas.getContext("2d");
    let scale = globalState.canvasSize / globalState.smallCanvasSize;
    ctx.clearRect(0, 0, globalState.canvasSize, globalState.canvasSize);
    smallContext.clearRect(0, 0, globalState.canvasSize / scale, globalState.canvasSize / scale);
    for (let key in globalState.getCurrentFrame().frameData){
        if ( key == globalState.getCurrentFrame().currentLayerId){
            continue;
        }
        let data = globalState.getCurrentFrame().frameData[key];
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i].length; j++) {
                if (data[i][j][3] == false){
                    continue;
                }
                ctx.fillStyle = data[i][j][2];
                ctx.fillRect(data[i][j][0], data[i][j][1], globalState.canvasPixelSize, globalState.canvasPixelSize);
            }
        }
    }

    for(let i = 0; i < currentFrameData.length; i++) {
        for(let j = 0; j < currentFrameData[i].length; j++) {
            ctx.fillStyle = currentFrameData[i][j][2];
            smallContext.fillStyle = currentFrameData[i][j][2];
            if(componentState && componentState[i][j][3] == true) {
                ctx.fillStyle = componentState[i][j][2];
                smallContext.fillStyle = componentState[i][j][3];  
            }
            if (currentFrameData[i][j][3] == false 
                && (!componentState || componentState[i][j][3]== false)){
                    continue;
            }
            ctx.fillRect(currentFrameData[i][j][0], currentFrameData[i][j][1], globalState.canvasPixelSize, globalState.canvasPixelSize);
            smallContext.fillRect(
                currentFrameData[i][j][0] / scale, 
                currentFrameData[i][j][1] / scale, 
                globalState.canvasPixelSize / scale, 
                globalState.canvasPixelSize / scale
            );
        }
    }
}



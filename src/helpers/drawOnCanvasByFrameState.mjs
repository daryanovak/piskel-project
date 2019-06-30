import { drawRectangle } from '../helpers/paint.mjs'
import { globalState } from '../piskelState.mjs'

export function drawOnCanvasByFrameState(id){
    let frameData = globalState.getFrameById(id).frameData;
    for(var i = 0; i < frameData.length; i++) {
        for(var j = 0; j < frameData.length; j++) {
            drawRectangle(frameData[i][j][0], frameData[i][j][1], globalState.canvasPixelSize, globalState.canvasPixelSize,  frameData[i][j][2]);
        }
    }
}

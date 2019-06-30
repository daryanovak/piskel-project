import { removeFrame } from './removeFrame.mjs';
import { copyFrame } from './copyFrame.mjs';
import { generateCanvasState } from '../helpers/generateCanvasState.mjs';
import { globalState } from '../piskelState.mjs';
import { FrameState } from './frameState.mjs';


export function setCurrentState() {
    globalState.setCurrentState(id);
    //eventHandlers.renderCanvas();
}

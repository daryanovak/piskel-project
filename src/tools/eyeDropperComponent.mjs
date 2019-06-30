import { getSquare, getSquarePosition } from '../helpers/getSquare.mjs'
import { globalState } from '../piskelState.mjs'

export function EyeDropperComponent(frameData) {
    let self = this;

    this.onMouseUp = function (x, y) {
        return false;
    }

    this.onMouseDown = function (x, y) {
        return false;
    }

    this.onMouseOut = function (x, y) {
        return false;
    }

    this.getComponentState = function () {
        return self.myFrameData;
    }

    this.onMouseMove = function (x, y) {
        return false;
    }

    this.onClick = function (x, y) {
        const currentColor = document.getElementsByClassName('pallete__colors-option__current-color')[0];
        let square = getSquare(x, y, globalState.getCurrentFrame().getCurrentLayer(), globalState.canvasPixelSize);
        currentColor.style.backgroundColor = square[2];
        globalState.currentBrushColor = square[2];
        return false;
    }


    return this;
}

import { getSquare, getSquarePosition } from '../helpers/getSquare.mjs'
import { globalState } from '../piskelState.mjs'

export function HighlighterComponent() {
    let self = this;
    this.frameData = null;
    this.myFrameData = [];
    this.capacity = 0.9;

   
    this.reset = function () {
        self.myFrameData = [];
        self.frameData = globalState.getCurrentFrame().getCurrentLayer();
        for (let i = 0; i < self.frameData.length; i++) {
            let frameRow = [];
            for (let j = 0; j < self.frameData[i].length; j++) {
                let data = [...self.frameData[i][j]];
                frameRow.push(data);
            }
            self.myFrameData.push(frameRow);
        }
    }

    this.applyState = function () {
        for (let i = 0; i < self.myFrameData.length; i++) {
            for (let j = 0; j < self.myFrameData[i].length; j++) {
                if (self.myFrameData[i][j][3] == true) {
                    self.frameData[i][j][2] = self.myFrameData[i][j][2];
                    self.frameData[i][j][3] = true;
                }
            }
        }
        self.reset();
    }


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
        let canvas = document.getElementsByClassName('main-canvas-area__frame')[0];
        const currentColor = document.getElementsByClassName('pallete__colors-option__current-color')[0];
        const canvasContext = canvas.getContext('2d');
        const p = canvasContext.getImageData(x, y, 10, 10).data;
        if (self.capacity > 0){
            self.capacity = (self.capacity - 0.1).toFixed(2);
            var color = `rgb(${p[0]}, ${p[1]}, ${p[2]},  ${self.capacity} )`;
        } 
        globalState.setCurrentBrushColor(color);
        currentColor.style.backgroundColor = color;
        self.tryDrawPoint(x,y);
        return true;
    }

    this.tryDrawPoint = function (x, y) {
        let square = getSquare(x, y, self.myFrameData, globalState.canvasPixelSize);
        square[2] = globalState.currentBrushColor;
        square[3] = true;
    }

    self.reset();

    return this;
}

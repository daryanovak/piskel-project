import { getSquarePosition } from '../helpers/getSquare.mjs'
import { globalState } from '../piskelState.mjs'


export function RectangleComponent() {
    let self = this;
    this.frameData = null;
    this.myFrameData = [];
    this.isMouseDown = false;
    this.startSquare = null;

  
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
        self.applyState();
        self.isMouseDown = false;
        return true;
    }

    this.onClick = function (x, y) {
        return false;
    }

    this.onMouseDown = function (x, y) {
        self.isMouseDown = true;
        self.startSquare = getSquarePosition(x, y, globalState.canvasPixelSize);
        return true;
    }

    this.onMouseOut = function (x, y) {
        return false;
    }

    this.getComponentState = function () {
        return self.myFrameData;
    }

    this.onMouseMove = function (x, y) {
        if (!self.isMouseDown) {
            return false;
        }
        self.reset();
        let currentSquare = getSquarePosition(x, y, globalState.canvasPixelSize);
        let maxY = Math.max(self.startSquare.x, currentSquare.x);
        let minY = Math.min(self.startSquare.x, currentSquare.x);
        let startY = self.startSquare.y;
        let finishY = currentSquare.y;
        for(let i = minY; i <= maxY; i++){
            self.myFrameData[startY][i][2] = globalState.currentBrushColor;
            self.myFrameData[startY][i][3] = true;
            self.myFrameData[finishY][i][2] = globalState.currentBrushColor;
            self.myFrameData[finishY][i][3] = true;
        }
        let maxX = Math.max(self.startSquare.y, currentSquare.y);
        let minX = Math.min(self.startSquare.y, currentSquare.y);
        let startX = self.startSquare.x;
        let finishX = currentSquare.x;
        for(let i = minX; i <= maxX; i++){
            self.myFrameData[i][startX][2] = globalState.currentBrushColor;
            self.myFrameData[i][startX][3] = true;
            self.myFrameData[i][finishX][2] = globalState.currentBrushColor;
            self.myFrameData[i][finishX][3] = true;
        }
        return true;
    }
    self.reset();

    return this;
}



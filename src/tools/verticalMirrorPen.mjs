import { getSquare, getSquarePosition } from '../helpers/getSquare.mjs'
import { globalState } from '../piskelState.mjs'

export function VerticalMirrorPenComponent() {
    let self = this;
    this.frameData = null;
    this.myFrameData = [];
    this.isMouseDown = false;

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

    this.onMouseDown = function (x, y) {
        self.tryDrawPoint(x, y);
        self.isMouseDown = true;
        return true;
    }

    this.onMouseOut = function (x, y) {
        return false;
    }

    this.onClick = function (x, y) {
        self.tryDrawPoint(x, y);
        return true;
    }


    this.getComponentState = function () {
        return self.myFrameData;
    }

    this.onMouseMove = function (x, y) {
        if (!self.isMouseDown) {
            return false;
        }
        self.tryDrawPoint(x, y);
        return true;
    }

    this.tryDrawPoint = function (x, y) {
        let square = getSquare(x, y, self.myFrameData, globalState.canvasPixelSize);
        square[2] = globalState.currentBrushColor;
        square[3] = true;
        let squareSecondPoint = getSquare(400 -x, y, self.myFrameData, globalState.canvasPixelSize);
        squareSecondPoint[2] = globalState.currentBrushColor;
        squareSecondPoint[3] = true;
    }

    self.reset();

    return this;
}

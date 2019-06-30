import { getSquare, getSquarePosition } from '../helpers/getSquare.mjs'
import { globalState } from '../piskelState.mjs'

export function PaintBucketComponent() {
    let self = this;
    this.frameData = null;
    this.myFrameData = [];

   
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
        fill(x, y, globalState.currentBrushColor);
        return true;
    }

    this.tryDrawPoint = function (x, y) {
        let square = getSquare(x, y, self.myFrameData, globalState.canvasPixelSize);
        square[2] = globalState.currentBrushColor;
        square[3] = true;
    }

    function fill(pixelX, pixelY, color) {
        let masks = [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 }
        ];
        let curFrameData = globalState.getCurrentFrame().getCurrentLayer();
        if (!curFrameData) {
            return;
        }
        let currentSquare = getSquare(pixelX, pixelY, curFrameData, globalState.canvasPixelSize);
        if (!currentSquare) {
            return;
        }
        let startColor = currentSquare[2];
    
        let queue = [{ x: currentSquare[0], y: currentSquare[1] }];
        let used_set = new Set();
    
        while (queue.length) {
            let currentPoint = queue.pop();
            let curSquare = getSquare(currentPoint.x, currentPoint.y, curFrameData, globalState.canvasPixelSize);
            curSquare[2] = color;
            curSquare[3] = true;
            used_set.add(currentPoint.y * globalState.canvasSize + currentPoint.x);
            for (let i = 0; i < masks.length; i++) {
                let mask = masks[i];
                let newPoint = { x: currentPoint.x + mask.x * globalState.canvasPixelSize, y: currentPoint.y + mask.y * globalState.canvasPixelSize };
                let newSquare = getSquare(newPoint.x, newPoint.y, curFrameData, globalState.canvasPixelSize);
                if (newPoint.x < 0 || newPoint.x >= globalState.canvasSize || newPoint.y < 0 || newPoint.y >= globalState.canvasSize) {
                    continue;
                }
                if (used_set.has(newPoint.y * globalState.canvasSize + newPoint.x)) {
                    continue;
                }
                if (isEqualColor(newSquare[2], startColor)) {
                    queue.push(newPoint);
                }
            }
        }
    }
    
    function isEqualColor(one, second) {
        for (let i = 0; i < 4; i++) {
          if (one[i] != second[i]) {
            return false;
          }
        }
        return true;
      }

    self.reset();

    return this;
}

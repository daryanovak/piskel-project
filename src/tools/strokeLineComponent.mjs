import { getSquare, getSquarePosition } from '../helpers/getSquare.mjs'
import { globalState } from '../piskelState.mjs'

export function LineComponent(frameData) {
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
        if ( currentSquare.x == self.startSquare.x && currentSquare.y == self.startSquare.y){
            self.tryDrawPoint(x, y);
            return true;
        }
        if ( self.startSquare.x == currentSquare.x ) {
            let maxY = Math.max(self.startSquare.y, currentSquare.y);
            let minY = Math.min(self.startSquare.y, currentSquare.y);
            for(let startY = minY; startY <= maxY; startY++){
                self.myFrameData[startY][currentSquare.x][2] = globalState.currentBrushColor;
                self.myFrameData[startY][currentSquare.x][3] = true;
            }
            return true;
        }

        if ( self.startSquare.y == currentSquare.y ) {
            let maxX = Math.max(self.startSquare.x, currentSquare.x);
            let minX = Math.min(self.startSquare.x, currentSquare.x);
            for(let startX = minX; startX <= maxX; startX++){
                self.myFrameData[currentSquare.y][startX][2] = globalState.currentBrushColor;
                self.myFrameData[currentSquare.y][startX][3] = true;
            }
            return true;
        }

        let startPoint = { x: self.startSquare.x,  y: self.startSquare.y};
        let finishPoint = { x: currentSquare.x , y: currentSquare.y};
        if ( startPoint.x > finishPoint.x) {
            let x = startPoint.x;
            startPoint.x = finishPoint.x;
            finishPoint.x = x;
            let y = startPoint.y;
            finishPoint.y = y;
        }

        for (let i = startPoint.x; i <= finishPoint.x; i++) {
            let curY = startPoint.y + (finishPoint.y - startPoint.y) * (i -startPoint.x) / (finishPoint.x - startPoint.x);
            self.myFrameData[Math.floor(curY)][i][2] = globalState.currentBrushColor;
            self.myFrameData[Math.floor(curY)][i][3] = true;
        }
        
        return true;
    }

    this.tryDrawPoint = function (x, y) {
        let square = getSquare(x, y, self.myFrameData, globalState.canvasPixelSize);
        square[2] = "rgba(255,255,255, 1)";
        square[3] = true;
    }

    self.reset();

    return this;
}


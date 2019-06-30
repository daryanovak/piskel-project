import { generateCanvasState } from './helpers/generateCanvasState.mjs'
import { FrameState } from './frame/frameState.mjs'

function PiskelState() {
    let self = this;
    this.smallCanvasSize = 200;
    this.smallCanvasPixelSize = 5;
    this.canvasSize = 400;
    this.canvasPixelSize = 10;
    this.framesArray = [];
    this.currentFrame = 0;
    this.currentBrushColor = "rgba(255,255,255,1)";
    this.currentDrawComponent = null;

    this.getCurrentBrushColor = function () {
        return this.currentBrushColor;
    }

    this.setCurrentBrushColor = function (color) {
        this.currentBrushColor = color;
    }


    this.getCurrentFrame = function () {
        return self.framesArray[self.currentFrame];
    }

    this.getFrameById = function (id) {
        return self.framesArray[id];
    }


    this.setCurrentFrame = function (id) {
        self.currentFrame = id;
    }

    this.removeCurrentFrame = function (id) {
        if (!id) {
            id = self.currentFrame;
        }
        delete self.framesArray[id];
        for (let key in self.framesArray) {
            self.currentFrame = key;
            return;
        }
        self.currentFrame = -1;
    }

    this.addFrame = function (frame) {
        self.framesArray.push(frame);
        self.currentFrame = frame.id;
    }

    this.changeSize = function (size) {
        for (let key in self.framesArray) {
            let oldFrame = self.framesArray[key];
            let newFrame = new FrameState(oldFrame.id, oldFrame.frameCanvas, generateCanvasState(size, globalState.canvasSize), oldFrame.currentLayerId);
            for (let layerId in oldFrame.frameData) {
                newFrame.frameData[layerId] = generateCanvasState(size, globalState.canvasSize);
                for (let i = 0; i < oldFrame.frameData[layerId].length; i++) {
                    if (i >= newFrame.frameData[layerId].length) {
                        break;
                    }
                    for (let j = 0; j < oldFrame.frameData[layerId][i].length; j++) {
                        if (j >= newFrame.frameData[layerId][i].length) {
                            break;
                        }
                        newFrame.frameData[layerId][i][j][2] = oldFrame.frameData[layerId][i][j][2];
                        newFrame.frameData[layerId][i][j][3] = oldFrame.frameData[layerId][i][j][3];
                    }
                }
            }
            newFrame.currentLayerId = oldFrame.currentLayerId;
            newFrame.setCurrentLayer(newFrame.currentLayerId);
            self.framesArray[key] = newFrame;
        }
        self.canvasPixelSize = size;
        if (self.currentDrawComponent) {
            self.currentDrawComponent.reset();
        }
    }
}

export let globalState = new PiskelState();




export function getSquare(pixelX, pixelY, canvasState, pixelSize){
    let line = Math.floor(pixelX / pixelSize);
    let column = Math.floor(pixelY / pixelSize);
    if(canvasState.length == 0) {
        return null;
    }
    let rows = canvasState.length;
    let cols = canvasState[0].length;

    if(line < 0 || line >= rows || column < 0 || column >= cols) {
        return null;
    }

    return canvasState[line][column];
}

export function getSquarePosition(pixelX, pixelY, pixelSize) {
    let line = Math.floor(pixelX / pixelSize);
    let column = Math.floor(pixelY / pixelSize);
    return {x: column, y:line};
}

export function getPixelInfo(squareX, squareY, canvasState) {
    return canvasState[squareX][squareY];
}

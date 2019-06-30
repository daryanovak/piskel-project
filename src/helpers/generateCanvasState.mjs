export function generateCanvasState(pixelsSize, size) {
    let result = [];
    let countOfSquare = size / pixelsSize;
    let arrayOfSquare = [];
    let count = 0;

    for (let X = 0; X < size; X += pixelsSize) {
        let currentCoordinates;
        for (let Y = 0; Y < size; Y += pixelsSize) {
            currentCoordinates = [X, Y, "rgba(255,255,255, 1)",false];
            result.push(currentCoordinates);
        }
    }

    for (let i = 0; i < countOfSquare; i++) {
        let rowArr = [];
        for (let j = 0; j < countOfSquare; j++) {
            rowArr.push(result[count]);
            count++;
        }
        arrayOfSquare.push(rowArr);
    }
    return arrayOfSquare;
}

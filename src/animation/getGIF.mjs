import { arrayOfCanvasImages } from '../frame/newFrame.mjs'

export function getGIF() {
    let mainCanvas = document.getElementsByClassName("main-canvas-area__frame")[0];
    let ctx = mainCanvas.getContext("2d");

    var encoder = new GIFEncoder();
    encoder.setRepeat(0); 
    encoder.setDelay(500); 
    encoder.start();
    encoder.addFrame(ctx);
    encoder.finish();

    var binary_gif = encoder.stream().getData();
    var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
    encoder.download("download.gif");

}

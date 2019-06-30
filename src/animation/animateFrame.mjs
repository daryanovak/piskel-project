import { arrayOfCanvasImages } from '../frame/newFrame.mjs'
import { fullScreen } from  './fullScreenMode.mjs'

export function viewImages() {
    let animateImage = document.getElementsByClassName('animation-player__image')[0];
    fullScreen(animateImage);

    const sleep = m => new Promise(r => setTimeout(r, m));
    let i = 0;
    (async () => {
        for (let j = 0; j < arrayOfCanvasImages.length *100; j++){
            let inputScoreValue = 1000 / document.getElementById("scoreValue").value ;
            animateImage.src = arrayOfCanvasImages[i];
            i++;
            if (i == arrayOfCanvasImages.length) {
                i = 0;
            }
            await sleep(inputScoreValue);
        }
    })()
}




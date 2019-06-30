import { newFrame } from './frame/newFrame.mjs'
import { viewImages } from './animation/animateFrame.mjs'
import { globalState } from './piskelState.mjs'
import { downloadFunc } from './tools/saveCanvasAsPng.mjs'
import dataImage from '../assets/images/dataImage.mjs'
import { BrushComponent} from './tools/brushComponent.mjs'
import { EraserComponent} from './tools/eraserComponent.mjs'
import { RectangleComponent} from './tools/rectangleComponent.mjs'
import { LineComponent} from './tools/strokeLineComponent.mjs'
import { PaintBucketComponent} from './tools/paintBucketComponent.mjs'
import { EyeDropperComponent} from './tools/EyeDropperComponent.mjs'
import { HighlighterComponent } from './tools/highlighterComponent.mjs'
import { DitheringComponent } from './tools/ditheringComponent.mjs'
import { PaintAllPixelsComponent } from './tools/paintAllPixelsComponent.mjs'
import {renderCanvas} from './eventHandlers.mjs';
import { addNewLayer } from './layers/addNewLayer.mjs'
import { removeLayer } from './layers/removeLayer.mjs'
import {onMouseDown, onMouseMove, onMouseOut, onClick, onMouseUp } from './eventHandlers.mjs'
import {KeyboardEvent } from './helpers/KeyboardEvent.mjs'
import { VerticalMirrorPenComponent } from './tools/verticalMirrorPen.mjs';

const addFrameButton = document.getElementsByClassName('frame-tools__add-button')[0];
const animateButton = document.getElementsByClassName('animation-player')[0];
const canvas = document.getElementsByClassName('main-canvas-area__frame')[0];
const canvasSizeMenu = document.getElementsByClassName('canvas-size')[0];
const menu = document.getElementsByClassName('pallete__option')[0];
const mainCanvasMenu = document.getElementsByClassName('main-canvas-buttons')[0];
const layerMenu = document.getElementsByClassName('pallete__layers-option')[0];
const download = document.getElementById('downloader');



download.addEventListener('click', downloadFunc);

layerMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('pallete__layers-option__add-layer')) {
    addNewLayer();
  }
  if (e.target.classList.contains('pallete__layers-option__delete-layer')) {
    removeLayer();
  }
});

canvasSizeMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('canvas-size__5')) {
    globalState.changeSize(5);
    renderCanvas();
  }

  if (e.target.classList.contains('canvas-size__10')) {
    globalState.changeSize(10);
    renderCanvas();
  }

  if (e.target.classList.contains('canvas-size__20')) {
    globalState.changeSize(20);
    renderCanvas();
  }
});

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseout', onMouseOut);
canvas.addEventListener('click', onClick);

addFrameButton.addEventListener('click', newFrame);
animateButton.addEventListener('click', viewImages);

menu.addEventListener('click', (e) => {
  if (e.target.classList.contains('pallete__tools__paint-brush')) {
    globalState.currentDrawComponent = new BrushComponent();
  }

  if (e.target.classList.contains('pallete__tools__rectangle')) {
    console.log("rectangle");
    globalState.currentDrawComponent = new RectangleComponent(globalState.getCurrentFrame().frameData);
  }

  if (e.target.classList.contains('pallete__tools__paint-bucket')) {
    globalState.currentDrawComponent = new PaintBucketComponent();

  }
  
  if (e.target.classList.contains('pallete__tools__line')) {
    globalState.currentDrawComponent = new LineComponent();
  }

  if (e.target.classList.contains('pallete__tools__choose-color')) {
    chooseColor();
  }

  if (e.target.classList.contains('pallete__tools__eraser')) {
    globalState.currentDrawComponent = new EraserComponent();
  }

  if (e.target.classList.contains('pallete__tools__highlighter')) {
    globalState.currentDrawComponent = new HighlighterComponent();
  }
  
  if (e.target.classList.contains('pallete__tools__color-picker')) {
    globalState.currentDrawComponent = new EyeDropperComponent();
  }

  if (e.target.classList.contains('pallete__tools__dithering')) {
    globalState.currentDrawComponent = new DitheringComponent();
  }

  if (e.target.classList.contains('pallete__tools__paint-all-pixels')) {
    globalState.currentDrawComponent = new PaintAllPixelsComponent();
  }

  if (e.target.classList.contains('pallete__tools__mirror-pen')) {
    globalState.currentDrawComponent = new VerticalMirrorPenComponent();

  }

});

function addButtonsListener(e) {
  const evtobj = window.event || e;
  if (evtobj.keyCode === KeyboardEvent.ctrlZ && evtobj.ctrlKey) { 
    globalState.currentDrawComponent = new BrushComponent(globalState.getCurrentFrame().frameData);
  }
  if (evtobj.keyCode === KeyboardEvent.ctrlX && evtobj.ctrlKey) {
    globalState.currentDrawComponent = new PaintBucketComponent(globalState.getCurrentFrame().frameData);
  }
  if (evtobj.keyCode === KeyboardEvent.ctrlC && evtobj.ctrlKey) { 
    chooseColor();
  }
  if (evtobj.keyCode === KeyboardEvent.ctrlA && evtobj.ctrlKey) { 
    globalState.currentDrawComponent = new EraserComponent(globalState.getCurrentFrame().frameData);
  }
  if (evtobj.keyCode === KeyboardEvent.ctrlS && evtobj.ctrlKey) {
    globalState.currentDrawComponent = new HighlighterComponent(globalState.getCurrentFrame().frameData);
  }

  if (evtobj.keyCode === KeyboardEvent.ctrlD && evtobj.ctrlKey) {
    globalState.currentDrawComponent = new RectangleComponent(globalState.getCurrentFrame().frameData);
  }

  if (evtobj.keyCode === KeyboardEvent.ctrlF && evtobj.ctrlKey) {
    globalState.currentDrawComponent = new LineComponent(globalState.getCurrentFrame().frameData);
  }
}

window.addEventListener('keydown', addButtonsListener);



function chooseColor() {

  const colorPickerCanvas = document.getElementsByClassName('pallete__color-canvas-picker')[0];

  function getPosition(obj) {
    let resultObj = obj;
    let curleft = 0;
    let curtop = 0;
    if (resultObj.offsetParent) {
      do {
        curleft += resultObj.offsetLeft;
        curtop += resultObj.offsetTop;
      } while (resultObj = resultObj.offsetParent);
      return { x: curleft, y: curtop };
    }
    return undefined;
  }

  function drawImageFromWebUrl(sourceurl) {
    const img = new Image();

    img.addEventListener('load', () => {
      colorPickerCanvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, 0, 0, 150, 150);
    });

    img.setAttribute('src', sourceurl);
  }

  drawImageFromWebUrl(dataImage());
  
  let currentToolCallback = (e) => {
    const pos = getPosition(e.target);
    const x = e.pageX - pos.x;
    const y = e.pageY - pos.y;
    const c = e.target.getContext('2d');
    const p = c.getImageData(x, y, 1, 1).data;

    const currentColor = document.getElementsByClassName('pallete__colors-option__current-color')[0];
    const prevColor = document.getElementsByClassName('pallete__colors-option__prev-color')[0];
    const cur = getComputedStyle(currentColor);
    const bgColor = cur.backgroundColor;
    prevColor.style.backgroundColor = bgColor;
    const color = `rgb(${p[0]}, ${p[1]}, ${p[2]}, ${p[3]})`;
    currentColor.style.backgroundColor = color;
    globalState.currentBrushColor = color;
  };
  colorPickerCanvas.addEventListener('click', currentToolCallback);
}



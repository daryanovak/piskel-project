export function FrameState(id, frameCanvas, frameData, layerId) {
  this.id = id;
  this.frameCanvas = frameCanvas;
  this.currentLayerId = layerId;
  this.frameData = { [layerId]: frameData };
  let self = this;

  this.addLayer = function (id, layerData) {
    self.moveLayerToBottom(self.currentLayerId);
    self.frameData[id] = layerData;
    self.currentLayerId = id;
  }

  this.removeLayer = function (id) {
    if (Object.keys(self.frameData).length == 1) {
      return;
    }
    delete self.frameData[id];
    if (id != self.currentLayerId) {
      return;
    }
    for (let key in self.frameData) {
      self.moveLayerToTop(key);
      self.currentLayerId = key;
      return;
    }
  }

  this.moveLayerToTop = function (id) {
    if (id == self.currentLayerId) {
      return;
    }
    for (let i = 0; i < self.frameData[id].length; i++) {
      for (let j = 0; j < self.frameData[id][i].length; j++) {
        let currentColor = self.frameData[id][i][j][2];
        let arr = currentColor.slice(5, -1);
        let rgba = arr.split(",");
        let capacity = +rgba[3] * 2;
        let newColor = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 1)`;
        self.frameData[id][i][j][2] = newColor;
      }
    }
  }

    this.moveLayerToBottom = function (id) {
      for (let i = 0; i < self.frameData[id].length; i++) {
        for (let j = 0; j < self.frameData[id][i].length; j++) {
          let currentColor = self.frameData[id][i][j][2];
          let arr = currentColor.slice(5, -1);
          let rgba = arr.split(",");
          let capacity = +rgba[3] /2;
          let newColor = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 0.5)`;
          self.frameData[id][i][j][2] = newColor;
        }
      }
    }

    this.getCurrentLayer = function () {
      return self.frameData[self.currentLayerId];
    }

    this.setCurrentLayer = function (id) {
      if (id == self.currentLayerId){
        return;
      }
      self.moveLayerToBottom(self.currentLayerId);
      self.moveLayerToTop(id);
      self.currentLayerId = id;
    }

    //при нажатии на сам слой globalstate. getfram().setCurrent(id)
    //при нажатии на плюс this.addLayer (layerData generate id)
    // remove с id dom

    return this;
  }

'use strict';
const deskCanvasSize = 500;
const mobileCanvaSize = 350;


let gCanvas;
let ctx;
let gPrevEvent = [];


let gMemeState = {
  selectedImgElement: 0,
  selectedLine: 0,
  lines: []
};

// -------------------------------------------------------

function storeNewText(newText) {
  var newLine = {
    id: getLastLine(),
    isOnEditMode: false,
    isOnDragMode: false,
    txt: newText,
    size: '40',
    fontFamely: "Impact",
    color: "white",
    stroke: "black",
    align: "left",
    strokeSize: 4,
    startX: 160,
    startY: locateStartY(),
    endX: function () {
      return this.startX + (this.txt.length * this.size / 2.2)
    },
    endY: function () {
      return this.startY + (+this.size)
    },
    widthX: function () {
      return this.endX() - this.startX
    },
    heightY: function () {
      return this.endY() - this.startY
    },
  }

  gMemeState.lines.push(newLine);
  return newLine
}



function locateStartY() {
  let lineCount = gMemeState.lines.length
  return (lineCount < 1) ? 100 : (lineCount === 1) ? 400 : 250;
}



function getLastLine() {
  return gMemeState.lines.length
}

// -------------------------------------------------------------------------


async function initCanvas(memeId) {
  let elMeme = document.querySelector(`#meme_${memeId}`);
  gMemeState.selectedImgElement = elMeme;
  gCanvas = document.querySelector('#my-canvas');
  ctx = gCanvas.getContext('2d');
  let { width, height } = resizeCanvas();
  await ctx.drawImage(elMeme, 0, 0, width, height);
  onScreenResize()
}


async function renderCanvas() {
  gCanvas = document.querySelector('#my-canvas');
  ctx = gCanvas.getContext('2d');
  let { width, height } = resizeCanvas();
  await ctx.drawImage(gMemeState.selectedImgElement, 0, 0, width, height);
  if (gMemeState.lines.length === 0) return
  gMemeState.lines.forEach(line => {
    drawText(line)
  })
}

function resizeCanvas() {
  if (window.innerWidth < 400) {
    gCanvas.width = window.innerWidth
    gCanvas.height = window.innerWidth / 1.5
    return { width: window.innerWidth, height: window.innerWidth / 1.5 }
  }
  else if (window.innerWidth < 740) {
    gCanvas.width = mobileCanvaSize
    gCanvas.height = mobileCanvaSize
    return { width: mobileCanvaSize, height: mobileCanvaSize }
  }
  else {
    gCanvas.width = deskCanvasSize
    gCanvas.height = deskCanvasSize;
    return { width: deskCanvasSize, height: deskCanvasSize }
  }
}


function onScreenResize() {
  window.addEventListener('resize', renderCanvas, false);
  window.addEventListener('orientationchange', renderCanvas, false);
}



// -------------------------------------------------------------------------

function drawText(newTextObject) {
  ctx.save()
  ctx.font = `${newTextObject.size}px ${newTextObject.fontFamely}`;
  ctx.lineWidth = newTextObject.strokeSize;
  ctx.fillStyle = newTextObject.color
  ctx.strokeStyle = newTextObject.stroke
  ctx.textAlign = newTextObject.align;
  ctx.textBaseline = "top"
  ctx.strokeText(newTextObject.txt, newTextObject.startX, newTextObject.startY);
  ctx.fillText(newTextObject.txt, newTextObject.startX, newTextObject.startY);
  ctx.restore()
}



function drawRect(line) {
  ctx.beginPath();
  ctx.lineWidth = 3
  ctx.rect(line.startX - 5, line.startY - 3, line.widthX(), line.heightY() + 3);
  ctx.stroke();
}



// -------------------------------------------------------------------------



function onMove(event) {
  getHoverCursor(event)
  if(gMemeState.lines.length !== 0) {
    let line =  gMemeState.lines[gMemeState.selectedLine];
    if (line.isOnDragMode === true && gPrevEvent.offsetX) {
      moveText(event,line)
    }
  }
}


function getHoverCursor(event) {
  if (!getLineOnHover(event)) {
    gCanvas.style.cursor = 'initial';
  } else {
    gCanvas.style.cursor = 'pointer';
  }
}

function onClickLine(event) {
  renderCanvas()
  clearEditMode();
  if(getLineOnHover(event) === 1) {
    let line =  gMemeState.lines[gMemeState.selectedLine];
    drawRect(line);
    line.isOnEditMode = true
  }
}


function onMouseDown(ev) {
  if (!getLineOnHover(ev)) {
    return;
  }
  gMemeState.lines[gMemeState.selectedLine].isOnDragMode = true;
  setPreviousEvent(ev)
}

function onMouseUp() {
  gMemeState.lines.forEach((line) => {
    line.isOnDragMode = false
  })
}


// -------------------------------------------------------------------------

function moveText(event,line) {
  line.startX += getDiff(gPrevEvent.offsetX, event.offsetX);
  line.startY = line.startY + getDiff(gPrevEvent.offsetY, event.offsetY)
  renderCanvas()
  setPreviousEvent(event)
}


function setPreviousEvent(event) {
  if (!event) {
    gPrevEvent.offsetX = null
    gPrevEvent.offsetY = null
  }
  else {
    gPrevEvent.offsetX = event.offsetX
    gPrevEvent.offsetY = event.offsetY
  }
}

function getLineOnHover(event) {
  for (let i = 0; i < gMemeState.lines.length; i++) {
    var line = gMemeState.lines[i];
    var endX = line.endX();
    var endY = line.endY();
    if (event.offsetX > line.startX && event.offsetX < endX
      && event.offsetY > line.startY && event.offsetY < endY) {
      gMemeState.selectedLine = i
      return 1
    }
  }
}


function clearEditMode() {
  gMemeState.lines.map(line => {
    return line.isOnEditMode = false
  })
}


function setTextUp() {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
    line.startY = line.startY - 10;
    line.startY--;
    renderCanvas()
    drawRect(line)
  }
}

function setTextDown() {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  line.startY = line.startY + 10;
  renderCanvas()
  drawRect(line)
  }
}


function setTextRight() {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  line.startX = line.startX + 10;
  renderCanvas()
  drawRect(line)
  }
}

function setTextLeft() {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  line.startX = line.startX - 10;
  renderCanvas()
  drawRect(line)
  }
}

function setDeleteLine() {
  if(gMemeState.lines.length === 0) return
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  gMemeState.lines.splice(line.id, 1);
  gMemeState.lines.forEach((line, index) => line.id = index)
  clearEditMode()
  renderCanvas()
  }
}

function increaseText() {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  line.size = (parseInt(line.size) + 1).toString();
  renderCanvas()
  drawRect(line)
  }
}

function decreaseText() {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  line.size = (parseInt(line.size) - 1).toString();
  renderCanvas()
  drawRect(line)
  }
}

function AlignTextLeft() {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  line.startX = line.startX - line.widthX()
  renderCanvas()
  clearEditMode()
  }
}

function AlignTextRight() {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  line.startX = line.endX()
  renderCanvas()
  clearEditMode()
  }
}


function AlignTextCenter() {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  line.startX = line.widthX() / 2
  renderCanvas()
  clearEditMode()
  }
}


function ChangeFont(fontName) {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  line.fontFamely = fontName;
  renderCanvas()
  clearEditMode()
  }
}


function changeColor(colorId) {
  let line =  gMemeState.lines[gMemeState.selectedLine]
  if(line.isOnEditMode) {
  line.color = colorId;
  renderCanvas()
  clearEditMode()
  }
}


function downloadCanvas() {
  let download = document.querySelector('.canvas-download')
  var data = gCanvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  download.href = data;
}


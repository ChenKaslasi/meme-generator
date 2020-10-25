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

// -------------------------------------------------------------------------

function addNewLine() {
  var newLine = {
    id: getLastLine(),
    isOnEditMode: true,
    isOnDragMode: false,
    txt: 'Add text',
    size: '40',
    fontFamely: "Impact",
    color: "white",
    stroke: "black",
    align: "left",
    strokeSize: 4,
    startX: 160,
    startY: 250,
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


function getLastLine() {
  return gMemeState.lines.length
}


function checkEmptyLines() {
  if (gMemeState.lines.length === 0) addNewLine()
}

// -------------------------------------------------------------------------


async function initCanvas(memeId) {
  let elMeme = document.querySelector(`#meme_${memeId}`);
  gMemeState.selectedImgElement = elMeme;
  gCanvas = document.querySelector('#my-canvas');
  ctx = gCanvas.getContext('2d');
  let { width, height } = resizeCanvas();
  await ctx.drawImage(elMeme, 0, 0, width, height);
  addNewLine()
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


function getHoverCursor(event) {
  if (!getLineOnHover(event)) {
    gCanvas.style.cursor = 'initial';
  } else {
    gCanvas.style.cursor = 'pointer';
  }
}


function onMove(event) {
  getHoverCursor(event)
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine];
  if (line.isOnDragMode === true && gPrevEvent.offsetX) {
    moveText(event, line)
  }
}


function onClickLine(event) {
  let eltxtInput = document.querySelector('.txt-input')
  renderCanvas()
  clearEditMode();
  eltxtInput.value = '';
  if (getLineOnHover(event) === 1) {
    let line = gMemeState.lines[gMemeState.selectedLine];
    eltxtInput.value = line.txt
    drawRect(line);
    line.isOnEditMode = true
  }
}


function onMouseDown(ev) {
  if (!getLineOnHover(ev)) {
    return;
  }
  let line = gMemeState.lines[gMemeState.selectedLine];
  line.isOnDragMode = true;
  setPreviousEvent(ev)
}

function onMouseUp() {
  gMemeState.lines.forEach((line) => {
    line.isOnDragMode = false
  })
}


// -------------------------------------------------------------------------

function moveText(event, line) {
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

// -------------------------------------------------------------------------


function storeNewText(str) {
  if (!str) return
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  line.txt = str
}

function addText() {
  clearEditMode()
  addNewLine()
}

function setSwitchLines() {
  if(gMemeState.lines.length <= 1) return
  gMemeState.selectedLine++ ;
  if(gMemeState.selectedLine >= gMemeState.lines.length) {
    gMemeState.selectedLine = 0;
    renderCanvas();
    drawRect(gMemeState.lines[gMemeState.selectedLine])
  } else {
    renderCanvas();
    drawRect(gMemeState.lines[gMemeState.selectedLine ])
    }
  }

function setTextUp() {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    line.startY = line.startY - 10;
    line.startY--;
    drawRect(line)
  }
}

function setTextDown() {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    line.startY = line.startY + 10;
    drawRect(line)
  }
}


function setTextRight() {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    line.startX = line.startX + 10;
    drawRect(line)
  }
}

function setTextLeft() {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    line.startX = line.startX - 10;
    drawRect(line)
  }
}

function setDeleteLine() {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    gMemeState.lines.splice(line.id, 1);
    gMemeState.lines.forEach((line, index) => line.id = index)
    gMemeState.selectedLine = 0;
    clearEditMode()
  }
}

function increaseText() {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  // if (line.isOnEditMode) {
    line.size = (parseInt(line.size) + 1).toString();
    drawRect(line)
  // }
}

function decreaseText() {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    line.size = (parseInt(line.size) - 1).toString();
    drawRect(line)
  }
}

function AlignTextLeft() {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    line.startX = line.startX - line.widthX()
  }
}

function AlignTextRight() {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    line.startX = line.endX()
  }
}


function AlignTextCenter() {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    line.startX = line.widthX() / 2
  }
}


function ChangeFont(fontName) {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    line.fontFamely = fontName;
    clearEditMode()
  }
}


function changeColor(colorId) {
  checkEmptyLines()
  let line = gMemeState.lines[gMemeState.selectedLine]
  if (line.isOnEditMode) {
    line.color = colorId;
    clearEditMode()
  }
}


function downloadCanvas() {
  let download = document.querySelector('.canvas-download')
  var data = gCanvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  download.href = data;
}

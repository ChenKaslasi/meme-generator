'use strict';
const deskCanvasSize = 500;
const mobileCanvaSize = 350;


let gCanvas;
let ctx;

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
    txt: newText,
    size: '40',
    fontFamely: "Impact",
    color: "white",
    stroke: "black",
    align: "left",
    strokeSize: 4,
    startX: 160,
    startY: locateStartY(),
    endX: function() {
      return this.startX + (this.txt.length * this.size / 2.2)
    },
    endY: function() {
      return this.startY + (+this.size)
    },
    widthX: function() {
      return this.endX() - this.startX
    },
    heightY: function() {
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
  let canvasSizes = resizeCanvas();
  await ctx.drawImage(elMeme, 0, 0, canvasSizes, canvasSizes);
  onScreenResize()
}


async function renderCanvas() {
  gCanvas = document.querySelector('#my-canvas');
  ctx = gCanvas.getContext('2d');
  let canvasSizes = resizeCanvas();
  await ctx.drawImage(gMemeState.selectedImgElement, 0, 0, canvasSizes, canvasSizes);
  if (!gMemeState.lines) return
  gMemeState.lines.forEach(line => {
    drawText(line)
  })
}

function resizeCanvas() {
  if(window.innerHeight < 740) {
    gCanvas.width = window.innerHeight - 250
    gCanvas.height = window.innerHeight - 250;
    return window.innerHeight - 250
  }
  else {
    gCanvas.width = deskCanvasSize
    gCanvas.height = deskCanvasSize;
    return deskCanvasSize
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
    ctx.rect(line.startX,line.startY,line.widthX(),line.heightY());
  ctx.stroke();
}



// -------------------------------------------------------------------------


function onMove(event) {

    if(!getLineOnHover(event)) {
      gCanvas.style.cursor = 'initial' ;
      return
    }
     else {
      gCanvas.style.cursor = 'pointer'
    }
}


function onClickLine(event) {
    renderCanvas()
    clearEditMode()
    if(!getLineOnHover(event)) {
      return ;
    } 
    else {
      var line = getLineOnHover(event);
      drawRect(line);
      let {id} = line ;
      gMemeState.lines[id].isOnEditMode = true
    } 
}



function onDragOver(event) {
  if(!getLineOnHover(event)) return 
  else {
    var line =  getLineOnHover(event)
    
  }
}


function getLineOnHover(event) {
  for (let i = 0; i < gMemeState.lines.length; i++) {
    var line = gMemeState.lines[i];
    var endX = line.endX();
    var endY = line.endY();
    if (event.offsetX > line.startX && event.offsetX < endX
      && event.offsetY > line.startY && event.offsetY < endY){
        return line
    } 
  }
}
  
function clearEditMode() {
  gMemeState.lines.map(line => {
    return line.isOnEditMode = false
  })
}


function getLineToEdit() {
  var correctLine =  gMemeState.lines.filter(line => {
    return line.isOnEditMode === true
  })
  if (correctLine.length !== 0) {
    return correctLine[0].id
  }
}

function setTextUp() {
  var id = getLineToEdit();
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].startY =  gMemeState.lines[id].startY - 10;
  gMemeState.lines[id].startY-- ;
  renderCanvas()
  drawRect(gMemeState.lines[id])
}

function setTextDown() {
  var id = getLineToEdit(); 
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].startY =  gMemeState.lines[id].startY + 10;
  renderCanvas()
  drawRect(gMemeState.lines[id])
}


function setTextRight() {
  var id = getLineToEdit(); 
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].startX =  gMemeState.lines[id].startX + 10;
  renderCanvas()
  drawRect(gMemeState.lines[id])
}

function setTextLeft() {
  var id = getLineToEdit(); 
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].startX =  gMemeState.lines[id].startX - 10;
  renderCanvas()
  drawRect(gMemeState.lines[id])
}


function setDeleteLine() {
  var id = getLineToEdit();
  if(id === undefined) {
    return
  } 
  gMemeState.lines.splice(id)
  clearEditMode()
  renderCanvas()
}
 
function increaseText() {
  var id = getLineToEdit();
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].size = (parseInt(gMemeState.lines[id].size) + 1).toString();
  renderCanvas()
  drawRect(gMemeState.lines[id])
}

function decreaseText() {
  var id = getLineToEdit();
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].size = (parseInt(gMemeState.lines[id].size) - 1).toString();
  renderCanvas()
  drawRect(gMemeState.lines[id])
}

function AlignTextLeft()  {
  var id = getLineToEdit();
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].align = 'left';
  clearEditMode()
  renderCanvas()
}

function AlignTextRight()  {
  var id = getLineToEdit();
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].align = 'right';
  renderCanvas()
  clearEditMode()
}



function AlignTextCenter()  {
  var id = getLineToEdit();
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].align = 'center';
  renderCanvas()
  clearEditMode()
}


function ChangeFont(fontName) {
  var id = getLineToEdit();
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].fontFamely = fontName;
  renderCanvas()
  clearEditMode()
}


function changeColor(colorId) {
  var id = getLineToEdit();
  if(id === undefined) {
    return
  } 
  gMemeState.lines[id].color = colorId;
  renderCanvas()
  clearEditMode()
}


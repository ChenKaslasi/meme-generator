'use strict';

const canvasX = 500
const canvasY = 500

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
    strokeSize: 4,
    startX: 160,
    startY: locateStartY(),
    endX: function() {
      return this.startX + (this.txt.length * 18)
    } ,
    endY: function() {
      return this.startY + (+this.size)
    }
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

// -----------------------------------------------------


async function initCanvas(memeId) {
  let elMeme = document.querySelector(`#meme_${memeId}`);
  gMemeState.selectedImgElement = elMeme
  gCanvas = document.querySelector('#my-canvas');
  ctx = gCanvas.getContext('2d');
  await ctx.drawImage(elMeme, 0, 0, canvasX, canvasY)
}


async function renderCanvas() {
  // clearEditMode()
  gCanvas = document.querySelector('#my-canvas');
  ctx = gCanvas.getContext('2d');
  await ctx.drawImage(gMemeState.selectedImgElement, 0, 0, canvasX, canvasY);
  if (!gMemeState.lines) return
  gMemeState.lines.forEach(line => {
    drawText(line)
  })
}

// -------------------------------------------------------------------------

function drawText(newTextObject) {
  ctx.save()
  ctx.font = `${newTextObject.size}px ${newTextObject.fontFamely}`;
  ctx.lineWidth = newTextObject.strokeSize;
  ctx.fillStyle = newTextObject.color
  ctx.strokeStyle = newTextObject.stroke
  ctx.textAlign = 'left';
  ctx.textBaseline = "top"
  ctx.strokeText(newTextObject.txt, newTextObject.startX, newTextObject.startY);
  ctx.fillText(newTextObject.txt, newTextObject.startX, newTextObject.startY);
  ctx.restore()
}



function drawRect(line) {
  let { startX, startY, txt } = line
  ctx.beginPath();
  ctx.rect(startX, startY, 20 * txt.length, 40);
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
  return correctLine[0].id
}

function setTextUp() {
  var id = getLineToEdit(); 
  gMemeState.lines[id].startY =  gMemeState.lines[id].startY - 10;
  gMemeState.lines[id].startY-- ;
  renderCanvas()
  drawRect(gMemeState.lines[id])
}

function setTextDown() {
  var id = getLineToEdit(); 
  gMemeState.lines[id].startY =  gMemeState.lines[id].startY + 10;
  renderCanvas()
  drawRect(gMemeState.lines[id])
}




function setDeleteLine() {
  var id = getLineToEdit(); 
  gMemeState.lines.splice(id)
  clearEditMode()
  renderCanvas()
}
 
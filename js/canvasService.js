'use strict';


let gCanvas;
let ctx;


let gMemeState = {
  selectedImgId: 0,
  selectedLine: 0,
  lines: [
    {
      id : 0,
      txt: 'I never eat Falafel',
      size: '48',
      color: 'white',
      stroke: '#000000',
      fontFamely: 'Arial',
    }
  ]
};


function storeNewText(newText) {
  let newLine = {
    id: getLastLine(),
    txt : newText,
    size: '48',
    color: 'white',
    stroke: '#000000',
    fontFamely: 'Poppins-Regular',
  } 

  gMemeState.lines.push(newLine);
  return newLine
}

async function initCanvas(memeId) {
  gMemeState.id = memeId
  let elMeme = document.querySelector(`#meme_${memeId}`);
  gCanvas = document.querySelector('#my-canvas');
  ctx = gCanvas.getContext('2d');
  await ctx.drawImage(elMeme, 0, 0, 500, 500)
}

function getLastLine() {
  return gMemeState.lines.length + 1
}


// const drawText = (txt, size, color, stroke, strokeSize, fontFamely, x, y) => {
function drawText(newTextObject, x, y) {
    ctx.save()
    ctx.strokeStyle = newTextObject.stroke
    ctx.fillStyle = newTextObject.color
    ctx.font = `${newTextObject.size}px ${newTextObject.fontFamely}`;
    ctx.textAlign = 'left';
    // ctx.lineWidth = newTextObject.strokeSize;
    // ctx.strokeText(newTextObject.txt, x, y);
    ctx.strokeText(newTextObject.txt, x, y);
    ctx.fillText(newTextObject.txt, x, y);
    ctx.restore()
}
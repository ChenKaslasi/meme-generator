'use strict';


const gStickers = [{ id: 1, url: 'img/gilad.webp' },
{ id: 2, url: 'img/turtule.webp' },
{ id: 3, url: 'img/supreme.webp' },
{ id: 4, url: 'img/louis.webp' },
{ id: 5, url: 'img/pothead.webp' }]
let gIndexSticker = 0;


async function initCanvas(memeId) {
  let elMeme = document.querySelector(`#meme_${memeId}`);
  let gCanvas = document.querySelector('#my-canvas');
  let ctx = gCanvas.getContext('2d');
  await ctx.drawImage(elMeme, 0, 0, 500, 500)
}



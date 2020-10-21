'use strict';

function init() {
  renderGallery();
}


function renderGallery() {
  const elGallery = document.querySelector('.gallery-content');
  const galleryData = getGalleryData();
  let htmlStr = '';
  galleryData.forEach( meme => 
    {
      htmlStr += `<div class="meme" onclick="onSelectedMeme(${meme.id+1})">
        <img id="meme_${meme.id+1}" src=${meme.url} alt=${meme.id+1}>
    </div>`;
    });
  elGallery.innerHTML = htmlStr
}



function renderKeyWords() {

}


function onSelectedMeme(imgID) {
  document.querySelector('.canvas-container').style="display:flex";
  document.querySelector('.gallery-container').style="display:none;";
  initCanvas(imgID)
}


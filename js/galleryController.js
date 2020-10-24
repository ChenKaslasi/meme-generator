'use strict';

function init() {
  renderGallery();
  renderKeyWords();
}


function renderGallery() {
  const elGallery = document.querySelector('.gallery-content');
  const galleryData = getGalleryData();
  let htmlStr = '';
  galleryData.forEach(meme => {
    htmlStr += `<div class="meme" onclick="onSelectedMeme(${meme.id + 1})">
        <img id="meme_${meme.id + 1}" src=${meme.url} alt=${meme.id + 1}>
    </div>`;
  });
  elGallery.innerHTML = htmlStr
}

function renderKeyWords() {
  let tags = getRandomTags()
  let htmlStr = '<ul class="keyWords-list flex clean-list">';
  tags.forEach((tag) => {
    htmlStr +=`<li class ="${tag} pointer" onclick="onSearch(this)">${tag}</li>`
  });
  htmlStr +='</ul>'
  document.querySelector('.keyWords').innerHTML = htmlStr
}

function renderFilterdMemes(memelist) {
  const elGallery = document.querySelector('.gallery-content');
  let htmlStr = '';
  memelist.forEach(meme => {
    htmlStr += `<div class="meme" onclick="onSelectedMeme(${meme.id + 1})">
        <img id="meme_${meme.id + 1}" src=${meme.url} alt=${meme.id + 1}>
    </div>`;
  });
  elGallery.innerHTML = htmlStr
}


function onSelectedMeme(imgID) {
  document.querySelector('.canvas-container').style = "display:flex";
  document.querySelector('.gallery-container').style = "display:none;";
  initCanvas(imgID)
}

function toggleNav() {
  document.querySelector('.main-menu').classList.toggle('toggleNav')
}


function onSearch(el) {
  let searchValue = el.value || el.innerHTML
  let memesList = filterMemes(searchValue)
  if(el.value === '') {
    renderGallery()
    return
  }
  renderFilterdMemes(memesList)
}


function onMoreClick() {
  document.querySelector('.keyWords').innerHTML = '';
  renderKeyWords()
}

'use strict';

function onTextChange(str) {
  storeNewText(str)
  renderCanvas();
}



function onAddLine() {
  addText()
  renderCanvas();
}

function onTextUp() {
  setTextUp()
  renderCanvas()
}

function onTextDown() {
  setTextDown()
  renderCanvas()
}
function onTextRight() {
  setTextRight()
  renderCanvas()
}
function onTextLeft() {
  setTextLeft()
  renderCanvas()
}

function onSwitch() {
  setSwitchLines()
}

function onDeleteLine() {
  setDeleteLine()
  document.querySelector('.txt-input').value = '';
  renderCanvas()
}

function onIncreaseText() {
  increaseText()
  renderCanvas()
}
function onDecreaseText() {
  decreaseText()
  renderCanvas()
}

function onAlignLeft() {
  AlignTextLeft()
  renderCanvas()
}
function onAlignRight() {
  AlignTextRight()
  renderCanvas()
}
function onAlignCenter() {
  AlignTextCenter()
  renderCanvas()
}

function onChangeFont(el) {
  ChangeFont(el.value)
  renderCanvas()
}

function onColorChange(el) {
  changeColor(el.value)
  renderCanvas()
}

function onDownloadCanvas() {
  downloadCanvas()
}
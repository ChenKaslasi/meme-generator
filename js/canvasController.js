'use strict';

function onAddText() {
  let newText = document.querySelector('.txt-input').value
  document.querySelector('.txt-input').value = ''
  let newTextObj = storeNewText(newText);
  drawText(newTextObj);
  renderCanvas()
}


function onTextUp() {
  setTextUp()
}

function onTextDown() {
  setTextDown()
}


function onSwitch() {
  setSwitchLines()
}


function onDeleteLine() {
  setDeleteLine()
}


function onIncreaseText() {

}
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
function onTextRight() {
  setTextRight()
}
function onTextLeft() {
  setTextLeft()
}

function onSwitch() {
  setSwitchLines()
}

function onDeleteLine() {
  setDeleteLine()
}

function onIncreaseText() {
  increaseText()
}
function onDecreaseText() {
  decreaseText()
}

function onAlignLeft() {
  AlignTextLeft() 
}
function onAlignRight() {
  AlignTextRight() 
}
function onAlignCenter() {
  AlignTextCenter()
}

function onChangeFont(el) {
  ChangeFont(el.value)
}

function onColorChange(el) {
  changeColor(el.value)
}
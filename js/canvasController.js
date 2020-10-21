'use strict' ;

function onAddText() {
  let newText = document.querySelector('.txt-input').value
  let newTextObj = storeNewText(newText);
  // console.log(newTextObj);
  drawText(newTextObj,200,200);
}
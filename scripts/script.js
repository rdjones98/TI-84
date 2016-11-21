'use strict';

// Set up!
var ROM = new Rom();
var KEYPAD = new Keypad(ROM);

// Add mouse click listener
function whatClicked(evt) {
    KEYPAD.mouseClicked(evt);
}
var mouseListener = document.getElementById("theCanvas");
mouseListener.addEventListener("click", whatClicked, false);

// add key listeners
document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  if (keyName === 'Control') {
      ROM.secondPressed();
    return;
  }


  if(keyName=="Enter")
    ROM.enterPressed();
  else if(keyName=="1"|| keyName=="2" || keyName=="3"|| keyName=="4" || keyName=="5"|| keyName=="6" || keyName=="7"|| keyName=="8" || keyName=="9"|| keyName=="10" )
    ROM.numberPressed(keyName);
  else if(keyName=="+"|| keyName=="-" || keyName=="*"|| keyName=="/" || keyName=="^" || keyName=="(" || keyName==")")
    ROM.operatorPressed(keyName);
  else if(keyName=="ArrowRight"|| keyName=="ArrowLeft" || keyName=="ArrowUp"|| keyName=="ArrowDown")
    ROM.arrowPressed(keyName);
  else if(keyName=="Delete")
    ROM.deletePressed();
  else if(keyName=="g" || keyName == "G")
    ROM.graphPressed();
  else if(keyName=="y" || keyName == "Y")
    ROM.yEqualsPressed();
  else if(keyName=="x" || keyName == "X")
    ROM.xPressed();
  else if(keyName=="t" || keyName == "T")
    ROM.tracePressed();
  else if(keyName=="Backspace")
  {
    ROM.arrowPressed("ArrowLeft")
    ROM.deletePressed();
  }
  else {
    console.log(`${keyName}`);
  }
}, false);

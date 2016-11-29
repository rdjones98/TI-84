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
  const which = event.which;

  if(keyName=="Enter")
    ROM.enterPressed();
  else if(keyName=="." || keyName=="1"|| keyName=="2" || keyName=="3"|| keyName=="4" || keyName=="5"|| keyName=="6" || keyName=="7"|| keyName=="8" || keyName=="9"|| keyName=="0" )
    ROM.numberPressed(keyName);
  else if(keyName=="-" || keyName=="*"||  keyName=="^" || keyName=="(" || keyName==")")
    ROM.operatorPressed(keyName);
  else if(keyName=="+")
  {
    ROM.secondPressed(false);
    ROM.operatorPressed(keyName);
  }
  else if(keyName=="/")
    ROM.dividePressed();
  else if(which==39)
    ROM.arrowPressed("ArrowRight");
  else if(which==37)
    ROM.arrowPressed("ArrowLeft");
  else if(which=38)
    ROM.arrowPressed("ArrowUp");
  else if(which=4=0)
    ROM.arrowPressed("ArrowDown");
  else if(keyName=="Delete")
    ROM.deletePressed();
  else if(ROM.is2ndPressed() && (keyName=="a" || keyName == "A") )
    ROM.matrixPressed();
  else if(keyName=="g" || keyName == "G")
    ROM.graphPressed();
  else if(keyName=="e" || keyName == "E")
  {
    ROM.secondPressed(true);
    ROM.lnPressed();
  }
  else if(keyName=="y" || keyName == "Y")
    ROM.yEqualsPressed();
  else if(keyName=="x" || keyName == "X")
    ROM.xPressed();
  else if(keyName=="t" || keyName == "T")
    ROM.tracePressed();
  else if(keyName=="w" || keyName == "W")
    ROM.windowPressed();
  else if(keyName=="c" || keyName == "C")
    ROM.clearPressed();
  else if(keyName=="m" || keyName == "M")
    ROM.modePressed();
  else if(keyName=="s" || keyName == "S")
    ROM.statPressed();
  else if(keyName=="v" || keyName == "V")
    alert(ROM.VERSION);
  else if(keyName=="z" || keyName == "Z")
    ROM.zoomPressed();
  else if(keyName=="Escape")
    ROM.setStateCalculator();
  else if(keyName=="Shift")
    ROM.secondPressed();
  else if(keyName=="Backspace")
  {
    ROM.arrowPressed("ArrowLeft")
    ROM.deletePressed();
  }
  else {
    console.log(`${keyName}`);
  }
}, false);

"use strict";

//Set up App!
var canvas = document.getElementById("theCanvas");
canvas.addEventListener("click", mouseClicked, false);
canvas.addEventListener("touchend", touchEnd, false);

// Create instance of ROM and Keypad (this maps the image to mouse clicks) 
var ROM 	= new Rom(canvas.clientWidth, canvas.clientHeight);
var KEYPAD 	= new Keypad(ROM, canvas.clientWidth, canvas.clientHeight);

//Add mouse click listener
function mouseClicked(evt) {
	KEYPAD.mouseClicked(evt);
}
function touchEnd(evt){
	evt.preventDefault();
	var newEvt = {};
	newEvt.clientX = evt.changedTouches[0].clientX;
	newEvt.clientY = evt.changedTouches[0].clientY;
	mouseClicked(newEvt);
}

//add key listener so user can type
document.addEventListener('keydown', keyPressed, false);
function keyPressed(event)
{
	const keyName = event.key;
	const which = event.which;

	var secondPressed = false;
	try 
	{
		if(keyName=="Enter")
			ROM.enterPressed();
		else if(keyName=="." || keyName=="1"|| keyName=="2" || keyName=="3"|| 
				keyName=="4" || keyName=="5"|| keyName=="6" || keyName=="7"|| 
				keyName=="8" || keyName=="9"|| keyName=="0" )
			ROM.numberPressed(keyName);
		else if(keyName=="-" || keyName=="*"||  keyName=="^" || 
				keyName=="(" || keyName==")")
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
		else if(which==38)
			ROM.arrowPressed("ArrowUp");
		else if(which==40)
			ROM.arrowPressed("ArrowDown");
		else if(keyName=="Delete")
			ROM.deletePressed();
		else if(keyName=="a" || keyName == "A" )
			ROM.matrixPressed();
		else if(keyName=="e" || keyName == "E")
		{
			ROM.secondPressed(true);
			ROM.dividePressed();
		}
		else if(keyName=="g" || keyName == "G")
			ROM.graphPressed();
		else if(keyName=="i" || keyName == "I")
			ROM.trigPressed("sin(");
		else if(keyName=="c" || keyName == "C")
			ROM.clearPressed();
		else if(keyName=="l" || keyName == "L")
			ROM.logPressed();
		else if(keyName=="m" || keyName == "M")
			ROM.modePressed();
		else if(keyName=="n" || keyName == "N")
			ROM.lnPressed();
		else if(keyName=="o" || keyName == "O")
			ROM.trigPressed("cos(");
		else if(keyName=="p" || keyName == "P" )
			ROM.powerOfPressed();
		else if(keyName=="q" || keyName == "Q" )
			ROM.modePressed();
		else if(keyName=="s" || keyName == "S")
			ROM.statPressed();
		else if(keyName=="t" || keyName == "T")
			ROM.tracePressed();
		else if(keyName=="w" || keyName == "W")
			ROM.windowPressed();
		else if(keyName=="x" || keyName == "X")
			ROM.xPressed();
		else if(keyName=="y" || keyName == "Y")
			ROM.yEqualsPressed();
		else if(keyName=="z" || keyName == "Z")
			ROM.zoomPressed();
		else if(keyName=="Escape")
			ROM.setStateCalculator();
		else if(keyName=="Shift")
		{
			ROM.secondPressed();
			secondPressed = true;
		}
		else if(keyName=="Backspace")
		{
			ROM.arrowPressed("ArrowLeft");
			ROM.deletePressed();
		}
		else {
			console.log(keyName);
		}
	}
	catch(err)
	{
		alert(err.stack);
	}
};

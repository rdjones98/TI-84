//class StateWindow{  constructor(aCanvas, aGraph, aRom)
function StateWindow(aCanvas, aGraph, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;
	this.GRAPH = aGraph;

	this.OFFSET  = 10;
	this.X = Canvas.X + Canvas.DIGIT_W*6;
	this.Y = Canvas.Y + Canvas.DIGIT_H ;
	
	this._data = new Array( new Array(new Digit(-10,false,Digit.DiGIT)),
							new Array(new Digit(10, false,Digit.DiGIT)),
							new Array(new Digit(1,  false,Digit.DiGIT)),
							new Array(new Digit(-10,false,Digit.DiGIT)),
							new Array(new Digit(10, false,Digit.DiGIT)),
							new Array(new Digit(1,  false,Digit.DiGIT)),
							new Array(new Digit(1,  false,Digit.DiGIT)));
	this.EDITOR = new Editor(this, this._data);
}

StateWindow.prototype.deletePressed = function()
{
	this.EDITOR.deletePressed();
};

StateWindow.prototype.clearPressed = function()
{
	this.deletePressed();
};

StateWindow.prototype.negativePressed = function()
{
	this.EDITOR.operatorPressed( Canvas.NEGATIVE);
};

StateWindow.prototype.operatorPressed = function(anOper)
{
	this.EDITOR.operatorPressed(anOper);
};

StateWindow.prototype.numberPressed = function(aNum)
{
	this.EDITOR.numberPressed(aNum);
};

StateWindow.prototype.enterPressed = function()
{
	this.EDITOR.evalEntry();
	this.arrowPressed(Keypad.A_DOWN);
};

StateWindow.prototype.arrowPressed = function(anArrow)
{
	this.EDITOR.arrowPressed(anArrow);

	if(anArrow == Keypad.A_UP )
	{
		this.EDITOR.evalEntry();
		if( this.EDITOR.getRow() == 0 )
			return;
		this.EDITOR.incrRow(-1);
		this.EDITOR.setCol(0);
	}
	else if(anArrow == Keypad.A_DOWN )
	{
		this.EDITOR.evalEntry();
		if( this.EDITOR.getRow() == this._data.length-1 )
			return;
		this.EDITOR.incrRow();
		this.EDITOR.setCol(0);
	}
};

StateWindow.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();
	var row = this.EDITOR.getRow();
	var col = this.EDITOR.getCol();
	
	this.CANVAS.drawFocusBox(this.X + col*Canvas.DIGIT_W, this.Y + row*Canvas.DIGIT_H);

	var x = Canvas.X+this.OFFSET;
	var y = Canvas.Y;
	this.CANVAS.print("WINDOW", Canvas.X, y += Canvas.DIGIT_H );
	this.CANVAS.print("Xmin=", x, y += Canvas.DIGIT_H );
	this.CANVAS.print(this._data[0], x + 5*Canvas.DIGIT_W, y);
	this.CANVAS.print("Xmax=", x, y += Canvas.DIGIT_H );
	this.CANVAS.print(this._data[1], x + 5*Canvas.DIGIT_W, y);
	this.CANVAS.print("Xscl="+this._data[2], x, y += Canvas.DIGIT_H, null, "gray" );
	this.CANVAS.print("Ymin=", x, y += Canvas.DIGIT_H );
	this.CANVAS.print(this._data[3], x + 5*Canvas.DIGIT_W, y);
	this.CANVAS.print("Ymax=", x, y += Canvas.DIGIT_H );
	this.CANVAS.print(this._data[4], x + 5*Canvas.DIGIT_W, y);
	this.CANVAS.print("Yscl="+this._data[5], x, y += Canvas.DIGIT_H, null, "gray" );
	this.CANVAS.print("Xres="+this._data[6], x, y += Canvas.DIGIT_H, null, "gray" );

	if(this.ROM.is2ndPressed())
		this.CANVAS.draw2ndButton();

};

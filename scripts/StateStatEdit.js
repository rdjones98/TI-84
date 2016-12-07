//class StateStatEdit{  constructor(aCanvas, aRom)
function StateStatEdit(aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;

	this.C1 = this.CANVAS.X;
	this.C2 = this.CANVAS.X + 7*aCanvas.DIGIT_W;
	this.C3 = this.CANVAS.X + 14*aCanvas.DIGIT_W;
	this.T_ROW1 = aCanvas.Y + aCanvas.DIGIT_H + 5;
	this._sel = 1;
	this._col = 0;
	this._row = 0;
	this._xVals = new Array();
	this._yVals = new Array();

	this._editing = false;
}
// Utilitiy Functions
StateStatEdit.prototype.getYVals = function()
{
	return this._yVals;
};

StateStatEdit.prototype.getXVals = function()
{
	return this._xVals;
};

StateStatEdit.prototype.getArray = function()
{
	if( this._sel == 1 )
		return this._xVals;
	else
		return this._yVals;
};

// Key Pressed Functions
StateStatEdit.prototype.deletePressed = function()
{
	var curArray = this.getArray();
	if(this.ROM.is2ndPressed())
	{
		if( this._row < curArray.length)
			curArray.splice(this._row, 0, 0);
	}
	else
	{
		if(this._row < curArray.length)
			curArray.splice(this._row, 1);
	}
};

StateStatEdit.prototype.numberPressed = function(aNum)
{
	var curArray = this.getArray();
	if( curArray.length<=this._row)
		curArray.push(aNum);
	else
	{
		if( ! this._editing )
			curArray[this._row] = "";
		curArray[this._row]+=aNum;
	}
	this._editing = true;
};

StateStatEdit.prototype.enterPressed = function()
{
	this.arrowPressed(Keypad.A_DOWN);
};

StateStatEdit.prototype.arrowPressed = function(anArrow)
{
	this._editing = false;

	if(anArrow == Keypad.A_LEFT || anArrow == Keypad.A_RIGHT)
	{
		if( this._sel == 1 )
		{
			this._sel = 2;
			if( this._row > this._yVals.length)
				this._row = this._yVals.length;
		}
		else
		{
			this._sel = 1;
			if( this._row > this._xVals.length)
				this._row = this._xVals.length;
		}
		this._col = 0;
	}
	else if(anArrow == Keypad.A_UP )
	{
		if( this._row == 0 )
			return;
		this._row --;
	}
	if(anArrow == Keypad.A_DOWN )
	{
		var curArray = this.getArray();

		if( this._row == curArray.length )
			return;
		this._row ++;
		this._col = 0;
	}
};

// Display Functions
StateStatEdit.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();

	if(this.ROM.is2ndPressed())
	{
		var x = this.CANVAS.WIDTH-this.CANVAS.DIGIT_W;
		var y = this.CANVAS.Y;
		this.CANVAS.draw2ndButton(x,y);
	}

	this.CANVAS.drawLn(this.C2, this.CANVAS.Y,this.C2, this.CANVAS.HEIGHT);
	this.CANVAS.drawLn(this.C3, this.CANVAS.Y,this.C3, this.CANVAS.HEIGHT);
	this.CANVAS.drawLn(this.C1, this.T_ROW1  ,this.CANVAS.WIDTH, this.T_ROW1);

	if( this._sel == 1)
	{
		this.CANVAS.drawFocusBox(this.C1, this.T_ROW1 + this._row*this.CANVAS.DIGIT_H, this.C2-this.C1-5);
	}
	else if( this._sel == 2)
	{
		this.CANVAS.drawFocusBox(this.C2+3, this.T_ROW1 + this._row*this.CANVAS.DIGIT_H, this.C3-this.C2-5);
	}
	this.CANVAS.print("L1",  this.C1, this.T_ROW1 - 5 );
	this.CANVAS.print("L2",  this.C2+3, this.T_ROW1 - 5);
	// Fill out any data
	for( var i=0; i<this._xVals.length; i++)
	{
		this.CANVAS.print(this._xVals[i], this.C1, this.T_ROW1 + this.CANVAS.DIGIT_H*(i+1));
	}
	for( var i=0; i<this._yVals.length; i++)
	{
		this.CANVAS.print(this._yVals[i], this.C2, this.T_ROW1 + this.CANVAS.DIGIT_H*(i+1));
	}
};

//class StateStatEdit{  constructor(aCanvas, aRom)
function StateStatEdit(aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;

	this.C1 = Canvas.X;
	this.C2 = Canvas.X + 7*Canvas.DIGIT_W;	
	this.C3 = Canvas.X + 14*Canvas.DIGIT_W;
	this.T_ROW1 = Canvas.Y + Canvas.DIGIT_H + 5;
	this._sel = 1;
	this._editing = false;
	
	this._xVals = new Array();
	this._yVals = new Array();
	this.XEDITOR = new Editor(this, this._xVals);
	this.YEDITOR = new Editor(this, this._yVals);

}
// Utility Functions
StateStatEdit.prototype.getYVals = function(){ return this._yVals; };
StateStatEdit.prototype.getXVals = function(){ return this._xVals; };

StateStatEdit.prototype.getArray = function(){ return this._sel==1 ?  this._xVals : this._yVals; };
StateStatEdit.prototype.getEditor= function(){ return this._sel==1 ?  this.XEDITOR: this.YEDITOR; };

// Key Pressed Functions
StateStatEdit.prototype.deletePressed = function()
{

	var curArray = this.getArray();
	var row = this.getEditor().getRow();
	
	if(this.ROM.is2ndPressed())
	{
		if( row < curArray.length)
			curArray.splice(row, 0, 0);
	}
	else
	{
		if(row < curArray.length)
			curArray.splice(row, 1);
	}

};

StateStatEdit.prototype.numberPressed = function(aNum)
{
	this.getEditor().numberPressed(aNum);
	this._editing = true;
};
StateStatEdit.prototype.operatorPressed = function(aNum)
{
	this.getEditor().operatorPressed(aNum);
	this._editing = true;
};

StateStatEdit.prototype.enterPressed = function()
{
	this.getEditor().evalEntry(7);
	this.arrowPressed(Keypad.A_DOWN);
};

StateStatEdit.prototype.arrowPressed = function(anArrow)
{
	this._editing = false;
	this.getEditor().evalEntry();

	if(anArrow == Keypad.A_LEFT || anArrow == Keypad.A_RIGHT)
	{
		if( this._sel == 1 )
		{
			this._sel = 2;
			if( this.getEditor().getRow() > this._yVals.length)
				this.getEditor().setRow(this._yVals.length);
		}
		else
		{
			this._sel = 1;
			if( this.getEditor().getRow() > this._xVals.length)
				this.getEditor().setRow(this._xVals.length);
		}
		this.getEditor().setCol(0);
	}
	else if(anArrow == Keypad.A_UP )
	{
		if( this.getEditor().getRow() == 0 )
			return;
		this.getEditor().incrRow(-1);
	}
	if(anArrow == Keypad.A_DOWN )
	{
		var curArray = this.getArray();

		if( this.getEditor().getRow() == curArray.length )
			return;
		this.getEditor().incrRow();
		this.getEditor().setCol(0);
	}

};

// Display Functions
StateStatEdit.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();

	if(this.ROM.is2ndPressed())
	{
		var x = Canvas.WIDTH-Canvas.DIGIT_W;
		var y = Canvas.Y;
		this.CANVAS.draw2ndButton(x,y);
	}

	this.CANVAS.drawLn(this.C2, Canvas.Y,this.C2, Canvas.HEIGHT);
	this.CANVAS.drawLn(this.C3, Canvas.Y,this.C3, Canvas.HEIGHT);
	this.CANVAS.drawLn(this.C1, this.T_ROW1  ,Canvas.WIDTH, this.T_ROW1);

	var row = this.getEditor().getRow();
	if( this._sel == 1)
	{
		this.CANVAS.drawFocusBox(this.C1, this.T_ROW1 + row*Canvas.DIGIT_H, this.C2-this.C1-5);
	}
	else if( this._sel == 2)
	{
		this.CANVAS.drawFocusBox(this.C2+3, this.T_ROW1 + row*Canvas.DIGIT_H, this.C3-this.C2-5);
	}
	this.CANVAS.print("L1",  this.C1, this.T_ROW1 - 5 );
	this.CANVAS.print("L2",  this.C2+3, this.T_ROW1 - 5);
	// Fill out any data
	for( var i=0; i<this._xVals.length; i++)
	{
		this.CANVAS.print(this._xVals[i], this.C1, this.T_ROW1 + Canvas.DIGIT_H*(i+1));
	}
	for( var i=0; i<this._yVals.length; i++)
	{
		this.CANVAS.print(this._yVals[i], this.C2, this.T_ROW1 + Canvas.DIGIT_H*(i+1));
	}
};

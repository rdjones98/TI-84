//class	StateYEquals{	constructor(aCanvas, aRom)
function StateYEquals(aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;
	this._equations = new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array());
	this.EDITOR = new Editor(this, this._equations);
	this.OFFSET = 4*Canvas.DIGIT_W;
	this.TOP = Canvas.Y + Canvas.DIGIT_H;
}

StateYEquals.prototype.clearPressed = function()
{
	this.EDITOR.setCol(0);
	this._equations[this.EDITOR._row]=new Array();
	this.repaint();
};

StateYEquals.prototype.numberPressed = function(aNum)
{
	this.EDITOR.numberPressed(aNum);
};

StateYEquals.prototype.xPressed = function()
{
	this.EDITOR.numberPressed("X");
};

StateYEquals.prototype.negativePressed = function()
{
	this.EDITOR.numberPressed(Canvas.NEGATIVE);
};

StateYEquals.prototype.operatorPressed = function(anOper)
{
	this.EDITOR.operatorPressed(anOper);
};
StateYEquals.prototype.functionPressed = function(aVal)
{
	this.EDITOR.functionPressed(aVal);
};

StateYEquals.prototype.yEqualsPressed = function()
{
	this.repaint();
};

StateYEquals.prototype.deletePressed = function()
{
	this.EDITOR.deletePressed();
};

StateYEquals.prototype.enterPressed = function()
{
	this.arrowPressed(Keypad.A_DOWN);
};

StateYEquals.prototype.arrowPressed = function(anArrow)
{
	this.EDITOR.arrowPressed(anArrow);

	if(anArrow == Keypad.A_UP )
	{
		if( this.EDITOR.getRow() == 0 )
			return;
		this.EDITOR.incrRow(-1);
		this.EDITOR.setCol(0);
	}
	else if(anArrow == Keypad.A_DOWN )
	{
		if( this.EDITOR.getRow() == this._equations.length-1 )
			return;
		this.EDITOR.incrRow();
		this.EDITOR.setCol(0);
	}
};

StateYEquals.prototype.getEquations = function()
{
	return this._equations;
};

StateYEquals.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();
	var row = this.EDITOR.getRow();
	var col = this.EDITOR.getCol();

	//draw focus appropriately before anything else so text will be on top
	var x = Canvas.X + this.OFFSET + this.EDITOR.getDisplayPosition()*Canvas.DIGIT_W;
	var y = this.TOP + row * Canvas.DIGIT_H;
	if( this._equations[row].length > col )
		this.CANVAS.drawFocusBox(x, y, null, this._equations[row][col].isSuper());
	else
		this.CANVAS.drawFocusBox(x, y, null, this.EDITOR._superScript);

	var x = Canvas.X;
	var y = Canvas.Y;
	y +=  Canvas.DIGIT_H;
	this.CANVAS.print("  Plot1 Plot2 Plot3", x, y,Canvas.SMALL_FONT);
	for( var i=0; i<7; i++)
	{
		y +=  Canvas.DIGIT_H;
		this.CANVAS.print("\\", x, y, null, Canvas.GRAPHCOLORS[i]);
		this.CANVAS.print("Y" + (i+1) + "=" , x+Canvas.DIGIT_W, y);
		this.CANVAS.print(this._equations[i], x+Canvas.DIGIT_W * 4, y);
	}

	if(this.ROM.is2ndPressed())
	{
		var x = Canvas.X + col * Canvas.DIGIT_W + this.OFFSET;
		var y = Canvas.Y + (row+1) * Canvas.DIGIT_H;
		this.CANVAS.draw2ndButton(x,y);
	}
};

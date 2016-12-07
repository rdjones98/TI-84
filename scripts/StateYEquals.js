//class	StateYEquals{	constructor(aCanvas, aRom)
function StateYEquals(aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;
	this.EDITOR = new Editor(this);
	this._equations = new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array());
	this._row = 0;
	this._col = 0;
	this.OFFSET = 4*this.CANVAS.DIGIT_W;
	this.TOP = this.CANVAS.Y + this.CANVAS.DIGIT_H;
}
StateYEquals.prototype.getDataArray = function(){	return this._equations; };
StateYEquals.prototype.getRow 		= function(){	return this._row; };
StateYEquals.prototype.getCol 		= function(){	return this._col;};
StateYEquals.prototype.setCol 		= function(aNum){	this._col = aNum;};
StateYEquals.prototype.incrCol = function(aNum)
{
	if( typeof aNum == "undefined")
		aNum = 1;
	this._col += aNum;
};

StateYEquals.prototype.clearPressed = function()
{
	this._col = 0;
	this._equations[this._row]="";
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

StateYEquals.prototype.yEqualsPressed = function()
{
	this.repaint();
};

StateYEquals.prototype.deletePressed = function()
{
	this.EDITOR.deletePressed();
};

StateYEquals.prototype.trigPressed = function(aTrigFunc)
{
	this.EDITOR.trigPressed(aTrigFunc);
};

StateYEquals.prototype.logPressed = function()
{
	this.EDITOR.logPressed();
};

StateYEquals.prototype.lnPressed = function()
{
	this.EDITOR.lnPressed();
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
		if( this._row == 0 )
			return;
		this._row --;
		this._col = 0;
	}
	else if(anArrow == Keypad.A_DOWN )
	{
		if( this._row == this._equations.length-1 )
			return;
		this._row ++;
		this._col = 0;
	}
};

StateYEquals.prototype.getEquations = function()
{
	return this._equations;
};

StateYEquals.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();

	//draw focus appropriately before anything else so text will be on top
	var x = this.CANVAS.X + this.OFFSET + this.EDITOR.getDisplayPosition()*this.CANVAS.DIGIT_W;
	var y = this.TOP+this._row*this.CANVAS.DIGIT_H;
	if( this._equations[this._row].length > this._col)
		this.CANVAS.drawFocusBox(x, y, null, this._equations[this._row][this._col].isSuper());
	else
		this.CANVAS.drawFocusBox(x, y, null, this.EDITOR._superScript);

	var x = this.CANVAS.X;
	var y = this.CANVAS.Y;
	y +=  this.CANVAS.DIGIT_H;
	this.CANVAS.print("  Plot1 Plot2 Plot3", x, y,this.CANVAS.SMALL_FONT);
	for( var i=0; i<7; i++)
	{
		y +=  this.CANVAS.DIGIT_H;
		this.CANVAS.print("\\", x, y, null, Canvas.GRAPHCOLORS[i]);
		this.CANVAS.print("Y" + (i+1) + "=" , x+this.CANVAS.DIGIT_W, y);
		this.CANVAS.print(this._equations[i], x+this.CANVAS.DIGIT_W * 4, y);
	}

	if(this.ROM.is2ndPressed())
	{
		var x = this.CANVAS.X + this._col * this.CANVAS.DIGIT_W + this.OFFSET;
		var y = this.CANVAS.Y + (this._row+1) * this.CANVAS.DIGIT_H;
		this.CANVAS.draw2ndButton(x,y);
	}
};

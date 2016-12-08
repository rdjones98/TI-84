//class	StateGraphTable{	constructor( aCanvas, aYEquals, aRom )	{
function StateGraphTable(aCanvas, aYEquals, aRom)
{
	this.CANVAS = aCanvas;
	this.Y_EQUALS = aYEquals;
	this.ROM = aRom;

	this.T_COL1 = Canvas.X+5;
	this.T_COL2 = Canvas.X + Math.round(Canvas.WIDTH/4);
	this.T_COL3 = this.T_COL2 + Math.round(Canvas.WIDTH/4);
	this.T_ROW1 = Canvas.Y + Canvas.DIGIT_H + 5;
	this.T_MAXROWS = 6;

	this.IDX1 = -1;
	this.IDX2 = -1;

	this.CURSORROW = 0;
	this.CURSORIDX = 0;

	this.DIGIT_H = Canvas.DIGIT_H;

}


StateGraphTable.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();
	this.drawTable();
	this.drawFocusBox();

	for( var i=0; i<this.T_MAXROWS; i++ )
	{
		var y = this.DIGIT_H + this.T_ROW1 + i*this.DIGIT_H;
		this.CANVAS.print(this.CURSORIDX + i, this.T_COL1, y, Canvas.SMALL_FONT);
		if( this.IDX1 > -1 )
		{
			var str = this.ROM.evaluate(this.IDX1, this.CURSORIDX + i);
			this.CANVAS.print(this.CANVAS.formatNumber(str, 6), this.T_COL2, y, Canvas.SMALL_FONT);
		}
		if( this.IDX2 > -1 )
			this.CANVAS.print(this.ROM.evaluate(this.IDX2, this.CURSORIDX + i), this.T_COL3, y, Canvas.SMALL_FONT);
	}
};

// Draw tick marks on graph
StateGraphTable.prototype.drawTable = function()
{
	this.CANVAS.drawLn(Canvas.X, this.T_ROW1,Canvas.WIDTH, this.T_ROW1);
	this.CANVAS.drawLn(Canvas.X, Canvas.HEIGHT-this.DIGIT_H,Canvas.WIDTH, Canvas.HEIGHT-this.DIGIT_H);
	this.CANVAS.drawLn(this.T_COL2-7, Canvas.Y,this.T_COL2-7, Canvas.HEIGHT-Canvas.DIGIT_H);
	this.CANVAS.drawLn(this.T_COL3-7, Canvas.Y,this.T_COL3-7, Canvas.HEIGHT-Canvas.DIGIT_H);

	this.CANVAS.print("X",  (this.T_COL2 + this.T_COL1)/2, Canvas.Y + Canvas.DIGIT_H, Canvas.FONT );

	// Find the first 2 Y= that are filled out
	this.IDX1 = -1;
	this.IDX2 = -1;
	for( var i=0; i<7; i++)
		if( this.Y_EQUALS._equations[i].length > 0 )
		{
			this.IDX1 = i;
			for( var j=i+1; j<7; j++)
				if( this.Y_EQUALS._equations[j].length > 0 )
				{
					this.IDX2 = j;
					break;
				}
			break;
		}

	if(this.IDX1 > -1)
		this.CANVAS.print("Y" + (this.IDX1+1), this.T_COL2, Canvas.Y + Canvas.DIGIT_H );
	if(this.IDX2 > -1)
		this.CANVAS.print("Y" + (this.IDX2+1), this.T_COL3, Canvas.Y + Canvas.DIGIT_H );
	
	if(this.ROM.is2ndPressed())
		this.CANVAS.draw2ndButton();

};


StateGraphTable.prototype.evaluate = function(anEquationIdx, anX)
{
	var equ = this.Y_EQUALS._equations[anEquationIdx].replace(/X/g, "(" + anX + ")");
	var res = this.ROM.doMath(equ);
	var str = "" + res;
	if( str.length > 7)
		str = str.substring(0,7);
	return str;
};

StateGraphTable.prototype.drawFocusBox = function()
{
	var y = this.T_ROW1 + this.CURSORROW*this.DIGIT_H+2;

	this.CANVAS.CONTEXT.fillStyle = "gray";
	this.CANVAS.CONTEXT.fillRect(this.T_COL1, y, this.T_COL2-this.T_COL1-10,this.DIGIT_H);
	this.CANVAS.CONTEXT.fillStyle = "black";
};

StateGraphTable.prototype.arrowPressed = function(anArrow)
{
	if(anArrow == Keypad.A_LEFT )
		this.cursorLeft();
	else if( anArrow == Keypad.A_LEFT)
		this.cursorRight();
	else if( anArrow == Keypad.A_UP)
	{
		if( this.CURSORROW > 0)
			this.CURSORROW--;
		else
			this.CURSORIDX--;
	}
	else if( anArrow == Keypad.A_DOWN)
	{
		if( this.CURSORROW < this.T_MAXROWS-1)
			this.CURSORROW++;
		else
			this.CURSORIDX++;
	}
};

//class StateMatrix{  constructor(aCanvas, aRom)
function StateMatrix (aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;

	this._col = 0;
	this._row = 0;
	this._action = null;

	// Define everything for Editing a matrix
	this.COL1 = this.CANVAS.X + this.CANVAS.DIGIT_W;
	this.COL2 = this.CANVAS.X + 8*this.CANVAS.DIGIT_W;
	this.COL3 = this.CANVAS.X + 15*this.CANVAS.DIGIT_W;
	this._editCol = 0;
	this._editRow =0;
	this._viewportX = 0;    // Used for editing matrix that is bigger than screen
	this._editing = false;
	this._matrices = new Array();
	for( var i =0; i<7; i++)
	{
		this._matrices.push(new Array(new Array()));
	}
}

StateMatrix.prototype.getMatrix = function(aName)
{
	return this._matrices[ aName.charCodeAt(0) - 65 ];
};

StateMatrix.prototype.operatorPressed = function(anOper)
{
	this.numberPressed(anOper);
};

StateMatrix.prototype.enterPressed = function()
{
	if( this._col == 0 )
	{
		var calc = this.ROM.setStateCalculator();
		calc.matrixPressed(String.fromCharCode(65+this._row));
	}
	else if( this._col == 1 )
	{
		var calc = this.ROM.setStateCalculator();
		calc.operatorPressed("rref(");
	}
	else if( this._action == null)
		this._action = 0;
	else
		this.arrowPressed(Keypad.A_RIGHT);
};

StateMatrix.prototype.numberPressed = function(aNum)
{
	var mRows = this._matrices[this._row].length;
	var mCols = this._matrices[this._row][0].length;

	// Set Size of Matrix
	if( this._editRow == 0 )
	{
		if( this._editCol == 0)
			mRows = aNum;
		else
			mCols = aNum;

		this._matrices[this._row] = new Array();
		for( var r=0; r<mRows; r++)
		{
			this._matrices[this._row].push(new Array());
			for( var c = 0; c<mCols; c++)
			{
				this._matrices[this._row][r].push(new Array());
				this._matrices[this._row][r][c].push("0");
			}
		}
	}
	else
	{
		if( this._editing )
			this._matrices[this._row][this._editRow-1][this._editCol] += aNum;
		else
			this._matrices[this._row][this._editRow-1][this._editCol] = aNum;
		this._editing = true;
	}
};

StateMatrix.prototype.arrowPressed = function(anArrow)
{
	this._editing = false;
	if(anArrow == Keypad.A_LEFT )
	{
		if( this._action == 0 )
		{
			if(this._editCol > 0)
				this._editCol --;
			else if( this._editRow >1)
			{
				this._editRow --;
				this._editCol = this._matrices[this._row][this._editRow].length-1;
				if( this._editCol > 2)
					this._viewportX = this._editCol - 2;
			}

			if (this._editCol < this._viewportX)
				this._viewportX = this._editCol;

			return;
		}
		if( this._col > 0 )
			this._col --;
		else
			this._col = 2;
		if( this._col == 1)
			this._row = 6;
		else
			this._row = 0;
	}
	else if(anArrow == Keypad.A_RIGHT )
	{
		// We are editing a matrix
		if( this._action == 0 )
		{
			if(this._editRow == 0)
			{
				if( this._editCol == 0)
					this._editCol = 1;
				else {
					this._editRow ++;
					this._editCol = 0;
					this._viewportX = 0;
				}
			}
			else if( this._editCol < this._matrices[this._row][0].length - 1)
				this._editCol ++;
			else if( this._editRow < this._matrices[this._row].length){
				this._viewportX = 0;
				this._editRow ++;
				this._editCol = 0;
			}

			if (this._viewportX < this._editCol - 2)
				this._viewportX ++;
			return;
		}

		// Otherwise we are navigating
		if( this._col < 2 )
			this._col ++ ;
		else
			this._col = 0;
		this._row = 0;
		if( this._col == 1)
			this._row = 6;
		else
			this._row = 0;
	}
	else if(anArrow == Keypad.A_UP )
	{
		// We are editing a matrix
		if( this._action == 0 )
		{
			if(this._editRow == 1)
			{
				this._editRow = 0;
				this._editCol = 0;
			}
			else {
				this._editRow --;
			}
			return;
		}
		// Otherwise we are navigating
		if(this._col == 1)
			return;

		if( this._row > 0)
			this._row --;
	}
	else if(anArrow == Keypad.A_DOWN )
	{
		// We are editing a matrix
		if( this._action == 0 )
		{
			if( this._editRow == 0)
			{
				this._editRow = 1;
				this._editCol = 0;
			}
			else if(this._editRow <= this._matrices[this._row][0].length)   // Need "=" because of definition row
				this._editRow ++;
			return;
		}
		// we are navigating he list of matrices
		if(this._col == 1)
			return;

		if( this._row < 7)
			this._row ++;

	}
};

StateMatrix.prototype.matrixPressed = function()
{
	this._action = null;
	this._col = 0;
	this._row = 0;

	this._editCol = 0;
	this._editRow =0;
	this._viewportX = 0;
	this._editing = false;

	this.repaint();
};

StateMatrix.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();
	if(this._action == 0)
	{
		this.paintEdit();
		return;
	}

	var x = this.CANVAS.X;
	var y = this.CANVAS.Y;
	if( this._col == 0)
		this.CANVAS.drawFocusBox(x, y,5*this.CANVAS.DIGIT_W);
	else if( this._col == 1)
		this.CANVAS.drawFocusBox(x+6*this.CANVAS.DIGIT_W, y, 4*this.CANVAS.DIGIT_W);
	else if( this._col == 2)
		this.CANVAS.drawFocusBox(x+11*this.CANVAS.DIGIT_W, y, 4*this.CANVAS.DIGIT_W);

	this.CANVAS.print("NAMES MATH EDIT", x, y += this.CANVAS.DIGIT_H );

	this.CANVAS.drawFocusBox(x, y+this.CANVAS.DIGIT_H*this._row, 2*this.CANVAS.DIGIT_W);
	if( this._col == 0 || this._col == 2)
	{
		for( var r = 0; r < 7; r++)
		{
			var str = (r+1) + ":[" + String.fromCharCode(65+r) + "]";
			if(this._matrices[r][0].length > 0)
				str += this._matrices[r].length + "x" + this._matrices[r][0].length;
			this.CANVAS.print( str, x, y += this.CANVAS.DIGIT_H );
		}
	}
	else if( this._col == 1 )
	{
		this.CANVAS.print("6:randM(",    x, y += this.CANVAS.DIGIT_H, null, "gray" );
		this.CANVAS.print("7:augment(",  x, y += this.CANVAS.DIGIT_H, null, "gray" );
		this.CANVAS.print("8:Matr>list(",x, y += this.CANVAS.DIGIT_H, null, "gray" );
		this.CANVAS.print("9:List>matr(",x, y += this.CANVAS.DIGIT_H, null, "gray" );
		this.CANVAS.print("0:cumSum(",   x, y += this.CANVAS.DIGIT_H, null, "gray" );
		this.CANVAS.print("A:ref(",      x, y += this.CANVAS.DIGIT_H, null, "gray" );
		this.CANVAS.print("B:rref(",     x, y += this.CANVAS.DIGIT_H );
	}
};

StateMatrix.prototype.paintEdit = function()
{
	var x = this.CANVAS.X;
	var y = this.CANVAS.Y;
	var mRows = this._matrices[this._row].length;
	var mCols = this._matrices[this._row][0].length;
	// We are about to define the size of this matrix
	if( this._editRow == 0 )
	{
		if( this._editCol == 0 )
			this.CANVAS.drawFocusBox(x+10*this.CANVAS.DIGIT_W, y+1+this.CANVAS.DIGIT_H*this._editRow, this.CANVAS.DIGIT_W);
		else
			this.CANVAS.drawFocusBox(x+13*this.CANVAS.DIGIT_W, y+1+this.CANVAS.DIGIT_H*this._editRow, this.CANVAS.DIGIT_W);
	}
	else
	{
		if( this._editCol - this._viewportX == 0)
			this.CANVAS.drawFocusBox(this.COL1, y+this.CANVAS.DIGIT_H*this._editRow, this.CANVAS.DIGIT_W);
		else if( this._editCol - this._viewportX == 1)
			this.CANVAS.drawFocusBox(this.COL2, y+this.CANVAS.DIGIT_H*this._editRow, this.CANVAS.DIGIT_W);
		else
			this.CANVAS.drawFocusBox(this.COL3, y+this.CANVAS.DIGIT_H*this._editRow, this.CANVAS.DIGIT_W);
	}
	this.CANVAS.print("MATRIX[" + String.fromCharCode(65+this._row) + "] "+ mRows +" x" + mCols, x, y += this.CANVAS.DIGIT_H );
	y += this.CANVAS.DIGIT_H;
	for( var r = 0; r < mRows; r ++ )
	{
		if( this._viewportX > 0 )
			this.CANVAS.print("_",  x, y + r*this.CANVAS.DIGIT_H);
		else
			this.CANVAS.print("[",  x, y + r*this.CANVAS.DIGIT_H);
		if( mCols > 3 && this._viewportX < mCols - 3)
			this.CANVAS.print("_",  x+18*this.CANVAS.DIGIT_W, y + r*this.CANVAS.DIGIT_H);
		else
			this.CANVAS.print("]",  x+18*this.CANVAS.DIGIT_W, y + r*this.CANVAS.DIGIT_H);

		var viewPortCols = this._viewportX + 3;
		if(viewPortCols > mCols)
			viewPortCols = mCols;

		var mx=this.CANVAS.X + this.CANVAS.DIGIT_W;
		for( var c = this._viewportX; c < viewPortCols; c++ ) {
			this.CANVAS.print(this._matrices[this._row][r][c].toString(),  mx, y + r*this.CANVAS.DIGIT_H);
			mx += 7*this.CANVAS.DIGIT_W;
		}
	}
};

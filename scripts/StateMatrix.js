//class StateMatrix{  constructor(aCanvas, aRom)
function StateMatrix (aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;

	this._col = 0;
	this._row = 0;
	this._action = null;

	// Define everything for Editing a matrix
	this.COL1 = Canvas.X + Canvas.DIGIT_W;
	this.COL2 = Canvas.X + Canvas.DIGIT_W * 8;
	this.COL3 = Canvas.X + Canvas.DIGIT_W * 15;
	this._editCol = 0;
	this._editRow =0;
	this._viewportX = 0;    // Used for editing matrix that is bigger than screen

	// this is an Array of the matrices labeled [A] to [G]
	// Each row is a list of Editors (based on number of cols)
	// Each Editor contains the rows of the individual matrix
	this._matrices = new Array();
	for( var i =0; i<7; i++)
	{
		this._matrices.push(new Array());
	}
}

StateMatrix.prototype.getMatrix = function(aName)
{
	var res = this._matrices[ aName.charCodeAt(0) - 65 ];
	var m = new Array();
	if( res.length == 0)
		return m;
	for( var row=0; row<res[0].getNumRows(); row++)
	{
		m.push(new Array());
		for( var col=0; col<res.length; col++)
			m[row].push(res[col].getData()[row]);
	}	
	return m;
};

StateMatrix.prototype.getEditor = function() 
{
	return this._matrices[this._row][this._editCol];
};
StateMatrix.prototype.setEditRow = function(aRow) 
{
	if( aRow < 0 )
		return;
	this._editRow = aRow;
	for( var idx=0; idx< this._matrices[this._row].length; idx++)
		this._matrices[this._row][idx].setRow(aRow>0?aRow-1:0);
};
StateMatrix.prototype.setEditCol = function(aCol) 
{
	this._editCol = aCol;
	for( var idx=0; idx< this._matrices[this._row].length; idx++)
		this._matrices[this._row][idx].setCol(0);
};


StateMatrix.prototype.operatorPressed = function(anOper)
{
	this.getEditor().operatorPressed(anOper);
};

StateMatrix.prototype.enterPressed = function()
{
	if( this._col == 0 )
	{
		var calc = this.ROM.setStateCalculator();
		var name = String.fromCharCode(65+this._row);
		calc.matrixPressed(name, this.getMatrix(name));
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
	var mCols = this._matrices[this._row].length;
	// If no Columns yet, then create an editor
	if(mCols==0)
		this._matrices[this._row].push(new Editor(this,null));
	var mRows = this._matrices[this._row][0].getNumRows();

	// Set Size of Matrix
	if( this._editRow == 0 )
	{
		if( this._editCol == 1)
		{
			// We have just set the # of columns, create each editor
			this._matrices[this._row] = new Array();
			for(var idx=0; idx<aNum; idx++)
				this._matrices[this._row].push(new Editor(this,null,mRows));
		}
		
		
		if( this._editCol == 0)
		{
			// We have just set the # of rows, tell each editor
			for(var idx=0; idx<this._matrices[this._row].length; idx++)
				this._matrices[this._row][idx].setNumRows(aNum);
		}
	}
	else
	{
		this.getEditor().numberPressed(aNum);
	}
};

StateMatrix.prototype.arrowPressed = function(anArrow)
{
	if( this._editRow > 0)
		this.getEditor().evalEntry(6);

	if(anArrow == Keypad.A_LEFT )
	{
		if( this._action == 0 )
		{
			if(this._editCol > 0)
				this.setEditCol(this._editCol -1);
			else if( this._editRow >1)
			{
				this.setEditRow(this._editRow - 1);
				this.setEditCol( this._matrices[this._row].length-1 );
				if( this._editCol > 2)
					this._viewportX = this._editCol - 2;
			}

			if (this._editCol < this._viewportX)
				this._viewportX = this._editCol;

			return;
		}
		if( this._col > 0 )
			this.setEditCol( this._col - 1);
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
					this.setEditCol( 1 );
				else {
					this.setEditRow(this._editRow + 1);
					this.setEditCol(0);
					this._viewportX = 0;
				}
			}
			else if( this._editCol < this._matrices[this._row].length - 1)
				this.setEditCol( this._editCol + 1);
			else if( this._editRow < this._matrices[this._row][0].getNumRows()){
				this._viewportX = 0;
				this.setEditRow(this._editRow + 1);
				this.setEditCol( 0 );
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
				this.setEditRow( 0 );
				this.setEditCol(0);
			}
			else {
				this.setEditRow(this._editRow - 1);
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
				this.setEditRow(1);
				this.setEditCol(0);
			}
			else if(this._editRow < this._matrices[this._row][0].getNumRows())   // Need "=" because of definition row
			{
				this.setEditRow(this._editRow + 1);
			}
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
	this.setEditRow(0);
	this._viewportX = 0;

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

	var x = Canvas.X;
	var y = Canvas.Y;
	if( this._col == 0)
		this.CANVAS.drawFocusBox(x, y,5*Canvas.DIGIT_W);
	else if( this._col == 1)
		this.CANVAS.drawFocusBox(x+6*Canvas.DIGIT_W, y, 4*Canvas.DIGIT_W);
	else if( this._col == 2)
		this.CANVAS.drawFocusBox(x+11*Canvas.DIGIT_W, y, 4*Canvas.DIGIT_W);

	this.CANVAS.print("NAMES MATH EDIT", x, y += Canvas.DIGIT_H );

	this.CANVAS.drawFocusBox(x, y+Canvas.DIGIT_H*this._row, 2*Canvas.DIGIT_W);
	if( this._col == 0 || this._col == 2)
	{
		for( var r = 0; r < 7; r++)
		{
			var str = (r+1) + ":[" + String.fromCharCode(65+r) + "]";
			if(this._matrices[r].length > 0)
				str += this._matrices[r][0].getNumRows() + "x" + this._matrices[r].length;
			this.CANVAS.print( str, x, y += Canvas.DIGIT_H );
		}
	}
	else if( this._col == 1 )
	{
		this.CANVAS.print("6:randM(",    x, y += Canvas.DIGIT_H, null, "gray" );
		this.CANVAS.print("7:augment(",  x, y += Canvas.DIGIT_H, null, "gray" );
		this.CANVAS.print("8:Matr>list(",x, y += Canvas.DIGIT_H, null, "gray" );
		this.CANVAS.print("9:List>matr(",x, y += Canvas.DIGIT_H, null, "gray" );
		this.CANVAS.print("0:cumSum(",   x, y += Canvas.DIGIT_H, null, "gray" );
		this.CANVAS.print("A:ref(",      x, y += Canvas.DIGIT_H, null, "gray" );
		this.CANVAS.print("B:rref(",     x, y += Canvas.DIGIT_H );
	}
};

StateMatrix.prototype.paintEdit = function()
{
	var x = Canvas.X;
	var y = Canvas.Y;
	var mRows = 0;
	var mCols = this._matrices[this._row].length;
	if(mCols>0)
		mRows = this._matrices[this._row][0].getNumRows();
	// We are about to define the size of this matrix
	if( this._editRow == 0 )
	{
		if( this._editCol == 0 )
			this.CANVAS.drawFocusBox(x+10*Canvas.DIGIT_W, y+1+Canvas.DIGIT_H*this._editRow, Canvas.DIGIT_W);
		else
			this.CANVAS.drawFocusBox(x+13*Canvas.DIGIT_W, y+1+Canvas.DIGIT_H*this._editRow, Canvas.DIGIT_W);
	}
	else
	{
		if( this._editCol - this._viewportX == 0)
			this.CANVAS.drawFocusBox(this.COL1, y+Canvas.DIGIT_H*this._editRow, Canvas.DIGIT_W);
		else if( this._editCol - this._viewportX == 1)
			this.CANVAS.drawFocusBox(this.COL2, y+Canvas.DIGIT_H*this._editRow, Canvas.DIGIT_W);
		else
			this.CANVAS.drawFocusBox(this.COL3, y+Canvas.DIGIT_H*this._editRow, Canvas.DIGIT_W);
	}
	this.CANVAS.print("MATRIX[" + String.fromCharCode(65+this._row) + "] "+ mRows +" x" + mCols, x, y += Canvas.DIGIT_H );
	y += Canvas.DIGIT_H;
	for( var r = 0; r < mRows; r ++ )
	{
		if( this._viewportX > 0 )
			this.CANVAS.print("_",  x, y + r*Canvas.DIGIT_H);
		else
			this.CANVAS.print("[",  x, y + r*Canvas.DIGIT_H);
		if( mCols > 3 && this._viewportX < mCols - 3)
			this.CANVAS.print("_",  x+18*Canvas.DIGIT_W, y + r*Canvas.DIGIT_H);
		else
			this.CANVAS.print("]",  x+18*Canvas.DIGIT_W, y + r*Canvas.DIGIT_H);

		var viewPortCols = this._viewportX + 3;
		if(viewPortCols > mCols)
			viewPortCols = mCols;

		var mx=Canvas.X + Canvas.DIGIT_W;
		for( var c = this._viewportX; c < viewPortCols; c++ ) {
			this.CANVAS.print(this._matrices[this._row][c].getData()[r],  mx, y + r*Canvas.DIGIT_H);
			mx += 7*Canvas.DIGIT_W;
		}
	}
};

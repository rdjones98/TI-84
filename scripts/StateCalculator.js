"use strict";
//class	StateCalculator{	constructor(aCanvas, aRom)
function StateCalculator(aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;
	this.EDITOR = new Editor(this);

	this._history = new Array(new Array());
	this._row = 0;
	this._col = 0;
	this._displayRow = null;
	this.DISPLAYROWS = 6;
}

StateCalculator.prototype.getDataArray = function(){ return this._history;  };
StateCalculator.prototype.getRow = function(){	return this._row;  };
StateCalculator.prototype.getCol = function(){	return this._col;};
StateCalculator.prototype.setRow = function(aNum)
{
	if( typeof aNum == "undefined")
		aNum = 1;
	this._row = aNum;
	while( this._history.length < this._row + 1 )
		this._history.push(new Array() );
	
	if( aNum > 6 )
	{
		this._history.splice(0, aNum - 6 );
		this._row = 6;
	}
};
StateCalculator.prototype.incrCol = function(aNum)
{
	if( typeof aNum == "undefined")
		aNum = 1;
	this._col += aNum;
};
StateCalculator.prototype.setCol = function(aNum)
{
	this._col = aNum;
};

//button pressed events
StateCalculator.prototype.clearPressed = function()
{
	this.CANVAS.clearCanvas();
	this._history = new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array());
	this._row = 0;
	this.setCol(0);
};

StateCalculator.prototype.matrixPressed = function(aMatrix)
{
	this._history[this._row].push(new Digit(aMatrix, false, Digit.MATRIX));
	this.setCol(this._history[this._row].length);

	this.EDITOR.linkDigits();
};

StateCalculator.prototype.lnPressed = function()
{
	this.EDITOR.lnPressed();
};

StateCalculator.prototype.logPressed = function()
{
	this.EDITOR.logPressed();
};

StateCalculator.prototype.trigPressed = function(aTrigFunc)
{
	this.EDITOR.trigPressed(aTrigFunc);
};

StateCalculator.prototype.operatorPressed = function(anOper)
{
	if( this._displayRow != null )
		return;
	
	if( anOper == "+" || anOper == "-" || anOper == "*" || anOper == "/")
	{
		if( this._history[this._row].length == 0 && this._row != 0 && this._history[this._row-1][0].DIGIT=="R")
			this._history[this._row] = this._history[this._row-1].substring(3);
	}

	this.EDITOR.operatorPressed(anOper);

};

StateCalculator.prototype.numberPressed = function( aNum )
{
	if(this._displayRow == null)
		this.EDITOR.numberPressed(aNum);
};

StateCalculator.prototype.negativePressed = function()
{
	if(this.ROM.is2ndPressed())
	{
		for( var idx=this._row-1; idx>=0; idx-- )
			if(!this._history[idx][0].isResult() )
			{
				this._history[this._row] = this._history[idx]	;
				break;
			}
	}
	else
		this.EDITOR.operatorPressed( Canvas.NEGATIVE);
};

StateCalculator.prototype.deletePressed = function()
{
	if( this._displayRow == null )
		this.EDITOR.deletePressed();
};

StateCalculator.prototype.arrowPressed = function(anArrow)
{
	if( anArrow == Keypad.A_UP )
	{
		if( this._displayRow == null )
			this._displayRow = this._row;
		if( this._displayRow > 0)
			this._displayRow --;
	}
	else if( anArrow == Keypad.A_DOWN )
	{
		if( this._displayRow != null && this._displayRow < this._row - 1 )
			this._displayRow ++;
		else
			this._displayRow = null;
	}
	this.EDITOR.arrowPressed(anArrow);
};

StateCalculator.prototype.enterPressed = function()
{
	if( this._displayRow == null )
	{
		var str = this._history[this._row];
	
		if(str.length==0)
			return;
		
		str = str[0].getMathStr();
		var res = this.doMath(str);
		if( typeof res == "object") // Its a matrix
			for( var idx = 0; idx<res.length; idx++)
				this._history.push(new Array( new Digit(res[idx], false, Digit.RESULT, res[idx] )));
		else
			this._history.push(new Array( new Digit(res, false, Digit.RESULT )));

		this.setRow(this._history.length) ;
		this.setCol(0);
		this.EDITOR.setSuperScript(false);
	}
	else
	{
		var str = this._history[this._displayRow];
		if( str[0].isResult() )
			str = new Array( new Digit(str[0]._val, false, Digit.DIGIT ) );
		this._history[this._history.length-1] = str;
		this._displayRow = null;
		this.setCol(str[0].getDisplayLen());
	}
};

// pre process string so we can transform it to RPN
StateCalculator.prototype.doMath = function(anExpr)
{
	var math = anExpr;

	// Handle any matrices
	var m = this.preProcessMatrices(math);
	if( m != null )
		return m;

	// If we have -- then we either have a plus ex:  2--3=>2+3
	// or we have a minus a negative * ex: 2--3*4 leave it alone
	var idx = math.indexOf("--");
	while( idx > -1 )
	{
		var swapIt = true;
		for( var i = idx+2; i<math.length; i++)
			if(math.charAt(i) < '0' || math.charAt(i) > '9' )
				if( math.charAt(i) == '+' || math.charAt(i) == '-')
				{
					swapIt = false;
					break;
				}

		if( swapIt )
			math = math.substring(0,idx) + "+" + math.substring(idx+2);
		idx = math.indexOf("--", idx + 1);
	}

	// Handle ANy Square Roots
	var idx = math.indexOf(Canvas.SQRROOT);
	while( idx > -1 )
	{
		var numP = 0;
		var eIdx = idx+1;
		for( ; eIdx<math.length; eIdx++)
		{
			if( math.charAt(eIdx) == '(')
				numP ++;
			else if( math.charAt(eIdx) == ')' && --numP == 0)
				break;
		}
		math = math.substring(0, idx) + math.substring(idx+1, eIdx) + "^(1/2)" + math.substring(eIdx);
		idx = math.indexOf(Canvas.SQRROOT, idx+1);
	}

	// if we have any special functions, evaluate the () then call math.log()
	math = this.preprocessLogAndTrig(math, "ln(");
	math = this.preprocessLogAndTrig(math, "log(");
	math = this.preprocessLogAndTrig(math, "asin(");
	math = this.preprocessLogAndTrig(math, "acos(");
	math = this.preprocessLogAndTrig(math, "atan(");
	math = this.preprocessLogAndTrig(math, "sin(");
	math = this.preprocessLogAndTrig(math, "cos(");
	math = this.preprocessLogAndTrig(math, "tan(");
	return calculate(math);	// From RegressionEngine
};

StateCalculator.prototype.preprocessLogAndTrig = function(anExpr, aVal)
{
	// if we have any ln functions, evaluate the () then call math.log()
	var idx = anExpr.indexOf(aVal);
	var eIdx = 0;
	if( idx > -1 )
	{
		var openP = 1;
		for( eIdx=idx+aVal.length; eIdx< anExpr.length; eIdx++)
		{
			if( anExpr.charAt(eIdx) == '(')
				openP ++;
			else if( anExpr.charAt(eIdx) == ')' && --openP == 0)
				break;
		}
		var inP = anExpr.substring(idx+aVal.length,eIdx);
		var res = this.doMath(inP);
		if(aVal == "ln(")
			res = Math.log(res);
		else if ( aVal == "log(")
			res = Math.log10(res);
		else if ( aVal == "sin(")
			res = Math.sin(res);
		else if ( aVal == "cos(")
			res = Math.cos(res);
		else if ( aVal == "tan(")
			res = Math.tan(res);
		else if ( aVal == "asin(")
			res = Math.asin(res);
		else if ( aVal == "acos(")
			res = Math.acos(res);
		else if ( aVal == "atan(")
			res = Math.atan(res);
		anExpr = anExpr.substring(0,idx) + "(" + res + ")" + anExpr.substring(eIdx+1);
	}
	if( anExpr.indexOf("e-") > -1)
		anExpr = "0";
	return anExpr;
};

StateCalculator.prototype.preProcessMatrices = function(anExpr)
{
	var mIdx = anExpr.indexOf("rref(");
	if( mIdx > -1 )
	{
		var cIdx = anExpr.indexOf("]");
		var m = gaussJordan(this.ROM.getStateMatrix().getMatrix(anExpr.substring(mIdx+6, cIdx)));
		return m;
	}
	mIdx = anExpr.indexOf("][");
	if( mIdx > -1 )
	{
		var mA = anExpr.charAt(mIdx-1);
		var mB = anExpr.charAt(mIdx+2);
		var m = multiplyMatrix(this.ROM.getStateMatrix().getMatrix(mA), this.ROM.getStateMatrix().getMatrix(mB));
		return m;
	}
	mIdx = anExpr.indexOf("]*[");
	if( mIdx > -1 )
	{
		var mA = anExpr.charAt(mIdx-1);
		var mB = anExpr.charAt(mIdx+3);
		var m = multiplyMatrix(this.ROM.getStateMatrix().getMatrix(mA), this.ROM.getStateMatrix().getMatrix(mB));
		return m;
	}
	mIdx = anExpr.indexOf("]+[");
	if( mIdx > -1 )
	{
		var mA = anExpr.charAt(mIdx-1);
		var mB = anExpr.charAt(mIdx+3);
		var m = addMatrix(this.ROM.getStateMatrix().getMatrix(mA), this.ROM.getStateMatrix().getMatrix(mB));
		return m;
	}
	mIdx = anExpr.indexOf("]-[");
	if( mIdx > -1 )
	{
		var mA = anExpr.charAt(mIdx-1);
		var mB = anExpr.charAt(mIdx+3);
		var m = subtractMatrix(this.ROM.getStateMatrix().getMatrix(mA), this.ROM.getStateMatrix().getMatrix(mB));
		return m;
	}
	mIdx = anExpr.indexOf("]/[");
	if( mIdx > -1 )
	{
		return "ERR:CAN'T DIVIDE";
	}
	mIdx = anExpr.indexOf("]^-1");
	if( mIdx > -1 )
	{
		var mA = anExpr.charAt(mIdx-1);
		var m = inverseMatrix(this.ROM.getStateMatrix().getMatrix(mA));
		return m;
	}
	mIdx = anExpr.indexOf("[");
	if( mIdx > -1 )
		return this.ROM.getStateMatrix().getMatrix(anExpr.charAt(mIdx+1));

	return null;
};


// Redraw screen based on contents of _history
StateCalculator.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();

	//draw focus appropriately first so text can overwrite it
	var x = this.CANVAS.X + this.EDITOR.getDisplayPosition() * this.CANVAS.DIGIT_W;
	var y = this.CANVAS.Y + this._row * this.CANVAS.DIGIT_H;
	
	// We have pressed the up arrow and are not typing anymore.
	if( this._displayRow != null )
	{
		var data =this._history[this._displayRow]; 
		var w = data[0].getDisplayLen() * this.CANVAS.DIGIT_W;
		if( data[0].isResult() )
			x = this.CANVAS.WIDTH - w ;
		else
			x = this.CANVAS.X;
		y = this.CANVAS.Y + this._displayRow * this.CANVAS.DIGIT_H;
		this.CANVAS.drawFocusBox(x, y, w);
	}
	else if( this._history[this._row].length > this._col)
		this.CANVAS.drawFocusBox(x, y, null, this._history[this._row][this._col].isSuper());
	else
		this.CANVAS.drawFocusBox(x, y, null, this.EDITOR._superScript);

	// Start and top and being to redraw
	x = this.CANVAS.X;
	y = this.CANVAS.Y;

	for( var i=0; i<this._history.length; i++)
	{
		y +=  this.CANVAS.DIGIT_H;

		var str = this._history[i];
		if( str.length > 0 && str[0].isResult())
			this.CANVAS.print(this.CANVAS.formatNumber(str[0].toString(),10), this.CANVAS.WIDTH, y,null,"black","right");
		else
			this.CANVAS.print(str, x, y);
	}

	if(this.ROM.is2ndPressed())
	{
		var x = this.CANVAS.X + this._col * this.CANVAS.DIGIT_W;
		var y = this.CANVAS.Y + this._row * this.CANVAS.DIGIT_H;
		this.CANVAS.draw2ndButton(x,y);
	}
};

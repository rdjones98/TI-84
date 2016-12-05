"use strict";
//class	StateCalculator{	constructor(aCanvas, aRom)
function StateCalculator(aCanvas, aRom)
{
		this.CANVAS = aCanvas;
		this.ROM = aRom;
		this.EDITOR = new Editor(this);

		this._history = new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array());
		this._row = 0
		this._col = 0;
	}

StateCalculator.prototype.getDataArray = function()
{
	return this._history;
};
StateCalculator.prototype.getRow = function()
{
	return this._row;
};
StateCalculator.prototype.getCol = function()
{
	return this._col;
};
StateCalculator.prototype.incrRow = function(aNum)
	{
		if( typeof aNum == "undefined")
			aNum = 1;
		this._row += aNum;
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
    this._history[this._row] += aMatrix;
 	  this.setCol(this._history[this._row].length);

		this.ROM.secondPressed(false);
	};

StateCalculator.prototype.xPressed = function()
	{
		// xPressed
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
		this.EDITOR.trigPressed();
	};

StateCalculator.prototype.operatorPressed = function(anOper)
  {
		if( anOper == "+" || anOper == "-" || anOper == "*" || anOper == "/")
		{
			if( this._history[this._row].length == 0 && this._row != 0 && this._history[this._row-1][0].DIGIT=="R")
				this._history[this._row] = this._history[this._row-1].substring(3);
		}

		this.EDITOR.operatorPressed(anOper);

  };

StateCalculator.prototype.numberPressed = function( aNum )
  {
	   this.EDITOR.numberPressed(aNum);
  };

StateCalculator.prototype.negativePressed = function()
  {
		if(this.ROM.is2ndPressed())
		{
			for( var idx=this._row-1; idx>=0; idx-- )
				if(!this._history[idx][0].DIGIT=="R" )
				{
					this._history[this._row] = this._history[idx]	;
					break;
				}
		}
		else
	   this.EDITOR.numberPressed( this.CANVAS.NEGATIVE);
  };

StateCalculator.prototype.deletePressed = function()
	{
		this.EDITOR.deletePressed();
	};

StateCalculator.prototype.arrowPressed = function(anArrow)
	{
		this.EDITOR.arrowPressed(anArrow);
	};

StateCalculator.prototype.enterPressed = function()
	{
		var str = this._history[this._row];
		if(str.length==0)
			return;
		var bump = 0;	// If we have to print out a matrix, bump our next line down appropriately
		var res = this.doMath(str);
/*		if( typeof res == "object")
		{
			var tmp = ""
			for(var i=0; i<res.length;i++)
				tmp += "["+res[i]+"]";
			bump = res.length-1;
			res = tmp;
		}
	*/
		// if last row, delete first 2 and appedn new results so it doesn't scroll off screen
		var cutoff = 6-bump;

		if(this._row >= cutoff)
		{
			this._history.splice(0,bump+2);
			if(bump > 0)
			{
				var pieces = res.split("]");
				for(var i = 0; i<pieces.length-1; i++)
					this._history.push( new Array(new Digit(pieces[i] + "]", false, Digit.RESULT)));
			}
			else
				this._history.push( new Array(new Digit(res, false, Digit.RESULT)));

			this._history.push("");
			this.setCol(0);
			this._row = 6;
		}
		else
		{
			if(bump > 0)
			{
				var pieces = res.split("]");
				for(var i = 0; i<pieces.length-1; i++)
					this._history[++this._row] = new Array(new Digit(+ pieces[i] + "]", false, Digit.RESULT));
			}
			else
				this._history[++this._row] = new Array( new Digit(res, false, Digit.RESULT) );

			this._row ++ ;
			this.setCol(0);
		}
		this.ROM.secondPressed(false);
	};


	// Utility Methods
StateCalculator.prototype.count = function(aStr, aChar)
	{
		var cnt = 0;
		for( var i=0; i<aStr.length; i++)
			if( aStr.charAt(i) == aChar)
				cnt ++;
		return cnt;
	};


StateCalculator.prototype.preProcessEandPI = function(anExpr, aSym, aVal)
	{
		var idx = anExpr.indexOf(aSym);
		while(idx >-1)
		{
			if( idx < anExpr.length-1 && anExpr.charAt(idx+1) >=0 && anExpr.charAt(idx+1) <= 9)
				anExpr = anExpr.substring(0,idx+1) + "*" + anExpr.substring(idx+1);
			if( idx > 0 && anExpr.charAt(idx-1) >=0 && anExpr.charAt(idx-1) <= 9)
				anExpr = anExpr.substring(0,idx) + "*" + anExpr.substring(idx);
			anExpr = anExpr.replace(aSym, aVal);
			idx = anExpr.indexOf(aSym);
		}
		return anExpr;
	};

	// pre process string so we can transform it to RPN
StateCalculator.prototype.doMath = function(anExpr)
	{
		var math = anExpr[0].getMathStr();

		// Handle any matrices
		var m = this.preProcessMatrices(math);
		if( m != null )
			return m;

		// Preproess E and PI
		math = this.preProcessEandPI(math, this.CANVAS.PI, Math.PI);
		math = this.preProcessEandPI(math, "e", Math.E);


		// If we have -- then we either have a plus ex:  2--3=>2+3
		// or we have a minus a negative * ex: 2--3*4 leave it alone
		var idx = math.indexOf("--");
		while( idx > -1 )
		{
			var swapIt = true;
			for( var i = idx+2; i<math.length; i++)
			{
				if(math.charAt(i) < '0' || math.charAt(i) > '9' )
					if( math.charAt(i) == '+' || math.charAt(i) == '-')
					{
						swapIt = false;
						break;
					}
			}
			if( swapIt )
				math = math.substring(0,idx) + "+" + math.substring(idx+2);
			idx = math.indexOf("--", idx + 1);
		}

		// If we have a ^, put the exponent in parens
		idx = math.indexOf("^");
		while( idx > -1 )
		{
			if(math.charAt(idx+1) == '-')
			{
				math = math.substring(0,idx+1) + "(" + math.substring(idx+1);
				for( var i=math.idx+2; i<math.length; i++)
					if( math.charAt(i-1) >='0' && math.charAt(i-1) <='9' )
						math = math.substring(0,i+1) + ")" + math.substring(i+1);
			}
			idx = math.indexOf("^", idx+1);
		}

		// If we have an open (, make sure we have a close.  If not, append as many as
		// necessary.
		var num_open = this.count(math, "(" );
		var num_clse = this.count(math, ")");
		for( var i = num_clse; i<num_open; i++)
			math = math + ")";

		// Handle ANy Square Roots
		var idx = math.indexOf(this.CANVAS.SQRROOT);
		while( idx > -1 )
		{
			var numP = 1;
			var eIdx = idx+1;
			for( ; eIdx<math.length; eIdx++)
			{
				if( math.charAt(eIdx) == '(')
					numP ++;
				else if( math == ')' && --numP == 0)
					break;
			}
			math = math.substring(0, idx) + math.substring(idx+1, eIdx) + "^(1/2)" + math.substring(eIdx);
			idx = math.indexOf(this.CANVAS.SQRROOT, idx+1);
		}


		// If we have 2(3+4) we need 2*(3+4)
		for( var i=math.length; i>0; i--)
		{
			if( math.charAt(i)=='(' && math.charAt(i-1) >='0' && math.charAt(i-1) <='9' )
				math = math.substring(0,i) + "*" + math.substring(i);
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
			anExpr = anExpr.substring(0,idx) + res + anExpr.substring(eIdx+1);
		}
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
			var mB = anExpr.charAt(mIdx+2)
			var m = multiplyMatrix(this.ROM.getStateMatrix().getMatrix(mA), this.ROM.getStateMatrix().getMatrix(mB));
			return m;
		}
		mIdx = anExpr.indexOf("]*[");
		if( mIdx > -1 )
		{
			var mA = anExpr.charAt(mIdx-1);
			var mB = anExpr.charAt(mIdx+3)
			var m = multiplyMatrix(this.ROM.getStateMatrix().getMatrix(mA), this.ROM.getStateMatrix().getMatrix(mB));
			return m;
		}
		mIdx = anExpr.indexOf("]+[");
		if( mIdx > -1 )
		{
			var mA = anExpr.charAt(mIdx-1);
			var mB = anExpr.charAt(mIdx+3)
			var m = addMatrix(this.ROM.getStateMatrix().getMatrix(mA), this.ROM.getStateMatrix().getMatrix(mB));
			return m;
		}
		mIdx = anExpr.indexOf("]-[");
		if( mIdx > -1 )
		{
			var mA = anExpr.charAt(mIdx-1);
			var mB = anExpr.charAt(mIdx+3)
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


StateCalculator.prototype.secondPressed = function()
	{
			// draw 2nd Button Pressed Icon
			if(this.ROM.is2ndPressed())
			{
				var x = this.CANVAS.X + this._col * this.CANVAS.DIGIT_W;
				var y = this.CANVAS.Y + this._row * this.CANVAS.DIGIT_H;
				this.CANVAS.draw2ndButton(x,y);
			}
			else {
					this.repaint();
			}
	};

	// Redraw screen based on contents of _history
StateCalculator.prototype.repaint = function()
	{
		this.CANVAS.clearCanvas();

		//draw focus appropriately first so text can overwrite it
		var x = this.CANVAS.X + this._col * this.CANVAS.DIGIT_W;
		var y = this.CANVAS.Y + this._row * this.CANVAS.DIGIT_H;
		if( this._history[this._row].length > this._col)
			this.CANVAS.drawFocusBox(x, y, null, this._history[this._row][this._col].isSuper());
		else
			this.CANVAS.drawFocusBox(x, y, null, this.EDITOR._superScript);

		// Start and top and being to redraw
		x = this.CANVAS.X;
		y = this.CANVAS.Y;

		for( var i=0; i<7; i++)
		{
			y +=  this.CANVAS.DIGIT_H;

			// If item starts with <R> then right justify

			var str = this._history[i];
			if( str.length > 0 && str[0].isResult())
			{
				// If it has "]" then its a matrix, print it accordingly
				if(str.indexOf("]") > -1)
					this.CANVAS.print(str, this.CANVAS.WIDTH, y,null,"black","right");
				else // Else it is a numerical answer. Format the output
					this.CANVAS.print(this.CANVAS.formatNumber(str[0].getVal(),10), this.CANVAS.WIDTH, y,null,"black","right");
			}
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

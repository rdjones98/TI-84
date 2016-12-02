"use strict";
//class	StateCalculator{	constructor(aCanvas, aRom)
function StateCalculator(aCanvas, aRom)
{
		this.CANVAS = aCanvas;
		this.ROM = aRom;

		this._history = new Array("","","","","","","");
		this._row = 0
		this._col = 0;
	}

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
		this._history = new Array("","","","","","","");
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
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed(false);
			this.numberPressed("e");
			this.operatorPressed("^");
		}
		else {
			this.operatorPressed("ln(");
		}
	};

StateCalculator.prototype.logPressed = function()
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed(false);
			this.numberPressed("1");
			this.numberPressed("0");
			this.operatorPressed("^");
		}
		else {
			this.operatorPressed("log(");
		}
	};

StateCalculator.prototype.trigPressed = function(aTrigFunc)
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed(false);
			this.operatorPressed("a" + aTrigFunc);
		}
		else {
			this.operatorPressed(aTrigFunc);
		}
	};

StateCalculator.prototype.operatorPressed = function(anOper)
  {
		if(this.ROM.is2ndPressed() && anOper == "/")
		{
	  	anOper = "e";
		}
		else if( anOper == "+" || anOper == "-" || anOper == "*" || anOper == "/")
		{
			if( this._history[this._row].length == 0 && this._row != 0 && this._history[this._row-1].substring(0,3)=="<R>")
				this._history[this._row] = this._history[this._row-1].substring(3);
		}
    this._history[this._row] += anOper;
 	  this.setCol(this._history[this._row].length);

		this.ROM.secondPressed(false);
  };

StateCalculator.prototype.numberPressed = function( aNum )
  {
	   this._history[this._row] += aNum;
		 this.incrCol();
  };

StateCalculator.prototype.negativePressed = function()
  {
		if(this.ROM.is2ndPressed())
		{
			for( var idx=this._row-1; idx>=0; idx-- )
				if(!this._history[idx].substring(0,3)=="<R>" )
				{
					this._history[this._row] = this._history[idx]	;
					break;
				}
		}
		else
		{
	   this._history[this._row] += this.CANVAS.NEGATIVE;
		 this.incrCol();
	 	}
  };

StateCalculator.prototype.deletePressed = function()
	{
		var mathStr = this._history[this._row];
		if( mathStr.length >= this._col)
		{
			mathStr = mathStr.substring(0, this._col) + mathStr.substring(this._col+1);
			this._history[this._row] = mathStr;
		}
	};

StateCalculator.prototype.arrowPressed = function(anArrow)
	{
			if(anArrow == this.ROM.getKeypad().A_LEFT )
			{
				if( this._col >0 )
					this.incrCol( -1 );
			}
			else if( anArrow == this.ROM.getKeypad().A_RIGHT)
			{
				if( this._col < this._history[this._row].length)
					this.incrCol();
			}
	};

StateCalculator.prototype.enterPressed = function()
	{
		var str = this._history[this._row];
		if(str.length==0)
			return;
		var bump = 0;
		var res = this.doMath(str);
		if( typeof res == "object")
		{
			var tmp = ""
			for(var i=0; i<res.length;i++)
				tmp += "["+res[i]+"]";
			bump = res.length-1;
			res = tmp;
		}
		// if last row, delete first 2 and appedn new results so it doesn't scroll off screen
		var cutoff = 6-bump;

		if(this._row >= cutoff)
		{
			this._history.splice(0,bump+2);
			if(bump > 0)
			{
				var pieces = res.split("]");
				for(var i = 0; i<pieces.length-1; i++)
					this._history.push( "<R>" + pieces[i] + "]");
			}
			else
				this._history.push( "<R>" + res );

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
					this._history[++this._row] = "<R>" + pieces[i] + "]";
			}
			else
				this._history[++this._row] = "<R>" + res;

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
		// if we have any "negative" signs:  \u02C9, replace with "-"
		while(anExpr.indexOf(this.CANVAS.NEGATIVE)>-1)
			anExpr = anExpr.replace(this.CANVAS.NEGATIVE, "-");

		// RPNEngine does not handle decimals without leading integers correctly,
		// so insert leading zeros if nothing else is there
		if(anExpr.charAt(0) == '.')
			anExpr = "0" + anExpr;
		for(var idx = 0; idx<anExpr.length; idx++)
			if(anExpr.charAt(idx) == '.' && ( anExpr.charAt(idx-1) < '0' || anExpr.charAt(idx-1) > '9' ) )
				anExpr = anExpr.substring(0,idx) + "0" + anExpr.substring(idx);

		// Handle any matrices
		var m = this.preProcessMatrices(anExpr);
		if( m != null )
			return m;


		// Preproess E and PI
		anExpr = this.preProcessEandPI(anExpr, this.CANVAS.PI, Math.PI);
		anExpr = this.preProcessEandPI(anExpr, "e", Math.E);


		// If we have -- then we either have a plus ex:  2--3=>2+3
		// or we have a minus a negative * ex: 2--3*4 leave it alone
		var idx = anExpr.indexOf("--");
		while( idx > -1 )
		{
			var swapIt = true;
			for( var i = idx+2; i<anExpr.length; i++)
			{
				if(anExpr.charAt(i) < '0' || anExpr.charAt(i) > '9' )
					if( anExpr.charAt(i) == '+' || anExpr.charAt(i) == '-')
					{
						swapIt = false;
						break;
					}
			}
			if( swapIt )
				anExpr = anExpr.substring(0,idx) + "+" + anExpr.substring(idx+2);
			idx = anExpr.indexOf("--", idx + 1);
		}

		// If we have a ^, put the exponent in parens
		idx = anExpr.indexOf("^");
		while( idx > -1 )
		{
			if(anExpr.charAt(idx+1) == '-')
			{
				anExpr = anExpr.substring(0,idx+1) + "(" + anExpr.substring(idx+1);
				for( var i=anExpr.idx+2; i<anExpr.length; i++)
					if( anExpr.charAt(i-1) >='0' && anExpr.charAt(i-1) <='9' )
						anExpr = anExpr.substring(0,i+1) + ")" + anExpr.substring(i+1);
			}
			idx = anExpr.indexOf("^", idx+1);
		}

		// If we have an open (, make sure we have a close.  If not, append as many as
		// necessary.
		var num_open = this.count(anExpr, "(" );
		var num_clse = this.count(anExpr, ")");
		for( var i = num_clse; i<num_open; i++)
			anExpr = anExpr + ")";

		// Handle ANy Square Roots
		var idx = anExpr.indexOf(this.CANVAS.SQRROOT);
		while( idx > -1 )
		{
			var numP = 1;
			var eIdx = idx+1;
			for( ; eIdx<anExpr.length; eIdx++)
			{
				if( anExpr.charAt(eIdx) == '(')
					numP ++;
				else if( anExpr == ')' && --numP == 0)
					break;
			}
			anExpr = anExpr.substring(0, idx) + anExpr.substring(idx+1, eIdx) + "^(1/2)" + anExpr.substring(eIdx);
			idx = anExpr.indexOf(this.CANVAS.SQRROOT, idx+1);
		}


		// If we have 2(3+4) we need 2*(3+4)
		for( var i=anExpr.length; i>0; i--)
		{
			if( anExpr.charAt(i)=='(' && anExpr.charAt(i-1) >='0' && anExpr.charAt(i-1) <='9' )
				anExpr = anExpr.substring(0,i) + "*" + anExpr.substring(i);
		}

		// if we have any special functions, evaluate the () then call math.log()
		anExpr = this.preprocessLogAndTrig(anExpr, "ln(");
		anExpr = this.preprocessLogAndTrig(anExpr, "log(");
		anExpr = this.preprocessLogAndTrig(anExpr, "asin(");
		anExpr = this.preprocessLogAndTrig(anExpr, "acos(");
		anExpr = this.preprocessLogAndTrig(anExpr, "atan(");
		anExpr = this.preprocessLogAndTrig(anExpr, "sin(");
		anExpr = this.preprocessLogAndTrig(anExpr, "cos(");
		anExpr = this.preprocessLogAndTrig(anExpr, "tan(");
		return calculate(anExpr);	// From RegressionEngine
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

	// Redraw screen based on contents of _history
StateCalculator.prototype.repaint = function()
	{
		this.CANVAS.clearCanvas();

		//draw focus appropriately first so text can overwrite it
		var x = this.CANVAS.X + this._col * this.CANVAS.DIGIT_W;
		var y = this.CANVAS.Y + this._row * this.CANVAS.DIGIT_H;
		this.CANVAS.drawFocusBox(x, y);

		// Start and top and being to redraw
		x = this.CANVAS.X;
		y = this.CANVAS.Y;

		for( var i=0; i<7; i++)
		{
			y +=  this.CANVAS.DIGIT_H;

			// If item starts with <R> then right justify
			var str = this._history[i];
			if( str.substring(0,3) =="<R>")
			{
				str = str.substring(3);
				// If it has "]" then its a matrix, print it accordingly
				if(str.indexOf("]") > -1)
					this.CANVAS.print(str, this.CANVAS.WIDTH, y,null,"black","right");
				else // Else it is a numerical answer. Format the output
					this.CANVAS.print(this.CANVAS.formatNumber(str,10), this.CANVAS.WIDTH, y,null,"black","right");
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

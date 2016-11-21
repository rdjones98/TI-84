"use strict";
class	StateCalculator
{
	constructor(aCanvas, aRom)
	{
		this.CANVAS = aCanvas;
		this.ROM = aRom;

		this._history = new Array("","","","","","","");
		this._row = 0
		this._col = 0;
	}

	clearPressed()
	{
		this.CANVAS.clearCanvas();
	}
	xPressed()
	{
		// Do Nothing
	}
	lnPressed()
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed();
			this.numberPressed("e");
			this.operatorPressed("^");
		}
		else {
			this.operatorPressed("ln(");
		}
	}
	logPressed()
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed();
			this.numberPressed("1");
			this.numberPressed("0");
			this.operatorPressed("^");
		}
		else {
			this.operatorPressed("log(");
		}
	}

	trigPressed(aTrigFunc)
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed();
			this.operatorPressed("a" + aTrigFunc);
		}
		else {
			this.operatorPressed(aTrigFunc);
		}
	}

	operatorPressed(anOper)
  {
	   this._history[this._row] += anOper;
		 this._col += anOper.length;
		 this.repaint();
  }

	numberPressed( aNum )
  {
	   this._history[this._row] += aNum;
		 this._col ++;
		 this.repaint();
  }

	negativePressed()
  {
	   this._history[this._row] += this.CANVAS.NEGATIVE;
		 this._col ++;
		 this.repaint();
  }

	deletePressed()
	{
		var mathStr = this._history[this._row];
		if( mathStr.length >= this._col)
		{
			mathStr = mathStr.substring(0, this._col) + mathStr.substring(this._col+1);
			this._history[this._row] = mathStr;
			this.repaint();
		}
	}
	arrowPressed(anArrow)
	{
			if(anArrow == this.ROM.getKeypad().A_LEFT )
			{
				if( this._col >0 )
					this._col --;
			}
			else if( anArrow == this.ROM.getKeypad().A_RIGHT)
			{
				if( this._col < this._history[this._row].length)
					this._col ++;
			}
			this.repaint();
	}

	enterPressed()
	{
		var str = this._history[this._row];
		var res = this.doMath(str);
		// if last row, delete first 2 and appedn new results so it doesn't scroll off screen
		if(this._row == 6)
		{
			this._history.splice(0,2);
			this._history.push( "<R>" + res);
			this._history.push("");
			this._col = 0;
		}
		else
		{
			this._history[this._row+1] = "<R>" + res;

			this._row +=2;
			this._col = 0;
		}

		this.repaint();
	}


	count(aStr, aChar)
	{
		var cnt = 0;
		for( var i=0; i<aStr.length; i++)
			if( aStr.charAt(i) == aChar)
				cnt ++;
		return cnt;
	}
	// Redraw screen based on contents of _history
	repaint()
	{
		this.CANVAS.clearCanvas();

		var ctx = this.CANVAS.CONTEXT;
		ctx.font = this.FONT;

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
			if( str.startsWith("<R>"))
			{
				str = str.substring(3);
				ctx.textAlign="right";
				ctx.fillText(str, this.CANVAS.WIDTH, y);
				ctx.textAlign = "left";
			}
			else
				ctx.fillText(str, x, y);
		}
		// draw 2nd Button Pressed Icon
		if(this.ROM.is2ndPressed())
		{
			var x = this.CANVAS.X + this._col * this.CANVAS.DIGIT_W;
			var y = this.CANVAS.Y + this._row * this.CANVAS.DIGIT_H;
			this.CANVAS.draw2ndButton(x,y);
		}

	}


	// pre process string so we can transform it to RPN
	doMath(anExpr)
	{
		//if we have any "e", replace that with what E is
		anExpr = anExpr.replace(/e/g, Math.E);

		// if we have any "negative" signs:  \u02C9, replace with "-"
		while(anExpr.indexOf(this.CANVAS.NEGATIVE)>-1)
			anExpr = anExpr.replace(this.CANVAS.NEGATIVE, "-");


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
		return calculate(anExpr);
	}
	preprocessLogAndTrig(anExpr, aVal)
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

	}
}

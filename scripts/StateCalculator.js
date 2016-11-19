class	StateCalculator extends State
{
	constructor(aCanvas)
	{
    super(aCanvas);

		this._history = new Array("","","","","","","");
		this._row = 0
		this._col = 0;
	}

	clearPressed()
	{
		this.clearCanvas();
	}

	operatorPressed(anOper)
  {
	   this._history[this._row] += anOper;
		 this._col ++;
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
	   this._history[this._row] += this.NEGATIVE;
		 this._col ++;
		 this.repaint();
  }

	arrowPressed(anArrow)
	{
			if(anArrow == "left" )
				this._col --;
			else if( anArrow == "right")
				this._col ++;
			this.repaint();
	}

	// replace all NEGATIVE signs with MINUS signs
	// replace any -- with + as RPN engine cant handle --
	enterPressed()
	{
		var str = this._history[this._row];
		var res = this.doMath(str);
		this._history[this._row+1] = "<R>" + res;

		this._row +=2;
		this._col = 0;

		this.repaint();
	}

	doMath(anExpr)
	{
		while(anExpr.indexOf(this.NEGATIVE)>-1)
			anExpr = anExpr.replace(this.NEGATIVE, "-");
		anExpr =anExpr.replace(/--/g, "+");

		for( var i=anExpr.length; i>0; i--)
		{
			if( anExpr.charAt(i)=='(' && anExpr.charAt(i-1) >='0' && anExpr.charAt(i-1) <='9' )
				anExpr = anExpr.substring(0,i) + "*" + anExpr.substring(i);
		}
		return calculate(anExpr);

	}

	// Redraw screen based on contents of _history
	repaint()
	{
		this.clearCanvas();

		var ctx = this.CONTEXT;
		ctx.font = this.FONT;

		//draw focus appropriately first so text can overwrite it
		var x = this.X + this._col * this.DIGIT_W;
		var y = this.Y + this._row * this.DIGIT_H;
		this.drawFocusBox(x, y);

		// Start and top and being to redraw
		x = this.X;
		y = this.Y;

		for( var i=0; i<7; i++)
		{
			y +=  this.DIGIT_H;

			// If item starts with <R> then right justify
			var str = this._history[i];
			if( str.startsWith("<R>"))
			{
				str = str.substring(3);
				ctx.textAlign="right";
				ctx.fillText(str, this.WIDTH, y);
				ctx.textAlign = "left";
			}
			else
				ctx.fillText(str, x, y);
		}
	}
}

class	StateYEquals extends State
{
	constructor(aCanvas)
	{
		super(aCanvas);
    this._equations = new Array("","","","","","","");
		this._row = 0;
    this._col = 0;

  }

	clearPressed()
	{
		this._col = 0;
		this._equations[this._row]="";
		this.repaint();
	}
	numberPressed(aNum)
	{
		this._col ++;
		this._equations[this._row] += aNum;
		this.repaint();
	}
	xPressed()
	{
		this._col ++;
		this._equations[this._row] += "X";
		this.repaint();
	}
	negativePressed()
	{
		this._col ++;
		this._equations[this._row] += this.NEGATIVE;
		this.repaint();
	}
	decimalPressed()
	{
		this._col ++;
		this._equations[this._row] += ".";
		this.repaint();
	}
	operatorPressed(anOper)
	{
		this._col ++;
		this._equations[this._row] += anOper;
		this.repaint();
	}
	yEqualsPressed()
	{
		this.repaint();
	}
	repaint()
	{
		this.clearCanvas();

		//draw focus appropriately before anything else so text will be on top
		this.drawFocusBox(this.X + 40 + this._col*this.DIGIT_W, this.Y+this._row*this.DIGIT_H);

		var ctx = this.CONTEXT;
		ctx.font = this.FONT;

		var x = this.X;

		var y = this.Y;
		for( var i=0; i<7; i++)
		{
			y +=  this.DIGIT_H;
			var str = "/Y" + (i+1) + "=" + this._equations[i];
			ctx.fillText(str, x, y);
		}

	}

	arrowPressed(anArrow)
	{
			if(anArrow == "left" )
				this.cursorLeft();
			else if( anArrow == "right")
				this.cursorRight();
			else if( anArrow == "up")
				this.cursorUp();
			else if( anArrow == "down")
				this.cursorDown();
			this.repaint();
	}
	cursorLeft()
  {
		if( this._col == 0 )
			return;
		this._col --;
  }
  cursorRight()
  {
		if( this._col == this._equations[this._row].length )
			return;
		this._col ++;
  }
	cursorUp()
  {
		if( this._row == 0 )
			return;
		this._row --;
		this._col = this._equations[this._row].length;
  }
  cursorDown()
  {
		if( this._row == this._equations.length )
			return;
		this._row ++;
		this._col = this._equations[this._row].length;
  }
}

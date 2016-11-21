class	StateYEquals
{
	constructor(aCanvas, aRom)
	{
		this.CANVAS = aCanvas;
		this.ROM = aRom;
    this._equations = new Array("","","","","","","");
		this._row = 0;
    this._col = 0;
		this.OFFSET = 40;

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
		this._equations[this._row] += this.CANVAS.NEGATIVE;
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
		this._col += anOper.length;
		this._equations[this._row] += anOper;
		this.repaint();
	}
	yEqualsPressed()
	{
		this.repaint();
	}
	deletePressed()
	{
		var mathStr = this._equations[this._row];
		if( mathStr.length >= this._col)
		{
			mathStr = mathStr.substring(0, this._col) + mathStr.substring(this._col+1);
			this._equations[this._row] = mathStr;
			this.repaint();
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

	repaint()
	{
		this.CANVAS.clearCanvas();

		//draw focus appropriately before anything else so text will be on top
		this.CANVAS.drawFocusBox(this.CANVAS.X + this.OFFSET + this._col*this.CANVAS.DIGIT_W, this.CANVAS.Y+this._row*this.CANVAS.DIGIT_H);

		var ctx = this.CANVAS.CONTEXT;
		ctx.font = this.CANVAS.FONT;

		var x = this.CANVAS.X;

		var y = this.CANVAS.Y;
		for( var i=0; i<7; i++)
		{
			y +=  this.CANVAS.DIGIT_H;
			var str = "/Y" + (i+1) + "=" + this._equations[i];
			ctx.fillText(str, x, y);
		}

		if(this.ROM.is2ndPressed())
		{
			var x = this.CANVAS.X + this._col * this.CANVAS.DIGIT_W + this.OFFSET;
			var y = this.CANVAS.Y + this._row * this.CANVAS.DIGIT_H;
			this.CANVAS.draw2ndButton(x,y);
		}
	}

	enterPressed()
	{
		this.arrowPressed(this.ROM.getKeypad().A_DOWN);
	}
	arrowPressed(anArrow)
	{
			if(anArrow == this.ROM.getKeypad().A_LEFT )
				this.cursorLeft();
			if(anArrow == this.ROM.getKeypad().A_RIGHT )
				this.cursorRight();
			if(anArrow == this.ROM.getKeypad().A_UP )
				this.cursorUp();
			if(anArrow == this.ROM.getKeypad().A_DOWN )
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
		if( this._row == this._equations.length-1 )
			return;
		this._row ++;
		this._col = this._equations[this._row].length;
  }

	getEquations()
	{
		return this._equations;
	}
}

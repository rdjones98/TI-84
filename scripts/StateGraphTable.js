class	StateGraphTable
{
	constructor( aCanvas, aYEquals, aRom )
	{

		this.CANVAS = aCanvas;
		this.Y_EQUALS = aYEquals;
		this.ROM = aRom;

		this.T_COL1 = this.CANVAS.X+5;
		this.T_COL2 = 130;
		this.T_COL3 = 200;
		this.T_ROW1 = aCanvas.Y + aCanvas.DIGIT_H + 5;
		this.T_MAXROWS = 7;

		this.IDX1 = -1;
		this.IDX2 = -1;

		this.CURSORROW = 0;
		this.CURSORIDX = 0;

		this.FONT = "14px Courier";
		this.DIGIT_H = 14;

	}

	clearPressed()
	{
		// do nothing
	}


  numberPressed(aNum)
  {
		// do nothing
  }

  xPressed()
  {
		// do nothing
  }

	graphPressed()
  {
		this.repaint();
	}

	repaint()
	{
    this.CANVAS.clearCanvas();
		this.drawTable();
		this.drawFocusBox();

		for( var i=0; i<this.T_MAXROWS; i++ )
		{
			var y = this.DIGIT_H + this.T_ROW1 + i*this.DIGIT_H;
			this.CANVAS.print(this.CURSORIDX + i, this.T_COL1, y, this.CANVAS.SMALL_FONT);
			if( this.IDX1 > -1 )
			{
				var str = this.ROM.evaluate(this.IDX1, this.CURSORIDX + i);
				this.CANVAS.print(this.CANVAS.formatNumber(str, 6), this.T_COL2, y, this.CANVAS.SMALL_FONT);
			}
			if( this.IDX2 > -1 )
				this.CANVAS.print(this.ROM.evaluate(this.IDX2, this.CURSORIDX + i), this.T_COL3, y, this.CANVAS.SMALL_FONT);
		}
	}
	// Draw tick marks on graph
	drawTable()
	{
		this.CANVAS.drawLn(this.CANVAS.X, this.T_ROW1,this.CANVAS.WIDTH, this.T_ROW1);
		this.CANVAS.drawLn(this.CANVAS.X, this.CANVAS.HEIGHT-this.DIGIT_H,this.CANVAS.WIDTH, this.CANVAS.HEIGHT-this.DIGIT_H);
		this.CANVAS.drawLn(this.T_COL2-7, this.CANVAS.Y,this.T_COL2-7, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H);
		this.CANVAS.drawLn(this.T_COL3-7, this.CANVAS.Y,this.T_COL3-7, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H);

		this.CANVAS.print("X",  this.T_COL2 - 40, this.CANVAS.Y + this.CANVAS.DIGIT_H, this.CANVAS.FONT );

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
			this.CANVAS.print("Y" + (this.IDX1+1), this.T_COL2, this.CANVAS.Y + this.CANVAS.DIGIT_H );
		if(this.IDX2 > -1)
			this.CANVAS.print("Y" + (this.IDX2+1), this.T_COL3, this.CANVAS.Y + this.CANVAS.DIGIT_H );
	}
	secondPressed()
	{
		// draw 2nd Button Pressed Icon
		if(this.ROM.is2ndPressed())
			this.CANVAS.draw2ndButton();
		else
			this.repaint();
	}

	evaluate(anEquationIdx, anX)
	{
		var equ = this.Y_EQUALS._equations[anEquationIdx].replace(/X/g, "(" + anX + ")");
		var res = this.ROM.doMath(equ);
		var str = "" + res;
		if( str.length > 7)
			str = str.substring(0,7);
		return str;
	}

	drawFocusBox()
	{
		var y = this.T_ROW1 + this.CURSORROW*this.DIGIT_H+2;

		this.CANVAS.CONTEXT.fillStyle = "gray";
		this.CANVAS.CONTEXT.fillRect(this.T_COL1, y, this.T_COL2-this.T_COL1-10,this.DIGIT_H);
		this.CANVAS.CONTEXT.fillStyle = "black";
	}

	enterPressed()
	{
		// do nothing
	}
	arrowPressed(anArrow)
	{
			if(anArrow == this.ROM.getKeypad().A_LEFT )
				this.cursorLeft();
			else if( anArrow == this.ROM.getKeypad().A_LEFT)
				this.cursorRight();
			else if( anArrow == this.ROM.getKeypad().A_UP)
			{
				if( this.CURSORROW > 0)
					this.CURSORROW--;
				else
					this.CURSORIDX--;
			}
			else if( anArrow == this.ROM.getKeypad().A_DOWN)
			{
				if( this.CURSORROW < this.T_MAXROWS-1)
					this.CURSORROW++;
				else
					this.CURSORIDX++;
			}
	}

}

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
		var ctx = this.CANVAS.CONTEXT;

		this.drawTable();
		this.drawFocusBox();

		ctx.font = this.FONT;
		for( var i=0; i<this.T_MAXROWS; i++ )
		{
			var y = this.DIGIT_H + this.T_ROW1 + i*this.DIGIT_H;

			ctx.fillText(this.CURSORIDX + i, this.T_COL1, y);
			if( this.IDX1 > -1 )
				ctx.fillText( this.evaluate(this.IDX1, this.CURSORIDX + i), this.T_COL2, y);
			if( this.IDX2 > -1 )
				ctx.fillText( this.evaluate(this.IDX2, this.CURSORIDX + i), this.T_COL3, y);
		}
	}
	// Draw tick marks on graph
	drawTable()
	{
		var ctx = this.CANVAS.CONTEXT;

		ctx.beginPath();
		ctx.moveTo(this.CANVAS.X, this.T_ROW1);
		ctx.lineTo(this.CANVAS.WIDTH, this.T_ROW1);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.CANVAS.X, this.CANVAS.HEIGHT-this.DIGIT_H);
		ctx.lineTo(this.CANVAS.WIDTH, this.CANVAS.HEIGHT-this.DIGIT_H);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.T_COL2-7, this.CANVAS.Y);
		ctx.lineTo(this.T_COL2-7, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.T_COL3-7, this.CANVAS.Y);
		ctx.lineTo(this.T_COL3-7, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H);
		ctx.stroke();

		ctx.font = this.CANVAS.FONT;
		ctx.fillText("X",  this.T_COL2 - 40, this.CANVAS.Y + this.CANVAS.DIGIT_H );

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
			ctx.fillText("Y" + (this.IDX1+1), this.T_COL2, this.CANVAS.Y + this.CANVAS.DIGIT_H );
		if(this.IDX2 > -1)
			ctx.fillText("Y" + (this.IDX2+1), this.T_COL3, this.CANVAS.Y + this.CANVAS.DIGIT_H );

		// draw 2nd Button Pressed Icon
		if(this.ROM.is2ndPressed())
		{
			var x = this.CANVAS.WIDTH-this.CANVAS.DIGIT_W;
			var y = this.CANVAS.Y;
			this.CANVAS.draw2ndButton(x,y);
		}
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
			this.repaint();
	}

}

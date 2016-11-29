class StateStatEdit
{
  constructor(aCanvas, aRom)
  {
    this.CANVAS = aCanvas;
    this.ROM = aRom;

    this.C1 = this.CANVAS.X;
    this.C2 = this.CANVAS.X + 70;
    this.C3 = this.CANVAS.X + 140;
    this.T_ROW1 = aCanvas.Y + aCanvas.DIGIT_H + 5;
    this._sel = 1;
    this._col = 0;
    this._row = 0;
    this._xVals = new Array();
    this._yVals = new Array();

    this._editing = false;
  }
  // Utilitiy Functions
  getYVals()
  {
    return this._yVals;
  }
  getXVals()
  {
    return this._xVals;
  }
  getArray()
  {
    if( this._sel == 1 )
      return this._xVals;
    else
      return this._yVals;

  }

  // Key Pressed Functions
  deletePressed()
  {
    var curArray = this.getArray();
    if(this.ROM.is2ndPressed())
    {
      if( this._row < curArray.length)
        curArray.splice(this._row, 0, 0);
      this.ROM.secondPressed(false);
    }
    else
    {
      if(this._row < curArray.length)
        curArray.splice(this._row, 1);
    }
  }
  numberPressed(aNum)
	{
    var curArray = this.getArray();
		if( curArray.length<=this._row)
        curArray.push(aNum);
    else
    {
      if( ! this._editing )
          curArray[this._row] = "";
      curArray[this._row]+=aNum;
    }
    this._editing = true;
	}

  enterPressed()
  {
    this.arrowPressed(this.ROM.getKeypad().A_DOWN);
  }
  arrowPressed(anArrow)
	{
    this._editing = false;

		if(anArrow == this.ROM.getKeypad().A_LEFT || anArrow == this.ROM.getKeypad().A_RIGHT)
		{
			if( this._sel == 1 )
      {
			    this._sel = 2;
          if( this._row > this._yVals.length)
            this._row = this._yVals.length;
      }
      else
      {
          this._sel = 1;
          if( this._row > this._xVals.length)
            this._row = this._xVals.length;
      }
      this._col = 0;
		}
		else if(anArrow == this.ROM.getKeypad().A_UP )
		{
			if( this._row == 0 )
				return;
			this._row --;
		}
		if(anArrow == this.ROM.getKeypad().A_DOWN )
		{
      var curArray = this.getArray();

      if( this._row == curArray.length )
					return;
			this._row ++;
      this._col = 0;
		}
	}

  // Display Functions
  repaint()
  {
    this.CANVAS.clearCanvas();

    if(this.ROM.is2ndPressed())
		{
			var x = this.CANVAS.WIDTH-this.CANVAS.DIGIT_W;
			var y = this.CANVAS.Y;
			this.CANVAS.draw2ndButton(x,y);
		}

    this.CANVAS.drawLn(this.C2, this.CANVAS.Y,this.C2, this.CANVAS.HEIGHT);
    this.CANVAS.drawLn(this.C3, this.CANVAS.Y,this.C3, this.CANVAS.HEIGHT);
    this.CANVAS.drawLn(this.C1, this.T_ROW1  ,this.CANVAS.WIDTH, this.T_ROW1);

    if( this._sel == 1)
    {
      this.CANVAS.drawFocusBox(this.C1, this.T_ROW1 + this._row*this.CANVAS.DIGIT_H, this.C2-this.C1-5);
    }
    else if( this._sel == 2)
    {
      this.CANVAS.drawFocusBox(this.C2+3, this.T_ROW1 + this._row*this.CANVAS.DIGIT_H, this.C3-this.C2-5);
    }
    this.CANVAS.print("L1",  this.C1, this.T_ROW1 - 5 );
    this.CANVAS.print("L2",  this.C2+3, this.T_ROW1 - 5);
    // Fill out any data
    for( var i=0; i<this._xVals.length; i++)
    {
      this.CANVAS.print(this._xVals[i], this.C1, this.T_ROW1 + this.CANVAS.DIGIT_H*(i+1));
    }
    for( var i=0; i<this._yVals.length; i++)
    {
      this.CANVAS.print(this._yVals[i], this.C2, this.T_ROW1 + this.CANVAS.DIGIT_H*(i+1));
    }
  }
	secondPressed()
	{
		// draw 2nd Button Pressed Icon
		if(this.ROM.is2ndPressed())
			this.CANVAS.draw2ndButton();
		else
			this.repaint();
	}

}

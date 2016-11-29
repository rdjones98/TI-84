class StateZoom
{
  constructor(aCanvas, aGraph, aRom)
  {
    this.CANVAS = aCanvas;
    this.GRAPH = aGraph;
    this.ROM = aRom;

    this.T_ROW1 = aCanvas.Y + this.CANVAS.DIGIT_H-5;
    this.C1 = this.CANVAS.X;
    this._col = 1;
    this._row = 2;
  }
  zoomPressed()
  {
    this.repaint();
  }
  numberPressed(aNum)
  {
      var state = this.ROM.setTraceState(aNum);
      if( aNum == 6)
        state.enterPressed();
  }
  enterPressed()
  {
      this.numberPressed(this._row);
  }
  arrowPressed(anArrow)
  {

    if(anArrow == this.ROM.getKeypad().A_UP )
    {
      if( this._row == 2 )
        return;
      else if( this._row == 3)
        this._row --;
      else if( this._row == 6)
        this._row = 3;
    }

    if(anArrow == this.ROM.getKeypad().A_DOWN )
    {
      if( this._row == 2 )
        this._row ++;
      else if( this._row == 3)
        this._row = 6;
      else if( this._row == 6)
        return;
    }
  }

  repaint()
  {
    var y = this.CANVAS.Y+this.CANVAS.DIGIT_H;
    this.CANVAS.clearCanvas();
    this.CANVAS.drawFocusBox(this.C1, this.CANVAS.Y, 40);
    this.CANVAS.drawFocusBox(this.C1, this.CANVAS.Y+this._row*this.CANVAS.DIGIT_H);
    this.CANVAS.print("ZOOM",       this.C1,  y);
    this.CANVAS.print("MEMORY",     this.C1 + 5*this.CANVAS.DIGIT_W, y, null, "gray" );
    this.CANVAS.print("1:ZBox",     this.C1,  y+=this.CANVAS.DIGIT_H, null, "gray" );
    this.CANVAS.print("2:Zoom In",  this.C1,  y+=this.CANVAS.DIGIT_H );
    this.CANVAS.print("3:Zoom Out", this.C1,  y+=this.CANVAS.DIGIT_H );
    this.CANVAS.print("4:ZDecimal", this.C1,  y+=this.CANVAS.DIGIT_H, null, "gray" );
    this.CANVAS.print("5:ZSquare",  this.C1,  y+=this.CANVAS.DIGIT_H, null, "gray" );
    this.CANVAS.print("6:ZStandard", this.C1, y+=this.CANVAS.DIGIT_H );
    this.CANVAS.print("7:ZTrig",    this.C1,  y+=this.CANVAS.DIGIT_H, null, "gray"     );
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

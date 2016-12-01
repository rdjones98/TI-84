//class StateZoom{  constructor(aCanvas, aGraph, aRom)
function StateZoom(aCanvas, aGraph, aRom)
  {
    this.CANVAS = aCanvas;
    this.GRAPH = aGraph;
    this.ROM = aRom;

    this.T_ROW1 = aCanvas.Y + this.CANVAS.DIGIT_H-5;
    this.C1 = this.CANVAS.X;
    this._col = 1;
    this._row = 2;
  }

StateZoom.prototype.zoomPressed = function()
  {
    this.repaint();
  };

StateZoom.prototype.numberPressed = function(aNum)
  {
      var state = this.ROM.setTraceState(aNum);
      if( aNum == 6)
        state.enterPressed();
  };

StateZoom.prototype.enterPressed = function()
  {
      this.numberPressed(this._row);
  };

StateZoom.prototype.arrowPressed = function(anArrow)
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
  };

StateZoom.prototype.repaint = function()
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
  };

StateZoom.prototype.secondPressed = function()
	{
		// draw 2nd Button Pressed Icon
		if(this.ROM.is2ndPressed())
			this.CANVAS.draw2ndButton();
		else
			this.repaint();
	};

//class StateWindow{  constructor(aCanvas, aGraph, aRom)
function StateWindow(aCanvas, aGraph, aRom)
  {
    this.CANVAS = aCanvas;
    this.ROM = aRom;
    this.GRAPH = aGraph;

    this.OFFSET  = 10;
    this.X = this.CANVAS.X + this.CANVAS.DIGIT_W*6;
    this.Y = this.CANVAS.Y + this.CANVAS.DIGIT_H ;
    this._row = 0;
    this._col = 0;
  }

StateWindow.prototype.getWindowValue = function()
{
    if( this._row == 0)
      return "" + this.GRAPH.X_MIN ;
    else if( this._row == 1)
      return "" + this.GRAPH.X_MAX ;
    else if( this._row == 3)
      return "" + this.GRAPH.Y_MIN ;
    else if( this._row == 4)
      return "" + this.GRAPH.Y_MAX ;
  };

StateWindow.prototype.setWindowValue = function(aVal)
{
    if( this._row == 0)
      this.GRAPH.X_MIN = aVal;
    else if( this._row == 1)
      this.GRAPH.X_MAX = aVal;
    else if( this._row == 3)
      this.GRAPH.Y_MIN = aVal;
    else if( this._row == 4)
      this.GRAPH.Y_MAX = aVal;
  };
StateWindow.prototype.deletePressed = function()
  {
    var str = this.getWindowValue()
    if(this._col <= str.length)
    {
      str = str.substring(0,this._col) +str.substring(this._col+1);
    }
    this.setWindowValue(str);
  };

StateWindow.prototype.clearPressed = function()
	{
		this._col = 0;
    this.setWindowValue("");
		this.repaint();
	};

StateWindow.prototype.negativePressed = function()
	{
		this.numberPressed("-");
	};

StateWindow.prototype.operatorPressed = function(anOper)
	{
    if( anOper == "-")
		  this.numberPressed("-");
	};

StateWindow.prototype.numberPressed = function(aNum)
  {
    var str = this.getWindowValue();
    if( str.length > this._col )
    {
      this._col = 0;
      str = "";
    }
    this._col ++;
    str += aNum;
    this.setWindowValue(str);
  };

StateWindow.prototype.windowPressed = function()
  {
    this.repaint();
  };

StateWindow.prototype.enterPressed = function()
	{
		this.arrowPressed(this.ROM.getKeypad().A_DOWN);
	};

StateWindow.prototype.arrowPressed = function(anArrow)
	{
			if(anArrow == this.ROM.getKeypad().A_LEFT )
      {
        if( this._col == 0 )
    			return;
    		this._col --;
      }
			if(anArrow == this.ROM.getKeypad().A_RIGHT )
      {
        if( this._col == this.getWindowValue().length )
    			return;
    		this._col ++;
      }
			if(anArrow == this.ROM.getKeypad().A_UP )
      {
        if( this._row == 0 )
    			return;
    		this._row --;
        if(this._row == 2)
          this._row --;
    		this._col = 0;
      }
			if(anArrow == this.ROM.getKeypad().A_DOWN )
      {
        if( this._row == 4 )
    			return;
    		this._row ++;
        if(this._row == 2)
          this._row ++;

    		this._col = 0;
      }
	};

StateWindow.prototype.repaint = function()
  {
    this.CANVAS.clearCanvas();
    this.CANVAS.drawFocusBox(this.X + this._col*this.CANVAS.DIGIT_W, this.Y+this._row*this.CANVAS.DIGIT_H);

    var x = this.CANVAS.X+this.OFFSET;
    var y = this.CANVAS.Y;
    this.CANVAS.print("WINDOW",  this.CANVAS.X,      y += this.CANVAS.DIGIT_H );
    this.CANVAS.print("Xmin="+this.GRAPH.X_MIN,   x, y += this.CANVAS.DIGIT_H );
    this.CANVAS.print("Xmax="+this.GRAPH.X_MAX,   x, y += this.CANVAS.DIGIT_H );
    this.CANVAS.print("Xscl=1",                   x, y += this.CANVAS.DIGIT_H, null, "gray" );
    this.CANVAS.print("Ymin="+this.GRAPH.Y_MIN,   x, y += this.CANVAS.DIGIT_H );
    this.CANVAS.print("Ymax="+this.GRAPH.Y_MAX,   x, y += this.CANVAS.DIGIT_H );
    this.CANVAS.print("Yscl=1",                   x, y += this.CANVAS.DIGIT_H, null, "gray" );
    this.CANVAS.print("Xres=1",                   x, y += this.CANVAS.DIGIT_H, null, "gray" );
  };

StateWindow.prototype.secondPressed = function()
	{
		// draw 2nd Button Pressed Icon
		if(this.ROM.is2ndPressed())
			this.CANVAS.draw2ndButton();
		else
			this.repaint();
	};

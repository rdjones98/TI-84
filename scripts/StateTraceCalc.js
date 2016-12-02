//class StateTraceCalc{  constructor(aCanvas, aYEquals, aGraph, aTrace, aRom)
function StateTraceCalc(aCanvas, aYEquals, aGraph, aTrace, aRom)
  {
    this.CANVAS = aCanvas;
    this.YEQUALS = aYEquals;
    this.GRAPH   = aGraph;
    this.TRACE   = aTrace;
    this.ROM     = aRom;

    this._row = 2;

		this._calculate = 0;
		this.ZERO=2;
		this.MIN=3;
		this.MAX=4;
		this.INTERSECT=5;

    this._equ1=null;
    this._equ2=null;
    this._leftBound = null;
    this._rightBound = null;
    this._guess = null;
  }

StateTraceCalc.prototype.traceCalcPressed = function()
  {
    this._calculate = 0;
    this._equ1=null;
    this._equ2=null;
    this._leftBound = null;
    this._rightBound = null;
    this._guess = null;
    this.repaint();
  };

StateTraceCalc.prototype.arrowPressed = function(anArrow)
  {
		if(this._calculate == 0 && anArrow == this.ROM.getKeypad().A_UP )
    {
      if( this._row > 2 )
        this._row --;
    }
		else if(this._calculate == 0 && anArrow == this.ROM.getKeypad().A_DOWN )
    {
      if( this._row < 5 )
        this._row ++;
    }
    else
      this.TRACE.arrowPressed(anArrow);
  }
StateTraceCalc.prototype.numberPressed = function(anum)
  {
    this._calculate = anum;
    this.TRACE.tracePressed();
  };

StateTraceCalc.prototype.enterPressed = function()
  {
    if( this._calculate == 0)
      this._calculate = this._row;
    else if( this._calculate == this.ZERO || this._calculate == this.MIN || this._calculate == this.MAX)
    {
      // This will happen 3 times. Each time pick up the next value
      if(this._leftBound == null)
          this._leftBound = this.TRACE.TRACE_X;
      else if(this._rightBound == null)
          this._rightBound = this.TRACE.TRACE_X;
      else if (this._guess == null)
          this._guess = this.TRACE.TRACE_X;
    }
    else if( this._calculate == this.INTERSECT)
    {
      // This will happen 3 times. Each time pick up the next value
      if(this._equ1 == null)
          this._equ1 = this.TRACE._curEquationIDX;
      else if (this._equ2 == null)
          this._equ2 = this.TRACE._curEquationIDX;
      else if (this._guess == null)
          this._guess = this.TRACE.TRACE_X;
    }
    this.TRACE.tracePressed();
  };

StateTraceCalc.prototype.evaluate = function(anEqu, anX)
	{
    anX = this.ROM.fixRoundingError(anX);
		var equ = anEqu.replace(/X/g, "(" + anX + ")");
		return this.ROM.doMath(equ);
	};

StateTraceCalc.prototype.secondPressed = function()
	{
		// draw 2nd Button Pressed Icon
		if(this.ROM.is2ndPressed())
			this.CANVAS.draw2ndButton();
		else
			this.repaint();
	};

StateTraceCalc.prototype.repaint = function()
  {
      var x = this.CANVAS.X;
      var y = this.CANVAS.Y;

      // If the user has selected CALCULATE INTERSECT then prompt them 3 times.
      // 1st for the 1st curve.
      // Then 2nd Curve
      // Finally for the guess
      if( this._calculate == this.ZERO || this._calculate == this.MIN || this._calculate == this.MAX)
      {
        this.paintMinMaxZero();
        return;
      }
      else if( this._calculate == this.INTERSECT)
      {
        this.paintIntersection();
        return;
      }
      else if(this._calculate  != 0)
        return;

      // This is selction screen for what to calculate
      this.CANVAS.clearCanvas();
      this.CANVAS.drawFocusBox(x, y, 9*this.CANVAS.DIGIT_W);
      this.CANVAS.drawFocusBox(x, y+this._row*this.CANVAS.DIGIT_H);

      this.CANVAS.print("CALCULATE",  this.CANVAS.X,      y += this.CANVAS.DIGIT_H );
      this.CANVAS.print("1:value",    x, y += this.CANVAS.DIGIT_H, null, "gray"  );
      this.CANVAS.print("2:zero",     x, y += this.CANVAS.DIGIT_H  );
      this.CANVAS.print("3:minimum",  x, y += this.CANVAS.DIGIT_H);
      this.CANVAS.print("4:maximum",  x, y += this.CANVAS.DIGIT_H);
      this.CANVAS.print("5:intersect",x, y += this.CANVAS.DIGIT_H );
      this.CANVAS.print("6:dy/dx",    x, y += this.CANVAS.DIGIT_H, null, "gray" );
      this.CANVAS.print("7:Sf(x)dx",  x, y += this.CANVAS.DIGIT_H, null, "gray" );
  };

  // Paint Mix/Max
StateTraceCalc.prototype.paintMinMaxZero = function()
  {
      var x = this.CANVAS.X;
      var y = this.CANVAS.Y;

      if( this._leftBound == null)
        this.CANVAS.print( "LeftBound?", x, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT );
      else if( this._rightBound == null )
      {
          this.CANVAS.drawLeftBound(this.ROM.getStateGraph().CENTER_X + this._leftBound*this.ROM.getStateGraph().STEP_X);
//        this.TRACE.select2ndEquation(this._equ1);
//        this.TRACE.repaint();
        this.CANVAS.print( "RightBound?", x, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT );
      }
      else if( this._guess == null)
      {
        this.CANVAS.drawLeftBound(this.ROM.getStateGraph().CENTER_X + this._leftBound*this.ROM.getStateGraph().STEP_X);
        this.CANVAS.drawRightBound(this.ROM.getStateGraph().CENTER_X + this._rightBound*this.ROM.getStateGraph().STEP_X);
        this.CANVAS.print( "Guess?", x, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT );
      }
      else if( this._calculate == this.ZERO )
      {
        var equ1 = this.YEQUALS.getEquations()[this.TRACE._curEquationIDX];
        var xCoord = this.findIntersection( equ1, "0", this._leftBound, this._rightBound, 1);  // pass in y=0

        if ( xCoord == null )
        {
          this.CANVAS.clearCanvas();
          this.CANVAS.print( "ERR:NO SIGN CHNG", this.CANVAS.X,this.CANVAS.Y+this.CANVAS.DIGIT_H);
        }
        else {
          this.TRACE.setTraceX(xCoord);
          this.TRACE.repaint();
          this.CANVAS.print( "Zero", x, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT );
        }
        this.traceCalcFinished();
      }
      else if( this._calculate == this.MIN )
      {
        var minX = this.findMinimum();
        this.TRACE.TRACE_X = minX;
        this.TRACE.repaint();
        this.CANVAS.print( "Minimum", x, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT );
        this.traceCalcFinished();
      }
      else if( this._calculate == this.MAX )
      {
        var maxX = this.findMaximum();
        this.TRACE.setTraceX( maxX );
        this.TRACE.repaint();
        this.CANVAS.print( "Maximum", x, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT );
        this.traceCalcFinished();
      }
  };

StateTraceCalc.prototype.findMinimum = function()
  {
		var step = .001;
    var equ = this.YEQUALS.getEquations()[this.TRACE._curEquationIDX];
    var min = null;
    var minX = null;
    for( var idx = this._leftBound; idx<=this._rightBound; idx += step)
    {
				var yCoord1 = this.evaluate(equ, idx) ;
        if( min == null || yCoord1 < min)
        {
          min = yCoord1;
          minX = idx;
        }
    }
    return minX;
  };

StateTraceCalc.prototype.findMaximum = function()
  {
//		var step = (this._rightBound-this._leftBound)/(200);
		var step = .001;
    var equ = this.YEQUALS.getEquations()[this.TRACE._curEquationIDX];
    var max = null;
    var maxX = null;
    for( var idx = this._leftBound; idx<=this._rightBound; idx += step)
    {
				var yCoord1 = this.evaluate(equ, idx) ;
        if( max == null || yCoord1 > max)
        {
          max = yCoord1;
          maxX = idx;
        }
    }
    return maxX;
  };

  // All things intersection
  StateTraceCalc.prototype.paintIntersection = function()
  {
      var x = this.CANVAS.X;
      var y = this.CANVAS.Y;

      if( this._equ1 == null)
        this.CANVAS.print( "First Curve?", x, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT );
      else if( this._equ2 == null || this._equ1 == this._equ2)
      {
        this.TRACE.select2ndEquation(this._equ1);
        this.TRACE.repaint();
        this.CANVAS.print( "Second Curve?", x, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT );
      }
      else if( this._guess == null)
        this.CANVAS.print( "Guess?", x, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT );
      else
      {
        var lastX    = Number(this.GRAPH.X_MIN);
        var lastDist = null;
        var closestX = null;
        var equ1 = this.YEQUALS.getEquations()[this._equ1];
        var equ2 = this.YEQUALS.getEquations()[this._equ2];

        do {
          var xCoord=this.findIntersection(equ1, equ2, lastX, Number(this.GRAPH.X_MAX), 1);
          if( xCoord == null )
            break;
          else
          {
            var dist = Math.abs( this.TRACE.TRACE_X - xCoord );
            if( lastDist == null || dist < lastDist )
            {
              closestX = xCoord;
              lastDist = dist;
            }
          }
          lastX = xCoord;
        } while (xCoord != null);

        if ( lastDist == null )
        {
          this.CANVAS.clearCanvas();
          this.CANVAS.print( "ERR:NO SIGN CHNG", this.CANVAS.X,this.CANVAS.Y+this.CANVAS.DIGIT_H);
        }
        else
        {
          this.TRACE.setTraceX( closestX );
          this.TRACE.repaint();
          this.CANVAS.print( "Intersection", x, this.CANVAS.HEIGHT-this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT );
        }
        this.traceCalcFinished();
      }
  };

StateTraceCalc.prototype.findIntersection = function(equ1, equ2, aLeftX, aRightX, aCnt)
  {
    var step = .01;
    if(aCnt>1)
      step=.000001

    var e1LTe2 = null;
		for( var xCoord=aLeftX; xCoord<aRightX; xCoord=xCoord + step)
    {
				var yCoord1 = this.evaluate(equ1, xCoord) ;
				var yCoord2 = this.evaluate(equ2, xCoord) ;
        if( yCoord1 == yCoord2)
        {
          return xCoord;
        }
        else if ( e1LTe2 == null )
        {
          e1LTe2 = (yCoord1 < yCoord2 );
        }
        else if( ( yCoord1 < yCoord2) != e1LTe2 )
        {
          if(aCnt > 1)
            return xCoord;
          else
            return this.findIntersection(equ1, equ2, xCoord-step, xCoord, aCnt + 1);
        }
    }
    return null;
  };

StateTraceCalc.prototype.traceCalcFinished = function()
  {
      this._calculate = 0;
      this._equ1=null;
      this._equ2=null;
      this._guess = null;
      this.ROM.setTraceState();
  };

//class	StateTrace{	constructor( aCanvas, aGraph, aRom )
function StateTrace( aCanvas, aGraph, aRom )
	{
		this.CANVAS = aCanvas;
		this.GRAPH = aGraph;
		this.ROM = aRom;

		this.TRACE_X = 0;
		this.TRACE_STEP = (this.GRAPH.X_MAX - this.GRAPH.X_MIN)/100;

		// track which equation we are tracking
		this._curEquationIDX=0;

		this._zoom = 0;
		this.ZOOM_IN = 2;
		this.ZOOM_OUT = 3;
		this.ZOOM_STANDARD = 6;

		//if we press numbers, track them
		this._numberPressed=null;
  }

StateTrace.prototype.setTraceX = function(aVal)
	{
		this.TRACE_X = this.ROM.fixRoundingError(aVal);
	};

StateTrace.prototype.select2ndEquation = function(anIdx)
	{
		for( var idx = anIdx+1; idx<7; idx++)
		{
			if(this.ROM.getStateYEquals().getEquations()[idx].length > 0)
			{
				this._curEquationIDX = idx;
				return;
			}
		}
		for( var idx = 0; idx<anIdx; idx++)
		{
			if(this.ROM.getStateYEquals().getEquations()[idx].length > 0)
			{
				this._curEquationIDX = idx;
				return;
			}
		}
	};

StateTrace.prototype.numberPressed = function(aNum)
	{
			if( this._numberPressed == null)
				this._numberPressed = aNum;
			else
				this._numberPressed += aNum;
//		this.ROM.setStateCalculator();
//		this.ROM.numberPressed(aNum);
	};

StateTrace.prototype.enterPressed = function()
	{
		// If we pressed a number, then change to that X - Coordinate
		if(this._numberPressed != null)
		{
			this.setTraceX(Number(this._numberPressed));
			this.repaint();
			this._numberPressed = null;
		}
		else if(this._zoom == this.ZOOM_IN)
		{
			var xOffset = (this.GRAPH.X_MAX - this.GRAPH.X_MIN)/8.0;
			var yOffset = (this.GRAPH.Y_MAX - this.GRAPH.Y_MIN)/8.0;
			var y = this.ROM.evaluate(this._curEquationIDX, this.TRACE_X);
			this.GRAPH.X_MIN = this.TRACE_X - xOffset;
			this.GRAPH.X_MAX = this.TRACE_X + xOffset;
			this.GRAPH.Y_MIN = y - yOffset;
			this.GRAPH.Y_MAX = y + yOffset;
		}
		else if(this._zoom == this.ZOOM_OUT)
		{
			this.GRAPH.X_MIN *= 4;
			this.GRAPH.X_MAX *= 4;
			this.GRAPH.Y_MIN *= 4;
			this.GRAPH.Y_MAX *= 4;
		}
		else if(this._zoom == this.ZOOM_STANDARD)
		{
			this.GRAPH.X_MIN = -10;
			this.GRAPH.X_MAX = 10;
			this.GRAPH.Y_MIN = -10;
			this.GRAPH.Y_MAX = 10;
		}
		this.TRACE_STEP = (this.GRAPH.X_MAX - this.GRAPH.X_MIN)/100;
		this.repaint();
	};

StateTrace.prototype.arrowPressed = function(anArrow)
	{
			if(anArrow == this.ROM.getKeypad().A_UP )
			{
				if( this._curEquationIDX > 0 )
					this._curEquationIDX --;
			}
			else if (anArrow == this.ROM.getKeypad().A_DOWN)
			{
				if( this._curEquationIDX < 6 && this.ROM.getStateYEquals().getEquations()[this._curEquationIDX+1].length > 0 )
					this._curEquationIDX ++;
			}
			if(anArrow == this.ROM.getKeypad().A_LEFT )
			{
				if(this.TRACE_X > this.ROM.getStateGraph().X_MIN)
					this.setTraceX(this.TRACE_X - this.TRACE_STEP);
			}
			else if( anArrow == this.ROM.getKeypad().A_RIGHT)
			{
				if(this.TRACE_X < this.ROM.getStateGraph().X_MAX)
					this.setTraceX(this.TRACE_X + this.TRACE_STEP);
			}
			this.repaint();
	};

StateTrace.prototype.clearPressed = function()
	{
		this.CANVAS.clearCanvas();
		this.ROM.setStateCalculator();
	};

StateTrace.prototype.tracePressed = function()
	{
		this._numberPressed = null;
		if(this.ROM.getStateYEquals().getEquations()[this._curEquationIDX].length == 0 )
			for( var idx = 0; idx<7; idx++)
				if(this.ROM.getStateYEquals().getEquations()[idx].length > 0)
				{
					this._curEquationIDX = idx;
					break;
				}

		this.repaint();
	};

StateTrace.prototype.repaint = function()
	{
		this.CANVAS.clearCanvas();
		this.ROM.getStateGraph().repaint();
		var equations  = this.ROM.getStateYEquals().getEquations();
		var graphState = this.ROM.getStateGraph();
		var xVal = this.CANVAS.formatNumber( this.TRACE_X );
		var yVal = this.CANVAS.formatNumber( this.ROM.evaluate(this._curEquationIDX, this.TRACE_X) );

		this.CANVAS.print("Y"  +(this._curEquationIDX+1) + "="+ equations[this._curEquationIDX], this.CANVAS.X, this.CANVAS.Y + this.CANVAS.DIGIT_H, this.CANVAS.SMALL_FONT);
		if( this._numberPressed == null )
		{
			var xForY = this.CANVAS.X + (this.CANVAS.WIDTH-this.CANVAS.X)/2 + this.CANVAS.DIGIT_W;
			this.CANVAS.print("X="  + xVal, this.CANVAS.X, this.CANVAS.HEIGHT-2, this.CANVAS.SMALL_FONT);
			this.CANVAS.print("Y="  + yVal, xForY,         this.CANVAS.HEIGHT-2, this.CANVAS.SMALL_FONT);
		}
		else
		{
			this.CANVAS.print("X="  + this._numberPressed, this.CANVAS.X, this.CANVAS.HEIGHT-2);
		}

		// Draw the X for the trace
		var x = graphState.CENTER_X - 7 + this.TRACE_X * graphState.STEP_X;
		var y = graphState.CENTER_Y+5 + this.ROM.evaluate(this._curEquationIDX, this.TRACE_X) * -1 * graphState.STEP_Y;

		if( this.CANVAS.Y < y && y < this.CANVAS.HEIGHT)
			this.CANVAS.print("+", x, y, "25px Courier", "#FF0000");

		// draw 2nd Button Pressed Icon
		if(this.ROM.is2ndPressed())
			this.CANVAS.draw2ndButton();
	};

StateTrace.prototype.zoom = function(aZoom)
	{
		this._zoom = aZoom;
	};

StateTrace.prototype.secondPressed = function()
	{
		// draw 2nd Button Pressed Icon
	};

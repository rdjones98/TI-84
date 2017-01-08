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
	this._trace = new Array(new Array());
	this.EDITOR = new Editor(this, this._trace);
	this._row = 0;
	this._col = 0;

}
StateTrace.prototype.setCol = function(aNum){ this._col = aNum; };
StateTrace.prototype.getRow = function()	{ return this._row; };
StateTrace.prototype.getCol = function()	{ return this._col; };
StateTrace.prototype.getDataArray = function(){	return this._trace;  };
StateTrace.prototype.incrCol = function(aNum)
{
	this._col += aNum;
};

StateTrace.prototype.numberPressed = function(aNum)
{
	this.EDITOR.numberPressed(aNum);
};

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


StateTrace.prototype.operatorPressed = function(anOper)
{
	this.EDITOR.operatorPressed(anOper);
};

StateTrace.prototype.enterPressed = function()
{
	var window = this.ROM.getStateWindow();
	
	// If we pressed a number, then change to that X - Coordinate
	if(this._trace[0].length != 0)
	{
		var x = this._trace[0][0].toNumber();
		this.setTraceX(Number(x));
		this.repaint();
		this._trace[0] = new Array();
	}
	else if(this._zoom == this.ZOOM_IN)
	{
		var xOffset = (this.GRAPH.X_MAX - this.GRAPH.X_MIN)/8.0;
		var yOffset = (this.GRAPH.Y_MAX - this.GRAPH.Y_MIN)/8.0;
		var y = this.ROM.evaluate(this._curEquationIDX, this.TRACE_X);
		window.setXMin(this.TRACE_X - xOffset);
		window.setXMax(this.TRACE_X + xOffset);
		window.setYMin( y - yOffset );
		window.setYMax( y + yOffset );
	}
	else if(this._zoom == this.ZOOM_OUT)
	{
		window.setXMin( this.GRAPH.X_MIN * 4 );
		window.setXMax( this.GRAPH.X_MAX * 4 );
		window.setYMin( this.GRAPH.Y_MIN * 4 );
		window.setYMax( this.GRAPH.Y_MAX * 4 );
	}
	else if(this._zoom == this.ZOOM_STANDARD)
	{
		window.setXMin( -10 );
		window.setXMax( 10 );
		window.setYMin( -10 );
		window.setYMax( 10 );
	}
	var div = ( this.GRAPH.X_MAX - this.GRAPH.X_MIN > 50000 ) ? 25 : 100; 
	this.TRACE_STEP = (this.GRAPH.X_MAX - this.GRAPH.X_MIN)/div;
	this.repaint();
};

StateTrace.prototype.arrowPressed = function(anArrow)
{
	if(anArrow == Keypad.A_UP )
	{
		if( this._curEquationIDX > 0 )
			this._curEquationIDX --;
	}
	else if (anArrow == Keypad.A_DOWN)
	{
		if( this._curEquationIDX < 6 && this.ROM.getStateYEquals().getEquations()[this._curEquationIDX+1].length > 0 )
			this._curEquationIDX ++;
	}
	if(anArrow == Keypad.A_LEFT )
	{
		if(this.TRACE_X > this.ROM.getStateGraph().X_MIN)
			this.setTraceX(this.TRACE_X - this.TRACE_STEP);
	}
	else if( anArrow == Keypad.A_RIGHT)
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
	this._trace[0] = new Array(); // Reset values we may have typed
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
	if(equations[this._curEquationIDX].length == 0)
		return;
	var graphState = this.ROM.getStateGraph();
	var xVal = this.CANVAS.formatNumber( this.TRACE_X );
	var yVal = this.CANVAS.formatNumber( this.ROM.evaluate(this._curEquationIDX, this.TRACE_X) );

	this.CANVAS.print("Y"  +(this._curEquationIDX+1) + "=", Canvas.X, Canvas.Y + Canvas.DIGIT_H, Canvas.SMALL_FONT);
	this.CANVAS.print(equations[this._curEquationIDX], Canvas.X + 3*Canvas.DIGIT_W, Canvas.Y + Canvas.DIGIT_H, Canvas.SMALL_FONT);

	if( this._trace[0].length == 0  )
	{
		var xForY = Canvas.X + (Canvas.WIDTH-Canvas.X)/2 + Canvas.DIGIT_W;
		this.CANVAS.print("X="  + xVal, Canvas.X, Canvas.HEIGHT-2, Canvas.SMALL_FONT);
		this.CANVAS.print("Y="  + yVal, xForY,         Canvas.HEIGHT-2, Canvas.SMALL_FONT);
	}
	else
	{
		this.CANVAS.print("X=",            Canvas.X, Canvas.HEIGHT-2);
		this.CANVAS.print( this._trace[0], Canvas.X + 2*Canvas.DIGIT_W, Canvas.HEIGHT-2);
	}

	// Draw the X for the trace
	var x = graphState.CENTER_X - 7 + this.TRACE_X * graphState.STEP_X;
	var y = graphState.CENTER_Y+5 + this.ROM.evaluate(this._curEquationIDX, this.TRACE_X) * -1 * graphState.STEP_Y;

	if( Canvas.Y < y && y < Canvas.HEIGHT)
		this.CANVAS.print("+", x, y, "25px Courier", "#FF0000");

	// draw 2nd Button Pressed Icon
	if(this.ROM.is2ndPressed())
		this.CANVAS.draw2ndButton();
};

StateTrace.prototype.zoom = function(aZoom)
{
	this._zoom = aZoom;
};

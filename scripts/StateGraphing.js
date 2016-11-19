class	StateGraphing extends State
{
	constructor( aCanvas, aYEquals, aRom )
	{
		super(aCanvas);

		this.Y_EQUALS = aYEquals;
		this.ROM = aRom;

		// Dimension constants
		this.CENTER_X = (this.X+this.WIDTH)/2;
		this.CENTER_Y = (this.Y+this.HEIGHT)/2;

		this.FONT = "14px Courier";

		this.X_MIN = -10;
		this.X_MAX = 10;
		this.Y_MIN = -10
		this.Y_MAX = 10;

		this.TRACE_X = 0;
		this.TRACE_Y = 0;

		this.STEP_X = ( this.WIDTH - this.X ) / (  this.X_MAX - this.X_MIN );
		this.STEP_Y = ( this.HEIGHT - this.Y ) / ( this.Y_MAX - this.Y_MIN );

	}

	clearPressed()
	{
			this.clearCanvas();
			this.ROM.setCalcState();
//			this.yEqualsPressed();
	}


  numberPressed(aNum)
  {
		/*
		this._state.numberPressed(aNum);
		this.yEqualsPressed();
		*/
  }

  xPressed()
  {
		/*
		this._state.xPressed();
		this.yEqualsPressed();
		*/
  }

	// Draw tick marks on graph
	drawTickMarks()
	{
		var ctx = this.CONTEXT;
		for( var i=this.CENTER_X; i<=this.WIDTH; i+=this.STEP_X)
		{
			ctx.beginPath();
			ctx.moveTo(i, this.CENTER_Y-3);
			ctx.lineTo(i, this.CENTER_Y);
			ctx.stroke();
		}
		for( var i=this.CENTER_X; i>=this.X; i-=this.STEP_X)
		{
			ctx.beginPath();
			ctx.moveTo(i, this.CENTER_Y-3);
			ctx.lineTo(i, this.CENTER_Y);
			ctx.stroke();
		}
		for( var i=this.CENTER_Y; i<=this.HEIGHT; i+=this.STEP_Y)
		{
			ctx.beginPath();
			ctx.moveTo(this.CENTER_X, i);
			ctx.lineTo(this.CENTER_X+3, i);
			ctx.stroke();
		}
		for( var i=this.CENTER_Y; i>=this.Y; i-=this.STEP_Y)
		{
			ctx.beginPath();
			ctx.moveTo(this.CENTER_X, i);
			ctx.lineTo(this.CENTER_X+3, i);
			ctx.stroke();
		}

	}
  graphPressed()
  {
		this.repaint();
	}
	repaint()
	{
    this.clearCanvas();
		var ctx = this.CONTEXT;


		// Draw axis
		ctx.beginPath();
		ctx.moveTo(this.X,     this.CENTER_Y);
		ctx.lineTo(this.WIDTH, this.CENTER_Y);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(this.CENTER_X, this.Y);
		ctx.lineTo(this.CENTER_X, this.HEIGHT);
		ctx.stroke();

		// Draw tick marks on axis
		this.drawTickMarks();

		var ctx = this.CONTEXT;
		// Graph all equations
		for( var equ=0; equ<7; equ++)
		{
			var pathStarted = false;
			for( var xCoord=this.X_MIN; xCoord<=this.X_MAX; xCoord+=.25)
			{
				var yCoord = this.CENTER_Y + this.evaluate(equ, xCoord) * -1 * this.STEP_Y;
				if( !pathStarted && this.Y <= yCoord && yCoord <= this.HEIGHT)
				{
					ctx.beginPath();
					ctx.moveTo(this.CENTER_X + xCoord * this.STEP_X,yCoord);
					pathStarted = true;
				}
				else if( this.Y <= yCoord && yCoord <= this.HEIGHT )
					ctx.lineTo(this.CENTER_X + xCoord * this.STEP_X, yCoord );
			}
			if(pathStarted)
				ctx.stroke();
		}
	}
	evaluate(anEquationIdx, anX)
	{
		var equ = this.Y_EQUALS._equations[anEquationIdx].replace(/X/g, "(" + anX + ")");
		return this.ROM.doMath(equ);
	}

	arrowPressed(anArrow)
	{
		this.ROM.setTraceState().arrowPressed(anArrow);
	}

}

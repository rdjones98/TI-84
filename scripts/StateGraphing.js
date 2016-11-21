class	StateGraphing
{
	constructor( aCanvas, aYEquals, aRom )
	{

		this.CANVAS = aCanvas;
		this.Y_EQUALS = aYEquals;
		this.ROM = aRom;

		// Dimension constants
		this.CENTER_X = (aCanvas.X+aCanvas.WIDTH)/2;
		this.CENTER_Y = (aCanvas.Y+aCanvas.HEIGHT)/2;

		this.FONT = "14px Courier";

		this.X_MIN = -10;
		this.X_MAX = 10;
		this.Y_MIN = -10
		this.Y_MAX = 10;

		this.STEP_X = ( aCanvas.WIDTH - aCanvas.X ) / (  this.X_MAX - this.X_MIN );
		this.STEP_Y = ( aCanvas.HEIGHT - aCanvas.Y ) / ( this.Y_MAX - this.Y_MIN );

	}

	clearPressed()
	{
			this.CANVAS.clearCanvas();
			this.ROM.setStateCalculator();
	}


  numberPressed(aNum)
  {
		this.CANVAS.clearCanvas();
		this.ROM.setStateCalculator().numberPressed(aNum);
  }

  xPressed()
  {
		this.CANVAS.clearCanvas();
		this.ROM.setStateCalculator().xPressed();
  }

	// Draw tick marks on graph
	drawTickMarks()
	{
		var ctx = this.CANVAS.CONTEXT;
		for( var i=this.CENTER_X; i<=this.CANVAS.WIDTH; i+=this.STEP_X)
		{
			ctx.beginPath();
			ctx.moveTo(i, this.CENTER_Y-3);
			ctx.lineTo(i, this.CENTER_Y);
			ctx.stroke();
		}
		for( var i=this.CENTER_X; i>=this.CANVAS.X; i-=this.STEP_X)
		{
			ctx.beginPath();
			ctx.moveTo(i, this.CENTER_Y-3);
			ctx.lineTo(i, this.CENTER_Y);
			ctx.stroke();
		}
		for( var i=this.CENTER_Y; i<=this.CANVAS.HEIGHT; i+=this.STEP_Y)
		{
			ctx.beginPath();
			ctx.moveTo(this.CENTER_X, i);
			ctx.lineTo(this.CENTER_X+3, i);
			ctx.stroke();
		}
		for( var i=this.CENTER_Y; i>=this.CANVAS.Y; i-=this.STEP_Y)
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
    this.CANVAS.clearCanvas();
		var ctx = this.CANVAS.CONTEXT;


		// Draw axis
		ctx.beginPath();
		ctx.moveTo(this.CANVAS.X,     this.CENTER_Y);
		ctx.lineTo(this.CANVAS.WIDTH, this.CENTER_Y);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(this.CENTER_X, this.CANVAS.Y);
		ctx.lineTo(this.CENTER_X, this.CANVAS.HEIGHT);
		ctx.stroke();

		// Draw tick marks on axis
		this.drawTickMarks();

		var ctx = this.CANVAS.CONTEXT;
		// Graph all equations
		for( var equ=0; equ<7; equ++)
		{
			var pathStarted = false;
			for( var xCoord=this.X_MIN; xCoord<=this.X_MAX; xCoord+=.1)
			{
				var yCoord = this.CENTER_Y + this.evaluate(equ, xCoord) * -1 * this.STEP_Y;
				if( !pathStarted && this.CANVAS.Y <= yCoord && yCoord <= this.CANVAS.HEIGHT)
				{
					ctx.beginPath();
					ctx.moveTo(this.CENTER_X + xCoord * this.STEP_X,yCoord);
					pathStarted = true;
				}
				else if( this.CANVAS.Y <= yCoord && yCoord <= this.CANVAS.HEIGHT )
					ctx.lineTo(this.CENTER_X + xCoord * this.STEP_X, yCoord );
				else if (yCoord < this.CANVAS.Y )
					ctx.lineTo(this.CENTER_X + xCoord * this.STEP_X, this.CANVAS.Y );
				else if (yCoord > this.CANVAS.HEIGHT )
					ctx.lineTo(this.CENTER_X + xCoord * this.STEP_X, this.CANVAS.HEIGHT );
			}
			if(pathStarted)
				ctx.stroke();
		}

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
		return this.ROM.doMath(equ);
	}

	arrowPressed(anArrow)
	{
		this.ROM.setTraceState().arrowPressed(anArrow);
	}

}

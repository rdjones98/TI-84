class	StateTrace
{
	constructor( aCanvas, aRom )
	{
		this.CANVAS = aCanvas;
		this.ROM = aRom;
		this.TRACE_X = 0;
		this.TRACE_Y = 0;

		this.FONT = "14px Courier";

  }

	arrowPressed(anArrow)
	{
				if(anArrow == this.ROM.getKeypad().A_LEFT )
				{
					if(this.TRACE_X > this.ROM.getStateGraph().X_MIN)
						this.TRACE_X -= .5;
				}
				else if( anArrow == this.ROM.getKeypad().A_RIGHT)
				{
					if(this.TRACE_X < this.ROM.getStateGraph().X_MAX)
						this.TRACE_X += .5;
				}
				this.repaint();
	}

	clearPressed()
	{
		this.CANVAS.clearCanvas();
		this.ROM.setStateCalculator();
	}
	tracePressed()
	{
		this.repaint();
	}
	repaint()
	{
		this.CANVAS.clearCanvas();
		this.ROM.getStateGraph().repaint();
		var equations = this.ROM.getStateYEquals().getEquations();

		var ctx = this.CANVAS.CONTEXT;
		ctx.font = this.FONT;
		var graphState = this.ROM.getStateGraph();
		ctx.fillText("Y1=" + equations[0], this.CANVAS.X, this.CANVAS.Y + this.CANVAS.DIGIT_H);
		ctx.fillText("X="  + this.TRACE_X, this.CANVAS.X, this.CANVAS.HEIGHT-2);
		ctx.fillText("Y="  + this.evaluate(0, this.TRACE_X), graphState.CENTER_X+5, this.CANVAS.HEIGHT-2);


		// Draw the X for the trace
		ctx.font = "25px Courier";
		var tColor = ctx.fillStyle;
		ctx.fillStyle="#FF0000";
		var x = graphState.CENTER_X - 7 + this.TRACE_X * graphState.STEP_X;
		var y = graphState.CENTER_Y+5 + this.evaluate(0, this.TRACE_X) * -1 * graphState.STEP_Y;

		if( this.CANVAS.Y < y && y < this.CANVAS.HEIGHT)
			ctx.fillText("+", x, y);
		ctx.fillStyle = tColor;
	}

	evaluate(anEquationIdx, anX)
	{
		var equations = this.ROM.getStateYEquals().getEquations();
		var equ = equations[anEquationIdx].replace(/X/g, "(" + anX + ")");
		var res = "" + this.ROM.doMath(equ);
		if ( res.length > 10)
			return res.substring(0,10);
		else
			return res;

	}

}

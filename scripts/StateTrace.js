class	StateTrace extends StateGraphing
{
	constructor( aCanvas, aYEquals, aRom )
	{
		super(aCanvas, aYEquals, aRom);
  }

	arrowPressed(anArrow)
	{
				if(anArrow == "left" )
					this.TRACE_X -= .5;
				else if( anArrow == "right")
					this.TRACE_X += .5;

				this.repaint();
	}

	tracePressed()
	{
		this.repaint();
	}
	repaint()
	{
		super.repaint();

		var ctx = this.CONTEXT;
		ctx.font = this.FONT;
		ctx.fillText("Y1=" + this.Y_EQUALS._equations[0], this.X, this.Y + this.DIGIT_H);
		ctx.fillText("X="+this.TRACE_X, this.X, this.HEIGHT-2);
		ctx.fillText("Y=" + this.evaluate(0, this.TRACE_X), this.CENTER_X+5, this.HEIGHT-2);


		// Draw the X for the trace
		ctx.font = "25px Courier";
		var tColor = ctx.fillStyle;
		ctx.fillStyle="#FF0000";
		ctx.fillText("+", this.CENTER_X - 7 + this.TRACE_X * this.STEP_X, this.CENTER_Y+5 + this.evaluate(0, this.TRACE_X) * -1 * this.STEP_Y);
		ctx.fillStyle = tColor;
	}

}

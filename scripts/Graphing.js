class	Graphing
{
	constructor( aCanvas )
	{
		this.canvas = aCanvas;
		this.GRAPH = 1;
		this.YEQUALS = 2;
		this.TRACE = 3;

		this.STATE = this.GRAPH;

		this.X    = this.canvas.X;
		this.Y    = this.canvas.Y-20;
		this.WIDTH = this.canvas.WIDTH;
		this.HEIGHT = this.canvas.HEIGHT;
		this.CENTER_X = 165;
		this.CENTER_Y = 130;

		this.X_MIN = -10;
		this.X_MAX = 10;
		this.Y_MIN = -10
		this.Y_MAX = 10;
		this.FONT = "14px Courier";

		this.TRACE_X = 0;
		this.TRACE_Y = 0;

		this.STEP_X = ( this.WIDTH - this.X ) / (  this.X_MAX - this.X_MIN );
		this.STEP_Y = ( this.HEIGHT - this.Y ) / ( this.Y_MAX - this.Y_MIN );
    this.Y1 = "-x+3";
	}
	setRom(aRom)
	{
		this.rom = aRom;
	}
	tracePressed()
	{
		this.STATE = this.TRACE;

		var ctx = this.canvas.getContext();
		ctx.font = this.FONT;
		ctx.fillText("Y1=" + this.Y1, this.canvas.X, this.Y + this.canvas.DIGIT_H);
		ctx.fillText("X="+this.TRACE_X, this.X, this.HEIGHT-2);
		ctx.fillText("Y=" + this.evaluate(this.TRACE_X), this.CENTER_X+5, this.HEIGHT-2);


		// Draw the X for the trace
		ctx.font = "25px Courier";
		var tColor = ctx.fillStyle;
		ctx.fillStyle="#FF0000";
		ctx.fillText("+", this.CENTER_X - 7 + this.TRACE_X * this.STEP_X, this.CENTER_Y+5 + this.evaluate(this.TRACE_X) * -1 * this.STEP_Y);
		ctx.fillStyle = tColor;
	}

	arrowPressed(anArrow)
	{
		if( this.STATE == this.TRACE)
		{
				if(anArrow == "left" )
					this.TRACE_X -= .5;
				else if( anArrow == "right")
					this.TRACE_X += .5;

				this.graph();
				this.tracePressed();
			}
	}


	yEqualsPressed()
	{
		this.STATE = this.YEQUALS;

		this.canvas.clearCanvas();

		var ctx = this.canvas.getContext();
		ctx.fillText("\Y1=", this.canvas.FOCUS_X, this.FOCUS_Y);
		this.canvas.FOCUS_Y +=  this.canvas.DIGIT_H;
		ctx.fillText("\Y2=", this.canvas.FOCUS_X, this.canvas.FOCUS_Y);
		this.canvas.FOCUS_Y += this.canvas.DIGIT_H;
		ctx.fillText("\Y3=", this.canvas.FOCUS_X, this.canvas.FOCUS_Y);
		this.canvas.FOCUS_Y += this.canvas.DIGIT_H;
		ctx.fillText("\Y4=", this.canvas.FOCUS_X, this.canvas.FOCUS_Y);
		this.canvas.FOCUS_Y += this.canvas.DIGIT_H;
		ctx.fillText("\Y5=", this.canvas.FOCUS_X, this.canvas.FOCUS_Y);
		this.canvas.FOCUS_Y += this.canvas.DIGIT_H;
		ctx.fillText("\Y6=", this.canvas.FOCUS_X, this.canvas.FOCUS_Y);
		this.canvas.FOCUS_Y += this.canvas.DIGIT_H;
		ctx.fillText("\Y7=", this.canvas.FOCUS_X, this.canvas.FOCUS_Y);
		this.canvas.FOCUS_Y = this.canvas.Y;
		this.canvas.FOCUS_X = this.canvas.X + 35;
		this.canvas.drawFocusBox();
	}

  numberPressed(aNum)
  {
    this.Y1 += aNum;
  }

  xPressed()
  {
    this.canvas.draw("x");
    this.Y1 += "X";
  }

	// Draw tick marks on graph
	drawTickMarks()
	{
		var ctx = this.canvas.getContext();
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
	evaluate(anX)
	{
		var equ = this.Y1.replace(/x/g, anX);
		var val = this.rom.doMath(equ);
		val = val.replace(/~/g, "-");
		return Number(val);
	}
  graph()
  {
		this.STATE = this.GRAPH;

    this.canvas.clearCanvas();
		var ctx = this.canvas.getContext();


		// Draw axis
		ctx.beginPath();
		ctx.moveTo(this.X,     this.CENTER_Y);
		ctx.lineTo(this.WIDTH, this.CENTER_Y);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(this.CENTER_X, this.Y);
		ctx.lineTo(this.CENTER_X, this.HEIGHT);
		ctx.stroke();

		this.drawTickMarks();

		ctx.beginPath();
		ctx.moveTo(this.X,this.CENTER_Y + this.evaluate(this.X_MIN) * -1 * this.STEP_Y);
    for( var i=this.X_MIN; i<=this.X_MAX; i++)
    {
			var y = this.CENTER_Y + this.evaluate(i) * -1 * this.STEP_Y;
			if( this.Y <= y && y <= this.HEIGHT )
      	ctx.lineTo(this.CENTER_X + i * this.STEP_X, y );
    }
		ctx.stroke();
  }
}

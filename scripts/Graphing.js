class	Graphing
{
	constructor( aCanvas )
	{
		this._canvas = aCanvas;

		// State consstants
		this.GRAPH = 1;
		this.Y_EQUALS = new StateYEquals(aCanvas);
		this.TRACE = 3;

		// Dimension constants
		this.X    = this._canvas.X;
		this.Y    = this._canvas.Y-20;
		this.WIDTH = this._canvas.WIDTH;
		this.HEIGHT = this._canvas.HEIGHT;
		this.CENTER_X = 165;
		this.CENTER_Y = 130;

		this.FONT = "14px Courier";

		this._state = this.GRAPH;

		this.X_MIN = -10;
		this.X_MAX = 10;
		this.Y_MIN = -10
		this.Y_MAX = 10;

		this.TRACE_X = 0;
		this.TRACE_Y = 0;

		this.STEP_X = ( this.WIDTH - this.X ) / (  this.X_MAX - this.X_MIN );
		this.STEP_Y = ( this.HEIGHT - this.Y ) / ( this.Y_MAX - this.Y_MIN );

	}

	setRom(aRom)
	{
		this.rom = aRom;
	}
	tracePressed()
	{
		this._state = this.TRACE;

		var ctx = this._canvas.getContext();
		ctx.font = this.FONT;
		ctx.fillText("Y1=" + this.Y1, this._canvas.X, this.Y + this._canvas.DIGIT_H);
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
		if( this._state == this.TRACE)
		{
				if(anArrow == "left" )
					this.TRACE_X -= .5;
				else if( anArrow == "right")
					this.TRACE_X += .5;

				this.graph();
				this.tracePressed();
			}
		else if( this._state == this.Y_EQUALS)
		{
			if(anArrow == "left" )
				this._state.cursorLeft();
			else if( anArrow == "right")
				this._state.cursorRight();
			this.yEqualsPressed();
		}

	}


	yEqualsPressed()
	{
		this._state = this.Y_EQUALS;

		this._canvas.clearCanvas();

		var ctx = this._canvas.getContext();
		ctx.font = this._canvas.FONT;

		var x = this._canvas.FOCUS_X;
		var y = this._canvas.FOCUS_Y;

		for( var i=0; i<7; i++)
		{
			var str = "/Y" + (i+1) + "=" + this._state._equations[i];
			ctx.fillText(str, x, y);
			y +=  this._canvas.DIGIT_H;
		}

		// if our state has not been set, default to 1st row
		if(this._state._focusX==0)
		{
			this._state._focusX=this._canvas.X + 40;
			this._state._focusY=this._canvas.Y;
		}

		//draw focus appropriately
		this._canvas.drawFocusBox(this._state._focusX, this._state._focusY);
	}

  numberPressed(aNum)
  {
    this.Y1 += aNum;
  }

  xPressed()
  {
    this._canvas.draw("x");
    this.Y1 += "X";
  }

	// Draw tick marks on graph
	drawTickMarks()
	{
		var ctx = this._canvas.getContext();
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
		this._state = this.GRAPH;

    this._canvas.clearCanvas();
		var ctx = this._canvas.getContext();


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

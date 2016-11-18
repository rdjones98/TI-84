class	Canvas
{
	constructor( aCanvas )
	{
		this.context = aCanvas.getContext("2d");
		this.X = 70;
		this.Y = 80;
		this.HEIGHT = 196;
		this.WIDTH  = 260;
		this.DIGIT_W = 11;
		this.DIGIT_H = 16;

		this.FOCUS_X = this.X;
		this.FOCUS_Y = this.Y;
		this.FONT = "17px Courier";
	  this.context.fillStyle="#404040";
		this.drawFocusBox();
	}

	getContext()
	{
		return this.context;
	}
	draw(aNum)
	{
		this.context.font = this.FONT;
		this.clearFocusBox();
		this.context.fillText(aNum, this.FOCUS_X, this.FOCUS_Y);
		this.FOCUS_X += this.DIGIT_W;
		this.drawFocusBox();
	}
	clearPressed()
	{
		this.clearCanvas();
		this.drawFocusBox();
	}
	clearCanvas()
	{
		this.context.clearRect(0,0,400,200);
		this.FOCUS_X = this.X;
		this.FOCUS_Y = this.Y
	}
	drawAnswer(aNum)
	{
		this.context.font = this.FONT;
		this.clearFocusBox();
		aNum = aNum.replace(/~/g, "-");
		this.FOCUS_X = this.X;
		this.FOCUS_Y += this.DIGIT_H;
		this.context.fillText(aNum, this.FOCUS_X, this.FOCUS_Y);
		this.FOCUS_Y += this.DIGIT_H;
		this.drawFocusBox()
	}
	drawFocusBox(anX, aY)
	{
		if( typeof anX != "undefined")
			this.FOCUS_X = anX;
		if( typeof aY != "undefined")
			this.FOCUS_Y = aY;
		this.context.fillRect(this.FOCUS_X,this.FOCUS_Y-14,10,15);
	}
	clearFocusBox()
	{
		this.context.clearRect(this.FOCUS_X,this.FOCUS_Y-14,10,15);
	}
}

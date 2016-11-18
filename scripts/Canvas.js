class	Canvas
{
	constructor( aCanvas )
	{
		this.context = aCanvas.getContext("2d");
		this.X = 70;
		this.Y = 80;
		this.DIGIT_W = 11;
		this.DIGIT_H = 16;

		this.FOCUS_X = this.X;
		this.FOCUS_Y = this.Y;
		this.context.font = "17px Courier";
//		this.context.fillText("Press Alpha F1-F4",100,100);
//	  this.context.fillStyle="#404040";
//		this.context.fillRect(this.X,this.Y,10,14);
	}

	draw(aNum)
	{
		this.context.fillText(aNum, this.FOCUS_X, this.FOCUS_Y);
		this.FOCUS_X += this.DIGIT_W;
	}

	drawAnswer(aNum)
	{
		aNum = aNum.replace(/~/g, "-");
		this.FOCUS_X = this.X;
		this.FOCUS_Y += this.DIGIT_H;
		this.context.fillText(aNum, this.FOCUS_X, this.FOCUS_Y);
		this.FOCUS_Y += this.DIGIT_H;
	}
}

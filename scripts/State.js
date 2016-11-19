class	State
{
	constructor(aCanvas)
	{
		this.CONTEXT = aCanvas.getContext("2d");
		this.X = 70;
		this.Y = 65;
		this.HEIGHT = 200;
		this.WIDTH  = 266;
		this.DIGIT_W = 11;
		this.DIGIT_H = 16;

		this.FONT = "17px Courier";

		this.NEGATIVE = String.fromCharCode(parseInt("02C9", 16));


  }

	clearCanvas()
	{
		this.CONTEXT.clearRect(this.X,this.Y,this.WIDTH,this.HEIGHT);
	}
	drawFocusBox(anX, aY)
	{
		if( typeof anX != "undefined")
			this.FOCUS_X = anX;
		if( typeof aY != "undefined")
			this.FOCUS_Y = aY;

		this.CONTEXT.fillStyle = "gray";
		this.CONTEXT.fillRect(this.FOCUS_X,this.FOCUS_Y+2,10,this.DIGIT_H);
		this.CONTEXT.fillStyle = "black";
	}
}

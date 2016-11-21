class	Canvas
{
    constructor(aCanvas)
  	{
  		this.CONTEXT = aCanvas.getContext("2d");
  		this.X = 70;
  		this.Y = 65;
  		this.HEIGHT = 200;
  		this.WIDTH  = 266;
  		this.DIGIT_W = 10;
  		this.DIGIT_H = 16;

  		this.FONT = "17px Courier";
      this.CONTEXT.font = this.FONT;

  		this.NEGATIVE = String.fromCharCode(parseInt("02C9", 16));
    }

  	clearCanvas()
  	{
  		this.CONTEXT.clearRect(this.X,this.Y-10,this.WIDTH,this.HEIGHT);
  	}

  	drawFocusBox(anX, aY)
  	{
      var x=this.X;
      var y=this.Y;
  		if( typeof anX != "undefined")
  			x = anX;
  		if( typeof aY != "undefined")
  			y = aY;

  		this.CONTEXT.fillStyle = "gray";
  		this.CONTEXT.fillRect(x,y+2,10,this.DIGIT_H);
  		this.CONTEXT.fillStyle = "black";
  	}

    draw2ndButton(x, y)
    {
      this.CONTEXT.fillStyle = "gray";
      this.CONTEXT.fillRect(x,y,this.DIGIT_W,this.DIGIT_H);
      this.CONTEXT.beginPath();
      this.CONTEXT.moveTo(x + this.DIGIT_W/2, y + 4);
      this.CONTEXT.lineTo(x + this.DIGIT_W/2, y + this.DIGIT_H);
      this.CONTEXT.stroke();
      this.CONTEXT.moveTo(x, y + 10);
      this.CONTEXT.lineTo(x + this.DIGIT_W/2, y + 4);
      this.CONTEXT.lineTo(x + this.DIGIT_W, y + 10);
      this.CONTEXT.stroke();
      this.CONTEXT.fillStyle = "black";
    }
}

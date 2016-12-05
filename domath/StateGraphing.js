//class	StateGraphing{	constructor( aCanvas, aYEquals, aRom )
function StateGraphing( aCanvas, aYEquals, aRom )
	{

		this.CANVAS = aCanvas;
		this.Y_EQUALS = aYEquals;
		this.ROM = aRom;

		// Dimension constants
		this.CENTER_X = (aCanvas.X+aCanvas.WIDTH)/2;
		this.CENTER_Y = (aCanvas.Y+aCanvas.HEIGHT)/2;

		this.X_MIN = -10;
		this.X_MAX = 10;
		this.Y_MIN = -10
		this.Y_MAX = 10;

		this.STEP_X = ( aCanvas.WIDTH - aCanvas.X ) / (  this.X_MAX - this.X_MIN );
		this.STEP_Y = ( aCanvas.HEIGHT - aCanvas.Y ) / ( this.Y_MAX - this.Y_MIN );

	}
StateGraphing.prototype.getXMin = function()
{
	return Number(this.X_MIN);
}
StateGraphing.prototype.getXMax = function()
{
	return Number(this.X_MAX);
}

StateGraphing.prototype.enterPressed = function()
	{
		// Do Nothing
	};

StateGraphing.prototype.clearPressed = function()
	{
			this.CANVAS.clearCanvas();
			this.ROM.setStateCalculator();
	};

StateGraphing.prototype.numberPressed = function(aNum)
  {
		this.CANVAS.clearCanvas();
		this.ROM.setStateCalculator().numberPressed(aNum);
  };

StateGraphing.prototype.xPressed = function()
  {
		this.CANVAS.clearCanvas();
		this.ROM.setStateCalculator().xPressed();
  };

	// Draw tick marks on graph
StateGraphing.prototype.drawTickMarks = function()
	{
		for( var i=this.CENTER_X; i<=this.CANVAS.WIDTH; i+=this.STEP_X)
			this.CANVAS.drawLn(i, this.CENTER_Y-3,i, this.CENTER_Y);
		for( var i=this.CENTER_X; i>=this.CANVAS.X; i-=this.STEP_X)
			this.CANVAS.drawLn(i, this.CENTER_Y-3,i, this.CENTER_Y);
		for( var i=this.CENTER_Y; i<=this.CANVAS.HEIGHT; i+=this.STEP_Y)
			this.CANVAS.drawLn(this.CENTER_X, i, this.CENTER_X+3, i);
		for( var i=this.CENTER_Y; i>=this.CANVAS.Y; i-=this.STEP_Y)
			this.CANVAS.drawLn(this.CENTER_X, i,this.CENTER_X+3, i);
	};

StateGraphing.prototype.graphPressed = function()
  {
		this.repaint();
	};

StateGraphing.prototype.repaint = function()
	{
    this.CANVAS.clearCanvas();

		this.STEP_X = ( this.CANVAS.WIDTH - this.CANVAS.X ) / (  this.X_MAX - this.X_MIN );
		this.STEP_Y = ( this.CANVAS.HEIGHT - this.CANVAS.Y ) / ( this.Y_MAX - this.Y_MIN );
		this.CENTER_X = this.CANVAS.X + (0-this.X_MIN) * this.STEP_X ;
		this.CENTER_Y = this.CANVAS.HEIGHT - (0-this.Y_MIN) * this.STEP_Y ;

		// Draw axis
		this.CANVAS.drawLn(this.CANVAS.X, this.CENTER_Y, this.CANVAS.WIDTH, this.CENTER_Y)
		this.CANVAS.drawLn(this.CENTER_X, this.CANVAS.Y, this.CENTER_X, this.CANVAS.HEIGHT);

		// Draw tick marks on axis
		this.drawTickMarks();

		// Graph all equations
		for( var equ=0; equ<7; equ++)
		{
			if ( this.Y_EQUALS._equations[equ].length>0 )
			{
				var step = (this.X_MAX-this.X_MIN)/50;
				for( var xCoord=Number(this.X_MIN); xCoord<this.X_MAX; xCoord=this.ROM.fixRoundingError(xCoord + step))
				{
					var yCoord1 = this.ROM.evaluate(equ, xCoord) ;
					yCoord1 = this.CENTER_Y + yCoord1 * -1 * this.STEP_Y;
					var yCoord2 = this.ROM.evaluate(equ, xCoord+step);
					yCoord2 = this.CENTER_Y + yCoord2 * -1 * this.STEP_Y;

					var x1 = this.CENTER_X + xCoord * this.STEP_X;
					var x2 = this.CENTER_X + (xCoord+step) * this.STEP_X;
					this.CANVAS.drawLn(x1,yCoord1,x2,yCoord2, this.CANVAS.GRAPHCOLORS[equ]);
				}
			}
		}
		if(this.ROM.is2ndPressed())
			this.CANVAS.draw2ndButton();

	};

StateGraphing.prototype.arrowPressed = function(anArrow)
	{
		this.ROM.setTraceState().arrowPressed(anArrow);
	};

StateGraphing.prototype.secondPressed = function()
	{
	};

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
	this.Y_MIN = -10;
	this.Y_MAX = 10;

	this.STEP_X = ( aCanvas.WIDTH - aCanvas.X ) / (  this.X_MAX - this.X_MIN );
	this.STEP_Y = ( aCanvas.HEIGHT - aCanvas.Y ) / ( this.Y_MAX - this.Y_MIN );

}
StateGraphing.prototype.getXMin = function()
{
	return Number(this.X_MIN);
};
StateGraphing.prototype.getXMax = function()
{
	return Number(this.X_MAX);
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
	for( var i=this.CENTER_X; i<=Canvas.WIDTH; i+=this.STEP_X)
		this.CANVAS.drawLn(i, this.CENTER_Y-3,i, this.CENTER_Y);
	for( var i=this.CENTER_X; i>=Canvas.X; i-=this.STEP_X)
		this.CANVAS.drawLn(i, this.CENTER_Y-3,i, this.CENTER_Y);
	for( var i=this.CENTER_Y; i<=Canvas.HEIGHT; i+=this.STEP_Y)
		this.CANVAS.drawLn(this.CENTER_X, i, this.CENTER_X+3, i);
	for( var i=this.CENTER_Y; i>=Canvas.Y; i-=this.STEP_Y)
		this.CANVAS.drawLn(this.CENTER_X, i,this.CENTER_X+3, i);
};


StateGraphing.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();

	this.X_MIN = this.ROM.getStateWindow()._data[0][0].toNumber();
	this.X_MAX = this.ROM.getStateWindow()._data[1][0].toNumber();
	this.Y_MIN = this.ROM.getStateWindow()._data[3][0].toNumber();
	this.Y_MAX = this.ROM.getStateWindow()._data[4][0].toNumber();
	

	this.STEP_X = ( Canvas.WIDTH - Canvas.X ) / (  this.X_MAX - this.X_MIN );
	this.STEP_Y = ( Canvas.HEIGHT - Canvas.Y ) / ( this.Y_MAX - this.Y_MIN );
	this.CENTER_X = Canvas.X + (0-this.X_MIN) * this.STEP_X ;
	this.CENTER_Y = Canvas.HEIGHT - (0-this.Y_MIN) * this.STEP_Y ;

	// Draw axis
	this.CANVAS.drawLn(Canvas.X, this.CENTER_Y, Canvas.WIDTH, this.CENTER_Y);
	this.CANVAS.drawLn(this.CENTER_X, Canvas.Y, this.CENTER_X, Canvas.HEIGHT);

	// Draw tick marks on axis
	this.drawTickMarks();

	// Graph all equations
	for( var equ=0; equ<7; equ++)
	{
		if ( this.Y_EQUALS._equations[equ].length>0 )
		{
			var step = (this.X_MAX-this.X_MIN)/100;
			for( var xCoord=Number(this.X_MIN); xCoord<this.X_MAX; xCoord=this.ROM.fixRoundingError(xCoord + step))
			{
				var yCoord1 = this.ROM.evaluate(equ, xCoord) ;
				yCoord1 = this.CENTER_Y + yCoord1 * -1 * this.STEP_Y;
				var yCoord2 = this.ROM.evaluate(equ, xCoord+step);
				yCoord2 = this.CENTER_Y + yCoord2 * -1 * this.STEP_Y;

				var x1 = this.CENTER_X + xCoord * this.STEP_X;
				var x2 = this.CENTER_X + (xCoord+step) * this.STEP_X;
				this.CANVAS.drawLn(x1,yCoord1,x2,yCoord2, Canvas.GRAPHCOLORS[equ]);
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

//class StateMode{  constructor(aCanvas, aRom)
function StateMode(aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;
}

StateMode.prototype.modePressed = function()
{
	if( this.ROM.is2ndPressed())
	{
		this.ROM.setStateCalculator();
	}
	else {
		this.repaint();
	}
};

StateMode.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();
	this.CANVAS.drawFocusBox(this.X + this._col*this.CANVAS.DIGIT_W, this.Y+this._row*this.CANVAS.DIGIT_H);

	var x = this.CANVAS.X;
	var y = this.CANVAS.Y;
	this.CANVAS.print("NORMAL  SCI  ENG",           x, y += this.CANVAS.DIGIT_H, null, "gray" );
	this.CANVAS.print("FLOAT  0 1 2 3 4 5 6 7 8 9", x, y += this.CANVAS.DIGIT_H, null, "gray" );
	this.CANVAS.print("RADIAN  DEGREE",             x, y += this.CANVAS.DIGIT_H, null, "gray" );
	this.CANVAS.print("FUNC  PAR  POL  SEQ",        x, y += this.CANVAS.DIGIT_H, null, "gray" );
	this.CANVAS.print("CONNECTED  DOT",             x, y += this.CANVAS.DIGIT_H, null, "gray" );
	this.CANVAS.print("SEQUENTIAL  SIMUL",          x, y += this.CANVAS.DIGIT_H, null, "gray" );
	this.CANVAS.print("REAL  a+bi  re^Oi",          x, y += this.CANVAS.DIGIT_H, null, "gray" );
	this.CANVAS.print("FULL  HORIZ  G-T",           x, y += this.CANVAS.DIGIT_H, null, "gray" );
};

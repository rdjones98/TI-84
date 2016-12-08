//class StateTableSet{  constructor(aCanvas, aRom)
function StateTableSet(aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;
}

StateTableSet.prototype.modePressed = function()
{
	if( this.ROM.is2ndPressed())
	{
		this.ROM.setStateCalculator();
	}
	else {
		this.repaint();
	}
};

StateTableSet.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();
	this.CANVAS.drawFocusBox(this.X + this._col*Canvas.DIGIT_W, this.Y+this._row*Canvas.DIGIT_H);

	var x = Canvas.X;
	var y = Canvas.Y;
	this.CANVAS.print("TABLE SETUP",        x, y += Canvas.DIGIT_H);
	this.CANVAS.print(" TblStart=",			x, y += Canvas.DIGIT_H);
	this.CANVAS.print(" Tbl=",             	x, y += Canvas.DIGIT_H, null, "gray" );
	this.CANVAS.print("Indpnt:  Auto Ask",  x, y += Canvas.DIGIT_H, null, "gray" );
	this.CANVAS.print("Depend:  Auto Ask",  x, y += Canvas.DIGIT_H, null, "gray" );
};

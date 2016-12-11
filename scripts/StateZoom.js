//class StateZoom{  constructor(aCanvas, aRom)
function StateZoom(aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;

	this.C1 = Canvas.X;
	this._col = 1;
	this._row = 2;
}

StateZoom.prototype.zoomPressed = function()
{
	this.repaint();
};

StateZoom.prototype.numberPressed = function(aNum)
{
	var state = this.ROM.setTraceState(aNum);
	if( aNum == 6)
		state.enterPressed();
};

StateZoom.prototype.enterPressed = function()
{
	this.numberPressed(this._row);
};

StateZoom.prototype.arrowPressed = function(anArrow)
{

	if(anArrow == Keypad.A_UP )
	{
		if( this._row == 2 )
			return;
		else if( this._row == 3)
			this._row --;
		else if( this._row == 6)
			this._row = 3;
	}

	if(anArrow == Keypad.A_DOWN )
	{
		if( this._row == 2 )
			this._row ++;
		else if( this._row == 3)
			this._row = 6;
		else if( this._row == 6)
			return;
	}
};

StateZoom.prototype.repaint = function()
{
	var y = Canvas.Y+Canvas.DIGIT_H;
	this.CANVAS.clearCanvas();
	this.CANVAS.drawFocusBox(this.C1, Canvas.Y, 40);
	this.CANVAS.drawFocusBox(this.C1, Canvas.Y+this._row*Canvas.DIGIT_H);
	this.CANVAS.print("ZOOM",       this.C1,  y);
	this.CANVAS.print("MEMORY",     this.C1 + 5*Canvas.DIGIT_W, y, null, "gray" );
	this.CANVAS.print("1:ZBox",     this.C1,  y+=Canvas.DIGIT_H, null, "gray" );
	this.CANVAS.print("2:Zoom In",  this.C1,  y+=Canvas.DIGIT_H );
	this.CANVAS.print("3:Zoom Out", this.C1,  y+=Canvas.DIGIT_H );
	this.CANVAS.print("4:ZDecimal", this.C1,  y+=Canvas.DIGIT_H, null, "gray" );
	this.CANVAS.print("5:ZSquare",  this.C1,  y+=Canvas.DIGIT_H, null, "gray" );
	this.CANVAS.print("6:ZStandard",this.C1,  y+=Canvas.DIGIT_H );
	this.CANVAS.print("7:ZTrig",    this.C1,  y+=Canvas.DIGIT_H, null, "gray"     );

	if(this.ROM.is2ndPressed())
		this.CANVAS.draw2ndButton();

};

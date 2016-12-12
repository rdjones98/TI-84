//class StateTableSet{  constructor(aCanvas, aRom)
function StateTableSet(aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;
	
	this._data = new Array( new Array(new Digit(0)));
	this.EDITOR = new Editor(this, this._data);
}
StateTableSet.prototype.getTableStart = function(){
	this.EDITOR.evalEntry();
	return Number(this._data[0][0]);
};
StateTableSet.prototype.setTableStart = function(aNum){
	return this._data[0][0]._val = Number(aNum);
};
StateTableSet.prototype.numberPressed = function(aNum)
{
	this.EDITOR.numberPressed(aNum);
};
StateTableSet.prototype.operatorPressed = function(aNum)
{
	this.EDITOR.operatorPressed(aNum);
};
StateTableSet.prototype.enterPressed = function(aNum)
{
	// DO NOTHING
};

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
	//draw focus appropriately first so text can overwrite it
	var x = Canvas.X + (10+this.EDITOR.getDisplayPosition()) * Canvas.DIGIT_W;
	this.CANVAS.drawFocusBox(x, Canvas.Y+Canvas.DIGIT_H);

	// Draw focus box for auto
//	this.CANVAS.drawFocusBox(Canvas.X+9*Canvas.DIGIT_W, Canvas.Y+4*Canvas.DIGIT_H, 4*Canvas.DIGIT_W);

	var x = Canvas.X;
	var y = Canvas.Y;
	this.CANVAS.print("TABLE SETUP",        x, y += Canvas.DIGIT_H);
	this.CANVAS.print(" TblStart=",			x, y += Canvas.DIGIT_H);
	this.CANVAS.print(this._data[0], 		x + Canvas.DIGIT_W *10, y);
	this.CANVAS.print(" " + Canvas.DELTA + "Tbl=1",x, y += Canvas.DIGIT_H, null, "gray" );
	this.CANVAS.print("Indpnt:  Auto Ask",  x, y += Canvas.DIGIT_H, null, "gray" );
	this.CANVAS.print("Depend:  Auto Ask",  x, y += Canvas.DIGIT_H, null, "gray" );
};

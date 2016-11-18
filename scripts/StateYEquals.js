class	StateYEquals
{
	constructor(aCanvas)
	{
    this._equations = new Array("2x+3","x-2","1/2x-3","2x+4","x^2-2","3x-8","(x+2)");
		this._row = 0;
    this._col = 0;
		this._focusX = 0;
		this._focusY = 0;

    this._canvas = aCanvas;
  }
  cursorLeft()
  {
    this._focusX -= this._canvas.DIGIT_W;
  }
  cursorRight()
  {
    this._focusX += this._canvas.DIGIT_W;
  }
}

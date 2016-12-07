function Editor(aState)
{
	this.STATE = aState;
	this.ROM =this.STATE.ROM;
	this._superScript = false;
}
Editor.prototype.setSuperScript = function( aVal ) { this._superScript = aVal; };

Editor.prototype.numberPressed = function( aNum )
{
	var row = this.STATE.getRow();
	var col = this.STATE.getCol();
	var data = this.STATE.getDataArray()[row];
	if(col >= data.length)
		data.push(new Digit(aNum, this._superScript));
	else
		data[col]=new Digit(aNum, this._superScript);

	this.linkDigits();
	this.STATE.incrCol();
};

Editor.prototype.deletePressed = function()
{
	var row = this.STATE.getRow();
	var col = this.STATE.getCol();
	var data = this.STATE.getDataArray()[row];

	if( data.length >= col)
		data.splice(col, 1);

	this.linkDigits();
};
Editor.prototype.arrowPressed = function(anArrow)
{
	var row = this.STATE.getRow();
	var col = this.STATE.getCol();
	var data = this.STATE.getDataArray()[row];

	if(anArrow == Keypad.A_LEFT )
	{
		if( col > 0 )
			this.STATE.incrCol( -1 );
	}
	else if( anArrow == Keypad.A_RIGHT)
	{
		if( col < data.length)
			this.STATE.incrCol();
		else
			this._superScript = false;
	}
	if(anArrow == Keypad.A_DOWN )
	{
		this._superScript = false;
	}
};

Editor.prototype.functionPressed = function(afunc)
{
	var row = this.STATE.getRow();
	var data = this.STATE.getDataArray()[row];

	if(this.ROM.is2ndPressed() && afunc == "/")
	{
		afunc = "e";
	}
	else if( afunc == "^" )
	{
		this._superScript = true;
		return;
	}

	data.push(new Digit(afunc, this._superScript, Digit.FUNCTION));

	this.linkDigits();
	this.STATE.setCol(data.length);
};

Editor.prototype.operatorPressed = function(anOper)
{
	var row = this.STATE.getRow();
	var data = this.STATE.getDataArray()[row];

	if(this.ROM.is2ndPressed() && anOper == "/")
	{
		anOper = "e";
	}
	else if( anOper == "^" )
	{
		this._superScript = true;
		return;
	}

	data.push(new Digit(anOper, this._superScript, Digit.OPERATOR));

	this.linkDigits();
	this.STATE.setCol(data.length);
};

Editor.prototype.lnPressed = function()
{
	if (this.ROM.is2ndPressed() )
	{
		this.functionPressed("e");
		this.operatorPressed("^");
	}
	else {
		this.functionPressed("ln(");
	}
};

Editor.prototype.logPressed = function()
{
	if (this.ROM.is2ndPressed() )
	{
		this.functionPressed("10");
		this.operatorPressed("^");
	}
	else {
		this.functionPressed("log(");
	}
};

Editor.prototype.trigPressed = function(aTrigFunc)
{
	if (this.ROM.is2ndPressed() )
	{
		this.functionPressed("a" + aTrigFunc);
	}
	else {
		this.functionPressed(aTrigFunc);
	}
};

Editor.prototype.linkDigits = function()
{
	var row = this.STATE.getRow();
	var data = this.STATE.getDataArray()[row];
	if(data.length == 0)
		return;

	for( var idx=0; idx<data.length-1; idx++)
	{
		data[idx]._nextDigit = data[idx+1];
		data[idx+1]._prevDigit = data[idx];
	}
	data[0]._prevDigit = null;
	data[data.length-1]._nextDigit = null;
};

Editor.prototype.getDisplayPosition = function()
{
	var row = this.STATE.getRow();
	var col = this.STATE.getCol();
	var data = this.STATE.getDataArray()[row];
	var len = 0;
	for( var idx = 0; idx<col; idx++)
		len += data[idx].toString().length;
	return len;
};

function Editor(aState, anArray, numRows)
{
	this.STATE = aState;
	this.ROM =this.STATE.ROM;
	this._array = anArray;
	if( this._array == null )
		this._array = new Array();
	this._superScript = false;
	this._row = 0;
	this._col = 0;
	
	if(typeof numRows != "undefined")
		this.setNumRows(numRows);
}

Editor.prototype.getData= function(){ return this._array; };
Editor.prototype.getRow = function(){ return this._row; };
Editor.prototype.getCol = function(){ return this._col; };
Editor.prototype.setCol = function(aNum){ this._col = aNum; };
Editor.prototype.setSuperScript = function( aVal ) { this._superScript = aVal; };

Editor.prototype.setRow = function(aNum){ 
	this._row = aNum; 
	this._col = 0;
};

Editor.prototype.getNumRows = function()
{ 
	if (this._array.length == 0)
		this._array.push(new Array( new Digit(0)));
	return this._array.length;
};

Editor.prototype.setNumRows = function(aNum){
	this._array.length=0;
	for( var idx=0; idx<aNum; idx++)
		this._array.push(new Array( new Digit(0))); 
};

Editor.prototype.incrCol = function(aNum)
{
	if( typeof aNum == "undefined" )
		aNum = 1;
	this._col += aNum;
};
Editor.prototype.incrRow = function(aNum)
{
	if( typeof aNum == "undefined" )
		aNum = 1;
	this._row += aNum;
};
Editor.prototype.operatorPressed = function(anOper)
{
	var data = this._array[this._row];

	if(this.ROM.is2ndPressed() && anOper == "/")
	{
		anOper = "e";
	}
	else if( anOper == "^" )
	{
		this._superScript = true;
		return;
	}

	if(this._col >= data.length)
		data.push(new Digit(anOper, this._superScript, Digit.OPERATOR));
	else
		data[this._col]=new Digit(anOper, this._superScript, Digit.OPERATOR);

	this.linkDigits();
	this.setCol(data.length);
};

Editor.prototype.numberPressed = function( aNum )
{
	if (this._row >= this._array.length )
		this._array.push(new Array());
	var data = this._array[this._row];
	if(this._col >= data.length)
		data.push(new Digit(aNum, this._superScript));
	else
		data[this._col]=new Digit(aNum, this._superScript);

	this.linkDigits();
	this.incrCol(1);
};

Editor.prototype.deletePressed = function()
{
	var data = this._array[this._row];

	if( data.length >= this._col)
		data.splice(this._col, 1);

	this.linkDigits();
};

Editor.prototype.arrowPressed = function(anArrow)
{
	var data = this._array[this._row];

	if(anArrow == Keypad.A_LEFT )
	{
		if( this._col > 0 )
			this.incrCol( -1 );
	}
	else if( anArrow == Keypad.A_RIGHT)
	{
		if( this._col < data.length)
			this.incrCol(1);
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
	var data = this._array[this._row];

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
	this.setCol(data.length);
};

Editor.prototype.linkDigits = function()
{
	var data = this._array[this._row];
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
	var data = this._array[this._row];
	var len = 0;
	for( var idx = 0; idx<this._col; idx++)
		len += data[idx].toString().length;
	return len;
};

Editor.prototype.evalEntry= function(numDigits)
{
	var val = this._array[this._row][0].getMathStr();
	var res = MathEngine.doMath(val);
	if( typeof numDigits != "undefined" )
		res = this.ROM.getCanvas().formatNumber(res, numDigits);
	this._array[this._row] = new Array( new Digit(res, false, Digit.DIGIT));
	this._col = 0;
};


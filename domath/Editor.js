function Editor(aState)
{
  this.STATE = aState;
  this.ROM =this.STATE.ROM;
  this._superScript = false;
}

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
		this.STATE.ROM.secondPressed(false);
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

		if(anArrow == this.ROM.getKeypad().A_LEFT )
		{
			if( col > 0 )
				this.STATE.incrCol( -1 );
		}
		else if( anArrow == this.ROM.getKeypad().A_RIGHT)
		{
			if( col < data.length)
				this.STATE.incrCol();
			else
				this._superScript = false;
		}
		if(anArrow == this.ROM.getKeypad().A_DOWN )
		{
      this._superScript = false;
		}
	};

Editor.prototype.operatorPressed = function(anOper)
  {
    var row = this.STATE.getRow();
    var col = this.STATE.getCol();
    var data = this.STATE.getDataArray()[row];

		if(this.ROM.is2ndPressed() && anOper == "/")
		{
	  	anOper = "e";
		}
		else if( anOper == "^" )
		{
			this._superScript = true;
		  this.STATE.ROM.secondPressed(false);
			return;
		}

    data.push(new Digit(anOper, this._superScript, Digit.OPERATOR));

    this.linkDigits();
 	  this.STATE.setCol(data.length);

		this.STATE.ROM.secondPressed(false);
  };

Editor.prototype.lnPressed = function()
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed(false);
			this.numberPressed("e");
			this.operatorPressed("^");
		}
		else {
			this.operatorPressed("ln(");
		}
	};

Editor.prototype.logPressed = function()
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed(false);
			this.numberPressed("1");
			this.numberPressed("0");
			this.operatorPressed("^");
		}
		else {
			this.operatorPressed("log(");
		}
	};

Editor.prototype.trigPressed = function(aTrigFunc)
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed(false);
			this.operatorPressed("a" + aTrigFunc);
		}
		else {
			this.operatorPressed(aTrigFunc);
		}
	};

Editor.prototype.linkDigits = function()
{
    var row = this.STATE.getRow();
    var data = this.STATE.getDataArray()[row];
    for( var idx=0; idx<data.length-1; idx++)
    {
      data[idx]._nextDigit = data[idx+1];
      data[idx+1]._prevDigit = data[idx];
    }
    data[0]._prevDigit = null;
    data[data.length-1]._nextDigit = null;
};

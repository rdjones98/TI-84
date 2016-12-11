function Digit(aVal, isSuper, aType, aMatrix)
{
	this._val = aVal;
	this._super = false;
	this._type = "d";
	this._nextDigit = null;
	this._prevDigit = null;
	this._matrix = null;

	if(typeof isSuper != "undefined" && isSuper != null )
		this._super = isSuper;
	if(typeof aMatrix != "undefined" && aMatrix != null )
		this._matrix = aMatrix;
	if(typeof aType != "undefined" && aType != null )
		this._type = aType;
}
//Constants
Digit.DIGIT 	= "d";
Digit.OPERATOR  = "o";
Digit.MATRIX 	= "m";
Digit.FUNCTION 	= "f";
Digit.RESULT 	= "r";

Digit.prototype.isResult = function() { return this._type == Digit.RESULT; };
Digit.prototype.isOperator= function() { return this._type == Digit.OPERATOR; };
Digit.prototype.isDigit  = function() { return this._type == Digit.DIGIT; };
Digit.prototype.isMatrix = function() { return this._type == Digit.MATRIX || this._matrix != undefined; };
Digit.prototype.getVal   = function() { return this._val; };
Digit.prototype.getMatrix= function() { return this._matrix; };
Digit.prototype.containsMatrix = function()
{
	if( this.isMatrix() )
		return true;
	else if (this._nextDigit != null)
		return this._nextDigit.containsMatrix();
	else 
		return false;
};
Digit.prototype.isSuper  = function() 
{
	if( this._prevDigit == null )
		this._super = false;
	return this._super; 
};
Digit.prototype.toString = function()
{
	if( ! this.isMatrix() )
		return this._val.toString();
	else
		return "[" + this._val + "]";
};

Digit.prototype.toNumber = function()
{
	if( this.containsMatrix() )
		return MatrixEngine.eval(this);
	else
	{
		var mathStr = this.getMathStr();
		return MathEngine.doMath(mathStr);
	}
};

Digit.prototype.getDisplayLen = function() 
{
	var res = this.toString().length;
	if( this._nextDigit != null )
		res += this._nextDigit.getDisplayLen();
	return res;
};

Digit.prototype.getMathStr  = function(pCount)
{
	if( typeof pCount == "undefined")
		pCount = 0;
	
	var retStr = "";
	
	// if we have any "negative" signs:  \u02C9, replace with "-"
	if( this._val == Canvas.NEGATIVE)
		retStr = "-";
	else
		retStr = this.toString();

	if( this._type == Digit.FUNCTION && this._prevDigit != null && this._prevDigit.isDigit())
		retStr = "*" + retStr;
	
	// x If this is an X and there is a number in front with same isSuper
	// then prepend an *
	if( this._val == "X" && this._prevDigit != null && 
		this._prevDigit.isDigit() && 
		this._prevDigit.isSuper() == this.isSuper())
		retStr = "*" + retStr;

	// PI and e
	if( this._val == Canvas.PI)
	{
		retStr = Math.PI.toString();
		if( this._prevDigit != null && this._prevDigit.isDigit() )
			retStr = "*" + retStr;
	}
	else if( this._val == "e")
	{
		retStr = Math.E.toString();
		if( this._prevDigit != null && this._prevDigit.isDigit() )
			retStr = "*" + retStr;
	}

	// We need to end with closers for each opener
	if( this._val.toString().indexOf("(" ) > -1 )
		pCount++;
	
	// If we have 2(3+4) we need 2*(3+4)
	if( this._val == "(" && this._prevDigit != null && this._prevDigit.isDigit() )
		retStr = "*" + retStr;

	// RPNEngine does not handle decimals without leading integers correctly,
	// so insert leading zeros if nothing else is there
	if( this._val == "." )
	{
		if( this._prevDigit == null || (this._prevDigit != null && ! this._prevDigit.isDigit()))
			retStr = "0" + retStr;
	}

	// Deal with Exponents
	if( this._nextDigit != null && this._nextDigit.isSuper() && ! this.isSuper())
		retStr += "^(";
	
	if( this._nextDigit == null && this.isSuper() )
		retStr += ")" ;
	else if ( (this._prevDigit != null && this._prevDigit.isSuper() && ! this.isSuper()) ||
			  (this._nextDigit == null && this.isSuper()))
		retStr = ")" + retStr;

	if( this._nextDigit != null )
		return retStr + this._nextDigit.getMathStr(pCount) ;
	else
	{
		for(var idx = 0; idx<pCount; idx ++)
			retStr += ")";
		return retStr;
	}
};

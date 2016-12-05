function Digit(aVal, isSuper, aType, aMatrix)
{
  this._val = aVal;
  this._super = isSuper;
  this._type = "d";
  this._nextDigit = null;
  this._prevDigit = null;
  this._matrix = null;

  if(typeof aMatrix != "undefined" && aMatrix != null )
    this._matrix = aMatrix;
  if(typeof aType != "undefined" && aType != null )
    this._type = aType;
}
// Constants
Digit.DIGIT = "d";
Digit.OPERATOR  = "o";
Digit.MATRIX = "m";
Digit.RESULT = "r";

Digit.prototype.isResult = function() {   return this._type == Digit.RESULT; };
Digit.prototype.isDigit = function() {   return this._type == Digit.DIGIT; };
Digit.prototype.isSuper = function() {   return this._super; };
Digit.prototype.isMatrix = function() {   return this._type == Digit.MATRIX; };
Digit.prototype.getVal  = function() {  return this._val };
Digit.prototype.toString  = function()
{
  if( ! this.isMatrix() )
    return this._val.toString();
  else
    return "[" + this._val + "]";
};

Digit.prototype.getMathStr  = function()
{
  var retStr = "";

	// if we have any "negative" signs:  \u02C9, replace with "-"
  if( this._val == Canvas.NEGATIVE)
		retStr = "-";
  else
    retStr = this.toString();

  // x
  if( this._val == "X" && this._prevDigit != null && this._prevDigit.isDigit())
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
      retSrt = "*" + retStr;
  }

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
  if ( (this._prevDigit != null && this._prevDigit.isSuper() && ! this.isSuper()) ||
       (this._nextDigit == null && this.isSuper()))
    retStr += ")";

  if( this._nextDigit != null )
    return retStr + this._nextDigit.getMathStr() ;
  else
    return retStr;
};

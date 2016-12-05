function Digit(aVal, isSuper, aType)
{
  this.NEGATIVE = String.fromCharCode(parseInt("02C9", 16));


  this._val = aVal;
  this._super = isSuper;
  this._type = "o";
  this._nextDigit = null;
  this._prevDigit = null;


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
Digit.prototype.getVal  = function() {   return this._val; };

Digit.prototype.getMathStr  = function()
{
  var retStr = "";

		// if we have any "negative" signs:  \u02C9, replace with "-"
  if( this._val == this.NEGATIVE)
		retStr = "-";
  else
    retStr = this._val;

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

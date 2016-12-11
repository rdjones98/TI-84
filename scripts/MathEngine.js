function MathEngine(aRom)
{
	MathEngine.ROM = aRom;
}
MathEngine.doMath = function(anExpr)
{
	var math = anExpr;
	
	// If we have -- then we either have a plus ex:  2--3=>2+3
	// or we have a minus a negative * ex: 2--3*4 leave it alone
	var idx = math.indexOf("--");
	while( idx > -1 )
	{
		var swapIt = true;
		for( var i = idx+2; i<math.length; i++)
			if(math.charAt(i) < '0' || math.charAt(i) > '9' )
				if( math.charAt(i) == '+' || math.charAt(i) == '-')
				{
					swapIt = false;
					break;
				}
	
		if( swapIt )
			math = math.substring(0,idx) + "+" + math.substring(idx+2);
		idx = math.indexOf("--", idx + 1);
	}
	
	// Handle ANy Square Roots
	var idx = math.indexOf(Canvas.SQRROOT);
	while( idx > -1 )
	{
		var numP = 0;
		var eIdx = idx+1;
		for( ; eIdx<math.length; eIdx++)
		{
			if( math.charAt(eIdx) == '(')
				numP ++;
			else if( math.charAt(eIdx) == ')' && --numP == 0)
				break;
		}
		math = math.substring(0, idx) + math.substring(idx+1, eIdx) + "^(1/2)" + math.substring(eIdx);
		idx = math.indexOf(Canvas.SQRROOT, idx+1);
	}
	
	// if we have any special functions, evaluate the () then call math.log()
	math = this.preprocessLogAndTrig(math, "ln(");
	math = this.preprocessLogAndTrig(math, "log(");
	math = this.preprocessLogAndTrig(math, "asin(");
	math = this.preprocessLogAndTrig(math, "acos(");
	math = this.preprocessLogAndTrig(math, "atan(");
	math = this.preprocessLogAndTrig(math, "sin(");
	math = this.preprocessLogAndTrig(math, "cos(");
	math = this.preprocessLogAndTrig(math, "tan(");
	return calculate(math);	// From RegressionEngine
};

MathEngine.preprocessLogAndTrig = function(anExpr, aVal)
{
	// if we have any ln functions, evaluate the () then call math.log()
	var idx = anExpr.indexOf(aVal);
	var eIdx = 0;
	if( idx > -1 )
	{
		var openP = 1;
		for( eIdx=idx+aVal.length; eIdx< anExpr.length; eIdx++)
		{
			if( anExpr.charAt(eIdx) == '(')
				openP ++;
			else if( anExpr.charAt(eIdx) == ')' && --openP == 0)
				break;
		}
		var inP = anExpr.substring(idx+aVal.length,eIdx);
		var res = this.doMath(inP);
		if(aVal == "ln(")
			res = Math.log(res);
		else if ( aVal == "log(")
			res = Math.log10(res);
		else if ( aVal == "sin(")
			res = Math.sin(res);
		else if ( aVal == "cos(")
			res = Math.cos(res);
		else if ( aVal == "tan(")
			res = Math.tan(res);
		else if ( aVal == "asin(")
			res = Math.asin(res);
		else if ( aVal == "acos(")
			res = Math.acos(res);
		else if ( aVal == "atan(")
			res = Math.atan(res);
		anExpr = anExpr.substring(0,idx) + "(" + res + ")" + anExpr.substring(eIdx+1);
	}
	if( anExpr.indexOf("e-") > -1)
		anExpr = "0";
	return anExpr;
};


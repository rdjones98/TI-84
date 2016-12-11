function MatrixEngine()
{
}
MatrixEngine.buildNbr = function(curDigit)
{
	if( curDigit.isOperator() && curDigit._prevDigit != null )
		curDigit = curDigit._prevDigit;
	else 
		return 1;
		
	
	var num = curDigit.getVal();
	while(curDigit._prevDigit != null && curDigit._prevDigit.isDigit())
	{
		curDigit = curDigit._prevDigit;
		num = curDigit.getVal() + num;
	}
	return Number(num);
};
MatrixEngine.eval = function(aDigit)
{
	var head = new Digit(null, false, Digit.RESULT);
	var resDigit = head;
	var curDigit = aDigit;
	var pCount   = 0;  // Count Open Parenthesis
	do
	{
		if( curDigit._nextDigit == null && pCount > 0 && curDigit.getVal() != ")")
		{
			curDigit._nextDigit = new Digit(")", false, Digit.OPERATOR);
			pCount --;
		}	
		if( curDigit.isMatrix() )
		{
			var num = 1;

			if( curDigit._prevDigit != null && !curDigit._prevDigit.isMatrix())
			{
				if( curDigit._nextDigit != null & curDigit._nextDigit == "-1" )
				{
					resDigit._val = curDigit.getVal(); 
					resDigit.type = curDigit._type;
				}
				else
					num = this.buildNbr(curDigit._prevDigit);
			}
			var m = new Array();
			for (var row=0; row<curDigit.getMatrix().length; row++)
			{
				m.push(new Array());
				for( var col=0; col<curDigit.getMatrix()[0].length; col++)
					m[row].push(num * curDigit.getMatrix()[row][col]);
			}
			if( resDigit._matrix != null)
				resDigit._matrix = this.multiplyMatrix(resDigit._matrix, m);
			else if( resDigit._prevDigit == null && resDigit.getVal() == null)
				resDigit._matrix = m;
			else 
			{
				resDigit._nextDigit = new Digit(m, false, Digit.MATRIX, m);
				resDigit = resDigit._nextDigit;
			}
			num = 1;
		}
		
		if( curDigit.getVal() == "rref(")
		{
			curDigit = curDigit._nextDigit;
			resDigit._matrix = this.gaussJordan(curDigit.getMatrix());
		}
		if( curDigit.getVal() == "-1" && curDigit.isSuper())
		{
			resDigit._matrix = this.inverseMatrix(resDigit.getMatrix());
		}
		
		if( curDigit.isOperator() && ! curDigit._nextDigit.isMatrix() )
		{
			resDigit._nextDigit = curDigit;
			resDigit = curDigit;
			curDigit = curDigit._nextDigit;
		}
		else if( curDigit.isOperator() )
		{
			var oper = curDigit.getVal();
			curDigit = curDigit._nextDigit;
			var m = curDigit.getMatrix();
				
			if( oper == "*" )
				resDigit._matrix = this.multiplyMatrix(resDigit._matrix, m);
			else if( oper == "+" )
				resDigit._matrix = this.addMatrix(resDigit._matrix, m);
			else if( oper == "-" )
				resDigit._matrix = this.subtractMatrix(resDigit._matrix, m);
			else if( oper == "/")
				return "ERR:CAN'T DIVIDE";
			else if( oper == "(")
			{
				pCount ++;
				resDigit._val = "(";
				resDigit._type = Digit.OPERATOR;
				curDigit = curDigit._prevDigit;
			}
		}
		if( curDigit._nextDigit != null )
			curDigit = curDigit._nextDigit;
		else if ( head._nextDigit != null )
		{
			curDigit = head;
			var tmp = new Digit(curDigit.getVal(), false, curDigit._type, curDigit.getMatrix());
			resDigit = tmp;
			while(curDigit._nextDigit != null)
			{
				curDigit = curDigit._nextDigit;
				resDigit._nextDigit = new Digit(curDigit.getVal(), false, curDigit._type, curDigit.getMatrix());
				resDigit = resDigit._nextDigit;
			}
			head = new Digit(null, false, Digit.RESULT);
			resDigit = head;
			curDigit = tmp;
		}
		else
			break;
	}
	while(true);
		
	return resDigit	.getMatrix();
};

MatrixEngine.inverseMatrix = function (aMatrix)
{
	var m = new Array();
	for( var mR=0; mR < aMatrix.length; mR++ )
	{
		m.push(new Array());
		for( var mC=0; mC<aMatrix[mR].length; mC++)
		{
			m[mR].push(aMatrix[mR][mC]);
		}
		for( var mC=0; mC<aMatrix[mR].length; mC++)
		{
			if(mC==mR)
				m[mR].push(1);
			else
				m[mR].push(0);
		}
	}
	var res = this.gaussJordan(m);
	var retval = new Array();
	for( var mR=0; mR<res.length; mR++)
	{
		retval.push(new Array());
		for( var mC=res.length; mC<res[mR].length; mC++)
		{
			retval[mR].push(res[mR][mC]);
		}
	}
	return retval;
};
MatrixEngine.gaussJordan = function (aMatrix)
{
	var m = new Array();
	for( var mR=0; mR < aMatrix.length; mR++ )
	{
		m.push(new Array());
		for( var mC=0; mC<aMatrix[mR].length; mC++)
		{
			m[mR].push(aMatrix[mR][mC]);
		}
	}
	var r=0;
	var c=0;
	var step=0;
	var numIter = m.length * m.length;

	for( ; step< numIter; step++)
	{
		console.log("Step: " + (step+1) + "  ");

		// Divide out the diagonals
		if ( c==r )
		{
			this.divide(m,r,c);
			r++;
			c=0;
		}
		else
		{
			this.eliminateDown(m, c, r, r, c);
			c++;
		}

		if( r >= m.length )
		{
			break;
		}
	}
	step++;
	r-=2;
	c=m.length-1;
	for( ; step< numIter; step++)
	{
		console.log("Step : " + (step+1) + "  ");
		this.eliminateUp( m, r, c, r, c );
		c++;
		if( c == m.length )
		{
			r --;
			c = r+1;
		}
	}
	return m;
};

// Elimination: r1 - r2 -> destR
MatrixEngine.eliminateDown = function(m, r1, r2, destR, c)
{
	var coef = -1*Number(m[r2][c]) ;

	console.log(coef + "r" + (r1+1) + " + r"+ (r2+1) + " -> r" + (destR+1));

	for( var i=0; i<m[r1].length; i++)
	{
		var r1Val = Number(m[r1][i])*coef ;
		var r2Val = Number(m[r2][i]);
		m[destR][i] = r1Val+r2Val;
	}
};
	
MatrixEngine.eliminateUp = function( m, r1, r2, destR, c)
	{
		var coef = -1 * Number(m[r1][c]);

		console.log("r" + (r1+1) + " + " + coef + "r"+ (r2+1) + " -> r" + (destR+1));

		for( var i=0; i<m[r1].length; i++)
		{
			var r1Val = Number(m[r1][i]) ;
			var r2Val = Number(m[r2][i]) * coef;
			m[destR][i] = r1Val + r2Val;
		}
	};

MatrixEngine.divide = function (m, r, c)
{
	var v = Number(m[r][c]);

	console.log("r"+(r+1)+"/"+v+" -> r"+(r+1));

	for(var i=0; i<m[r].length; i++)
	{
		m[r][i] = Number(m[r][i]) / v;
	}
};

MatrixEngine.multiplyMatrix = function(m1, m2)
{
	if( m1[0].length != m2.length )
	{
		return "ERR:DIM MISMATCH";
	}

	var res = new Array();
	for( var rows=0; rows<m1.length; rows++)
	{
		res.push(new Array());
		for( var cols=0; cols<m2[0].length; cols++ )
		{
			res[rows].push(this.multiply(m1, m2, rows, cols));
		}
	}
	return res;
};

MatrixEngine.multiply = function ( m1, m2, r, c)
{
	var res = 0;
	for( var i=0; i<m1[r].length; i++ )
	{
		var v1 = Number(m1[r][i]);
		var v2 = Number(m2[i][c]);

		res += v1*v2;
	}
	return res;
};

MatrixEngine.addMatrix = function(m1, m2)
{
	if( m1.length != m2.length || m1[0].length != m2[0].length)
	{
		return "ERR:DIM MISMATCH";
	}
	var res = new Array();
	for( var r = 0; r<m1.length; r++)
	{
		res.push(new Array());
		for( var c = 0; c<m1[r].length; c++)
			res[r].push(Number(m1[r][c]) + Number(m2[r][c]));
	}
	return res;
};

MatrixEngine.subtractMatrix = function(m1, m2)
{
	if( m1.length != m2.length || m1[0].length != m2[0].length)
	{
		return "ERR:DIM MISMATCH";
	}
	var res = new Array();
	for( var r = 0; r<m1.length; r++)
	{
		res.push(new Array());
		for( var c = 0; c<m1[r].length; c++)
			res[r].push(Number(m1[r][c]) - Number(m2[r][c]));
	}
	return res;
};

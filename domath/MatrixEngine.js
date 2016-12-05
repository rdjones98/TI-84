function inverseMatrix(aMatrix)
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
    var res = gaussJordan(m);
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
}
function gaussJordan(aMatrix)
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
			    divide(m,r,c);
			    r++;
			    c=0;
			}
			else
			{
			    eliminateDown(m, c, r, r, c);
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
			eliminateUp( m, r, c, r, c );
			c++;
			if( c == m.length )
			{
				r --;
				c = r+1;
			}
		}
    return m;

	// Elimination: r1 - r2 -> destR
	function eliminateDown(m,  r1,  r2,  destR,  c)
	{
		var coef = -1*Number(m[r2][c]) ;

		console.log(coef + "r" + (r1+1) + " + r"+ (r2+1) + " -> r" + (destR+1));

		for( var i=0; i<m[r1].length; i++)
		{
			var r1Val = Number(m[r1][i])*coef ;
			var r2Val = Number(m[r2][i]);
			m[destR][i] = r1Val+r2Val;
		}
	}
	function eliminateUp( m, r1, r2, destR, c)
	{
		var coef = -1 * Number(m[r1][c]);

		console.log("r" + (r1+1) + " + " + coef + "r"+ (r2+1) + " -> r" + (destR+1));

		for( var i=0; i<m[r1].length; i++)
		{
			var r1Val = Number(m[r1][i]) ;
			var r2Val = Number(m[r2][i]) * coef;
			m[destR][i] = r1Val + r2Val;
		}
	}

	function divide(m,  r,   c)
	{
		var v = Number(m[r][c]);

		console.log("r"+(r+1)+"/"+v+" -> r"+(r+1));

		for(var i=0; i<m[r].length; i++)
		{
			m[r][i] = Number(m[r][i]) / v;
		}
	}
}
function multiplyMatrix(m1, m2)
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
			res[rows].push(multiply(m1, m2, rows, cols));
		}
	}
  return res;

	function multiply( m1, m2, r, c)
	{
    var res = 0;
		for( var i=0; i<m1[r].length; i++ )
		{
			var v1 = Number(m1[r][i]);
			var v2 = Number(m2[i][c]);

			res += v1*v2;
		}
    return res;
	}

}

function addMatrix(m1, m2)
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
}

function subtractMatrix(m1, m2)
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
}

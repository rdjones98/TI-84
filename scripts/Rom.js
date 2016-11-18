class	Rom
{
	constructor( aCanvas, aGrapher )
	{
		this.canvas = aCanvas;
    this.grapher = aGrapher;
		this.grapher.setRom(this);

		this.CALC = 1;
		this.GRAPH = 2;

    this.STATE = this.CALC;
    this.math = "";
	}

  xPressed()
  {
    this.grapher.xPressed();
  }
  graph()
  {
		this.STATE = this.GRAPH;
    this.grapher.graph();
  }
	tracePressed()
	{
		this.STATE = this.GRAPH;
    this.grapher.tracePressed();
	}
  yEqualsPressed()
  {
    this.STATE = this.GRAPH;
    this.grapher.yEqualsPressed();
  }
	arrowPressed(anArrow)
	{
		if( this.STATE == this.GRAPH)
			this.grapher.arrowPressed(anArrow);
		else
			alert("rom.arrowPressed");
	}
  numberPressed( aNum )
  {
    this.canvas.draw(aNum);

    if( this.STATE == this.CALC)
      this.math += aNum;
    else
      this.grapher.numberPressed(aNum);

  }

  plusPressed()
  {
    this.canvas.draw("+");

    this.math += "+";
  }
  minusPressed()
  {
    this.canvas.draw("-");

    this.math += "-";
  }

  decimalPressed()
  {
    this.canvas.draw(".");
    this.math  + '.';
  }

  negativePressed()
  {
    this.canvas.draw("-");
    this.math  + '~';
  }
  clearPressed()
  {
    this.canvas.clearPressed();
    this.math = "";
  }


  enterPressed()
  {
    var res = this.doMath(this.math);
    this.canvas.drawAnswer(res);

    this.math="";
  }

  doMath( mathStr )
  {
    return this.doAllAdditionAndSubtraction( mathStr );
  }
  doAllAdditionAndSubtraction( mathStr )
  {
    var minusIdx = mathStr.indexOf("-");
    var plusIdx = mathStr.indexOf("+");

    while( minusIdx > -1 || plusIdx > -1 )
    {
      // Find smallest index that is > 0
      var oper = "";
      var idx  = 0;
      if( minusIdx < 0 )
      {
        oper = "+";
        idx = plusIdx;
      }
      else if ( plusIdx < 0 )
      {
        oper = "-";
        idx = minusIdx;
      }
      else if( minusIdx < plusIdx )
      {
        oper = "-";
        idx = minusIdx;
      }
      else
      {
        oper = "+";
        idx = plusIdx;
      }

      var lIdx = this.findLeftIdx(mathStr, idx);
      var rIdx = this.findRightIdx(mathStr, idx);

      var lStr = mathStr.substring(0,lIdx);
      var rStr = mathStr.substring(rIdx);
      var mStr = mathStr.substring(lIdx,rIdx);

      mathStr = lStr + this.addOrSub(mStr, oper) + rStr;

      var minusIdx = mathStr.indexOf("-");
      var plusIdx = mathStr.indexOf("+");
    }
    return mathStr;
  }

  // Given an Operation of either + or -, do it
  addOrSub(aStr, anOper)
  {
    var idx = aStr.indexOf( anOper );
    var l = aStr.substring( 0, idx );
    var r = aStr.substring( ++idx );

    l = l.replace("~", "-")
    r = r.replace("~", "-")

    var res = 0;
    if( anOper == "+")
      res = Number(l) + Number(r);
    else
      res = Number(l) - Number(r);
    res = res.toString().replace("-", "~");
    return res;
  }

  findLeftIdx(aStr, anIdx)
  {
    for( var i=anIdx-1; i>=0; i--)
    {
      var c = aStr.charAt(i);
      if( ( c <'0' || c > '9') && (c != '.') )
        return i;
    }
    return 0;
  }
  findRightIdx(aStr, anIdx)
  {
    for( var i=anIdx+1; i<aStr.length; i++)
    {
      var c = aStr.charAt(i);
      if( ( c <'0' || c > '9') && (c != '.') )
        return i;
    }
    return aStr.length;
  }

}

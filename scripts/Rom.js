class	Rom
{
	constructor( aCanvas )
	{
		this.canvas = aCanvas;

    this.math = "";
	}


  numberPressed( aNum )
  {
    this.canvas.draw(aNum);

    this.math += aNum;
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

  enterPressed()
  {
    var res = this.doMath(this.math);
    this.canvas.drawAnswer(res);

    this.math="";
  }

  doMath( mathStr )
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

      alert(mStr);
      mathStr = lStr + this.addOrSub(mStr, oper) + rStr;
      alert(mathStr);

      var minusIdx = mathStr.indexOf("-");
      var plusIdx = mathStr.indexOf("+");
    }
    return mathStr;
  }



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
      if( aStr.charAt(i) <'0' || aStr.charAt(i) > '9' )
        return i;
    return 0;
  }
  findRightIdx(aStr, anIdx)
  {
    for( var i=anIdx+1; i<aStr.length; i++)
    {
      if( aStr.charAt(i) <'0' || aStr.charAt(i) > '9' )
        return i;
    }
    return aStr.length;
  }

}

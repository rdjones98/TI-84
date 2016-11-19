class	Rom
{
	constructor()
	{
		var theCanvas = document.getElementById("theCanvas");

		this.STATE_Y_EQUALS   = new StateYEquals(theCanvas);
		this.STATE_GRAPHING   = new StateGraphing(theCanvas, this.STATE_Y_EQUALS, this);
		this.STATE_CALCULATOR = new StateCalculator(theCanvas);
		this.STATE_TRACE      = new StateTrace(theCanvas, this.STATE_Y_EQUALS, this);

    this._state = this.STATE_CALCULATOR;
    this.math = "";
	}

	getState()
	{
		return this._state;
	}

	doMath(anExpr)
	{
		return this.STATE_CALCULATOR.doMath(anExpr);
	}
  xPressed()
  {
    this._state.xPressed();
  }
  graphPressed()
  {
		this._state = this.STATE_GRAPHING;
    this._state.graphPressed();
  }
	tracePressed()
	{
		this._state = this.STATE_TRACE;
    this._state.tracePressed();
	}
  yEqualsPressed()
  {
    this._state = this.STATE_Y_EQUALS;
    this._state.yEqualsPressed();
  }
	arrowPressed(anArrow)
	{
		this._state.arrowPressed(anArrow);
	}
  numberPressed( aNum )
  {
		this._state.numberPressed(aNum);
/*    this.canvas.draw(aNum);

    if( this.STATE == this.CALC)
      this.math += aNum;
    else
      this.grapher.numberPressed(aNum);
*/
  }

  operatorPressed(anOper)
  {
		this._state.operatorPressed(anOper);
/*
		this.canvas.draw("-");
		if( this.STATE == this.CALC)
			this.math += "-";
    else
      this.grapher.minusPressed();
*/
	}

  negativePressed()
  {
		this._state.negativePressed();
/*
    this.canvas.draw("-");
		if( this.STATE == this.CALC)
			this.math += "~";
    else
      this.grapher.negativePressed();
			*/
  }

  clearPressed()
  {
		this._state.clearPressed();
/*
		if ( this.STATE == this.GRAPH )
			this.grapher.clearPressed();
		else
		{
    	this.canvas.clearPressed();
    	this.math = "";
		}
		*/
  }


  enterPressed()
  {
		this._state.enterPressed();
/*
    var res = this.doMath(this.math);
    this.canvas.drawAnswer(res);

    this.math="";
*/
  }

	setCalcState()
	{
		this._state = this.STATE_CALCULATOR;
		this._state.repaint();
	}
	setTraceState()
	{
		this._state = this.STATE_TRACE;
		this._state.repaint();
		return this._state;
	}
}

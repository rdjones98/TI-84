"use strict";

class	Rom
{
	constructor()
	{
		var theCanvas = document.getElementById("theCanvas");

		// Handle to all State Managers
		this.CANVAS = new Canvas(theCanvas);
		this.STATE_Y_EQUALS   = new StateYEquals(this.CANVAS, this);
		this.STATE_GRAPHING   = new StateGraphing(this.CANVAS, this.STATE_Y_EQUALS, this);
		this.STATE_GRAPHTBL   = new StateGraphTable(this.CANVAS, this.STATE_Y_EQUALS, this);
		this.STATE_CALCULATOR = new StateCalculator(this.CANVAS, this);
		this.STATE_TRACE      = new StateTrace(this.CANVAS, this);
		this.KEYPAD = null;
		// default State
    this._state = this.STATE_CALCULATOR;

		// Track 2nd button
		this._secondButtonPressed = false;

		this.CANVAS.drawFocusBox();
	}

	doMath(anExpr)
	{
		return this.STATE_CALCULATOR.doMath(anExpr);
	}

	secondPressed()
	{
		this._secondButtonPressed = !this._secondButtonPressed ;
		this._state.repaint();
	}
  xPressed()
  {
    this._state.xPressed();
  }
	lnPressed()
  {
    this._state.lnPressed();
  }
	logPressed()
  {
    this._state.logPressed();
  }
	trigPressed(aTrigFunc)
	{
		this._state.trigPressed(aTrigFunc)
	}
  graphPressed()
  {
		if( !this._secondButtonPressed)
		{
			this._state = this.STATE_GRAPHING;
		}
		else
		{
			this._state = this.STATE_GRAPHTBL;
			this._secondButtonPressed = false;
		}
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
  }

  operatorPressed(anOper)
  {
		this._state.operatorPressed(anOper);
	}

  negativePressed()
  {
		this._state.negativePressed();
  }

  clearPressed()
  {
		this._state.clearPressed();
  }

  enterPressed()
  {
		this._state.enterPressed();
  }

	deletePressed()
	{
		this._state.deletePressed();
	}
	getStateGraph()
	{
		return this.STATE_GRAPHING;
	}
	getStateYEquals()
	{
		return this.STATE_Y_EQUALS;
	}
	getKeypad()
	{
		return this.KEYPAD;
	}
	setKeypad(aKeyPad)
	{
		this.KEYPAD = aKeyPad;
	}
	setStateCalculator()
	{
		this._state = this.STATE_CALCULATOR;
		this._state.repaint();
		return this._state;
	}
	setTraceState()
	{
		this._state = this.STATE_TRACE;
		this._state.repaint();
		return this._state;
	}

	is2ndPressed()
	{
		return this._secondButtonPressed;
	}
}

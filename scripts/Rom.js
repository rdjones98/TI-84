"use strict";

class	Rom
{
	constructor()
	{
		var theCanvas = document.getElementById("theCanvas");

		this.VERSION = .17;
		// Handle to all State Managers
		this.CANVAS = new Canvas(theCanvas);
		this.STATE_Y_EQUALS   = new StateYEquals(this.CANVAS, this);
		this.STATE_GRAPHING   = new StateGraphing(this.CANVAS, this.STATE_Y_EQUALS, this);
		this.STATE_GRAPHTBL   = new StateGraphTable(this.CANVAS, this.STATE_Y_EQUALS, this);
		this.STATE_CALCULATOR = new StateCalculator(this.CANVAS, this);
		this.STATE_TRACE      = new StateTrace(this.CANVAS, this.STATE_GRAPHING, this);
		this.STATE_TRACECALC  = new StateTraceCalc(this.CANVAS, this.STATE_Y_EQUALS, this.STATE_GRAPHING, this.STATE_TRACE, this);
		this.STATE_MODE       = new StateMode(this.CANVAS, this);
		this.STATE_WINDOW     = new StateWindow(this.CANVAS, this.STATE_GRAPHING, this);
		this.STATE_STAT       = new StateStat(this.CANVAS, this);
		this.STATE_MATRIX     = new StateMatrix(this.CANVAS, this);
		this.STATE_ZOOM       = new StateZoom(this.CANVAS, this.STATE_GRAPHING, this);
		this.STATE_STATEDIT   = new StateStatEdit(this.CANVAS, this);
		this.KEYPAD = null;
		// default State
    this._state = this.STATE_CALCULATOR;

		// Track 2nd button
		this._secondButtonPressed = false;

		this.CANVAS.drawFocusBox();
	}


	// Button Pressed Events
	matrixPressed()
	{
		this._state = this.STATE_MATRIX;
		this._state.matrixPressed();
		this.secondPressed(false);
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
		if(this.is2ndPressed())
		{
			this._state = this.STATE_TRACECALC;
    	this._state.traceCalcPressed();
			this.secondPressed(false);
		}
		else
		{
			this._state = this.STATE_TRACE;
    	this._state.tracePressed();
		}
	}
	statPressed()
	{
		this._state = this.STATE_STAT;
    this._state.statPressed();
	}
	zoomPressed()
	{
		this._state = this.STATE_ZOOM;
    this._state.zoomPressed();
	}
  yEqualsPressed()
  {
    this._state = this.STATE_Y_EQUALS;
    this._state.yEqualsPressed();
  }
	windowPressed()
	{
		this._state = this.STATE_WINDOW;
		this._state.windowPressed();
	}
	modePressed()
	{
		this._state = this.STATE_MODE;
		this._state.modePressed();
	}

	// Keyboard Pressed Events
	secondPressed(aVal)
	{
		if( typeof aVal != "undefined")
			this._secondButtonPressed = aVal
		else
			this._secondButtonPressed = !this._secondButtonPressed ;
		this._state.secondPressed();
		this._state.repaint();
	}
  xPressed()
  {
    this._state.xPressed();
		this._state.repaint();
  }
	lnPressed()
  {
    this._state.lnPressed();
		this._state.repaint();
  }
	logPressed()
  {
    this._state.logPressed();
		this._state.repaint();
  }
	trigPressed(aTrigFunc)
	{
		this._state.trigPressed(aTrigFunc)
		this._state.repaint();
	}
	arrowPressed(anArrow)
	{
		this._state.arrowPressed(anArrow);
		this._state.repaint();
}
  numberPressed( aNum )
  {
		this._state.numberPressed(aNum);
		this.secondPressed(false);
		this._state.repaint();
  }
  operatorPressed(anOper)
  {
		this._state.operatorPressed(anOper);
		this._state.repaint();
	}
	xSquaredPressed()
  {
		if ( this.is2ndPressed() )
		{
			this.secondPressed(false);
			this._state.operatorPressed(this.CANVAS.SQRROOT+"(");
		}
		else
			this._state.operatorPressed("^2");

		this._state.repaint();
	}
	powerOfPressed()
  {
		if ( this.is2ndPressed() )
		{
			this.secondPressed(false);
			this._state.numberPressed(this.CANVAS.PI);
		}
		else
			this._state.operatorPressed("^");

		this._state.repaint();
	}
	dividePressed()
  {
		if ( this.is2ndPressed() )
		{
			this.secondPressed(false);
			this._state.numberPressed("e");
		}
		else
			this._state.operatorPressed("/");

		this._state.repaint();
	}
  negativePressed()
  {
		this._state.negativePressed();
		this._state.repaint();
  }
  clearPressed()
  {
		this._state.clearPressed();
  }
  enterPressed()
  {
		this._state.enterPressed();
		this._state.repaint();
	}
	deletePressed()
	{
		this._state.deletePressed();
		this._state.repaint();
	}

	// Getter/Setter Methods
	getStateMatrix()
	{
		return this.STATE_MATRIX;
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
	getStatEditState()
	{
		return this.STATE_STATEDIT;
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
	setTraceState(aZoom)
	{
		this._state = this.STATE_TRACE;
		if( typeof aZoom != "undefined")
			this._state.zoom(aZoom);
		this._state.repaint();
		return this._state;
	}
	setStatEditState()
	{
		this._state = this.STATE_STATEDIT;
		this._state.repaint();
		return this._state;
	}
	is2ndPressed()
	{
		return this._secondButtonPressed;
	}

	evaluate(anEquationIdx, anX)
	{
		anX = this.fixRoundingError(anX);
		var equ = this.STATE_Y_EQUALS._equations[anEquationIdx].replace(/X/g, "(" + anX + ")");
		return this.doMath(equ);
	}

	doMath(anExpr)
	{
		if( anExpr.toString().indexOf("e-") > 0)
			console.log(anExpr);
		return this.fixRoundingError(this.STATE_CALCULATOR.doMath(anExpr));
	}

	fixRoundingError(aVal)
	{
    var str = aVal.toString();
    var idx = str.indexOf(".");
    if( str.indexOf("e-") > idx )
      return 0;

		return aVal;
	}
}

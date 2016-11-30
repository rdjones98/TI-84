"use strict";

//class	Rom {	constructor()
function Rom ()
{
		var theCanvas = document.getElementById("theCanvas");

		this.VERSION = .18;
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
Rom.prototype.matrixPressed = function()
	{
		this._state = this.STATE_MATRIX;
		this._state.matrixPressed();
		this.secondPressed(false);
	};
Rom.prototype.graphPressed = function()
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
  };
Rom.prototype.tracePressed = function()
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
	};
Rom.prototype.statPressed = function()
	{
		this._state = this.STATE_STAT;
    this._state.statPressed();
	};
Rom.prototype.zoomPressed = function()
	{
		this._state = this.STATE_ZOOM;
    this._state.zoomPressed();
	};
Rom.prototype.yEqualsPressed = function()
  {
    this._state = this.STATE_Y_EQUALS;
    this._state.yEqualsPressed();
  };
Rom.prototype.windowPressed = function()
	{
		this._state = this.STATE_WINDOW;
		this._state.windowPressed();
	};
Rom.prototype.modePressed = function()
	{
		this._state = this.STATE_MODE;
		this._state.modePressed();
	};

	// Keyboard Pressed Events
Rom.prototype.secondPressed = function(aVal)
	{
		if( typeof aVal != "undefined")
			this._secondButtonPressed = aVal
		else
			this._secondButtonPressed = !this._secondButtonPressed ;
		this._state.secondPressed();
		this._state.repaint();
	};
Rom.prototype.xPressed = function()
  {
    this._state.xPressed();
		this._state.repaint();
  };
Rom.prototype.lnPressed = function()
  {
    this._state.lnPressed();
		this._state.repaint();
  };
Rom.prototype.logPressed = function()
  {
    this._state.logPressed();
		this._state.repaint();
  };
Rom.prototype.trigPressed = function(aTrigFunc)
	{
		this._state.trigPressed(aTrigFunc)
		this._state.repaint();
	};
Rom.prototype.arrowPressed = function(anArrow)
	{
		this._state.arrowPressed(anArrow);
		this._state.repaint();
};
Rom.prototype.numberPressed = function( aNum )
  {
		this._state.numberPressed(aNum);
		this.secondPressed(false);
		this._state.repaint();
  };
Rom.prototype.operatorPressed = function(anOper)
  {
		this._state.operatorPressed(anOper);
		this._state.repaint();
	};
Rom.prototype.xSquaredPressed = function()
  {
		if ( this.is2ndPressed() )
		{
			this.secondPressed(false);
			this._state.operatorPressed(this.CANVAS.SQRROOT+"(");
		}
		else
			this._state.operatorPressed("^2");

		this._state.repaint();
	};
Rom.prototype.powerOfPressed = function()
  {
		if ( this.is2ndPressed() )
		{
			this.secondPressed(false);
			this._state.numberPressed(this.CANVAS.PI);
		}
		else
			this._state.operatorPressed("^");

		this._state.repaint();
	};
Rom.prototype.dividePressed = function()
  {
		if ( this.is2ndPressed() )
		{
			this.secondPressed(false);
			this._state.numberPressed("e");
		}
		else
			this._state.operatorPressed("/");

		this._state.repaint();
	};
Rom.prototype.negativePressed = function()
  {
		this._state.negativePressed();
		this._state.repaint();
  };
Rom.prototype.clearPressed = function()
  {
		this._state.clearPressed();
  };
Rom.prototype.enterPressed = function()
  {
		this._state.enterPressed();
		this._state.repaint();
	};
Rom.prototype.deletePressed = function()
	{
		this._state.deletePressed();
		this._state.repaint();
	};

	// Getter/Setter Methods
Rom.prototype.getStateMatrix = function()
	{
		return this.STATE_MATRIX;
	};
Rom.prototype.getStateGraph = function()
	{
		return this.STATE_GRAPHING;
	};
Rom.prototype.getStateYEquals = function()
	{
		return this.STATE_Y_EQUALS;
	};
Rom.prototype.getKeypad = function()
	{
		return this.KEYPAD;
	};
Rom.prototype.getStatEditState = function()
	{
		return this.STATE_STATEDIT;
	};
Rom.prototype.setKeypad = function(aKeyPad)
	{
		this.KEYPAD = aKeyPad;
	};
Rom.prototype.setStateCalculator = function()
	{
		this._state = this.STATE_CALCULATOR;
		this._state.repaint();
		return this._state;
	};
Rom.prototype.setTraceState = function(aZoom)
	{
		this._state = this.STATE_TRACE;
		if( typeof aZoom != "undefined")
			this._state.zoom(aZoom);
		this._state.repaint();
		return this._state;
	};
Rom.prototype.setStatEditState = function()
	{
		this._state = this.STATE_STATEDIT;
		this._state.repaint();
		return this._state;
	};
Rom.prototype.is2ndPressed = function()
	{
		return this._secondButtonPressed;
	};

Rom.prototype.evaluate = function(anEquationIdx, anX)
	{
		anX = this.fixRoundingError(anX);
		var equ = this.STATE_Y_EQUALS._equations[anEquationIdx].replace(/X/g, "(" + anX + ")");
		return this.doMath(equ);
	};

Rom.prototype.doMath = function(anExpr)
	{
		if( anExpr.toString().indexOf("e-") > 0)
			console.log(anExpr);
		return this.fixRoundingError(this.STATE_CALCULATOR.doMath(anExpr));
	};

Rom.prototype.fixRoundingError = function(aVal)
	{
    var str = aVal.toString();
    var idx = str.indexOf(".");
    if( str.indexOf("e-") > idx )
      return 0;

		return aVal;
	};


//class	Rom {	constructor()
function Rom (aWidth, aHeight)
{
	var theCanvas = document.getElementById("theCanvas");

	// Handle to all State Managers
	this.CANVAS = new Canvas(theCanvas, aWidth, aHeight);
	this.STATE_Y_EQUALS   = new StateYEquals(this.CANVAS, this);
	this.STATE_GRAPHING   = new StateGraphing(this.CANVAS, this.STATE_Y_EQUALS, this);
	this.STATE_GRAPHTBL   = new StateGraphTable(this.CANVAS, this);
	this.STATE_CALCULATOR = new StateCalculator(this.CANVAS, this);
	this.STATE_TRACE      = new StateTrace(this.CANVAS, this.STATE_GRAPHING, this);
	this.STATE_TRACECALC  = new StateTraceCalc(this.CANVAS, this.STATE_Y_EQUALS, this.STATE_GRAPHING, this.STATE_TRACE, this);
	this.STATE_MODE       = new StateMode(this.CANVAS, this);
	this.STATE_WINDOW     = new StateWindow(this.CANVAS, this);
	this.STATE_TABLESET   = new StateTableSet(this.CANVAS, this);
	this.STATE_STAT       = new StateStat(this.CANVAS, this);
	this.STATE_MATRIX     = new StateMatrix(this.CANVAS, this);
	this.STATE_ZOOM       = new StateZoom(this.CANVAS, this);
	this.STATE_STATEDIT   = new StateStatEdit(this.CANVAS, this);
	
	new MathEngine(this);
	this.KEYPAD = null;
	// default State
	this._state = this.STATE_CALCULATOR;

	// Track 2nd button
	this._secondButtonPressed = false;

	this.CANVAS.drawFocusBox();
}
Rom.prototype.getStateTableSet   = function(){ return this.STATE_TABLESET; };
Rom.prototype.getStateTrace      = function(){ return this.STATE_TRACE; };
Rom.prototype.getStateCalculator = function(){ return this.STATE_CALCULATOR; };
Rom.prototype.getStateGraphTable = function(){ return this.STATE_GRAPHTBL; };
Rom.prototype.getStateMatrix     = function(){ return this.STATE_MATRIX; };
Rom.prototype.getStateGraph      = function(){ return this.STATE_GRAPHING; };
Rom.prototype.getStateYEquals    = function(){ return this.STATE_Y_EQUALS; };
Rom.prototype.getStateWindow     = function(){ return this.STATE_WINDOW; };
Rom.prototype.getKeypad 	     = function(){ return this.KEYPAD; };
Rom.prototype.getStatEditState   = function(){ return this.STATE_STATEDIT; };
Rom.prototype.getCanvas 		 = function(){ return this.CANVAS; };

// Button Pressed Events
Rom.prototype.matrixPressed = function()
{
	if(this.is2ndPressed())
	{
		this._state = this.STATE_MATRIX;
		this._state.matrixPressed();
	}
	else
	{
		this.operatorPressed("^");
		this.numberPressed("-1");
	}
	this._secondButtonPressed = false;

};
Rom.prototype.graphPressed = function()
{
	this._state = this._secondButtonPressed ? this.STATE_GRAPHTBL : this.STATE_GRAPHING;
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.tracePressed = function()
{
	if(this.is2ndPressed())
	{
		this._state = this.STATE_TRACECALC;
		this._secondButtonPressed = false;
		this._state.traceCalcPressed();
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
	this._secondButtonPressed = false;
	this._state.statPressed();
};
Rom.prototype.zoomPressed = function()
{
	this._state = this.STATE_ZOOM;
	this._secondButtonPressed = false;
	this._state.zoomPressed();
};
Rom.prototype.yEqualsPressed = function()
{
	this._state = this.STATE_Y_EQUALS;
	this._secondButtonPressed = false;
	this._state.yEqualsPressed();
};
Rom.prototype.windowPressed = function()
{
	this._state = this.is2ndPressed() ? this.STATE_TABLESET : this.STATE_WINDOW;
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.modePressed = function()
{
	this._state = this.STATE_MODE;
	this._state.modePressed();
	this._secondButtonPressed = false;
};

// Keyboard Pressed Events
Rom.prototype.secondPressed = function(aVal)
{
	if( typeof aVal != "undefined")
		this._secondButtonPressed = aVal;
	else
		this._secondButtonPressed = !this._secondButtonPressed ;
	this._state.repaint();
};
Rom.prototype.xPressed = function()
{
	this._state.xPressed();
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.lnPressed = function()
{
	if (this.is2ndPressed() )
	{
		this._state.functionPressed("e");
		this._state.operatorPressed("^");
	}
	else {
		this._state.functionPressed("ln(");
	}
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.logPressed = function()
{
	if (this.is2ndPressed() )
	{
		this._state.functionPressed("10");
		this._state.operatorPressed("^");
	}
	else {
		this._state.functionPressed("log(");
	}
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.trigPressed = function(aTrigFunc)
{
	if (this.is2ndPressed() )
	{
		this._state.functionPressed("a" + aTrigFunc);
	}
	else {
		this._state.functionPressed(aTrigFunc);
	}
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.arrowPressed = function(anArrow)
{
	this._state.arrowPressed(anArrow);
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.numberPressed = function( aNum )
{
	this._state.numberPressed(aNum);
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.operatorPressed = function(anOper)
{
	this._state.operatorPressed(anOper);
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.xSquaredPressed = function()
{
	if ( this.is2ndPressed() )
	{
		this._state.operatorPressed(Canvas.SQRROOT+"(");
	}
	else
	{
		this._state.operatorPressed("^");
		this._state.numberPressed("2");
	}
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.powerOfPressed = function()
{
	if ( this.is2ndPressed() )
	{
		this._state.numberPressed(Canvas.PI);
	}
	else
		this._state.operatorPressed("^");

	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.dividePressed = function()
{
	if ( this.is2ndPressed() )
	{
		this._state.numberPressed("e");
	}
	else
		this._state.operatorPressed("/");

	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.negativePressed = function()
{
	this._state.negativePressed();
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.clearPressed = function()
{
	this._secondButtonPressed = false;
	this._state.clearPressed();
};
Rom.prototype.enterPressed = function()
{
	this._state.enterPressed();
	this._secondButtonPressed = false;
	this._state.repaint();
};
Rom.prototype.deletePressed = function()
{
	this._state.deletePressed();
	this._secondButtonPressed = false;
	this._state.repaint();
};

// Getter/Setter Methods

Rom.prototype.setKeypad = function(aKeyPad){	this.KEYPAD = aKeyPad; };
Rom.prototype.setStateCalculator = function()
{
	this._state = this.STATE_CALCULATOR;
	this._secondButtonPressed = false;
	this._state.repaint();
	return this._state;
};
Rom.prototype.setTraceState = function(aZoom, repaint)
{
	this._state = this.STATE_TRACE;
	if( typeof aZoom != "undefined" && aZoom != null)
		this._state.zoom(aZoom);
	this._secondButtonPressed = false;
	if( typeof repaint == "undefined" || repaint == true)
		this._state.repaint();
	return this._state;
};
Rom.prototype.setStatEditState = function()
{
	this._state = this.STATE_STATEDIT;
	this._secondButtonPressed = false;
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
	var equ = this.STATE_Y_EQUALS._equations[anEquationIdx][0].getMathStr().replace(/X/g, "(" + anX + ")");
	return this.doMath(equ);
};

Rom.prototype.doMath = function(anExpr)
{
	if( anExpr.toString().indexOf("e-") > 0)
		console.log(anExpr);
	return this.fixRoundingError(MathEngine.doMath(anExpr));
};

Rom.prototype.fixRoundingError = function(aVal)
{
	if(aVal == null)
		return 0;
	var str = aVal.toString();
	var idx = str.indexOf(".");
	if( str.indexOf("e-") > idx )
		return 0;

	return aVal;
};

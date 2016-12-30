// Wrapper class for determining if we have clicked the correct spot
function Rectangle(anX, aY, aWidth, aHeight)
{
	this.X = anX;
	this.Y = aY;
	this.W = aWidth;
	this.H = aHeight;
}
Rectangle.prototype.contains = function(anX, aY)
{
	return this.X <= anX && anX <= this.X + this.W && this.Y <= aY && aY <= this.Y + this.H; 
};

//class Keypad { constructor(aRom){}}
function Keypad( aRom, aWidth, aHeight )
{
	this.rom = aRom;
	aRom.setKeypad(this);

	aWidth = Number(aWidth);
	aHeight = Number(aHeight);
	this.W = aWidth;
	this.H = aHeight;

	this.COL1_MIN=Math.round(.14*aWidth);
	this.COL1_MAX=Math.round(.27*aWidth);

	var bw = Math.round(.13*aWidth);
	var bh = Math.round(.04*aHeight);
	var c1 = Math.round(.14*aWidth);
	var c2 = Math.round(.275*aWidth);
	var c3 = Math.round(.41*aWidth);
	var c4 = Math.round(.54*aWidth);
	var c5 = Math.round(.68*aWidth);

	// Row 1
	this.YEQ = new Rectangle( c1, Math.round(.33*aHeight), bw, bh );
	this.WIN = new Rectangle( c2, this.YEQ.Y, bw, bh);
	this.ZM  = new Rectangle( c3, this.YEQ.Y, bw, bh);
	this.TRC = new Rectangle( c4, this.YEQ.Y, bw, bh);
	this.GRP = new Rectangle( c5, this.YEQ.Y, bw, bh);
	// Row 2
	this.SEC = new Rectangle( c1, Math.round(.415*aHeight), bw, bh );
	this.MOD = new Rectangle( c2, this.SEC.Y*1.02, bw, bh );
	this.DEL = new Rectangle( c3, this.SEC.Y*1.03, bw, bh );
	// Row 3
	this.X   = new Rectangle( c2, Math.round(.475*aHeight), bw, bh );
	this.STA = new Rectangle( c3, this.X.Y, bw, bh );
	// Row 4
	this.CLR = new Rectangle( c5, Math.round(.52*aHeight), bw, bh*.8 );
	// Row 5
	this.MAT = new Rectangle( c1, Math.round(.562*aHeight), bw, bh );
	this.SIN = new Rectangle( c2, this.MAT.Y*1.015, bw, bh);
	this.COS = new Rectangle( c3, this.MAT.Y*1.025, bw, bh);
	this.TAN = new Rectangle( c4, this.MAT.Y*1.015, bw, bh);
	this.EXP = new Rectangle( c5, this.MAT.Y, bw, bh);
	// Row 6
	this.SQR = new Rectangle( c1, Math.round(.612*aHeight), bw, bh );
	this.OPN = new Rectangle( c3, this.SQR.Y*1.025, bw, bh);
	this.CLS = new Rectangle( c4, this.SQR.Y*1.015, bw, bh);
	this.DIV = new Rectangle( c5, this.SQR.Y, bw, bh);
	// Row 7
	this.LOG = new Rectangle( c1, Math.round(.665*aHeight), bw, bh );
	this.SVN = new Rectangle( c2, this.LOG.Y*1.015, bw, bh*1.2);
	this.EGT = new Rectangle( c3, this.LOG.Y*1.025, bw, bh*1.2);
	this.NIN = new Rectangle( c4, this.LOG.Y*1.015, bw, bh*1.2);
	this.MUL = new Rectangle( c5, this.LOG.Y, bw, bh);
	// Row 8
	this.LN  = new Rectangle( c1, Math.round(.715*aHeight), bw, bh );
	this.FOR = new Rectangle( c2, this.LN.Y*1.035, bw, bh*1.2);
	this.FIV = new Rectangle( c3, this.LN.Y*1.04, bw, bh*1.2);
	this.SIX = new Rectangle( c4, this.LN.Y*1.035, bw, bh*1.2);
	this.MIN = new Rectangle( c5, this.LN.Y, bw, bh);
	// Row 9
	this.STO = new Rectangle( c1, Math.round(.772*aHeight), bw, bh );
	this.ONE = new Rectangle( c2, this.STO.Y*1.045, bw, bh*1.2);
	this.TWO = new Rectangle( c3, this.STO.Y*1.05, bw, bh*1.2);
	this.THR = new Rectangle( c4, this.STO.Y*1.045, bw, bh*1.2);
	this.ADD = new Rectangle( c5, this.STO.Y, bw, bh);
	// Row 10
	this.ON  = new Rectangle( c1, Math.round(.83*aHeight), bw, bh );
	this.ZER = new Rectangle( c2, this.ON.Y*1.055, bw, bh*1.2);
	this.DOT = new Rectangle( c3, this.ON.Y*1.06, bw, bh*1.2);
	this.NEG = new Rectangle( c4, this.ON.Y*1.055, bw, bh*1.2);
	this.ENT = new Rectangle( c5, this.ON.Y*.99, bw, bh*1.6);
	//ARROWS
	this.LFT = new Rectangle( c4*1.02, Math.round(.43*aHeight), bw*.8, bh*1.1 );
	this.RGT = new Rectangle( c5*1.08, this.LFT.Y, bw*.8, bh*1.1 );
	this.UP  = new Rectangle( c5*.97,    Math.round(.39*aHeight), bw*.5, bh*1.3 );
	this.DN  = new Rectangle( this.UP.X, Math.round(.455*aHeight), bw*.5, bh*1.3 );
}

Keypad.A_LEFT  = "ArrowLeft";
Keypad.A_RIGHT = "ArrowRight";
Keypad.A_UP    = "ArrowUp";
Keypad.A_DOWN  = "ArrowDown";



Keypad.prototype.mouseClicked = function( evt )
{
	var canvas = document.getElementById("theCanvas");
    var rect = canvas.getBoundingClientRect();

	var x = evt.clientX - rect.left;
	var y = evt.clientY - rect.top;
	
	if( Canvas.DEBUG )
		console.log("mouse clicked [" + x + ", " +y + "]");

	var secondPressed = false;
	try
	{
		var vibrate = true;
		
		if( this.YEQ.contains(x,y) )
			this.rom.yEqualsPressed();
		else if(this.SEC.contains(x,y) )
		{	
			this.rom.secondPressed();
			secondPressed = true;
		}
		else if(this.MAT.contains(x,y) )
			this.rom.matrixPressed();
		else if(this.SQR.contains(x,y) )
			this.rom.xSquaredPressed();
		else if(this.LOG.contains(x,y) )
			this.rom.logPressed();
		else if(this.LN.contains(x,y) )
			this.rom.lnPressed();
		else if(this.ON.contains(x,y) )
			alert("Calculator is always on!");
		else if(this.WIN.contains(x,y) )
			this.rom.windowPressed();
		else if(this.MOD.contains(x,y) )
			this.rom.modePressed();
		else if(this.X.contains(x,y) )
			this.rom.xPressed();
		else if(this.SIN.contains(x,y) )
			this.rom.trigPressed("sin(");
		else if(this.SVN.contains(x,y) )
			this.rom.numberPressed(7);
		else if(this.FOR.contains(x,y) )
			this.rom.numberPressed(4);
		else if(this.ONE.contains(x,y) )
			this.rom.numberPressed(1);
		else if(this.ZER.contains(x,y) )
			this.rom.numberPressed(0);
		else if(this.ZM.contains(x,y) )
			this.rom.zoomPressed();
		else if(this.DEL.contains(x,y) )
			this.rom.deletePressed();
		else if(this.STA.contains(x,y) )
			this.rom.statPressed();
		else if(this.COS.contains(x,y) )
			this.rom.trigPressed("cos(");
		else if(this.OPN.contains(x,y) )
			this.rom.operatorPressed("(");
		else if(this.EGT.contains(x,y) )
			this.rom.numberPressed(8);
		else if(this.FIV.contains(x,y) )
			this.rom.numberPressed(5);
		else if(this.TWO.contains(x,y) )
			this.rom.numberPressed(2);
		else if(this.DOT.contains(x,y) )
			this.rom.numberPressed(".");
		else if(this.TRC.contains(x,y) )
			this.rom.tracePressed();
		else if(this.TAN.contains(x,y) )
			this.rom.trigPressed("tan(");
		else if(this.CLS.contains(x,y) )
			this.rom.operatorPressed(")");
		else if(this.NIN.contains(x,y) )
			this.rom.numberPressed(9);
		else if(this.SIX.contains(x,y) )
			this.rom.numberPressed(6);
		else if(this.THR.contains(x,y) )
			this.rom.numberPressed(3);
		else if(this.NEG.contains(x,y) )
			this.rom.negativePressed();
		else if(this.GRP.contains(x,y) )
			this.rom.graphPressed();
		else if(this.CLR.contains(x,y) )
			this.rom.clearPressed();
		else if(this.EXP.contains(x,y) )
			this.rom.powerOfPressed();
		else if(this.DIV.contains(x,y) )
			this.rom.dividePressed();
		else if(this.MUL.contains(x,y) )
			this.rom.operatorPressed("*");
		else if(this.MIN.contains(x,y) )
			this.rom.operatorPressed("-");
		else if(this.ENT.contains(x,y) )
			this.rom.enterPressed();
		else if(this.ADD.contains(x,y) )
			this.rom.operatorPressed("+");
		else if(this.LFT.contains(x,y) )
			this.rom.arrowPressed(Keypad.A_LEFT);
		else if(this.RGT.contains(x,y) )
			this.rom.arrowPressed(Keypad.A_RIGHT);
		else if(this.UP.contains(x,y) )
			this.rom.arrowPressed(Keypad.A_UP);
		else if(this.DN.contains(x,y) )
			this.rom.arrowPressed(Keypad.A_DOWN);
		else
			vibrate = false;
		
		if(vibrate)
			window.navigator.vibrate(200);
	}
	catch(err)
	{
		console.log(err.stack);
	}
	

	if(Canvas.DEBUG)
	{
		// Display all click areas for each button
		// Must comment out clipDisplay is Canvas to use this
		var theCanvas = this.rom.getCanvas();
		var ctx = theCanvas.CONTEXT;

		ctx.strokeStyle = "red";
		ctx.rect(this.YEQ.X, this.YEQ.Y, this.YEQ.W, this.YEQ.H);
		ctx.rect(this.WIN.X, this.WIN.Y, this.WIN.W, this.WIN.H);
		ctx.rect(this.ZM.X,  this.ZM.Y,  this.ZM.W,  this.ZM.H);
		ctx.rect(this.TRC.X, this.TRC.Y, this.TRC.W, this.TRC.H);
		ctx.rect(this.GRP.X, this.GRP.Y, this.GRP.W, this.GRP.H);

		ctx.rect(this.SEC.X, this.SEC.Y, this.SEC.W, this.SEC.H);
		ctx.rect(this.MOD.X, this.MOD.Y, this.MOD.W, this.MOD.H);
		ctx.rect(this.DEL.X, this.DEL.Y, this.DEL.W, this.DEL.H);

		ctx.rect(this.X.X, this.X.Y, this.X.W, this.X.H);
		ctx.rect(this.STA.X, this.STA.Y, this.STA.W, this.STA.H);

		ctx.rect(this.CLR.X, this.CLR.Y, this.CLR.W, this.CLR.H);
		
		ctx.rect(this.MAT.X, this.MAT.Y, this.MAT.W, this.MAT.H);
		ctx.rect(this.SIN.X, this.SIN.Y, this.SIN.W, this.SIN.H);
		ctx.rect(this.COS.X, this.COS.Y, this.COS.W, this.COS.H);
		ctx.rect(this.TAN.X, this.TAN.Y, this.TAN.W, this.TAN.H);
		ctx.rect(this.EXP.X, this.EXP.Y, this.EXP.W, this.EXP.H);

		ctx.rect(this.SQR.X, this.SQR.Y, this.SQR.W, this.SQR.H);
		ctx.rect(this.OPN.X, this.OPN.Y, this.OPN.W, this.OPN.H);
		ctx.rect(this.CLS.X, this.CLS.Y, this.CLS.W, this.CLS.H);
		ctx.rect(this.DIV.X, this.DIV.Y, this.DIV.W, this.DIV.H);

		ctx.rect(this.LOG.X, this.LOG.Y, this.LOG.W, this.LOG.H);
		ctx.rect(this.SVN.X, this.SVN.Y, this.SVN.W, this.SVN.H);
		ctx.rect(this.EGT.X, this.EGT.Y, this.EGT.W, this.EGT.H);
		ctx.rect(this.NIN.X, this.NIN.Y, this.NIN.W, this.NIN.H);
		ctx.rect(this.MUL.X, this.MUL.Y, this.MUL.W, this.MUL.H);
		
		ctx.rect(this.LN.X, this.LN.Y, this.LN.W, this.LN.H);
		ctx.rect(this.FOR.X, this.FOR.Y, this.FOR.W, this.FOR.H);
		ctx.rect(this.FIV.X, this.FIV.Y, this.FIV.W, this.FIV.H);
		ctx.rect(this.SIX.X, this.SIX.Y, this.SIX.W, this.SIX.H);
		ctx.rect(this.MIN.X, this.MIN.Y, this.MIN.W, this.MIN.H);

		ctx.rect(this.STO.X, this.STO.Y, this.STO.W, this.STO.H);
		ctx.rect(this.ONE.X, this.ONE.Y, this.ONE.W, this.ONE.H);
		ctx.rect(this.TWO.X, this.TWO.Y, this.TWO.W, this.TWO.H);
		ctx.rect(this.THR.X, this.THR.Y, this.THR.W, this.THR.H);
		ctx.rect(this.ADD.X, this.ADD.Y, this.ADD.W, this.ADD.H);

		ctx.rect(this.ON.X, this.ON.Y, this.ON.W, this.ON.H);
		ctx.rect(this.ZER.X, this.ZER.Y, this.ZER.W, this.ZER.H);
		ctx.rect(this.DOT.X, this.DOT.Y, this.DOT.W, this.DOT.H);
		ctx.rect(this.NEG.X, this.NEG.Y, this.NEG.W, this.NEG.H);
		ctx.rect(this.ENT.X, this.ENT.Y, this.ENT.W, this.ENT.H);

		ctx.rect(this.LFT.X, this.LFT.Y, this.LFT.W, this.LFT.H);
		ctx.rect(this.RGT.X, this.RGT.Y, this.RGT.W, this.RGT.H);
		ctx.rect(this.UP.X, this.UP.Y, this.UP.W, this.UP.H);
		ctx.rect(this.DN.X, this.DN.Y, this.DN.W, this.DN.H);

		ctx.stroke();
	}
};

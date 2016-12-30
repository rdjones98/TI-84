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

	this.COL2_MIN=Math.round(.27*aWidth);
	this.COL2_MAX=Math.round(.41*aWidth);

	this.COL3_MIN=Math.round(.41*aWidth);
	this.COL3_MAX=Math.round(.54*aWidth);

	this.COL4_MIN=Math.round(.54*aWidth);
	this.COL4_MAX=Math.round(.6809*aWidth);

	this.COL5_MIN=Math.round(.6810*aWidth);
	this.COL5_MAX=Math.round(.8148*aWidth);

	this.ROW1_MIN=Math.round(.32*aHeight);
	this.ROW1_MAX=Math.round(.3831*aHeight);

	this.ROW2_MIN=Math.round(.41*aHeight);
	this.ROW2_MAX=Math.round(.47*aHeight);

	this.ROW3_MIN=Math.round(.47*aHeight);
	this.ROW3_MAX=Math.round(.5219*aHeight);

	this.ROW4_MIN=Math.round(.5220*aHeight);
	this.ROW4_MAX=Math.round(.57*aHeight);

	this.ROW5_MIN=Math.round(.57*aHeight);
	this.ROW5_MAX=Math.round(.62*aHeight);

	this.ROW6_MIN=Math.round(.62*aHeight);
	this.ROW6_MAX=Math.round(.675*aHeight);

	this.ROW7_MIN=Math.round(.675*aHeight);
	this.ROW7_MAX=Math.round(.74*aHeight);

	this.ROW8_MIN=Math.round(.74*aHeight);
	this.ROW8_MAX=Math.round(.805*aHeight);

	this.ROW9_MIN=Math.round(.805*aHeight);
	this.ROW9_MAX=Math.round(.8718*aHeight);

	this.ROW10_MIN=Math.round(.8719*aHeight);
	this.ROW10_MAX=Math.round(.9382*aHeight);

	this.ENTER_MIN=Math.round(.825*aHeight);
	this.ENTER_MAX=Math.round(.8974*aHeight);

	this.ARROWH = Math.round(.04*aHeight);
	this.ARROWW = Math.round(.055*aHeight);
	this.ARROWU_X = Math.round(.645*aWidth);
	this.ARROWU_Y = Math.round(.39*aHeight);
	this.ARROWD_X = this.ARROWU_X;
	this.ARROWD_Y = Math.round(.47*aHeight);
	this.ARROWL_X = Math.round(.54*aWidth);
	this.ARROWL_Y = Math.round(.435*aHeight);
	this.ARROWR_X = Math.round(.74*aWidth);
	this.ARROWR_Y = this.ARROWL_Y;

}

Keypad.A_LEFT  = "ArrowLeft";
Keypad.A_RIGHT = "ArrowRight";
Keypad.A_UP    = "ArrowUp";
Keypad.A_DOWN  = "ArrowDown";



Keypad.prototype.mouseClicked = function( evt )
{
	var x = evt.clientX;
	var y = evt.clientY;

	var secondPressed = false;
	try
	{
		if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
			this.rom.yEqualsPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW2_MIN  <= y && y <= this.ROW2_MAX )
		{	
			this.rom.secondPressed();
			secondPressed = true;
		}
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW5_MIN*.99 <= y && y <= this.ROW5_MAX*.98)
			this.rom.matrixPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW6_MIN*.98 <= y && y <= this.ROW6_MAX*.97)
			this.rom.xSquaredPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW7_MIN*.97 <= y && y <= this.ROW7_MAX*.96)
			this.rom.logPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW8_MIN*.96 <= y && y <= this.ROW8_MAX*.95)
			this.rom.lnPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW10_MIN*.95 <= y && y <= this.ROW10_MAX*.94)
			alert("Calculator is always on!");
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
			this.rom.windowPressed();
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW2_MIN <= y && y <= this.ROW2_MAX)
			this.rom.modePressed();
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW3_MIN <= y && y <= this.ROW3_MAX)
			this.rom.xPressed();
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW5_MIN <= y && y <= this.ROW5_MAX)
			this.rom.trigPressed("sin(");
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW7_MIN <= y && y <= this.ROW7_MAX)
			this.rom.numberPressed(7);
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW8_MIN <= y && y <= this.ROW8_MAX)
			this.rom.numberPressed(4);
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW9_MIN <= y && y <= this.ROW9_MAX)
			this.rom.numberPressed(1);
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW10_MIN <= y && y <= this.ROW10_MAX)
			this.rom.numberPressed(0);
		else if(this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
			this.rom.zoomPressed();
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW2_MIN <= y && y <= this.ROW2_MAX)
			this.rom.deletePressed();
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW3_MIN <= y && y <= this.ROW3_MAX)
			this.rom.statPressed();
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW5_MIN <= y && y <= this.ROW5_MAX)
			this.rom.trigPressed("cos(");
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW6_MIN <= y && y <= this.ROW6_MAX)
			this.rom.operatorPressed("(");
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW7_MIN <= y && y <= this.ROW7_MAX)
			this.rom.numberPressed(8);
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW8_MIN <= y && y <= this.ROW8_MAX)
			this.rom.numberPressed(5);
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW9_MIN <= y && y <= this.ROW9_MAX)
			this.rom.numberPressed(2);
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW10_MIN <= y && y <= this.ROW10_MAX)
			this.rom.numberPressed(".");
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
			this.rom.tracePressed();
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW5_MIN <= y && y <= this.ROW5_MAX)
			this.rom.trigPressed("tan(");
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW6_MIN <= y && y <= this.ROW6_MAX)
			this.rom.operatorPressed(")");
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW7_MIN <= y && y <= this.ROW7_MAX)
			this.rom.numberPressed(9);
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW8_MIN <= y && y <= this.ROW8_MAX)
			this.rom.numberPressed(6);
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW9_MIN <= y && y <= this.ROW9_MAX)
			this.rom.numberPressed(3);
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW10_MIN <= y && y <= this.ROW10_MAX)
			this.rom.negativePressed();
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
			this.rom.graphPressed();
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW4_MIN*.99 <= y && y <= this.ROW4_MAX*.99)
			this.rom.clearPressed();
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW5_MIN*.99  <= y && y <= this.ROW5_MAX*.98 )
			this.rom.powerOfPressed();
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW6_MIN*.98  <= y && y <= this.ROW6_MAX*.97 )
			this.rom.dividePressed();
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW7_MIN*.97  <= y && y <= this.ROW7_MAX*.96 )
			this.rom.operatorPressed("*");
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW8_MIN*.96 <= y && y <= this.ROW8_MAX*.95 )
			this.rom.operatorPressed("-");
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ENTER_MIN <= y && y <= this.ENTER_MAX)
			this.rom.enterPressed();
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW9_MIN*.95 <= y && y <= this.ROW9_MAX*.96)
			this.rom.operatorPressed("+");
		else if ( this.ARROWL_X <= x && x <= this.ARROWL_X + this.ARROWW && this.ARROWL_Y <= y && y <= this.ARROWL_Y + this.ARROWH)
			this.rom.arrowPressed(Keypad.A_LEFT);
		else if ( this.ARROWR_X <= x && x <= this.ARROWR_X + this.ARROWW && this.ARROWR_Y <= y && y <= this.ARROWR_Y + this.ARROWH)
			this.rom.arrowPressed(Keypad.A_RIGHT);
		else if ( this.ARROWU_X <= x && x <= this.ARROWU_X + this.ARROWW && this.ARROWU_Y <= y && y <= this.ARROWU_Y + this.ARROWH)
			this.rom.arrowPressed(Keypad.A_UP);
		else if ( this.ARROWD_X <= x && x <= this.ARROWD_X + this.ARROWW && this.ARROWD_Y <= y && y <= this.ARROWD_Y + this.ARROWH)
			this.rom.arrowPressed(Keypad.A_DOWN);
	}
	catch(err)
	{
		alert(err.stack);
	}
	

			// Display all click areas for each button
			// Must comment out clipDisplay is Canvas to use this
			var theCanvas = this.rom.getCanvas();
			var ctx = theCanvas.CONTEXT;

			ctx.strokeStyle = "red";

			ctx.rect(this.COL5_MIN,this.ENTER_MIN,this.COL5_MAX-this.COL5_MIN, this.ENTER_MAX-this.ENTER_MIN);

			ctx.rect(this.COL1_MIN,this.ROW1_MIN,this.COL5_MAX-this.COL5_MIN, this.ROW1_MAX-this.ROW1_MIN);
			ctx.rect(this.COL2_MIN,this.ROW2_MIN,this.COL3_MAX-this.COL2_MIN, this.ROW2_MAX-this.ROW2_MIN);
			ctx.rect(this.COL2_MIN,this.ROW3_MIN,this.COL3_MAX-this.COL2_MIN, this.ROW3_MAX-this.ROW3_MIN);
			ctx.rect(this.COL2_MIN,this.ROW4_MIN,this.COL4_MAX-this.COL2_MIN, this.ROW4_MAX-this.ROW4_MIN);
			ctx.rect(this.COL2_MIN,this.ROW5_MIN,this.COL4_MAX-this.COL2_MIN, this.ROW5_MAX-this.ROW5_MIN);
			ctx.rect(this.COL2_MIN,this.ROW6_MIN,this.COL4_MAX-this.COL2_MIN, this.ROW6_MAX-this.ROW6_MIN);
			ctx.rect(this.COL2_MIN,this.ROW7_MIN,this.COL4_MAX-this.COL2_MIN, this.ROW7_MAX-this.ROW7_MIN);
			ctx.rect(this.COL2_MIN,this.ROW8_MIN,this.COL4_MAX-this.COL2_MIN, this.ROW8_MAX-this.ROW8_MIN);
			ctx.rect(this.COL2_MIN,this.ROW9_MIN,this.COL4_MAX-this.COL2_MIN, this.ROW9_MAX-this.ROW9_MIN);
			ctx.rect(this.COL2_MIN,this.ROW10_MIN,this.COL4_MAX-this.COL2_MIN, this.ROW10_MAX-this.ROW10_MIN);

			ctx.rect(this.COL1_MIN,this.ROW1_MIN,this.COL1_MAX-this.COL1_MIN, this.ROW10_MAX-this.ROW1_MIN);
			ctx.rect(this.COL2_MIN,this.ROW1_MIN,this.COL2_MAX-this.COL2_MIN, this.ROW10_MAX-this.ROW1_MIN);
			ctx.rect(this.COL3_MIN,this.ROW1_MIN,this.COL3_MAX-this.COL3_MIN, this.ROW10_MAX-this.ROW1_MIN);
			ctx.rect(this.COL4_MIN,this.ROW4_MIN,this.COL4_MAX-this.COL4_MIN, this.ROW10_MAX-this.ROW1_MIN);
			ctx.rect(this.COL5_MIN,this.ROW4_MIN,this.COL5_MAX-this.COL5_MIN, this.ROW10_MAX-this.ROW1_MIN);

			// Draw Left Column
			ctx.rect(this.COL1_MIN,this.ROW2_MIN,this.COL1_MAX-this.COL1_MIN, this.ROW2_MAX-this.ROW2_MIN);
			ctx.rect(this.COL1_MIN,this.ROW3_MIN,this.COL1_MAX-this.COL1_MIN, this.ROW3_MAX-this.ROW3_MIN);
			ctx.rect(this.COL1_MIN,this.ROW4_MIN*.99,this.COL1_MAX-this.COL1_MIN, this.ROW4_MAX*.99-this.ROW4_MIN*.99);
			ctx.rect(this.COL1_MIN,this.ROW5_MIN*.99,this.COL1_MAX-this.COL1_MIN, this.ROW5_MAX*.98-this.ROW5_MIN*.99);
			ctx.rect(this.COL1_MIN,this.ROW6_MIN*.98,this.COL1_MAX-this.COL1_MIN, this.ROW6_MAX*.97-this.ROW6_MIN*.98);
			ctx.rect(this.COL1_MIN,this.ROW7_MIN*.97,this.COL1_MAX-this.COL1_MIN, this.ROW7_MAX*.96-this.ROW7_MIN*.97);
			ctx.rect(this.COL1_MIN,this.ROW8_MIN*.96,this.COL1_MAX-this.COL1_MIN, this.ROW8_MAX*.95-this.ROW8_MIN*.96);
			ctx.rect(this.COL1_MIN,this.ROW9_MIN*.95,this.COL1_MAX-this.COL1_MIN, this.ROW9_MAX*.96-this.ROW9_MIN*.97);
			ctx.rect(this.COL1_MIN,this.ROW10_MIN*.94,this.COL1_MAX-this.COL1_MIN, this.ROW10_MAX*.95-this.ROW10_MIN*.95);

			// Draw Right Column
//			ctx.rect(this.COL5_MIN,this.ROW2_MIN,this.COL5_MAX-this.COL5_MIN, this.ROW2_MAX-this.ROW2_MIN);
//			ctx.rect(this.COL5_MIN,this.ROW3_MIN,this.COL5_MAX-this.COL5_MIN, this.ROW3_MAX-this.ROW3_MIN);
			ctx.rect(this.COL5_MIN,this.ROW4_MIN*.99,this.COL5_MAX-this.COL5_MIN, this.ROW4_MAX*.99-this.ROW4_MIN*.99);
			ctx.rect(this.COL5_MIN,this.ROW5_MIN*.99,this.COL5_MAX-this.COL5_MIN, this.ROW5_MAX*.98-this.ROW5_MIN*.99);
			ctx.rect(this.COL5_MIN,this.ROW6_MIN*.98,this.COL5_MAX-this.COL5_MIN, this.ROW6_MAX*.97-this.ROW6_MIN*.98);
			ctx.rect(this.COL5_MIN,this.ROW7_MIN*.97,this.COL5_MAX-this.COL5_MIN, this.ROW7_MAX*.96-this.ROW7_MIN*.97);
			ctx.rect(this.COL5_MIN,this.ROW8_MIN*.96,this.COL5_MAX-this.COL5_MIN, this.ROW8_MAX*.95-this.ROW8_MIN*.96);
			ctx.rect(this.COL5_MIN,this.ROW9_MIN*.95,this.COL5_MAX-this.COL5_MIN, this.ROW9_MAX*.96-this.ROW9_MIN*.97);

			// Draw Arrows
			ctx.rect(this.ARROWU_X, this.ARROWU_Y,this.ARROWW, this.ARROWH);
			ctx.rect(this.ARROWD_X, this.ARROWD_Y,this.ARROWW, this.ARROWH);
			ctx.rect(this.ARROWL_X, this.ARROWL_Y,this.ARROWW, this.ARROWH);
			ctx.rect(this.ARROWR_X, this.ARROWR_Y,this.ARROWW, this.ARROWH);
			
			ctx.stroke();
};

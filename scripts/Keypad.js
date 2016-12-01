// class Keypad { constructor(aRom){}}
function Keypad( aRom, aWidth, aHeight )
{
		this.rom = aRom;
		aRom.setKeypad(this);

		aWidth = Number(aWidth);
		aHeight = Number(aHeight);
		this.W = aWidth;
		this.H = aHeight;

		this.NEGATIVE = String.fromCharCode(parseInt("02C9", 16));

		this.A_LEFT = "ArrowLeft";
		this.A_RIGHT = "ArrowRight";
		this.A_UP = "ArrowUp";
		this.A_DOWN = "ArrowDown";

		this.COL1_MIN=Math.round(.1595*aWidth);
    this.COL1_MAX=Math.round(.2934*aWidth);

    this.COL2_MIN=Math.round(.2935*aWidth);
    this.COL2_MAX=Math.round(.4200*aWidth);

    this.COL3_MIN=Math.round(.4201*aWidth);
    this.COL3_MAX=Math.round(.5480*aWidth);

    this.COL4_MIN=Math.round(.5481*aWidth);
    this.COL4_MAX=Math.round(.6809*aWidth);

    this.COL5_MIN=Math.round(.6810*aWidth);
    this.COL5_MAX=Math.round(.8148*aWidth);

		this.ARROWR_MIN=Math.round(.7579*aWidth);
		this.ARROWR_MAX=Math.round(.8416*aWidth);

		this.ARROWU_MIN=Math.round(.6717*aWidth);
		this.ARROWU_MAX=Math.round(.7579*aWidth);

    this.ROW1_MIN=Math.round(.33*aHeight);
    this.ROW1_MAX=Math.round(.3831*aHeight);

		this.ROW2_MIN=Math.round(.41*aHeight);
		this.ROW2_MAX=Math.round(.4751*aHeight);

		this.ROW3_MIN=Math.round(.4766*aHeight);
		this.ROW3_MAX=Math.round(.5219*aHeight);

		this.ROW4_MIN=Math.round(.5220*aHeight);
		this.ROW4_MAX=Math.round(.5714*aHeight);

		this.ROW5_MIN=Math.round(.5715*aHeight);
		this.ROW5_MAX=Math.round(.6214*aHeight);

		this.ROW6_MIN=Math.round(.6215*aHeight);
		this.ROW6_MAX=Math.round(.6712*aHeight);

		this.ROW7_MIN=Math.round(.6713*aHeight);
		this.ROW7_MAX=Math.round(.73*aHeight);

		this.ROW8_MIN=Math.round(.7301*aHeight);
		this.ROW8_MAX=Math.round(.79*aHeight);

		this.ROW9_MIN=Math.round(.7901*aHeight);
		this.ROW9_MAX=Math.round(.8718*aHeight);

		this.ROW10_MIN=Math.round(.8719*aHeight);
		this.ROW10_MAX=Math.round(.9382*aHeight);

		this.ON_MIN=Math.round(.8462*aHeight);
		this.ON_MAX=Math.round(.8793*aHeight);

		this.ENTER_MIN=Math.round(.830*aHeight);
		this.ENTER_MAX=Math.round(.8974*aHeight);

		this.ARROWUP_MIN=Math.round(.4024*aHeight);
		this.ARROWUP_MAX=Math.round(.4507*aHeight);

		this.ARROWDN_MIN=Math.round(.4735*aHeight);
		this.ARROWDN_MAX=Math.round(.5191*aHeight);
	}

  Keypad.prototype.mouseClicked = function( evt )
  {
    var x = evt.clientX;
    var y = evt.clientY;

		if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
      this.rom.yEqualsPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW2_MIN <= y && y <= this.ROW2_MAX)
      this.rom.secondPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW8_MIN <= y && y <= this.ROW8_MAX)
      this.rom.lnPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW7_MIN <= y && y <= this.ROW7_MAX)
      this.rom.logPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW5_MIN <= y && y <= this.ROW5_MAX)
		{
			if(this.rom.is2ndPressed())
				this.rom.matrixPressed();
			else
      	this.rom.operatorPressed("^" + this.NEGATIVE + "1");
		}
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW6_MIN <= y && y <= this.ROW6_MAX)
      this.rom.xSquaredPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ON_MIN <= y && y <= this.ON_MAX)
      alert("Calculator is always on!");
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
      this.rom.windowPressed();
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW10_MIN <= y && y <= this.ROW10_MAX)
      this.rom.numberPressed(0);
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW9_MIN <= y && y <= this.ROW9_MAX)
      this.rom.numberPressed(1);
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW8_MIN <= y && y <= this.ROW8_MAX)
      this.rom.numberPressed(4);
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW5_MIN <= y && y <= this.ROW5_MAX)
      this.rom.trigPressed("sin(");
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW3_MIN <= y && y <= this.ROW3_MAX)
      this.rom.xPressed();
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW7_MIN <= y && y <= this.ROW7_MAX)
      this.rom.numberPressed(7);
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW2_MIN <= y && y <= this.ROW2_MAX)
      this.rom.modePressed();
		else if(this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
      this.rom.zoomPressed();
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW3_MIN <= y && y <= this.ROW3_MAX)
			this.rom.statPressed();
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW10_MIN <= y && y <= this.ROW10_MAX)
      this.rom.numberPressed(".");
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW9_MIN <= y && y <= this.ROW9_MAX)
      this.rom.numberPressed(2);
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW8_MIN <= y && y <= this.ROW8_MAX)
      this.rom.numberPressed(5);
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW7_MIN <= y && y <= this.ROW7_MAX)
      this.rom.numberPressed(8);
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW6_MIN <= y && y <= this.ROW6_MAX)
      this.rom.operatorPressed("(");
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW5_MIN <= y && y <= this.ROW5_MAX)
      this.rom.trigPressed("cos(");
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW2_MIN <= y && y <= this.ROW2_MAX)
      this.rom.deletePressed();
    else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW10_MIN <= y && y <= this.ROW10_MAX)
      this.rom.negativePressed();
    else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW9_MIN <= y && y <= this.ROW9_MAX)
      this.rom.numberPressed(3);
    else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW8_MIN <= y && y <= this.ROW8_MAX)
      this.rom.numberPressed(6);
    else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW7_MIN <= y && y <= this.ROW7_MAX)
      this.rom.numberPressed(9);
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW6_MIN <= y && y <= this.ROW6_MAX)
			this.rom.operatorPressed(")");
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW5_MIN <= y && y <= this.ROW5_MAX)
      this.rom.trigPressed("tan(");
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
      this.rom.tracePressed();
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW8_MIN <= y && y <= this.ROW8_MAX )
      this.rom.operatorPressed("-");
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW7_MIN  <= y && y <= this.ROW7_MAX )
      this.rom.operatorPressed("*");
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW6_MIN  <= y && y <= this.ROW6_MAX )
      this.rom.dividePressed();
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW5_MIN  <= y && y <= this.ROW5_MAX )
      this.rom.powerOfPressed();
    else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ENTER_MIN <= y && y <= this.ENTER_MAX)
      this.rom.enterPressed();
    else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW9_MIN <= y && y <= this.ROW9_MAX)
      this.rom.operatorPressed("+");
    else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW4_MIN <= y && y <= this.ROW4_MAX)
      this.rom.clearPressed();
    else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
      this.rom.graphPressed();
		else if ( this.COL4_MIN <= x && x <= this.COL4_MAX && this.ROW2_MIN <= y && y <= this.ROW2_MAX)
			this.rom.arrowPressed(this.A_LEFT);
		else if ( this.ARROWR_MIN <= x && x <= this.ARROWR_MAX && this.ROW2_MIN <= y && y <= this.ROW2_MAX)
			this.rom.arrowPressed(this.A_RIGHT);
		else if ( this.ARROWU_MIN <= x && x <= this.ARROWU_MAX && this.ARROWUP_MIN  <= y && y <= this.ARROWUP_MAX )
			this.rom.arrowPressed(this.A_UP);
		else if ( this.ARROWU_MIN <= x && x <= this.ARROWU_MAX && this.ARROWDN_MIN <= y && y <= this.ARROWDN_MAX)
			this.rom.arrowPressed(this.A_DOWN);

/*
			// Must comment out clipDisplay is Canvas to use this
			var theCanvas = this.rom.getCanvas();
			var ctx = theCanvas.CONTEXT;

			ctx.strokeStyle = "red";

			ctx.rect(this.COL5_MIN,this.ENTER_MIN,this.COL5_MAX-this.COL5_MIN, this.ENTER_MAX-this.ENTER_MIN);

			ctx.rect(this.COL1_MIN,this.ROW1_MIN,this.COL5_MAX-this.COL1_MIN, this.ROW1_MAX-this.ROW1_MIN);
			ctx.rect(this.COL1_MIN,this.ROW2_MIN,this.COL5_MAX-this.COL1_MIN, this.ROW2_MAX-this.ROW2_MIN);
			ctx.rect(this.COL1_MIN,this.ROW3_MIN,this.COL5_MAX-this.COL1_MIN, this.ROW3_MAX-this.ROW3_MIN);
			ctx.rect(this.COL1_MIN,this.ROW4_MIN,this.COL5_MAX-this.COL1_MIN, this.ROW4_MAX-this.ROW4_MIN);
			ctx.rect(this.COL1_MIN,this.ROW5_MIN,this.COL5_MAX-this.COL1_MIN, this.ROW5_MAX-this.ROW5_MIN);
			ctx.rect(this.COL1_MIN,this.ROW6_MIN,this.COL5_MAX-this.COL1_MIN, this.ROW6_MAX-this.ROW6_MIN);
			ctx.rect(this.COL1_MIN,this.ROW7_MIN,this.COL5_MAX-this.COL1_MIN, this.ROW7_MAX-this.ROW7_MIN);
			ctx.rect(this.COL1_MIN,this.ROW8_MIN,this.COL5_MAX-this.COL1_MIN, this.ROW8_MAX-this.ROW8_MIN);
			ctx.rect(this.COL1_MIN,this.ROW9_MIN,this.COL5_MAX-this.COL1_MIN, this.ROW9_MAX-this.ROW9_MIN);
			ctx.rect(this.COL1_MIN,this.ROW10_MIN,this.COL5_MAX-this.COL1_MIN, this.ROW10_MAX-this.ROW10_MIN);

			ctx.rect(this.COL1_MIN,this.ROW1_MIN,this.COL1_MAX-this.COL1_MIN, this.ROW10_MAX-this.ROW1_MIN);
			ctx.rect(this.COL2_MIN,this.ROW1_MIN,this.COL2_MAX-this.COL2_MIN, this.ROW10_MAX-this.ROW1_MIN);
			ctx.rect(this.COL3_MIN,this.ROW1_MIN,this.COL3_MAX-this.COL3_MIN, this.ROW10_MAX-this.ROW1_MIN);
			ctx.rect(this.COL4_MIN,this.ROW1_MIN,this.COL4_MAX-this.COL4_MIN, this.ROW10_MAX-this.ROW1_MIN);
			ctx.rect(this.COL5_MIN,this.ROW1_MIN,this.COL5_MAX-this.COL5_MIN, this.ROW10_MAX-this.ROW1_MIN);

			ctx.stroke();
*/			
  };

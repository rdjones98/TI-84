class	Keypad
{
	constructor( aRom )
	{
		this.rom = aRom;
		aRom.setKeypad(this);

		this.NEGATIVE = String.fromCharCode(parseInt("02C9", 16));

		this.A_LEFT = "ArrowLeft";
		this.A_RIGHT = "ArrowRight";
		this.A_UP = "ArrowUp";
		this.A_DOWN = "ArrowDown";

		this.COL1_MIN=63;
    this.COL1_MAX=100;

    this.COL2_MIN=109;
    this.COL2_MAX=150;

    this.COL3_MIN=158;
    this.COL3_MAX=192;

    this.COL4_MIN=204;
    this.COL4_MAX=239;

    this.COL5_MIN=249;
    this.COL5_MAX=286;

    this.ROW1_MIN=233;
    this.ROW1_MAX=243;

		this.ROW2_MIN=285;
		this.ROW2_MAX=315;

		this.ROW5_MIN=383;
		this.ROW5_MAX=412;

		this.ROW6_MIN=420;
		this.ROW6_MAX=445;

		this.ROW7_MIN=456;
		this.ROW7_MAX=490;

		this.ROW8_MIN=500;
		this.ROW8_MAX=532;

		this.ROW9_MIN=545;
		this.ROW9_MAX=578;

		this.ROW10_MIN=588;
		this.ROW10_MAX=622;
	}

  mouseClicked( evt )
  {
    var x = evt.clientX;
    var y = evt.clientY;

		if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
      this.rom.yEqualsPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW2_MIN <= y && y <= this.ROW2_MAX)
      this.rom.secondPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && 485 <= y && y <= 509)
      this.rom.lnPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && 449 <= y && y <= 472)
      this.rom.logPressed();
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW5_MIN <= y && y <= this.ROW5_MAX)
      this.rom.operatorPressed("^" + this.NEGATIVE + "1");
		else if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW6_MIN <= y && y <= this.ROW6_MAX)
      this.rom.operatorPressed("^2");
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW10_MIN <= y && y <= this.ROW10_MAX)
      this.rom.numberPressed(0);
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW9_MIN <= y && y <= this.ROW9_MAX)
      this.rom.numberPressed(1);
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW8_MIN <= y && y <= this.ROW8_MAX)
      this.rom.numberPressed(4);
		else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW5_MIN <= y && y <= this.ROW5_MAX)
      this.rom.trigPressed("sin(");
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && 327 <= y && y <= 342)
      this.rom.xPressed();
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && this.ROW7_MIN <= y && y <= this.ROW7_MAX)
      this.rom.numberPressed(7);
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW10_MIN <= y && y <= this.ROW10_MAX)
      this.rom.numberPressed(".");
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW9_MIN <= y && y <= this.ROW9_MAX)
      this.rom.numberPressed(2);
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW8_MIN <= y && y <= this.ROW8_MAX)
      this.rom.numberPressed(5);
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && this.ROW7_MIN <= y && y <= this.ROW7_MAX)
      this.rom.numberPressed(8);
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && 427 <= y && y <= 444)
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
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && 427 <= y && y <= 444)
			this.rom.operatorPressed(")");
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW5_MIN <= y && y <= this.ROW5_MAX)
      this.rom.trigPressed("tan(");
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
      this.rom.tracePressed();
    else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && 527 <= y && y <= 536)
      this.rom.operatorPressed("+");
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && 486 <= y && y <= 503)
      this.rom.operatorPressed("-");
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && 453 <= y && y <= 469)
      this.rom.operatorPressed("*");
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && 418 <= y && y <= 434)
      this.rom.operatorPressed("/");
		else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && 384 <= y && y <= 403)
      this.rom.operatorPressed("^");
    else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && 552 <= y && y <= 590)
      this.rom.enterPressed();
    else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && 353 <= y && y <= 372)
      this.rom.clearPressed();
    else if( this.COL5_MIN <= x &&  x <= this.COL5_MAX  && 235 <= y && y <= 245)
      this.rom.graphPressed();
		else if ( 206 <= x && x <= 234 && 293 <= y && y <= 320)
			this.rom.arrowPressed(this.A_LEFT);
		else if ( 266 <= x && x <= 306 && 293 <= y && y <= 320)
			this.rom.arrowPressed(this.A_RIGHT);
		else if ( 235 <= x && x <= 263 && 269 <= y && y <= 303)
			this.rom.arrowPressed(this.A_UP);
		else if ( 235 <= x && x <= 263 && 315 <= y && y <= 344)
			this.rom.arrowPressed(this.A_DOWN);
    console.log("(" + x + ", " + y+")");
  }
}

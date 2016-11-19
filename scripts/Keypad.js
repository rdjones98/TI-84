class	Keypad
{
	constructor( aRom )
	{
		this.rom = aRom;
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
	}

  mouseClicked( evt )
  {
    var x = evt.clientX;
    var y = evt.clientY;

    if(this.COL1_MIN <= x &&  x <= this.COL1_MAX  && this.ROW1_MIN <= y && y <= this.ROW1_MAX)
      this.rom.yEqualsPressed();
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && 590 <= y && y <= 617)
      this.rom.numberPressed(0);
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && 547 <= y && y <= 572)
      this.rom.numberPressed(1);
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && 500 <= y && y <= 529)
      this.rom.numberPressed(4);
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && 327 <= y && y <= 342)
      this.rom.xPressed();
    else if(this.COL2_MIN <= x &&  x <= this.COL2_MAX  && 462 <= y && y <= 484)
      this.rom.numberPressed(7);
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && 594 <= y && y <= 621)
      this.rom.numberPressed(".");
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && 547 <= y && y <= 572)
      this.rom.numberPressed(2);
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && 503 <= y && y <= 531)
      this.rom.numberPressed(5);
    else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && 459 <= y && y <= 489)
      this.rom.numberPressed(8);
		else if( this.COL3_MIN <= x &&  x <= this.COL3_MAX  && 427 <= y && y <= 444)
      this.rom.operatorPressed("(");
    else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && 590 <= y && y <= 616)
      this.rom.negativePressed();
    else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && 546 <= y && y <= 573)
      this.rom.numberPressed(3);
    else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && 501 <= y && y <= 528)
      this.rom.numberPressed(6);
    else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && 463 <= y && y <= 484)
      this.rom.numberPressed(9);
		else if( this.COL4_MIN <= x &&  x <= this.COL4_MAX  && 427 <= y && y <= 444)
			this.rom.operatorPressed(")");
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
			this.rom.arrowPressed("left");
		else if ( 266 <= x && x <= 306 && 293 <= y && y <= 320)
			this.rom.arrowPressed("right");
		else if ( 235 <= x && x <= 263 && 269 <= y && y <= 303)
			this.rom.arrowPressed("up");
		else if ( 235 <= x && x <= 263 && 315 <= y && y <= 344)
			this.rom.arrowPressed("down");
    console.log("(" + x + ", " + y+")");
  }
}

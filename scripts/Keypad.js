class	Keypad
{
	constructor( aRom )
	{
		this.rom = aRom;
		this.COL1_MIN=63;
    this.COL1_MAX=100;

    this.ROW1_MIN=233;
    this.ROW1_MAX=243;
	}

  mouseClicked( evt )
  {
    var x = evt.clientX;
    var y = evt.clientY;

    if( this.COL1_MIN <= x && x <= this.COL1_MAX )
    {
      if( this.ROW_1_MIN <= y && y <= this.ROW_1_MAX )
      {
        alert("y=");
      }
    }
    else if( 109 <= x &&  x <= 145  && 547 <= y && y <= 572)
      this.rom.numberPressed(1);
    else if( 157 <= x &&  x <= 194  && 547 <= y && y <= 572)
      this.rom.numberPressed(2);
    else if( 250 <= x &&  x <= 281  && 527 <= y && y <= 536)
      this.rom.plusPressed();
    else if( 250 <= x &&  x <= 281  && 486 <= y && y <= 503)
      this.rom.minusPressed();
    else if( 250 <= x &&  x <= 281  && 552 <= y && y <= 590)
      this.rom.enterPressed();

//    alert("(" + x + ", " + y+")");
  }
}

//class	StateYEquals{	constructor(aCanvas, aRom)
function StateYEquals(aCanvas, aRom)
	{
		this.CANVAS = aCanvas;
		this.ROM = aRom;
    this._equations = new Array("","","","","","","");
		this._row = 0;
    this._col = 0;
		this.OFFSET = 4*this.CANVAS.DIGIT_W;
		this.TOP = this.CANVAS.Y + this.CANVAS.DIGIT_H;
  }

StateYEquals.prototype.insertOrAppend = function(aNum)
	{
		var equ = this._equations[this._row];
		if( this._col <= equ.length)
		{
			equ = equ.substring(0,this._col) + aNum + equ.substring(this._col+1);
			this._col = equ.length;
		}
		else
		{
			equ += aNum;
			this._col = equ.length;
		}
		this._equations[this._row] = equ;
		return equ;
	};

StateYEquals.prototype.clearPressed = function()
	{
		this._col = 0;
		this._equations[this._row]="";
		this.repaint();
	};

StateYEquals.prototype.numberPressed = function(aNum)
	{
		this.insertOrAppend(aNum);
	};

StateYEquals.prototype.xPressed = function()
	{
		this.insertOrAppend("X");
	};

StateYEquals.prototype.negativePressed = function()
	{
		this.insertOrAppend(this.CANVAS.NEGATIVE);
	};

StateYEquals.prototype.operatorPressed = function(anOper)
	{
		this.insertOrAppend(anOper);
	};

StateYEquals.prototype.yEqualsPressed = function()
	{
		this.repaint();
	};

StateYEquals.prototype.deletePressed = function()
	{
		var mathStr = this._equations[this._row];
		if( mathStr.length >= this._col)
		{
			mathStr = mathStr.substring(0, this._col) + mathStr.substring(this._col+1);
			this._equations[this._row] = mathStr;
		}
	};

StateYEquals.prototype.trigPressed = function(aTrigFunc)
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed();
			this.operatorPressed("a" + aTrigFunc);
		}
		else {
			this.operatorPressed(aTrigFunc);
		}
	};

StateYEquals.prototype.logPressed = function()
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed(false);
			this.numberPressed("1");
			this.numberPressed("0");
			this.operatorPressed("^");
		}
		else {
			this.operatorPressed("log(");
		}
	};

StateYEquals.prototype.lnPressed = function()
	{
		if (this.ROM.is2ndPressed() )
		{
			this.ROM.secondPressed(false);
			this.numberPressed("e");
			this.operatorPressed("^(");
		}
		else {
			this.operatorPressed("ln(");
		}
	};

StateYEquals.prototype.secondPressed = function()
	{
		// draw 2nd Button Pressed Icon
		if(this.ROM.is2ndPressed())
		{
			var x = this.CANVAS.X + this._col * this.CANVAS.DIGIT_W + this.OFFSET;
			var y = this.CANVAS.Y + (this._row+1) * this.CANVAS.DIGIT_H;
			this.CANVAS.draw2ndButton(x,y);
		}
		else
			this.repaint();
	};

StateYEquals.prototype.enterPressed = function()
	{
		this.arrowPressed(this.ROM.getKeypad().A_DOWN);
	};

StateYEquals.prototype.arrowPressed = function(anArrow)
	{
			if(anArrow == this.ROM.getKeypad().A_LEFT )
			{
				if( this._col == 0 )
					return;
				this._col --;
			}
			else if(anArrow == this.ROM.getKeypad().A_RIGHT )
			{
				if( this._col == this._equations[this._row].length )
					return;
				this._col ++;
			}
			else if(anArrow == this.ROM.getKeypad().A_UP )
			{
				if( this._row == 0 )
					return;
				this._row --;
				this._col = 0;
			}
			else if(anArrow == this.ROM.getKeypad().A_DOWN )
			{
				if( this._row == this._equations.length-1 )
					return;
				this._row ++;
				this._col = 0;
			}
	};

StateYEquals.prototype.getEquations = function()
	{
		return this._equations;
	};

StateYEquals.prototype.repaint = function()
		{
			this.CANVAS.clearCanvas();

			//draw focus appropriately before anything else so text will be on top
			this.CANVAS.drawFocusBox(this.CANVAS.X + this.OFFSET + this._col*this.CANVAS.DIGIT_W, this.TOP+this._row*this.CANVAS.DIGIT_H);

			var x = this.CANVAS.X;
			var y = this.CANVAS.Y;
			y +=  this.CANVAS.DIGIT_H;
			this.CANVAS.print("  Plot1 Plot2 Plot3", x, y,this.CANVAS.SMALL_FONT);
			for( var i=0; i<7; i++)
			{
				y +=  this.CANVAS.DIGIT_H;
				this.CANVAS.print("\\", x, y, null, this.CANVAS.GRAPHCOLORS[i]);
				this.CANVAS.print("Y" + (i+1) + "=" + this._equations[i], x+this.CANVAS.DIGIT_W, y);
			}

			if(this.ROM.is2ndPressed())
			{
				var x = this.CANVAS.X + this._col * this.CANVAS.DIGIT_W + this.OFFSET;
				var y = this.CANVAS.Y + (this._row+1) * this.CANVAS.DIGIT_H;
				this.CANVAS.draw2ndButton(x,y);
			}

		};

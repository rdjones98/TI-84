//class StateStat{  constructor(aCanvas, aRom)
function StateStat(aCanvas, aRom)
{
	this.CANVAS = aCanvas;
	this.ROM = aRom;

	this.T_ROW1 = aCanvas.Y + this.CANVAS.DIGIT_H-5;
	this.C1 = this.CANVAS.X;
	this.C2 = this.CANVAS.X + 5*this.CANVAS.DIGIT_W  ;
	this.C3 = this.CANVAS.X + 10*this.CANVAS.DIGIT_W;
	this._col = 1;
	this._C2row = 5;
	this.A = "";
	this.B = "";
	this.C = "";
}

StateStat.prototype.numberPressed = function(aNum)
{
	if(this._col == 1 && aNum == 1)
		this.enterPressed();
	else if( this._col == 2 && (aNum == 4 || aNum == 5))
	{
		this._C2row = Number(aNum)+1;
		this.enterPressed();
	}
};

StateStat.prototype.enterPressed = function()
{
	if( this._col == 1)
		this.ROM.setStatEditState();
	else {
		// Get the X and Y coordinates and build a
		// coordinate array for the Regression Engine
		var x = this.ROM.getStatEditState().getXVals();
		var y = this.ROM.getStatEditState().getYVals();
		if( x.length != y.length )
		{
			alert("L1 and L2 are not the same size");
			return;
		}
		else {
			var data = new Array();
			for( var i=0; i<x.length; i++)
			{
				if( x[i].length > 0 )
				{
					var coord = new Array( Number(x[i]), Number(y[i]) );
					data.push(coord);
				}
			}
			if( this._C2row == 5) {
				var res = regression('linear', data).string;
				this.A = res.substring(4, res.indexOf("x"));
				this.B = res.substring(res.lastIndexOf(" ")+1);
			}
			else if ( this._C2row == 6 )
			{
				var res = regression('polynomial', data,2).string;
				this.A = res.substring(4, res.indexOf("x"));
				this.B = res.substring(res.indexOf(" + ")+3, res.lastIndexOf("x" ));
				this.C = res.substring(res.lastIndexOf(" ")+1);
			}
		}
	}
};

StateStat.prototype.arrowPressed = function(anArrow)
{
	if(anArrow == Keypad.A_LEFT )
	{
		if( this._col == 1 )
			this._col = 2;
		else
			this._col --;
	}
	if(anArrow == Keypad.A_RIGHT )
	{
		if( this._col == 2)
			this._col = 1;
		else
			this._col ++;
	}
	if( (anArrow == Keypad.A_UP || anArrow == Keypad.A_DOWN)  && this._col == 2)
	{
		if( this._C2row == 5 )
			this._C2row =6;
		else
			this._C2row = 5;
	}
};

StateStat.prototype.repaint = function()
{
	this.CANVAS.clearCanvas();

	if( this.A!="")
	{
		if( this._C2row == 5)
			this.paintLinearResult();
		else if ( this._C2row == 6)
			this.paintQuadraticResults();
		return;
	}

	if( this._col == 1)
	{
		this.CANVAS.drawFocusBox(this.C1, this.CANVAS.Y, 4*this.CANVAS.DIGIT_W);
		this.CANVAS.drawFocusBox(this.C1, this.CANVAS.Y+this.CANVAS.DIGIT_H);
		this.CANVAS.print("1:Edit", this.C1,  this.CANVAS.Y + this.CANVAS.DIGIT_H*2 );
		this.CANVAS.print("2:SortA(", this.C1,  this.CANVAS.Y + this.CANVAS.DIGIT_H*3, this.CANVAS.FONT, "gray" );
		this.CANVAS.print("3:SortD(", this.C1,  this.CANVAS.Y + this.CANVAS.DIGIT_H*4, this.CANVAS.FONT, "gray" );
		this.CANVAS.print("4:ClrList", this.C1,  this.CANVAS.Y + this.CANVAS.DIGIT_H*5, this.CANVAS.FONT, "gray" );
		this.CANVAS.print("5:SetUpEditor", this.C1,  this.CANVAS.Y + this.CANVAS.DIGIT_H*6, this.CANVAS.FONT, "gray" );
	}
	else if( this._col == 2)
	{
		this.CANVAS.drawFocusBox(this.C2, this.CANVAS.Y, 4*this.CANVAS.DIGIT_W);
		this.CANVAS.drawFocusBox(this.C1, this.CANVAS.Y+this.CANVAS.DIGIT_H*(this._C2row-1));
		this.CANVAS.print("1:1-Var Stats", this.C1,  this.CANVAS.Y + this.CANVAS.DIGIT_H*2, this.CANVAS.FONT, "gray" );
		this.CANVAS.print("2:2-Var Stats", this.C1,  this.CANVAS.Y + this.CANVAS.DIGIT_H*3, this.CANVAS.FONT, "gray" );
		this.CANVAS.print("3:Med-Med",     this.C1,  this.CANVAS.Y + this.CANVAS.DIGIT_H*4, this.CANVAS.FONT, "gray" );
		this.CANVAS.print("4:LinReg(ax+b)", this.C1,  this.CANVAS.Y + this.CANVAS.DIGIT_H*5 );
		this.CANVAS.print("5:QuadReg",     this.C1,  this.CANVAS.Y + this.CANVAS.DIGIT_H*6 );
	}
	this.CANVAS.print("EDIT CALC TESTS",  this.C1, this.CANVAS.Y + this.CANVAS.DIGIT_H );

	if(this.ROM.is2ndPressed())
		this.CANVAS.draw2ndButton();
};

StateStat.prototype.paintLinearResult = function()
{
	this.CANVAS.clearCanvas();
	this.CANVAS.drawFocusBox(this.C2+10 , this.T_ROW1-this.CANVAS.DIGIT_H, 6*this.CANVAS.DIGIT_W);
	this.CANVAS.print("LinReg", this.C2+10,  this.T_ROW1  );
	this.CANVAS.print(" y=ax+b", this.C1,  this.T_ROW1+this.CANVAS.DIGIT_H  );
	this.CANVAS.print(" a="+this.CANVAS.formatNumber(this.A,12), this.C1,  this.T_ROW1+this.CANVAS.DIGIT_H * 2 );
	this.CANVAS.print(" b="+this.CANVAS.formatNumber(this.B,12), this.C1,  this.T_ROW1+this.CANVAS.DIGIT_H * 3 );
	this.A="";
	this.B="";
	this.C="";
};

StateStat.prototype.paintQuadraticResults = function()
{
	this.CANVAS.clearCanvas();
	this.CANVAS.drawFocusBox(this.C2, this.T_ROW1-this.CANVAS.DIGIT_H, 7*this.CANVAS.DIGIT_W);
	this.CANVAS.print("QuadReg", this.C2,  this.T_ROW1  );
	this.CANVAS.print(" y=ax^2+bx+c", this.C1,  this.T_ROW1+this.CANVAS.DIGIT_H , this.CANVAS.FONT  );
	this.CANVAS.print(" a="+this.A, this.C1,  this.T_ROW1+this.CANVAS.DIGIT_H * 2 , this.CANVAS.FONT );
	this.CANVAS.print(" b="+this.B, this.C1,  this.T_ROW1+this.CANVAS.DIGIT_H * 3 , this.CANVAS.FONT  );
	this.CANVAS.print(" c="+this.C, this.C1,  this.T_ROW1+this.CANVAS.DIGIT_H * 4 , this.CANVAS.FONT  );
	this.A="";
	this.B="";
	this.C="";
};

StateStat.prototype.statPressed = function()
{
	this.repaint();
};

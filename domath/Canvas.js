
//class	Canvas{constructor(aCanvas) {}}
function Canvas(aCanvas, aWidth, aHeight)
{
  aWidth = Number(aWidth);
  aHeight = Number(aHeight);
	this.CONTEXT = aCanvas.getContext("2d");
	this.X = Math.round(.19*aWidth);
	this.Y = Math.round(.095*aHeight);
	this.HEIGHT = Math.round(.302*aHeight) ;
	this.WIDTH  = Math.round(.7692 * aWidth);
	this.DIGIT_W = Math.round(.029 * aWidth);
	this.DIGIT_H = Math.round(.0241 * aHeight);

	this.FONT = Math.round(.048 * aWidth) + "px Courier";
	this.SUPER_FONT = Math.round((.048 * aWidth)*4.0/5.0) + "px Courier";
  this.SUPER_OFFSET = Math.round(this.DIGIT_H/2.0);
	this.SMALL_FONT = Math.round(.04 * aWidth) + "px Courier";
  this.CONTEXT.font = this.FONT;

  this.NEGATIVE = String.fromCharCode(parseInt("02C9", 16));
  this.SQRROOT  = String.fromCharCode(parseInt("221A", 16));
  this.PI       = String.fromCharCode(parseInt("03C0", 16));

  this.GRAPHCOLORS = new Array("blue", "red", "yellow", "green", "pink", "orange", "black");

  this.clipDisplay();
}

Canvas.prototype.clipDisplay = function()
{
    this.CONTEXT.strokeStyle = "gray";
    this.CONTEXT.rect(this.X,this.Y,this.WIDTH-this.X,this.HEIGHT-this.Y);

    this.CONTEXT.stroke();
    this.CONTEXT.clip();
    this.CONTEXT.strokeStyle = "black";
};

Canvas.prototype.clearCanvas = function()
  	{
      this.CONTEXT.font =  this.FONT;
  		this.CONTEXT.clearRect(this.X-10,this.Y-10,this.WIDTH,this.HEIGHT);
  	};

Canvas.prototype.drawLeftBound = function(anX)
    {
      this.CONTEXT.beginPath();
      this.CONTEXT.moveTo(anX-5,this.Y+this.DIGIT_H);
      this.CONTEXT.lineTo(anX,this.Y+this.DIGIT_H+5)  ;
      this.CONTEXT.lineTo(anX-5,this.Y+this.DIGIT_H+10);
      this.CONTEXT.fill();
    };

Canvas.prototype.drawRightBound = function(anX)
    {
      this.CONTEXT.beginPath();
      this.CONTEXT.moveTo(anX+5,this.Y+this.DIGIT_H);
      this.CONTEXT.lineTo(anX,this.Y+this.DIGIT_H+5)  ;
      this.CONTEXT.lineTo(anX+5,this.Y+this.DIGIT_H+10);
      this.CONTEXT.fill();
    };

Canvas.prototype.drawFocusBox = function(anX, aY, aWidth, isSuper)
  	{
  		if( typeof anX == "undefined")
  			anX= this.X;
  		if( typeof aY == "undefined")
  			aY = this.Y;
      if( typeof aWidth == "undefined" || aWidth == null )
        aWidth = this.DIGIT_W;
      if( typeof isSuper == "undefined")
        isSuper = false;

  		this.CONTEXT.fillStyle = "gray";
      if( isSuper )
  		  this.CONTEXT.fillRect(anX,aY,aWidth,this.DIGIT_H/2);
      else
  		  this.CONTEXT.fillRect(anX,aY+2,aWidth,this.DIGIT_H);
  		this.CONTEXT.fillStyle = "black";
  	};

Canvas.prototype.draw2ndButton = function(x, y)
    {
      if( typeof x == "undefined")
        x=this.WIDTH-this.DIGIT_W;;
      if( typeof y == "undefined")
        y=this.Y;

      this.CONTEXT.fillStyle = "gray";
      this.CONTEXT.fillRect(x,y,this.DIGIT_W,this.DIGIT_H);
      this.CONTEXT.beginPath();
      this.CONTEXT.moveTo(x + this.DIGIT_W/2, y + 4);
      this.CONTEXT.lineTo(x + this.DIGIT_W/2, y + this.DIGIT_H);
      this.CONTEXT.stroke();
      this.CONTEXT.moveTo(x, y + 10);
      this.CONTEXT.lineTo(x + this.DIGIT_W/2, y + 4);
      this.CONTEXT.lineTo(x + this.DIGIT_W, y + 10);
      this.CONTEXT.stroke();
      this.CONTEXT.fillStyle = "black";
    };

Canvas.prototype.formatNumber = function(aNbr, aLen)
    {
  		if( typeof aLen == "undefined")
  			aLen = 9;
      var str = aNbr.toString();
      var idx = str.indexOf(".");
      if( str.indexOf("e-") > idx )
        return "0";

      if( idx>-1 && str.indexOf("e+") > idx)
      {
			    var trunc = aNbr.toString().split("e+");
          return trunc[0].substring(0,aLen-2) + "e" + trunc[1];
      }

      for( var i=0; i<str.length; i++)
        if(str.charAt(i) != '.' && str.charAt(i) != '-' && ( str.charAt(i) < '0' || str.charAt(i)>'9') )
          return str;

			if( str.length <= aLen )
			{
				if( idx < 0 )
					return str;	// no decimals

					if( str.substring(idx).length <= 8)
						return str;	// no repeating decimals
			}

      var roundTo = (aLen - idx)-1;
      if(idx > -1 && roundTo > 0)
        aNbr = Math.round(aNbr * Math.pow(10,roundTo))/Math.pow(10,roundTo);

			var trunc = aNbr.toString().split(".");
      if(trunc.length !=2 && trunc[0].length <= aLen)
        return aNbr;
			if(trunc[0].length > aLen )
			{
				return trunc[0].charAt(0) + "." + trunc[0].substring(1,aLen-3) + "E" + (trunc[0].length - 1);
			}

			var lastZero = aLen;
			for(; lastZero > 0 ; lastZero -- )
				if( trunc[1].indexOf[lastZero] != 0)
					break;

			var res = (trunc[0] + "." + trunc[1].substring(0,lastZero)).substring(0,aLen);
      if(res.charAt(res.length-1) == "." )
			   res = (trunc[0] + "." + trunc[1].substring(0,lastZero)).substring(0,aLen+1);
      return res;
    };

Canvas.prototype.print = function(aStr, anX, aY, aFont, aColor, anAlignment)
    {

  		if( typeof aFont == "undefined")
  			aFont = this.FONT;
  		if( typeof aColor != "undefined")
  			this.CONTEXT.fillStyle = aColor;
  		if( typeof anAlignment != "undefined")
  			this.CONTEXT.textAlign = anAlignment;


      if( typeof aStr == "string" )
      {
        this.CONTEXT.font = aFont;
        this.CONTEXT.fillText(aStr, anX, aY);
      }
      else
      {
        for(var i=0; i<aStr.length; i++)
        {
          var c = aStr[i];
          this.CONTEXT.font = c.isSuper() ? this.SUPER_FONT : aFont;

          this.CONTEXT.fillText(c.getVal(), anX + i*this.DIGIT_W, aY - (c.isSuper() ? this.SUPER_OFFSET : 0 ));
        }
      }
      this.CONTEXT.font = this.FONT;
      this.CONTEXT.fillStyle = "black";
      this.CONTEXT.textAlign = "left";
    };

Canvas.prototype.drawLn = function(x1, y1, x2, y2, aColor)
    {
  		if( typeof aColor != "undefined")
  			this.CONTEXT.strokeStyle = aColor;
			this.CONTEXT.beginPath();
			this.CONTEXT.moveTo(x1,y1);
			this.CONTEXT.lineTo(x2,y2);
			this.CONTEXT.stroke();
      this.CONTEXT.strokeStyle   = "black";
    };

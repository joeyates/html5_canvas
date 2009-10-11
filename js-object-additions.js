// Depends on primitives.js
Array.prototype.each = function(fn) {
  for(var i = 0; i < this.length; i++) {
    fn(i, this[i]);
  };
};

Array.prototype.collect = function(fn) {
  var a = [];
  for(var i = 0; i < this.length; i++) {
    a.push(fn(i, this[i]));
  };
  return a;
};

Array.prototype.inject = function(memo, fn) {
  for(var i = 0; i < this.length; i++) {
    memo = fn(memo, i, this[i]);
  };
  return memo;
};

MouseEvent.prototype.position = function() {
  return p(this.pageX, this.pageY);
}

MouseEvent.prototype.targetPosition = function() {
  var pos = this.position();

  var elm = this.target;
  while(elm.offsetParent) {
    pos.x -= elm.offsetLeft;
    pos.y -= elm.offsetTop ;
    elm = elm.offsetParent;
  }

  return pos;
}

CanvasRenderingContext2D.prototype.translation = p(0, 0);

// There is no getTranslation method for canvas
// Use setTranslation(), if you want to have access to the current translation
CanvasRenderingContext2D.prototype.setTranslation = function(pos) {
  this.translation = pos.clone();
  this.translate(pos.x, pos.y);
};

// Clear the canvas, but maintain translation
CanvasRenderingContext2D.prototype.clear = function() {
  var pos = this.translation.clone();
  this.canvas.width = this.canvas.width;
  this.setTranslation(pos);
};

CanvasRenderingContext2D.prototype.drawText = function(pos, s, sFont, sColour) {
  this.font = sFont;
  this.fillStyle = sColour;
  this.beginPath();
  this.fillText(s, pos.x, pos.y);
  this.closePath();
  this.fill();
};

CanvasRenderingContext2D.prototype.fillRectangle = function(rct, sColour) {
  this.fillStyle = sColour;
  this.beginPath();
  this.moveTo(rct.left, rct.top);
  this.lineTo(rct.left, rct.bottom);
  this.lineTo(rct.right, rct.bottom);
  this.lineTo(rct.right, rct.top);
  this.closePath();
  this.fill();
};

CanvasRenderingContext2D.prototype.strokeRectangle = function(rct, sColour) {
  this.strokeStyle = sColour;
  this.beginPath();
  this.moveTo(rct.left, rct.top);
  this.lineTo(rct.left, rct.bottom);
  this.lineTo(rct.right, rct.bottom);
  this.lineTo(rct.right, rct.top);
  this.closePath();
  this.stroke();
};

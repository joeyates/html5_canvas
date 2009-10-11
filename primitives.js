var Size = function(width, height) {
  this.width = width;
  this.height = height;
};
var Position = function(x, y) {
  this.x = x;
  this.y = y;

  this.clone = function() {
    return p(this.x, this.y);
  };

  this.translate = function(pos) {
    return p(this.x - pos.x, this.y - pos.y);
  };

  this.isIn = function(rct) {
    if(this.x < rct.left || this.x > rct.right)
      return false;
    if(this.y < rct.top || this.y > rct.bottom)
      return false;
    return true;
  };
};
var Rectangle = function(top, right, bottom, left) {
  this.top = top;
  this.right = right;
  this.bottom = bottom;
  this.left = left;
 
  this.size = function() {
    return s(this.right - this.left, this.bottom - this.top);
  };
};

// Helpers for constructors
function s(width, height) {
  return new Size(width, height);
};
function p(x, y) {
  return new Position(x, y);
};
function r(top, right, bottom, left) {
  return new Rectangle(top, right, bottom, left);
};

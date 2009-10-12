// Depends on primitives, js-object-additions
Canvas.MenuItem = function(text, fn) {
  this.text = text;
  this.fn = fn;
};

Canvas.ContextMenu = function(ctx, items, options) {
  // Private variables
  var self = this;
  var rct = null;

  var sFont = options.font;
  var sColor = options.color; // text colour
  var bAutomatic = !!options.automatic; // Link the context menu into the canvas' events. Default: false

  var width = 120; // TODO: setting, or calculate from widest element
  var border = 2;
  var textHeight = 12; // TODO: calculate this.
  var itemHeight = textHeight + 4;
  var oldmousedown = null;

  // Public attributes
  this.items = items;

  var itemAt = function(pos) {
    for(var i = 0; i < self.items.length; i++) {
      var itm = self.items[i];
      if(pos.isIn(itm.rct))
        return itm;
    }

    return null;
  };

  // In order to erase the menu: Save the canvas image before showing the menu, and restore it afterwards
  var imd = null;
  var save = function() {
    imd = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  };
  var restore = function() {
    if(imd == null)
      return;
    ctx.putImageData(imd, 0, 0);
  };

  this.show = function(evt) {
    save();
    if(bAutomatic)
      ctx.canvas.onclick = self.onclick;
    var pos = evt.targetPosition().translate(ctx.translation);
    var height = self.items.length * itemHeight + border * 2;
    rct = r(pos.y - border, pos.x + width, pos.y + height, pos.x - border);
    ctx.fillStyle = '#f6f6f6'; // TODO: setting
    ctx.fillRect(rct.left, rct.top, rct.right - rct.left, rct.bottom - rct.top);
    ctx.strokeStyle = 'black'; // TODO: setting
    ctx.strokeRect(rct.left, rct.top, rct.right - rct.left, rct.bottom - rct.top);

    self.items.each(function(i, itm) {
      ctx.drawText(pos.translate(p(-border, -border - i * itemHeight - textHeight)), itm.text, sFont, sColor);
      itm.rct = r(pos.y + i * itemHeight, pos.x + width + border, pos.y + (i + 1) * itemHeight, pos.x + border);
    });
    return false;
  };
  if(bAutomatic)
    ctx.canvas.oncontextmenu = this.show;
  else // Stop the default context menu from appearing
    ctx.canvas.oncontextmenu = function() { return false; };

  this.hide = function() {
    rct = null;
    restore();
    if(options.onhide)
      options.onhide();
  };

  this.onclick = function(evt) {
    if(rct == null)
      return false;

    var pos = evt.targetPosition().translate(ctx.translation);
    var bHit = pos.isIn(rct);
    self.hide();
    if(!bHit)
      return false;

    return self.activateItemAt(pos);
  };

  this.activateItemAt = function(pos) {
    var itm = itemAt(pos);
    if(itm == null)
      return false;
    itm.fn();
    return true;
  };
};

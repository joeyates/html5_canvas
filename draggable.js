// Depends on primitives, js-object-additions
Canvas.Draggable = function(ctx, options) {
  var self = this;

  var posPreDragOffset = null;
  var posDragOrigin = null;
  // Restore events on mouseup
  var originalMouseMove = null;
  var originalMouseUp = null;

  var mousemove = function(evt) {
    if(posDragOrigin == null)
      return true;
    var nNewX = posPreDragOffset.x + evt.clientX - posDragOrigin.x;
    var nNewY = posPreDragOffset.y + evt.clientY - posDragOrigin.y;
    ctx.setTranslation(p(nNewX, nNewY));
    if(options.onmousemove)
      options.onmousemove();
    return true;
  };

  var mouseup = function(evt) {
    posDragOrigin = null;
    posPreDragOffset = null;
    ctx.canvas.onmousemove = originalMouseMove;
    ctx.canvas.onmouseup = originalMouseUp;
    return true;
  };

  this.capture = function(evt) {
    posDragOrigin = p(evt.clientX, evt.clientY);
    posPreDragOffset = ctx.translation.clone();
    originalMouseMove = ctx.canvas.onmousemove;
    originalMouseUp = ctx.canvas.onmouseup;
    ctx.canvas.onmousemove = mousemove;
    ctx.canvas.onmouseup = mouseup;
  };
};

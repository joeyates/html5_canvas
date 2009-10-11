// Depends on primitives, js-object-additions
Canvas.Draggable = function(ctx, options) {
  var posPreDragOfset = null;
  var posDragOrigin = null;

  var self = this;

  var mousemove = function(evt) {
    if(posDragOrigin == null)
      return true;
    var nNewX = posPreDragOfset.x + evt.clientX - posDragOrigin.x;
    var nNewY = posPreDragOfset.y + evt.clientY - posDragOrigin.y;
    ctx.setTranslation(p(nNewX, nNewY));
    if(options.onmousemove)
      options.onmousemove();
    return true;
  };

  var mouseup = function(evt) {
    posDragOrigin = null;
    posPreDragOfset = null;
    ctx.canvas.onmousemove = null;
    ctx.canvas.onmouseup = null;
    return true;
  };

  this.capture = function(evt) {
    posDragOrigin = p(evt.clientX, evt.clientY);
    posPreDragOfset = ctx.translation.clone();
    ctx.canvas.onmousemove = mousemove;
    ctx.canvas.onmouseup = mouseup;
  };
};

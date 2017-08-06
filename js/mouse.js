"use strict";
var Mouse = {};
Mouse.x   = 0;
Mouse.y   = 0;
Mouse.gX  = 0;
Mouse.gY  = 0;

Mouse.updatePos = function(e) {
  var rect = Game.canvas.getBoundingClientRect();
  Mouse.x  = Math.floor(e.clientX - rect.left) + Camera.oX;
  Mouse.y  = Math.floor(e.clientY - rect.top) + Camera.oY;
  Mouse.gX = Game.pxToGrid(Mouse.x);
  Mouse.gY = Game.pxToGrid(Mouse.y);
};

Mouse.onLeftClick = function() {
  Player.setPath({x:Mouse.gX,y:Mouse.gY});
}
Mouse.onRightClick = function() {
  for(var i = 0; i < Game.mobs.length; ++i) {
    if(Mouse.gX === Game.mobs[i].x && Mouse.gY === Game.mobs[i].y){
      Player.target = Game.mobs[i];
    }
  }
}
// mouse events
window.addEventListener('mousemove',function(e) {
  Mouse.updatePos(e);
},false);

window.addEventListener('click',function(e) {
  Mouse.updatePos(e);
  Mouse.onLeftClick();
},false);

window.addEventListener('contextmenu',function(e) {
  e.preventDefault();
  Mouse.updatePos(e);
  Mouse.onRightClick();
},false);
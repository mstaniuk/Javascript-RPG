(function(){
  "use strict";
  function Teleport(sx, sy, ex, ey, m) {
    this.sx = sx;
    this.sy = sy;

    this.ex = ex;
    this.ey = ey;

    this.map = m;

  }

  Teleport.prototype.update = function() {
    if(Player.x === this.sx && Player.y === this.sy) {
      this.tp(Player);
    }
  }

  Teleport.prototype.draw = function() {
    Game.ctx.fillStyle = "rgba(0,255,0,.2)";
    Game.ctx.fillRect(this.sx*32, this.sy*32, 32, 32);
  }

  Teleport.prototype.tp = function(obj) {
    if(this.map === Game.map.name) {
      obj.moveTo(this.ex, this.ey);
      return true;
    } else {
      Game.map.current.change(this.map);
      obj.moveTo(this.ex, this.ey);
    }
  }

  window.Teleport = Teleport;
})();


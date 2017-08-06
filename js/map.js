(function(){
  "use strict";

  var Maps = {};

  Maps.house  = '{"width":21,"height":22,"bg":"img/maps/house1l0.png","fg":"","obstacles":[[0,0,21,4],[6,4,2,4],[0,4,1,5],[0,9,13,7],[0,16,1,6],[0,21,21,1],[0,21,21,1],[16,13,4,6],[16,4,5,6],[20,10,1,12],[1,4,1,3],[4,4,1,3],[8,4,2,1],[13,4,3,1],[11,4,1,1],[11,16,1,1],[3,16,2,4]],"objects":[]}';

  Maps.big1   = '{"width":100,"height":100,"bg":"img/maps/big1l0.png","fg":"img/maps/big1l1.png","obstacles":[],"objects":[]}';

  Maps.cave1  = '{"width":64,"height":64,"bg":"img/maps/cave1l0.png","fg":"img/maps/cave1l1.png","obstacles":[[0,0,64,4],[0,4,2,2],[2,4,1,1],[7,4,2,1],[11,4,4,1],[11,4,40,1],[53,4,2,6],[55,4,9,5],[13,5,14,2],[27,5,12,1],[0,6,1,2],[29,6,7,1],[41,6,3,1],[45,6,2,2],[49,6,4,4],[13,7,2,1],[19,7,6,2],[25,7,1,1],[30,7,6,1],[42,7,2,1],[46,9,1,1],[47,7,2,3],[0,8,2,2],[30,8,7,2],[42,8,5,1],[57,9,7,1],[0,10,3,14],[8,10,3,1],[30,10,8,1],[51,10,3,1],[55,10,1,1],[58,10,6,2],[3,11,9,6],[29,11,11,1],[48,11,3,1],[28,12,15,1],[59,12,5,1],[12,13,8,2],[25,13,19,2],[60,13,4,1],[44,14,1,1],[61,14,3,1],[12,15,7,6],[26,15,19,6],[58,15,6,49],[45,16,2,5],[53,16,5,5],[4,17,2,1],[7,17,1,1],[11,17,1,4],[47,17,1,2],[50,17,1,3],[51,17,2,4],[57,21,1,1],[0,24,54,5],[57,24,1,7],[0,29,14,2],[14,29,11,1],[27,29,4,1],[36,29,18,1],[19,30,3,1],[29,30,1,1],[39,30,15,1],[0,31,13,1],[42,31,12,1],[0,32,15,4],[27,32,5,1],[44,32,10,1],[21,33,12,3],[46,33,8,1],[33,34,1,2],[48,34,6,1],[57,34,1,7],[34,35,1,1],[50,35,3,2],[0,36,14,1],[22,36,15,1],[53,36,1,2],[0,37,12,27],[12,37,1,1],[12,37,1,1],[14,37,3,2],[23,37,18,1],[51,37,2,2],[24,38,18,1],[26,39,17,1],[51,39,3,6],[25,40,19,1],[12,41,1,23],[25,41,5,3],[30,41,17,1],[50,41,1,5],[30,42,1,1],[34,42,10,1],[44,42,3,3],[32,43,1,1],[35,43,9,1],[13,44,1,20],[40,44,4,1],[57,44,1,20],[14,45,1,19],[15,45,2,14],[41,45,3,1],[44,45,2,7],[17,46,3,13],[39,46,1,1],[39,46,1,1],[20,48,1,11],[46,48,11,4],[34,50,3,2],[21,51,4,8],[39,51,1,1],[25,52,1,7],[48,52,9,1],[26,53,1,6],[49,53,8,1],[27,54,6,5],[48,54,9,10],[33,55,1,6],[41,55,3,1],[34,56,1,5],[47,56,1,8],[35,57,7,4],[46,58,1,6],[28,59,5,1],[42,59,1,2],[45,59,1,3],[32,60,1,1],[20,61,2,2]],"objects":[]}';

  Maps.cave2  = '{"width":32,"height":25,"bg":"img/maps/cave2l0.png","fg":"img/maps/cave2l1.png","obstacles":[],"objects":[]}';

  Maps.drawBg = function() {
    Game.ctx.drawImage(
      resources.get(this.bg),
      Camera.oX,
      Camera.oY,
      Game.canvas.width,
      Game.canvas.height,
      0,
      0,
      Game.canvas.width,
      Game.canvas.height
    );
  }

  Maps.drawFg = function() {
    if(this.fg === "blank.png"){
      return;
    }

    //TEMP: Set 4x4 rect to opacity 0.5
    //2LAME and COMPLICATED
    var dist    = 64;
    var height2 = Math.floor((Game.canvas.height/2));
    var width2 = Math.floor((Game.canvas.width/2));

    // draw top part
    var sx = Camera.oX,
        sy = Camera.oY,
        sw = Game.canvas.width,
        sh = height2 - dist,
        dx = 0,
        dy = 0;

    Game.ctx.drawImage(resources.get(this.fg),sx,sy,sw,sh,dx,dy,sw,sh);

    // draw bottom part
        sx = Camera.oX,
        sy = Camera.oY + height2 + dist,
        sw = Game.canvas.width,
        sh = height2 + dist,
        dx = 0,
        dy = height2 + dist;

    Game.ctx.drawImage(resources.get(this.fg),sx,sy,sw,sh,dx,dy,sw,sh);

    // draw left part
        sx = Camera.oX,
        sy = Camera.oY,
        sw = width2 - dist+16,
        sh = Game.canvas.height,
        dx = 0,
        dy = 0;

    Game.ctx.drawImage(resources.get(this.fg),sx,sy,sw,sh,dx,dy,sw,sh);

    // draw right part
        sx = Camera.oX + width2 + dist +16,
        sy = Camera.oY,
        sw = width2 + dist + 16,
        sh = Game.canvas.height,
        dx = width2 + dist +16,
        dy = 0;

    Game.ctx.drawImage(resources.get(this.fg),sx,sy,sw,sh,dx,dy,sw,sh);


    // draw vision part
        sx = Camera.oX - dist + (Math.floor(Game.canvas.width / 2)) +16,
        sy = Camera.oY - dist + (Math.floor(Game.canvas.height / 2)),
        sw = dist*2,
        sh = dist*2,
        dx = width2 - dist + 16,
        dy = height2 - dist;

    Game.ctx.globalAlpha = 0.7 ;
    Game.ctx.drawImage(resources.get(this.fg),sx,sy,sw,sh,dx,dy,sw,sh);
    Game.ctx.globalAlpha = 1;



    //ctx.drawImage(resources.get(this.fg),Camera.oX,Camera.oY,Game.canvas.width,Game.canvas.height,0,0,Game.canvas.width,Game.canvas.height);
  }

  //Maps.h =  JSON.stringify(Maps.house);

  Maps.change = function(name) {
      //Maps.save(map.name);
      Game.map.name    = name;
      Game.map.current = Maps.getMap(Game.map.name);
      Game.mobs        = [];
      Game.explosions  = [];
      Game.teleports   = [];
      Game.grid        = new Grid(Game.map.current.width,Game.map.current.height,Game.map.current.obstacles);
      this.name        = name;
    }

  Maps.getMap = function(name) {
    var map       = JSON.parse(Maps[name]);
    map.change    = this.change;
    map.drawBg    = this.drawBg;
    map.drawFg    = this.drawFg;
    
    return map;
  }
  window.Maps = Maps;
})();
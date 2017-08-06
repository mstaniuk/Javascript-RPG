(function(){
  "use strict";
  window.requestAnimFrame = (function(w) { return  w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || function( callback ){ w.setTimeout(callback, 1000 / 60); }; })(window);

  window.Game = {
    // temp helper
    pxToGrid : function(x) {
      var X = Math.floor(x/32);
      return X;
    },

    /*
    * Globals
    */

    //timestamps
    lastTime  : null,
    gameTime  : null,
    dt        : null,

    // Map
    map      : null,

    // canvas
    canvas   : null,
    ctx      : null,

    // grid
    grid     : null,

    // Objects
    mobs        : [],
    explosions  : [],
    teleports   : [],
    particles   : [],
    hud         : [],

    /*
    * MAIN GAME FUNCTION
    */


    main : function() {

        var now = Date.now();
          // delta time
        this.dt  = (now - this.lastTime) / 1000.0;
          // Update objects
        this.update();
          // render objects
        this.render();
          // Current time
        this.lastTime = now;
        
          // temporary this reference
        var that = this;
        window.requestAnimFrame(function() { that.main();});
    },


    /*
    * UPDATE GAME
    */

    updateEntities : function(list) {
      for(var i = 0; i < list.length; ++i) {
        list[i].update();

        if(list[i].done || list[i].dead) {
          list.splice(i,1);
        }

      }
    },

    update : function() { 
        // Update dame time
      this.gameTime  += this.dt;
        // handle kayboard input
      Keyboard.handleInput();
        // update mobs
      this.updateEntities(this.mobs);
        // update explosions
      this.updateEntities(this.explosions);
        // update particles
      this.updateEntities(this.particles);
        // update teleports
      this.updateEntities(this.teleports);
        // update sptes
      Player.sprite.update();
        // update player
      Player.update();
        // check teleports
    },

    

    /*
    * RENDER
    */

    render: function() {
      var ctx     = this.ctx,
          canvas  = this.canvas;

        // draw background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.map.current.drawBg();

      ctx.save();

      ctx.translate(-Camera.oX, -Camera.oY);
      
      // TEMP: FOR MAP MAKING 
      // SHOW UNWALKABLE TILES
      // ctx.beginPath();

      //   ctx.fillStyle = "rgba(255,0,0,.2)";

      //   for(var i = Math.floor(Camera.oX / 32); i <= Math.floor((Camera.oX + canvas.width)/32); ++i) {
      //     for(var j = Math.floor(Camera.oY / 32); j <= Math.floor((Camera.oY + canvas.height)/32); ++j) {
      //       if(!this.grid.isInside(i, j)) {
      //         continue;
      //       }

      //       if(!this.grid.isWalkableAt(i, j)) {
      //         ctx.rect(i*32, j*32, 32, 32);
      //       }

      //     }
      //   }
      //   ctx.fill();
      // END TEMP

      if(Player.target !== null) {  
        ctx.fillStyle = "rgba(255,0,0,.2)";
        var targetX = Player.target.x*32;
        var targetY = Player.target.y*32;

        ctx.beginPath();
        ctx.strokeStyle = "RGBA(255,0,0,.5)";
        ctx.rect(targetX,targetY, 32, 32);
        ctx.stroke();
      }

      this.drawEntities(this.mobs);
      this.drawEntities(this.teleports);

      Player.draw();

      this.drawEntities(this.explosions);
      this.drawEntities(this.particles);
      ctx.restore();
      
      this.map.current.drawFg();

      this.drawEntities(this.hud);
      // TEMP: Debug console
        this.ctx.font = '15px Arial';
        this.ctx.fillStyle = "#ff0000";
        this.ctx.fillText("Time: "+Utils.roundTo(this.gameTime,2), 5, 20);
        this.ctx.fillText("FPS: "+parseInt(1/this.dt), 5, 40);
        var objectsCount = this.mobs.length+this.explosions.length+this.teleports.length+this.hud.length;
        this.ctx.fillText("Objects: "+objectsCount, 5, 60);
      //END TEMP

    },

    drawEntities : function(list) {
      for(var i = 0; i < list.length; ++i) {
        list[i].draw();
      }
    },

    /*
    * INITIALIZE GAME
    */
    init : function() {

      this.map = {};
      this.map.name       = "cave1";
      this.map.current    = Maps.getMap(this.map.name);
      
      this.grid           = new Grid(this.map.current.width,this.map.current.height,this.map.current.obstacles);

      this.canvas         = document.createElement("canvas");
      this.canvas.width   = Settings.Canvas.width;
      this.canvas.height  = Settings.Canvas.height;

      this.ctx            = this.canvas.getContext("2d");

      Player.x            = 10;
      Player.y            = 4;


      this.hud.push(Panels.main);

      this.teleports.push(new Teleport(16,60,8,5,"cave2"));
      var mob = new Mob(43,10);
      mob.target = Player;
      this.mobs.push(mob);


      Camera.centerOn(Player.x,Player.y);




      document.body.appendChild(this.canvas);

      this.lastTime = Date.now();

      this.main();
    },
  };
})();

/*
* RESOURCES
*/
resources.load([
    'img/player.png',
    'img/panda.png',
    'img/hit.png',
    'img/hit1.png',
    'img/maps/big1l0.png',
    'img/maps/big1l1.png',
    'img/maps/cave1l0.png',
    'img/maps/cave1l1.png',
    'img/maps/cave2l0.png',
    'img/maps/cave2l1.png',
]);


document.addEventListener("DOMContentLoaded", function(e) {
  resources.onReady(function(){
    Game.init();
  });
});



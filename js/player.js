(function(){
  "use strict";

  var Player            = new Mob(0,0);
      Player.name       = "Grindzior";
      Player.path       = [];
      Player.speed      = 10;

      Player.target     = null;

      Player.hp         = 100;
      Player.maxHp      = 100;
      Player.heal       = function(type, heal) {
        if(type = '%') {
          Player.hp += heal*maxHp;
        } else {
          Player.hp += heal;
        }
      }

      Player.dmg        = 20;
      Player.lastTarget = 0;

      Player.sprite     = new Sprite('img/player.png',[0,0], [0,0], [32,64], 2*Player.speed, [1,2,3,4,5,6,7], false);


  Player.update = function() {
    this.move();
    this.lastAtk  += this.atkSpeed * Game.dt;
    this.lastStep += this.speed* Game.dt;
    this.lastTarget += 2 * Game.dt;

    if(Player.hp > Player.maxHp) Player.hp = Player.maxHp;
    if(Player.mp > Player.maxMp) Player.mp = Player.maxMp;
    if(Player.hp < 0) Player.hp = 0;
    if(Player.mp < 0) Player.mp = 0;

    if(typeof(Player.target) !== 'undefined' && Player.target !== null && !Player.target.dead){
      this.attack(this.target);  
    } else {
      this.target = null;
    }
    
  };

  Player.move = function() {
    if(!this.canMove()) {
      return;
    }

    if(this.path.length === 0) {
      Player.walking = false;
      return;
    }

    if(!Game.grid.isWalkableAt(this.path[0].x,this.path[0].y)) {
      this.setPath({x: this.path[this.path.length-1].x, y: this.path[this.path.length-1].y});
      return;
    }

    var dx = this.path[0].x - this.x,
        dy = this.path[0].y - this.y;

    if(dx < -1 || dx > 1 || dy < -1 || dy > 1) {
      this.path = [];
      return;
    }

    this.walking = true;

    this.setDir(dx,dy);

    this.x = this.path[0].x;
    this.y = this.path[0].y;

    this.path.splice(0,1);

    this.lastStep = 0;

    // Center camera at this after every move
    if(Settings.CameraAutocenter) {
      Camera.centerOn(this.x, this.y);
    }
  }

  Player.moveTo = function(x,y) {
    this.x        = x;
    this.y        = y;
    this.lastStep = 0;

    if(Settings.CameraAutocenter) {
      Camera.centerOn(this.x, this.y);
    }
  }

  Player.moveBy = function(dx,dy) {
    if(!this.canMove()) {
      return false;
    }

    this.path = [];

    var nx = this.x + dx,
        ny = this.y + dy;

    if(!Game.grid.isInside(nx, ny)) {
      return false;
    }

    if(!Game.grid.isWalkableAt(nx, ny)) {
      return false;
    }

    this.path.push({x:nx,y:ny});

    this.setDir(dx,dy);

    return true;
  };
  

  Player.setPath = function(node) {
    if(Math.abs(this.x - node.x) + Math.abs(this.y - node.y) > 30) {
      return;
    }
    var node = new Astar(this,node);
    this.path = node.getPath();
  }

  Player.draw = function() {
    switch(Player.dir) {
      case 'n': this.sprite.pos = [0,0];    break;
      case 'w': this.sprite.pos = [0,64];   break;
      case 's': this.sprite.pos = [0,128];  break;
      case 'e': this.sprite.pos = [0,192];  break;
    }

    if(this.walking) {
      this.sprite.frames = [1,2,3,4,5,6,7];
    } else {
      this.sprite.frames = [0];
    }

    // draw hp bar background
    Game.ctx.fillStyle = "rgba(0,0,0,.3)";
    Game.ctx.fillRect(this.x*32-1, this.y*32-32, Game.grid.nodeWidth+2, 4);

    // draw current hp bar
    Game.ctx.fillStyle = "rgba(255,0,0,8)";
    if(!this.dead){
      Game.ctx.fillRect(this.x*32, this.y*32-32+1, this.getHpProc()*Game.grid.nodeWidth, 2);
    }

    // draw sprite
    Game.ctx.save();
    Game.ctx.translate(this.x*32, this.y*32-32);
    this.sprite.draw();
    Game.ctx.restore();
    
  }


  // Players Inventory
  Player.inventory            = {};
    // quick access bar
    // array item is array: 0 is item id, 1: is quantity
    // Max capacity = 6
    Player.inventory.quick    = new Array(6);
    // backpack
    // array item is array: 0 is item id, 1: is quantity
    // Max capacity = 30
    Player.inventory.bakcpack = new Array(30);
    // equiped items
    // array item is id of item
    // array[0]: head, array[1]: body, array[2]: legs
    // array[3]: feet, array[4]: left hand, array[5]: right hand
    Player.inventory.equiped  = new Array(6);


  window.Player = Player;
})();
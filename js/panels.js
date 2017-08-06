(function(){  
  var main = {
    x: 0,
    y: Settings.Canvas.height-30,
    w: Settings.Canvas.width,
    h: 31,

    slots: [0,0,0,0,0],

    draw: function(){
    var ctx = Game.ctx;

      // draw background
      ctx.beginPath();
      ctx.fillStyle = "RGBA(0,0,0,.7)";
      ctx.strokeStyle = "RGBA(0,0,0,.9)";
      ctx.lineWidth = 1;
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.fill();
      ctx.stroke();

      // hp/mp background
      ctx.beginPath();
      ctx.fillStyle = "RGBA(0,0,0,.7)";
      ctx.strokeStyle = "RGBA(0,0,0,.9)";
      ctx.lineWidth = 1;
      ctx.rect(this.x + 10, this.y + 3, 150, 10);
      ctx.fill();
      ctx.stroke();

      // hp bar
      if(Player.hp >= 0) {
        ctx.beginPath();
        ctx.fillStyle = "#D50000";
        ctx.fillRect(this.x+10, this.y+3, (Player.hp/Player.maxHp)*150, 10);
      }

      var text = Player.hp+"/"+Player.maxHp;
      var sX = this.x+10+75;
      var sY = this.y+12;
      ctx.font = '11px Arial';
      ctx.fillStyle = "#ffffff";
      var mesure = Game.ctx.measureText(text);
      ctx.fillText(text, sX - (mesure.width/2), sY);

    },
  }

  window.Panels = {
    main: main,
  }
})();
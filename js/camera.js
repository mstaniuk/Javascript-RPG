(function() {
  "use strict";
  var Camera = {
    oX: 0, // offset X
    oY: 0  // offset Y
  };


  Camera.offsetBy = function(x, y) {
    Camera.oX += (x * Game.grid.nodeWidth);
    Camera.oY += (y * Game.grid.nodeWidth);
  }

  Camera.centerOn = function(x, y) {
    Camera.oX = ((x * Game.grid.nodeWidth) - (Math.floor(Game.canvas.width / 2)));
    Camera.oY = ((y * Game.grid.nodeWidth) - (Math.floor(Game.canvas.height / 2)));
  }

  window.Camera = Camera;
})();
"use strict";
var Keyboard = {};
Keyboard.handleInput = function() {
  // Camera movamant
  if(input.isDown('W')) {
    Camera.offsetBy(0, -1);
  }

  if(input.isDown('S')) {
    Camera.offsetBy(0, 1);
  }

  if(input.isDown('A')) {
    Camera.offsetBy(-1, 0);
  }

  if(input.isDown('D')) {
    Camera.offsetBy(1, 0);
  }

  // Player movamant

  // Diagonal
  if(input.isDown('UP') && input.isDown('LEFT')) {
    if(Player.moveBy(-1, -1)) {
      return;
    }
  }

  if(input.isDown('UP') && input.isDown('RIGHT')) {
    if(Player.moveBy(1, -1)) {
     return; 
    }
  }

  if(input.isDown('DOWN') && input.isDown('LEFT')) {
    if(Player.moveBy(-1, 1)) {
      return;
    }
  }

  if(input.isDown('DOWN') && input.isDown('RIGHT')) {
    if(Player.moveBy(1, 1)) {
      return;
    }
  }

  // Straight
  if(input.isDown('UP')) {
    if(Player.moveBy(0, -1)) {
      return;
    }
  }

  if(input.isDown('DOWN')) {
    if(Player.moveBy(0, 1)) {
      return;
    }
  }

  if(input.isDown('LEFT')) {
    if(Player.moveBy(-1,0)) {
      return;
    }
  }

  if(input.isDown('RIGHT')) {
    if(Player.moveBy(1, 0)) {
      return;
    }
  }

  if(input.isDown('SPACE')) {
    // Player.autoTarget();
  }

}
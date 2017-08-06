"use strict";
function Node(x,y,walkable,speed){
  this.x;
  this.y;
  this.width = 32;
  this.walkable = walkable || true;   // is it an obstacle
  this.speed = speed || 1;            // Walk speed in fraction 
  this.neighbors = [];
}

Node.prototype.isWalkable = function() {
  return this.walkable;
}

"use strict";
function Bline(x0, y0, x1, y1, diagonal){
  this.start = [x0,y0];
  this.end = [x1,y1];
  this.diagonal = (diagonal === undefined) ? true : diagonal;
  this.path = this.search();
}

Bline.prototype.search = function() {
  var path = [];

  var x0 = this.start[0];
  var y0 = this.start[1];

  var dx  =  Math.abs(this.end[0] - this.start[0]);
  var dy  = -Math.abs(this.end[1] - this.start[1]);

  var sx  = this.start[0] < this.end[0] ? 1 : -1;
  var sy  = this.start[1] < this.end[1] ? 1 : -1;

  var err = dx+dy;  

  while (true) {
    path.push([x0,y0]);

    if(x0 === this.end[0] && y0 === this.end[1]) {
      return path;
    }
    var moved = false;
    var e2 = 2*err;

    if (e2 > dy) {
      err += dy;
      x0  += sx;
      moved = true;
    }

    if(!(!this.diagonal && moved) && e2 < dx) {
      err += dx;
      y0  += sy;
    }
  }

};
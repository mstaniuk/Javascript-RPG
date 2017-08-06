;(function() {
  "use strict";

  function roundTo(num, place) {
    return Math.round(num * Math.pow(10, place)) / Math.pow(10, place);
  }

  function randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function dist2(p1, p2) {
    return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y-p2.y);
  }

  function dist2XY(p1x, p1y, p2x, p2y) {
    return (p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y);
  }

  function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x -p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
  }

  function distXY(p1x, p1y, p2x, p2y) {
    return Math.sqrt((p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y));
  }

  function distPointLine(p, a, b) { 
    var PA  = {x:p.x-a.x, y:p.y-a.y};
    var PB  = {x:b.x-a.x, y:b.y-a.y};
    var dot = PA.x*PB.x+PA.y*PB.y;
    
    var len_sq  = Math.pow(PB.x,2)+Math.pow(PB.y,2);
    var param   = -1;
    if (len_sq != 0)
      param = dot / len_sq;
    if (param < 0)
      return Math.sqrt(Math.pow(p.x-a.x,2) + Math.pow(p.y - a.y, 2));
    else if (param > 1)
      return Math.sqrt(Math.pow(p.x-b.x,2) + Math.pow(p.y - b.y, 2));
    var xx = a.x + param * PB.x;
    var yy = a.y + param * PB.y;
    return Math.sqrt(Math.pow(p.x-xx,2) + Math.pow(p.y - yy, 2));
  }

  window.Utils = {
    roundTo       : roundTo,
    randomRange   : randomRange,
    randomInt     : randomInt,
    dist2         : dist2,
    dist2XY       : dist2XY,
    dist          : dist,
    distXY        : distXY,
    distPointLine : distPointLine
  };
})();
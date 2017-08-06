/* Some js addons */

// Array helpers
Array.prototype.last = function() {
  return this[this.length-1];
};

Array.prototype.first = function() {
  return this[0];
};

Array.prototype.swap = function(a, b) {
  var tmp = this[a];
  this[a] = this[b];
  this[b] = tmp;
  return this;
};

Array.prototype.isEmpty = function(){
  if(this.length < 1) return true;
  return false;
};
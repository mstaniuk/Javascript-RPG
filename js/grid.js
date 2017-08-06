"use strict";
function Grid(width,height,unwalkable){
  this.width = width;
  this.height = height;
  this.nodeWidth = 32; // node width/height in px
  this.widthPx = width * this.nodeWidth; // grid width in px
  this.heightPx = height * this.nodeWidth; // grid height in px
  this.nodes = this.buildNodes();
  this.unwalkable = this.setWalkableByArray(unwalkable);
  
};

Grid.prototype.buildNodes = function(){
  var nodes = new Array(this.width);

  for(var i = 0; i < this.width; ++i){
    nodes[i] = new Array(this.height);
    for(var j=0; j < this.height; ++j){
      nodes[i][j] = new Node(i,j);
      //neighbors straight
      if(this.isInside(i+1,j)){
        nodes[i][j].neighbors.push({x:i+1,y:j,d:false});
      }
      if(this.isInside(i,j+1)){
        nodes[i][j].neighbors.push({x:i,y:j+1,d:false});
      }
      if(this.isInside(i-1,j)){
        nodes[i][j].neighbors.push({x:i-1,y:j,d:false});
      }
      if(this.isInside(i,j-1)){
        nodes[i][j].neighbors.push({x:i,y:j-1,d:false});
      }
      //neighbors diagonal
      if(this.isInside(i+1,j+1)){
        nodes[i][j].neighbors.push({x:i+1,y:j+1,d:true});
      }
      if(this.isInside(i-1,j+1)){
        nodes[i][j].neighbors.push({x:i-1,y:j+1,d:true});
      }
      if(this.isInside(i-1,j-1)){
        nodes[i][j].neighbors.push({x:i-1,y:j-1,d:true});
      }
      if(this.isInside(i+1,j-1)){
        nodes[i][j].neighbors.push({x:i+1,y:j-1,d:true});
      }
    }
  }
  return nodes;
};

Grid.prototype.setWalkableByArray = function(array){
  if(!array) return [];
  for(var k = 0; k < array.length; ++k){
    var item = array[k];

    for(var i = 0; i < item[2]; ++i ){
      for(var j = 0; j < item[3]; ++j ){
        this.setWalkableAt(item[0]+i, item[1]+j,false);
      } 
    }
  }
};

Grid.prototype.reset = function(){
  this.nodes = this.buildNodes();
};

Grid.prototype.getNodeAt = function(x,y) {
  return this.nodes[x][y];
};

Grid.prototype.getNeighborsOf = function(x,y,all) {
  var a = (typeof(all) === 'undefined')? 'all' : all;
  // return all
  if(a === 'all') { 
    return this.getNodeAt(x,y).neighbors;
  }
  // return straight only
  if(a === 'straight') {
    return this.getNodeAt(x,y).neighbors.slice(0,4);
  }
  // return diagonal only
  if(a === 'diagonal') {
    return this.getNodeAt(x,y).neighbors.slice(4);
  }
  return false;
};

Grid.prototype.getWalkableNeighborsOf = function(x,y,all) {
  var a = (typeof(all) === 'undefined')? 'all' : all;

  var wNeighbors = [],
      neighbors = this.getNeighborsOf(x,y,a);

  for(var i = 0; i<neighbors.length; ++i){
    if(this.isWalkableAt(neighbors[i].x,neighbors[i].y)){
      wNeighbors.push(neighbors[i]);
    }
  }
  return wNeighbors;
};

Grid.prototype.isNeighborOf = function(x,y,nx,ny) {

  if(x === nx && y === ny) {
        return false;
  }

  var dx = Math.abs(x - nx),
      dy = Math.abs(y - ny);

  if(dx <= 1 && dy <= 1) {
    return true;
  }

  return false;
      
}

Grid.prototype.isWalkableAt = function(x,y) {
  return this.nodes[x][y].walkable;
};

Grid.prototype.setWalkableAt = function(x,y,w) {
  return this.nodes[x][y].walkable = w;
};

Grid.prototype.setGraphicAt = function(x,y,g) {
  return this.nodes[x][y].setGraphic(g);
};

Grid.prototype.isInside = function(x,y) {
  return (x>=0 && x<this.width) && (y>=0 && y<this.height);
};

Grid.prototype.getMatrix = function(){
  var matrix =  new Array(this.width);
  for(var i = 0; i < this.width; ++i){
    matrix[i] =  new Array(this.height);
    for(var j=0; j < this.height; ++j){
      matrix[i][j] = !this.isWalkableAt(i,j);
    }
  }
  return matrix;
};
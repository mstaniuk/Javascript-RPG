(function() {
  "use strict";
  function Astar(from, to){
    this.startNode = {x:from.x, y:from.y, p:null, g:0, h:0, f:0}; // create start node 
    this.endNode = {x:to.x, y:to.y, p:null, g:0, h:0, f:0};       // create start node 
    this.openList = new Heap();                                   // Open list as heap
    this.openList.push(this.startNode);
    this.closeList = [];                                          // Close list as array
  };

  Astar.prototype.createNode = function(x,y,p,d) {
    var node    = {};                 // node object
    node.p      = p;                  // node parent
    node.x      = x;                  // node x
    node.y      = y;                  // node y
    node.g      = (d === true) ? 12 : 10;// move cost
    node.g     += node.p.g;           // add parents move cost
    node.h      = (Math.abs(node.x - this.endNode.x) + Math.abs(node.y - this.endNode.y)) * 10; // heuristic 
    node.f      = node.g + node.h;      // cost
    return node;
  }

  Astar.prototype.inScope = function(x, y) {
    if(Game.grid.isInside(x, y) && Game.grid.isWalkableAt(x, y)) {
      return true;
    }

    return false;
  }

  Astar.prototype.isClosed = function(node) {
    if(this.closeList[node.x + ':' + node.y] === true) {
      return true;
    }

    return false;
  }

  Astar.prototype.swithOpen = function(node) {
    // get heap as array
    var openArray = this.openList.toArray();

    for(var i = 0; i < this.openList.getLength(); i++) {
      if(!((openArray[i].x === node.x) && (openArray[i].y === node.y))) {
        continue;
      }

      if(openArray[i].f > node.f) {
        this.openList.replace(i,node);
      }

      return true;
    }

    return false;
  }

  Astar.prototype.search = function() {

    if((this.startNode.x === this.endNode.x) && (this.startNode.y === this.endNode.y)) {
      return null;
    }

    if(!this.inScope(this.endNode.x, this.endNode.y)) {
      return null;
    }

    while(!this.openList.isEmpty()) {
      
      // Path can't be too long
      if(this.closeList.length > 100) {
        return null;
      }
      
      // get best from open list 
      var node = this.openList.get();
      this.openList.shift();

      // check if node is end node
      if((this.endNode.x === node.x) && (this.endNode.y === node.y)) {
        return node;
      }

      // Add nodes coords to close list
      this.closeList[node.x + ":" + node.y] = true;
      this.closeList.length++;

      //get walkable neighbors of node
      var neighbors = Game.grid.getWalkableNeighborsOf(node.x,node.y);

      // loop walkable through neighbors
      for(var i = 0; i < neighbors.length; ++i) {

        // set neighbors element as neighbor
        var neighbor = neighbors[i];

        // make child node from neighbor
        var cNode = this.createNode(neighbor.x,neighbor.y,node,neighbor.d);

        // check if cNode is in closed list
        if(this.isClosed(cNode)) { 
          continue;
        }

        // check if child node is in open list and swith if better
        if(this.swithOpen(cNode)) {
          continue;
        }

        //push to open list
        this.openList.push(cNode);
      }
    }
    
    return null;
  }

  Astar.prototype.getPath = function() {
    var d = Date.now();
    var node = this.search();
    var path = [];
    console.log(Date.now() - d);
    if(node === null) return path;

    while(node.p !== null) {
      path.unshift({x:node.x, y:node.y});
      node = node.p;
    } 

    return path;
  }

  window.Astar = Astar;
})();
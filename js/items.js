(function(){

  /*
    * In object-creating functions:
    * name : name of the object
    * dmg/arm : demage / armom of the object
    * aSpeed : atack speed in %
    * mSpeed : movemant speed in %
    * cost : base cost of the item in gold(?)
    * icon : array witx x and y - position on items sprite sheet of item icon
  */

  function sword(name, dmg, aSpeed, mSpeed, cost, icon) {
    return {
      type      : "sword",
      name      : name,
      dmg       : dmg,
      aSpeed    : aSpeed,
      mSpeed    : mSpeed,
      cost      : cost
    };
  }

  function head(name, arm, mSpeed, cost, icon)  {
    return {
      type      : "head",
      name      : name,
      arm       : arm,
      mSpeed    : mSpeed,
      cost      : cost
    };
  }

  function body(name, arm, mSpeed, cost, icon) {
    return {
      type      : "body",
      name      : name,
      arm       : arm,
      mSpeed    : mSpeed,
      cost      : cost
    };
  }

  function legs(name, arm, mSpeed, cost, icon) {
    return {
      type      : "legs",
      name      : name,
      arm       : arm,
      mSpeed    : mSpeed,
      cost      : cost
    };
  }

  function feet(name, arm, mSpeed, cost, icon) {
    return {
      type      : "feet",
      name      : name,
      arm       : arm,
      mSpeed    : mSpeed,
      cost      : cost
    };
  }

  function hPotion(name, cost, heal, icon) {
    return {
      type      : "potion",
      name      : name,
      cost      : cost,
      onUse     : function(heal){
        Player.hp =+ heal;
      },
    };
  }

  function mPotion(name, cost, heal, icon) {
    return {
      type      : "potion",
      name      : name,
      cost      : cost,
      onUse     : function(heal){
        Player.mp =+ heal;
      },
    };
  }


  var items = [];
  items[0] = sword("Wooden Sword", 2, 1, 1, 10);

  Window.items = items;
})();
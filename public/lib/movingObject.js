(function () {
  if (typeof AdventureTime === "undefined") {
    window.AdventureTime = {};
  }

  var MovingObject = window.AdventureTime.MovingObject = function (options) {
     this.pos = options.pos;
     this.vel = options.vel;
     this.radius = options.radius;
     this.game = options.game;
   };

   MovingObject.prototype.collideWith = function (otherObject) {
     if (otherObject instanceof window.AdventureTime.Monster) {
       this.game.monstersCaught += 1;
       this.game.remove(otherObject);
     }
   };

   MovingObject.prototype.isWrappable = true;

   MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = window.AdventureTime.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

})();
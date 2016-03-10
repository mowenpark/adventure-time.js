(function () {
  if (typeof AdventureTime === "undefined") {
    window.AdventureTime = {};
  }

  var Monster = window.AdventureTime.Monster = function (options) {
    options.pos = options.pos || options.game.randomPosition();
    options.radius = 10;
    options.vel = options.vel || 256;

    this.image = options.image;
    this.height = 40;
    this.width = 896;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 10;
    this.numberOfFrames = 16;
    window.AdventureTime.MovingObject.call(this, options);
  };

  window.AdventureTime.Util.inherits(Monster, window.AdventureTime.MovingObject);

  Monster.prototype.update = function (modifier) {

    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {

          this.tickCount = 0;

          // Go to the next frame
          this.frameIndex += 1;

          // If the current frame index is in range
         if (this.frameIndex < this.numberOfFrames - 1) {
             // Go to the next frame
             this.frameIndex += 1;
         } else {
             this.frameIndex = 0;
         }
    }

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }

    var offsetCoord = Math.round(Math.random());

    this.pos[offsetCoord] -= this.vel * (modifier/5);

  };

})();

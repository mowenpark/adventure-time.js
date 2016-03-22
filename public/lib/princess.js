(function () {
  if (typeof AdventureTime === "undefined") {
    window.AdventureTime = {};
  }

  // Return a randomly oriented vector with the given length.
  var randomVec = function (length) {
    var deg = 2 * Math.PI * Math.random();

    return scale([Math.sin(deg), Math.cos(deg)], length);
  };

  // Scale the length of a vector by the given amount.
  var scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  var Princess = window.AdventureTime.Princess = function (options) {
    options.pos = options.pos || options.game.randomPosition();
    options.radius = 20;
    options.vel = randomVec(50);

    this.image = options.image;
    this.height = options.height;
    this.width = options.width;
    this.frameIndex = 1;
    this.tickCount = 0;
    this.ticksPerFrame = 10;
    this.numberOfFrames = options.numberOfFrames;
    window.AdventureTime.MovingObject.call(this, options);
  };

  window.AdventureTime.Util.inherits(Princess, window.AdventureTime.MovingObject);

  Princess.prototype.update = function (modifier) {

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
             this.frameIndex = 1;
         }
    }

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }

    var offsetX = this.vel[0] * modifier,
        offsetY = this.vel[1] * modifier;

  };

})();

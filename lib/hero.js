(function () {
  if (typeof AdventureTime === "undefined") {
      window.AdventureTime = {};
  }

  var Hero = window.AdventureTime.Hero = function (options) {
      options.radius = 10;
      options.vel = 256;  // movement in pixels per second
      options.pos = [240,256];

      this.image = options.image;
      this.height = 34;
      this.width = 183;
      this.frameIndex = 0;
      this.tickCount = 0;
      this.ticksPerFrame = 10;
      this.numberOfFrames = 8;
      window.AdventureTime.MovingObject.call(this, options);
    };

    window.AdventureTime.Util.inherits(Hero, window.AdventureTime.MovingObject);

    Hero.prototype.keysDown = function () {
      return {};
    };

    // Update game objects
    Hero.prototype.update = function (modifier) {

      if (this.game.isOutOfBounds(this.pos)) {
        if (this.isWrappable) {
          this.pos = this.game.wrap(this.pos);
        } else {
          this.remove();
        }
      }

      if (38 in this.keysDown) { // Player holding up
        this.pos[1] -= this.vel * modifier;
        this.frameIndex = 4;
      }
      if (40 in this.keysDown) { // Player holding down
        this.pos[1] += this.vel * modifier;
        this.frameIndex = 0;
      }
      if (37 in this.keysDown) { // Player holding left
        this.pos[0] -= this.vel * modifier;
        this.frameIndex = 6;
      }
      if (39 in this.keysDown) { // Player holding right
        this.pos[0] += this.vel * modifier;
        this.frameIndex = 2;
      }
      if (32 in this.keysDown) { // Player holding right
        this.frameIndex = 1;
      }
    };

    Hero.prototype.reset = function () {
      this.pos = [240,256];
    };


})();

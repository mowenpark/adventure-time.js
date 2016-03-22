(function () {
  if (typeof AdventureTime === "undefined") {
    window.AdventureTime = {};
  }

  var GameView = window.AdventureTime.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.hero = this.game.addHero();
    this.princess = this.game.addPrincess();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var that = this;
    // Handle keyboard controls
    addEventListener("keydown", function (e) {
      that.hero.keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
      delete that.hero.keysDown[e.keyCode];
    }, false);

  };

  GameView.prototype.start = function () {
     this.bindKeyHandlers();
     this.lastTime = 0;
     //start the animation
     requestAnimationFrame(this.animate.bind(this));
   };

  GameView.prototype.animate = function(time){
    var timeDelta = time - this.lastTime;

    this.game.step(timeDelta / 1000);
    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };

})();

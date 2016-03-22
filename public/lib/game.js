(function () {
  if (typeof AdventureTime === "undefined") {
    window.AdventureTime = {};
  }

  var Game = window.AdventureTime.Game = function () {
      this.monsters = [];
      this.heros = [];
      this.princess = [];
      this.monstersCaught = 0;

      this.addMonsters();
  };

  var num = prompt("How many monsters?");
  while (typeof parseInt(num) !== "number") {
    num = prompt("Please enter a number!");
  }
  Game.NUM_MONSTERS = parseInt(num);
  Game.DIM_X = 512;
  Game.DIM_Y = 480;


  // Add helper function
  Game.prototype.add = function (object) {
    if (object instanceof window.AdventureTime.Monster) {
      this.monsters.push(object);
    } else if (object instanceof window.AdventureTime.Hero) {
      this.heros.push(object);
    } else {
      this.princess.push(object);
    }
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.addMonsters = function (numMon) {
    var numMonsters = numMon || Game.NUM_MONSTERS ;
    for (var i = 0; i < numMonsters; i++) {
      var monster = monsterImages[Math.round(Math.random()*2)];
      this.add(new window.AdventureTime.Monster({
        game: this,
        image: monster,
        height: monster.height,
        width: monster.width,
        numberOfFrames: monster.numberOfFrames
      }));
    }
  };

  Game.prototype.addHero = function () {
    var hero = new window.AdventureTime.Hero({
      game: this,
      image: heroImage
    });

    this.add(hero);

    return hero;

  };

  Game.prototype.addPrincess = function () {
    var princess = new window.AdventureTime.Princess({
      game: this,
      image: princessImage,
      height: princessImage.height,
      width: princessImage.width,
      numberOfFrames: princessImage.numberOfFrames
    });

    this.add(princess);

    return princess;

  };

  Game.prototype.remove = function (object) {
    if (object instanceof window.AdventureTime.Monster) {
      this.monsters.splice(this.monsters.indexOf(object), 1);
    } else if (object instanceof window.AdventureTime.Hero) {
      this.heroes.splice(this.heroes.indexOf(object), 1);
    } else {
      this.princess.splice(this.princess.indexOf(object), 1);
    }
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 === obj2) {
          // don't allow self-collision
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
          if (typeof game.princess[0] === 'undefined') {
            game.addPrincess();
            game.addMonsters(1);
          }
        }
      });
    });
  };

  Game.prototype.moveObjects = function (delta) {
     this.allObjects().forEach(function (object) {
       object.update(delta);
     });
   };

   Game.prototype.step = function (delta) {
      this.moveObjects(delta);
      this.checkCollisions();
    };

  Game.prototype.allObjects = function () {
    return [].concat(this.heros, this.monsters, this.princess);
  };

  // Background image
  var bgImage = new Image();
  bgImage.src = "images/background.png";

  var heroImage = new Image();
  heroImage.src = "images/Finn.png";

  var princessImage = new Image();
  princessImage.src = "images/flame_princess.png";
  princessImage.height = 72;
  princessImage.width = 190;
  princessImage.numberOfFrames = 6;

  var monsterImage = new Image();
  monsterImage.src = "images/KnifeBunny.png";
  monsterImage.height = 40;
  monsterImage.width = 896;
  monsterImage.numberOfFrames = 16;

  var monsterImage2 = new Image();
  monsterImage2.src = "images/CB_monster.png";
  monsterImage2.height = 48;
  monsterImage2.width = 896;
  monsterImage2.numberOfFrames = 16;

  var monsterImage3 = new Image();
  monsterImage3.src = "images/neptr_monster.png";
  monsterImage3.height = 48;
  monsterImage3.width = 720;
  monsterImage3.numberOfFrames = 15;

  var monsterImages = [monsterImage, monsterImage2, monsterImage3];

  // Draw everything
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // Draw background
    ctx.drawImage(bgImage, 0, 0);
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsters caught: " + this.monstersCaught, 32, 32);

    this.allObjects().forEach(function (object) {
      ctx.drawImage(
        object.image,
        object.frameIndex * object.width/object.numberOfFrames,
        0,
        object.width/object.numberOfFrames,
        object.height,
        object.pos[0],
        object.pos[1],
        object.width/object.numberOfFrames,
        object.height
      );
    });
  };

  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap(coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };


})();

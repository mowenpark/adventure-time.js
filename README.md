#Adventure Time!

Welcome to Adventure Time, where you avoid monsters and save princesses. Use the arrow
keys to move Finn, your character, around the screen. But be careful, for every princess
you save, another monster is added to the game.

Play it at [AdventureTime][heroku]!

[heroku]:https://serene-scrubland-91153.herokuapp.com/

##Overview

The AdventureTime game is decomposed into the following classes/source-files:

* `AdventureTime.Util` (lib/util.js)
  * Utility code for vector math.
* `AdventureTime.MovingObject` (lib/movingObject.js)
  * Base class for anything that moves.
  * Most important methods are `#isCollidedWith(otherObject)` and `#collideWith`.
* `Monster` (lib/monster.js)
  * Neptr, Cinnamon Bun, or KnifeBunny will try to kill you, beware. Each inherits from MovingObject.
* `Princess` (lib/princess.js)
  * Save the princess. A non-moving object.
* `Hero` (lib/hero.js)
  * This is you! Also a MovingObject subclass.
* `Game` (lib/game.js)
  * Holds collections of the monsters, princess, and your character.
  * `#moveObjects` method calls `#update` on all the objects, and `#checkCollisions` checks for colliding objects.
  * Keeps track of dimensions of the space; wraps objects around when they drift off the screen.
* `GameView` (lib/gameView.js)
  * Stores a Game instance.
  * Stores a canvas context to draw the game into.
  * Installs key listeners to move your hero.
  * Installs a timer to call `Game#step`.

##Gameplay

Start!

![gameplay image 1](/public/images/adventure_time_gameplay1.png)

Try to save as many princesses as you can!

![gameplay image 2](/public/images/adventure_time_gameplay.png)

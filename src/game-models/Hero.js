const player = require('play-sound')((opts = {}));
const Boomerang = require('./Boomerang');

class Hero {
  constructor({ positionX, positionY }) {
    this.skin = '🦔';
    this.positionX = positionX;
    this.positionY = positionY;
    this.boomerang = new Boomerang();
    this.health = ['♥', '♥', '♥'];
    this.score = 0;
    this.trackHeight = 7;
  }

  moveLeft() {
    if (this.positionX > 0) this.positionX -= 1;
  }

  moveRight() {
    if (this.positionX < 48) this.positionX += 1;
  }

  moveTop() {
    if (this.positionY > 0) this.positionY -= 1;
  }

  moveBottom() {
    if (this.positionY < this.trackHeight - 1) this.positionY += 1;
  }

  vanish() {
    player.play('src/sounds/twirl.wav');
    //   if (!this.game.flat().some((el) => el === '💫')) {
    this.skin = '💭';
    setTimeout(() => (this.skin = '🤠'), 1000);
    //   }
  }

  attack() {
    player.play('src/sounds/just-like-magic.wav');
    setTimeout(() => {
      this.boomerang.direction = 'back';
    }, 500);

    this.boomerang.direction = 'forward';
    this.boomerang.positionX = this.positionX + 1;
    this.boomerang.positionY = this.positionY;
  }

  die() {
    player.play('src/sounds/congratulations.wav');
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');

    process.exit();
  }
}

module.exports = Hero;

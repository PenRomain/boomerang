const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

const runInteractiveConsole = require('./keyboard');
const { User } = require('../db/models');

class Game {
  constructor({ trackLength, name }) {
    this.trackLength = trackLength;
    this.trackHeight = new Array(7);
    this.hero = new Hero({ positionX: 10, positionY: 3 });
    this.enemies = [new Enemy()];
    this.boomerang = new Boomerang();
    this.view = new View();
    this.name = name;
    this.track = [];
  }

  regenerateTrack() {
    this.track = this.trackHeight
      .fill('')
      .map(() => new Array(this.trackLength).fill(' '));

    this.track[this.hero.positionY][this.hero.positionX] = this.hero.skin;

    this.enemies.forEach((el) => {
      this.track[el.positionY][el.positionX] = el.skin;
    });

    this.track[this.hero.positionY][this.hero.boomerang.positionX] =
      this.hero.boomerang.skin;
  }

  async changeScore(score) {
    try {
      const user = await User.findOne({
        where: { name: this.name },
      });
      const leaderBoard = await User.findAll({
        attributes: ['id', 'name', 'frag'],
      });
      user.frag += score;
      const saveInf = await user.save();

      console.clear();
      console.log('          Leader board: \n');
      leaderBoard
        .sort((a, b) => b.frag - a.frag)
        .forEach((el, i) =>
          console.log(`${i + 1}. ${el.name} --- ${el.frag} pts`)
        );
      console.log('\n\nYour progress will saved at: ', saveInf.updatedAt);
    } catch (e) {
      console.log('Unable to save score: ', e.message);
    }
  }

  async check() {
    this.enemies.forEach(async (el) => {
      if (
        this.hero.positionX === el.positionX &&
        this.hero.positionY === el.positionY
      ) {
        if (this.hero.skin !== '💭') {
          this.hero.health.shift();
          this.hero.health.push('♡');
        }
        if (this.hero.health[0] === '♡') {
          await this.changeScore(this.hero.score);
          this.hero.die();
        } else {
          this.enemy = new Enemy();
        }
      }
    });
  }

  boomerangCheck() {
    this.enemies.forEach((el) => {
      if (
        this.hero.boomerang.positionX >= el.positionX &&
        this.hero.boomerang.positionY === el.positionY
      ) {
        el.die();
        el.create();
        this.hero.score += 1;
        if (this.hero.score >= 5) {
          this.hero.skin = '😤';
        }
        if (this.hero.score >= 15) {
          this.hero.skin = '🤓';
        }
        if (this.hero.score >= 30) {
          this.hero.skin = '😎';
        }
        this.hero.boomerang.direction = 'back';
      }
    });
    if (this.hero.boomerang.positionX === this.trackLength) {
      this.hero.boomerang.direction = 'back';
    }
    if (this.hero.boomerang.positionX <= this.hero.positionX) {
      this.hero.boomerang.positionX = undefined;
      this.hero.boomerang.positionY = undefined;
    }
  }

  play() {
    runInteractiveConsole(this.hero);

    setInterval(() => {
      if (Math.floor(Math.random() * 10 < 4)) this.enemies.push(new Enemy());
    }, 1000);

    setInterval(() => {
      this.enemies.forEach((el) => {
        el.moveLeft();
      });
    }, 100);

    setInterval(() => {
      this.check();
      this.boomerangCheck();

      this.hero.boomerang.fly();
      this.view.render(this);

      this.regenerateTrack();
    }, 50);
  }
}

module.exports = Game;

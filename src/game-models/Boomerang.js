class Boomerang {
  constructor() {
    this.skin = '💨';
    this.positionX = undefined;
    this.positionY = undefined;
    this.direction = 'forward';
  }

  fly() {
    if (this.positionX === undefined) {
      return;
    }
    if (this.direction === 'forward') {
      this.positionX += 1;
    }
    if (this.direction === 'back') {
      this.positionX -= 1;
    }
  }
}

module.exports = Boomerang;

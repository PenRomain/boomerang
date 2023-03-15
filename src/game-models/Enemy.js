class Enemy {
  constructor(skin) {
    this.skin = skin;
    this.positionX = 50;
    this.positionY = Math.floor(Math.random() * 7);
  }

  generateSkin() {
    const skins = [
      '🥶',
      '🥵',
      '🤯',
      '🤢',
      '😱',
      '😈',
      '💀',
      '🤡',
      '👾',
      '🤡',
      '🤖',
      '🎃',
    ];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    if (this.positionX === 0) {
      this.positionX = 50;
      this.positionY = Math.floor(Math.random() * 7);
    }
    this.positionX -= 1;
  }

  die() {
    this.skin = '💀';
    this.positionX = undefined;
    this.positionY = undefined;
  }

  create() {
    this.generateSkin();
    this.positionX = 50;
    this.positionY = Math.floor(Math.random() * 7);
  }
}

module.exports = Enemy;

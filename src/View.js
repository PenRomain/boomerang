const clc = require('cli-color');

class View {
  render(game) {
    console.clear();
    console.log('🌧'.repeat(game.trackLength * 2));
    console.log(game.track.map((el) => el.join('')).join('\n'));
    console.log('🌱'.repeat(game.trackLength));
    console.log(clc.green('Player'), `: ${game.name}`);
    console.log(clc.green('HP'), `: ${clc.red(game.hero.health.join(' '))}`);
    console.log(clc.green('Frags'), `: ${game.hero.score}`);
  }
}

module.exports = View;

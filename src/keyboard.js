const keypress = require('keypress');

const keyboard = {
  w: (hero) => hero.moveTop(),
  a: (hero) => hero.moveLeft(),
  s: (hero) => hero.moveBottom(),
  d: (hero) => hero.moveRight(),
  e: (hero) => hero.attack(),
  space: (hero) => hero.vanish(),
};

function runInteractiveConsole(hero) {
  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key) {
      // Вызывает команду, соответствующую нажатой кнопке.
      if (key.name in keyboard) {
        keyboard[key.name](hero);
      }
      // Прерывание программы.
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}

module.exports = runInteractiveConsole;

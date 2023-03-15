const readline = require('readline');
const Game = require('./src/Game');
const { User, Hero } = require('./db/models');

async function createUser(userName, score) {
  try {
    const user = await User.findOne({
      where: { name: userName },
    });
    if (!user) {
      await User.create({ name: userName, skin: '🤠', frag: score });
    }
  } catch (e) {
    console.log('Error message: ', e.message);
  }
}

// async function findSkins() {
//   const heroes = await Hero.findAll();
//   return heroes;
// }

function run() {
  const interFace = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  // const skins = findSkins();
  // interFace.question('skins', async (input) => {
  //   const skin = input;
  //   skins.then((el) => el.map((el1) => console.log(el1.image)));
  // });
  console.clear();

  interFace.question('Введите свое имя:', async (input) => {
    const userName = input;
    const game = new Game({ trackLength: 51, name: userName });
    createUser(userName, 0);
    game.play();
  });
}

run();

const { Op } = require('sequelize');
const { Hero, Enemy, Score } = require('./db/models');

const fun = async () => {
  try {
    const res = await Score.findAll({
      raw: true,
      where: { hero_id: 1 },
    });
    // console.log(res);
    console.log(res.map((el) => el.enemy_id));
  } catch (error) {
    console.log(error.message);
  }
};

fun();

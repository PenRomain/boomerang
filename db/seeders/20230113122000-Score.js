'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const types = [
      {
        hero_id: 1,
        enemy_id: 1,
      },
      {
        hero_id: 1,
        enemy_id: 2,
      },
      {
        hero_id: 1,
        enemy_id: 3,
      },
      {
        hero_id: 2,
        enemy_id: 3,
      },
      {
        hero_id: 3,
        enemy_id: 3,
      },
      {
        hero_id: 2,
        enemy_id: 2,
      },
    ];
    const data = types.map((el) => ({
      ...el,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Scores', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Scores', null, {});
  },
};

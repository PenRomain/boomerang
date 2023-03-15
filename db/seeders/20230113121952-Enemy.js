'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const types = [
      '👾',
      '💀',
      '👹',
      '👻',
      '👽',
      '👿',
      '💩',
      '🤡',
      '🤺',
      '🧛',
      '🧟',
      '🎃',
      '🤢',
      '🦠',
      '🧚',
    ];
    const data = types.map((el) => ({
      image: el,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Enemies', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Enemies', null, {});
  },
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Hero, Enemy }) {
      this.belongsTo(Hero, { foreignKey: 'hero_id' });
      this.belongsTo(Enemy, { foreignKey: 'enemy_id' });
    }
  }
  Score.init(
    {
      hero_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Heroes',
          key: 'id',
        },
      },
      enemy_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Enemies',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Score',
    }
  );
  return Score;
};

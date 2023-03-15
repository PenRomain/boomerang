'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enemy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Score }) {
      this.hasMany(Score, { foreignKey: 'enemy_id' });
    }
  }
  Enemy.init(
    {
      image: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Enemy',
    }
  );
  return Enemy;
};

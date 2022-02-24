'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Poststag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Poststag.belongsTo(models.Post, { foreignKey: "PostId" });
      Poststag.belongsTo(models.Tag, { foreignKey: "TagId" });
    }
  }
  Poststag.init({
    name: DataTypes.STRING,
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Poststag',
  });
  return Poststag;
};
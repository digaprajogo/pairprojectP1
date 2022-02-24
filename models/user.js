'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "UserId" });
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cannot Null'
        },
        notNull: true,
        isAlphanumeric: {
          msg: `password can only be filled with number and letter`
        }
      }
    },
    role: DataTypes.STRING
  }, 
  {
    hooks: {
      beforeCreate(user, options){
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
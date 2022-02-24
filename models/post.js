'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile, { foreignKey: "ProfileId" });
      Post.hasMany(models.Poststag, { foreignKey: "PostId" });
      Post.belongsToMany(models.Tag, { through: models.Poststag });
    }

    get Ratio(){
      if((this.like - this.dislike)/(this.like + this.dislike) * 100 < 25) return 'Not reccomended post'
      else if((this.like - this.dislike)/(this.like + this.dislike) * 100 < 50) return 'Unpopular post'
      else if((this.like - this.dislike)/(this.like + this.dislike) * 100 < 75) return 'Popular post'      
      else return 'Reccomended post'      
    }
  }
  Post.init({
    title: DataTypes.STRING,
    postUrl: DataTypes.STRING,
    caption: DataTypes.STRING,
    like: DataTypes.INTEGER,
    dislike: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
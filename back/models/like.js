'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post}) {
      // define association here
      // userId
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })

      // postId
      this.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
    }

    toJSON() {
      return {...this.get(), id: undefined, uuid: undefined, updatedAt: undefined, userId: undefined, postId: undefined};
    }
  }
  Like.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {
    sequelize,
    tableName: 'likes',
    modelName: 'Like',
  });
  return Like;
};

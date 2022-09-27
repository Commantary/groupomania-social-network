'use strict';
const {
   Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class UserFriend extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate({User}) {
         // define association here

         // userId
         this.belongsTo(User, {foreignKey: 'userId', as: 'user'});

         // friendId
         this.belongsTo(User, {foreignKey: 'friendId', as: 'friend'});
      }

      toJSON() {
         return {...this.get(), id: undefined, updatedAt: undefined};
      }
   }

   UserFriend.init({}, {
      sequelize,
      tableName: 'user_friends',
      modelName: 'UserFriend',
   });
   return UserFriend;
};

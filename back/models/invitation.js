'use strict';
const {
   Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Invitation extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate({User}) {
         // define association here

         // targetId
         this.belongsTo(User, {foreignKey: 'targetId', as: 'target'});

         // senderId
         this.belongsTo(User, {foreignKey: 'senderId', as: 'sender'});
      }

      toJSON() {
         return {...this.get(), id: undefined};
      }
   }

   Invitation.init({
      uuid: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
      }
   }, {
      sequelize,
      tableName: 'invitations',
      modelName: 'Invitation',
   });
   return Invitation;
};

'use strict';
module.exports = {
   async up(queryInterface, DataTypes) {
      await queryInterface.createTable('user_friends', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
         },
         userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
         },
         friendId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
         },
         createdAt: {
            allowNull: false,
            type: DataTypes.DATE
         },
         updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
         }
      });
   },
   async down(queryInterface, DataTypes) {
      await queryInterface.dropTable('user_friends');
   }
};

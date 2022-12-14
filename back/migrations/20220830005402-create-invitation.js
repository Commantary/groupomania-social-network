'use strict';
module.exports = {
   async up(queryInterface, DataTypes) {
      await queryInterface.createTable('invitations', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
         },
         uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
         },
         senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
         },
         targetId: {
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
      await queryInterface.dropTable('invitations');
   }
};

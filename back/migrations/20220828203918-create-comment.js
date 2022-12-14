'use strict';
module.exports = {
   async up(queryInterface, DataTypes) {
      await queryInterface.createTable('comments', {
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
         body: {
            type: DataTypes.TEXT,
            allowNull: false
         },
         userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
         },
         postId: {
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
      await queryInterface.dropTable('comments');
   }
};

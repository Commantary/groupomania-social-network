'use strict';
module.exports = {
   async up(queryInterface, DataTypes) {
      await queryInterface.createTable('posts', {
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
            type: DataTypes.STRING,
            allowNull: false
         },
         images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
         },
         likes: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: []
         },
         userId: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         comments: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: []
         },
         deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
         },
         likesCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
         },
         commentsCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
      await queryInterface.dropTable('posts');
   }
};

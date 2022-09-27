'use strict';
module.exports = {
   async up(queryInterface, DataTypes) {
      await queryInterface.createTable('users', {
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
         first_name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         last_name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         bio: {
            type: DataTypes.TEXT,
            allowNull: true,
         },
         icon_url: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         socialview: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
         },
         role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
         },
         friends: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: []
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
      await queryInterface.dropTable('users');
   }
};

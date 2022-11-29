'use strict';
const {
   Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate({Invitation, Post, Like, Comment, UserFriend }) {
         // define association here

         // postsId
         this.hasMany(Post, {foreignKey: 'userId', as: 'posts'});

         // likesId
         this.hasMany(Like, {foreignKey: 'userId', as: 'likes'});

         // commentsId
         this.hasMany(Comment, {foreignKey: 'userId', as: 'comments'});

         // Invitations received
         this.hasMany(Invitation, {foreignKey: 'targetId', as: 'invitationsReceived'});

         // Invitations sent
         this.hasMany(Invitation, {foreignKey: 'senderId', as: 'sentInvitations'});

         // Friends
         this.hasMany(UserFriend, {foreignKey: 'userId', as: 'friends'});
      }

      toJSON() {
         return {...this.get(), id: undefined, password: undefined};
      }
   }

   User.init({
      uuid: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {msg: 'User must have a first name'},
            notEmpty: {msg: 'First name must not be empty'},
         }
      },
      last_name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {msg: 'User must have a last name'},
            notEmpty: {msg: 'Last name must not be empty'},
         }
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {msg: 'User must have an email'},
            notEmpty: {msg: 'Email must not be empty'},
            isEmail: {msg: 'Email must be a valid email'},
         }
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: {msg: 'User must have a password'},
            notEmpty: {msg: 'Password must not be empty'},
         }
      },
      bio: {
         type: DataTypes.TEXT,
         allowNull: true,
         validate: {
            len: [0, 255],
         }
      },
      icon_url: {
         type: DataTypes.STRING,
         defaultValue: 'default.png',
      },
      socialview: {
         type: DataTypes.BOOLEAN,
         defaultValue: true,
      },
      role: {
         type: DataTypes.ENUM('admin', 'user'),
         defaultValue: 'user',
      }
   }, {
      sequelize,
      tableName: 'users',
      modelName: 'User',
   });
   return User;
};

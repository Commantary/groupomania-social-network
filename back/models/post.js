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
      static associate({User, Comment, Like}) {
         // define association here
         // userId
         this.belongsTo(User, {foreignKey: 'userId', as: 'user'});

         // usersLiked
         this.hasMany(Like, { foreignKey: 'postId', as: 'likes' });

         // comments
         this.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
      }

      toJSON() {
         return { ...this.get(), id: undefined, userId: undefined };
      }
   }

   Post.init({
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
         allowNull: true,
         validate: { // Set max size 4
            max: {
               args: 4,
               msg: 'Max size is 4'
            }
         }
      },
      likesCount: {
         type: DataTypes.INTEGER,
         defaultValue: 0
      },
      commentsCount: {
         type: DataTypes.INTEGER,
         defaultValue: 0
      }
   }, {
      sequelize,
      tableName: 'posts',
      modelName: 'Post',
   });
   return Post;
};

const { Post, User, Like, Comment } = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res) => {
   try {
      let posts = await Post.findAll({
         include: ['comments', {
            model: User,
            as: 'user',
            attributes: ['icon_url', 'first_name', 'last_name', 'uuid']
         },
         {
            model: Like,
            as: 'likes',
            include: [{
               model: User,
               as: 'user',
               attributes: ['uuid']
            }]
         },
         {
            model: Comment,
            as: 'comments',
            include: [{
               model: User,
               as: 'user',
               attributes: ['uuid']
            }]
         }]
      });

      // Filter posts by createdAt, most recent in first etc
      posts.sort(function(a, b) {
         return a['createdAt'] - b['createdAt'];
      })

      return res.status(200).json({
         posts,
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

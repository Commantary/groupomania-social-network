const {User, Post, Like, Comment} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const { uuid } = req.params;

      const user = await User.findOne({
         where: { uuid },
         include: [{
            // Include posts with like, comment and user
            model: Post,
            as: 'posts',
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
                     attributes: ['uuid', 'first_name', 'last_name', 'icon_url']
                  }]
               }]
         }]
      });

      // Filter posts by createdAt, most recent in first etc
      user.posts.sort(function(a, b) {
         return a['createdAt'] - b['createdAt'];
      })

      user.posts.forEach(post => {
         post.comments.sort(function(a, b) {
            return b['createdAt'] - a['createdAt'];
         })
      })

      return res.status(200).json({
         posts: user.posts,
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

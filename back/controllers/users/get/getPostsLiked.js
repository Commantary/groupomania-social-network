const {User, Post, Like, Comment} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const {uuid} = req.params;

      const likes = await User.findOne({
         where: {uuid},
         include: [{
            // Include likes with post
            model: Like,
            as: 'likes',
            include: [{
               model: Post,
               as: 'post',
               include: [
                  'comments', {
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
                  },
                  {
                     model: User,
                     as: 'user',
                     attributes: ['uuid', 'first_name', 'last_name', 'icon_url']
                  }
               ]
            }]
         }]
      });

      const posts = likes.likes.map(like => like.post);

      console.log(likes);

      // Filter posts by createdAt, most recent in first etc
      posts.sort(function (a, b) {
         return a['createdAt'] - b['createdAt'];
      })

      posts.forEach(data => {
         data.comments.sort(function (a, b) {
            return b['createdAt'] - a['createdAt'];
         })
      })

      return res.status(200).json({
         posts: posts,
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

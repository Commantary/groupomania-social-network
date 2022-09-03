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
            include: [{
               model: Like,
               as: 'likes',
               include: [{
                  model: User,
                  as: 'user',
               }]
            }, {
               model: Comment,
               as: 'comments',
               include: [{
                  model: User,
                  as: 'user',
               }]
            }]
         }]
      });

      return res.status(200).json({
         posts: user.posts,
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

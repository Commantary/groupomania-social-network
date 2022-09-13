const { Post, Like, Comment, User} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const uuid = req.params.uuid;

      const post = await Post.findOne({
         where: { uuid },
         include: ['user', {
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
         }],
      });

      return res.status(200).json({
         post,
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = { call };

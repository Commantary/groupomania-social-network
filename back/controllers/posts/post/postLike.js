const {Post, Like} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const postUuid = req.params.uuid;
      const user = req.user;

      const post = await Post.findOne({where: {uuid: postUuid}});

      if (!post) {
         return res.status(404).json({
            message: "Post not found",
            code: 404
         });
      }

      const like = await Like.findOne({where: {userId: user.id, postId: post.id}});

      if (like) {
         // delete the like from the post
         await Like.destroy({where: {userId: user.id, postId: post.id}});

         // update the post likes count
         await Post.update({likesCount: post.likesCount - 1}, {where: {id: post.id}});

         return res.status(204).json({
            message: 'Like removed',
            code: 204
         });
      }

      // create the like in the post
      await Like.create({userId: user.id, postId: post.id});

      // update the post likes count
      await Post.update({likesCount: post.likesCount + 1}, {where: {id: post.id}});

      return res.status(201).json({
         message: 'Like added',
         code: 201
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

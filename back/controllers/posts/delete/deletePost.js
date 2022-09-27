const {Post, Like, Comment} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const uuid = req.params.uuid;
      const post = await Post.findOne({where: {uuid}});
      const likes = await Like.findAll({where: {postId: post.id}});
      const comments = await Comment.findAll({where: {postId: post.id}});

      // Delete all likes and comments of the post

      // Delete post
      if(post) {
         await post.destroy();

         for (const like of likes) {
            await like.destroy();
         }

         for (const comment of comments) {
            await comment.destroy();
         }

         return res.status(200).json({
            message: 'Post deleted',
            code: 200
         });
      } else {
         return res.status(404).json({
            error: 'Post not found',
            code: 404
         });
      }
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

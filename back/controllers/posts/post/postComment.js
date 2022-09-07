const {Post, Comment} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res) => {
   try {
      const postUuid = req.params.uuid;
      const user = req.user;
      const {body} = req.body;

      if (!body) {
         return res.status(400).json({
            message: "Body is required",
            code: 400
         });
      }

      if (body.length > 1000) {
         return res.status(400).json({
            message: "Body is too long",
            code: 400
         });
      }

      if (body.length < 1) {
         return res.status(400).json({
            message: "Body is too short",
            code: 400
         });
      }

      const post = await Post.findOne({where: {uuid: postUuid}});

      if (!post) {
         return res.status(404).json({
            message: "Post not found",
            code: 404
         });
      }

      const comment = await Comment.create({userId: user.id, postId: post.id, body});

      // update the post likes count
      await Post.update({commentsCount: post.commentsCount + 1}, {where: {id: post.id}});

      return res.status(201).json({
         message: "Comment created",
         comment: comment,
         code: 201
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

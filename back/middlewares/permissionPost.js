const {User, Post} = require('../models');

module.exports = async (req, res, next) => {
   try {
      if (req.user.role === 'admin') {
         return next();
      }

      const postUuid = req.params.uuid;

      const post = await Post.findOne({
         where: {uuid: postUuid},
         include: ['user'],
      });

      if (!post) {
         return res.status(404).json({
            message: "Post not found"
         });
      }

      if (post.userId !== req.user.id) {
         return res.status(403).json({
            message: "You are not allowed to do this action"
         });
      }

      next();
   } catch (error) {
      console.log("error: ", error);

      res.status(403).json({
         error: 'You are not allowed to do this action'
      });
   }
}

const {Post} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const uuid = req.params.uuid;
      const post = await Post.findOne({where: {uuid}});

      // Delete post
      if(post) {
         await post.destroy();

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

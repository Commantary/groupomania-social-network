const {Post, User} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      // Edit the post
      const {body} = req.body;
      const {uuid} = req.params;
      const images = req.files || [];

      let imagesUrl = [];

      if (images !== [] && images.length > 0) {
         imagesUrl = utils.saveImageArr(req, images, 4);
      }

      const post = await Post.findOne({where: {uuid}});

      if (!post) {
         return res.status(404).json({
            message: "Post not found",
            code: 404
         });
      }

      await Post.update({body, imagesUrl}, {where: {uuid}});

      return res.status(200).json({
         message: 'Post edited',
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

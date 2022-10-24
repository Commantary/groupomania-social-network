const {Post} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      // Edit the post
      const {body, imagesRemoved} = req.body;
      const {uuid} = req.params;
      const images = req.files.images || [];

      let imagesUrl = [];

      if (images) {
         if (images.length === undefined) {
            imagesUrl.push(utils.saveImage(req, images));
         } else {
            imagesUrl = utils.saveImageArr(req, images, 4);
         }
      }

      const post = await Post.findOne({where: {uuid}});

      if (!post) {
         return res.status(404).json({
            message: "Post not found",
            code: 404
         });
      }

      if (imagesRemoved)
         imagesUrl.push(...post.images.filter(image => !imagesRemoved.includes(image)));
      else
         imagesUrl.push(...post.images);

      await Post.update({body, images: imagesUrl}, {where: {uuid}});

      return res.status(200).json({
         message: 'Post edited',
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

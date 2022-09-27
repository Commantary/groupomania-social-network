const {Post, User} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const {body} = req.body;
      const images = req.files.images;

      let imagesUrl = [];

      if (images) {
         if (images.length === undefined) {
            console.log("images.length === undefined");
            imagesUrl.push(utils.saveImage(req, images));
         } else {
            console.log("images.length !== undefined");
            imagesUrl = utils.saveImageArr(req, images, 4);
         }
      }

      console.log(" ")
      console.log("imagesUrl -> ", imagesUrl)
      console.log(" ")

      if (imagesUrl.includes("Extension not allowed")) {
         return res.status(400).json({message: "Extension not allowed"});
      }

      const user = req.user;

      const post = await Post.create({
         body,
         userId: user.id,
         images: imagesUrl
      });

      return res.status(201).json({
         message: "Post created",
         post: post,
         code: 201
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

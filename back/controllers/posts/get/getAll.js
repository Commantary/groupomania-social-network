const {Post,Like} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const posts = await Post.findAll({
         include: ['user', 'comments']
      });

      return res.status(200).json({
         posts,
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

const {Post,User} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res) => {
   try {
      const posts = await Post.findAll({
         include: ['comments', {
            model: User,
            as: 'user',
            attributes: ['icon_url', 'first_name', 'last_name']
         }]
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

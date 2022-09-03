const { User } = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const { uuid } = req.params;

      // Get user from id
      const user = await User.findOne({
         where: { uuid },
         include: ['posts', 'likes', 'comments', 'friends'],
      })

      if (!user) {
         return res.status(404).json({
            error: 'User not found',
            code: 404
         });
      }

      return res.json({
         user: user,
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = { call };

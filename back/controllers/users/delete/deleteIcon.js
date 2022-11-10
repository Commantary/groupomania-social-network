const {Post, User} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      // Replace the icon_url of user
      const {uuid} = req.params;
      const icon_url = `default.png`;

      // Get user from id
      const user = await User.findOne({
         where: {uuid}
      });

      if (!user) {
         return res.status(404).json({
            error: 'User not found',
            code: 404
         });
      }

      if (user.icon_url === icon_url) {
         return res.status(400).json({
            error: 'User icon is already default',
            code: 400
         });
      }

      await User.update({icon_url}, {where: {uuid}});

      return res.status(204).json({
         message: 'Icon set to default',
         code: 204
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

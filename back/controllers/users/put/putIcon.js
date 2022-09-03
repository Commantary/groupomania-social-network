const {Post, User} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      // Replace the icon_url of user
      const { uuid } = req.params;
      const icon = req.files.icon;
      const icon_url = utils.saveImage(req, icon)

      // Get user from id
      const user = await User.findOne({
         where: { uuid }
      });

      if (!user) {
         return res.status(404).json({
            error: 'User not found',
            code: 404
         });
      }

      await User.update({icon_url}, {where: {uuid}});

      return res.status(200).json({
         message: 'User icon edited',
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

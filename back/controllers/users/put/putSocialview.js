const {Post, User} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const { uuid } = req.params;
      const { socialview } = req.body;

      const user = await User.findOne({
         where: { uuid }
      });

      if (!user) {
         return res.status(404).json({
            error: 'User not found',
            code: 404
         });
      }

      // Check if the socialview is valid
      if (socialview !== 'true' && socialview !== 'false') {
         return res.status(400).json({
            error: 'Invalid socialview',
            code: 400
         });
      }

      await User.update({socialview}, {where: {uuid}});

      return res.status(200).json({
         message: 'User socialview edited',
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

const {User} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const {uuid} = req.params;
      const {bio} = req.body;

      const user = await User.findOne({
         where: {uuid}
      });

      if (!user) {
         return res.status(404).json({
            error: 'User not found',
            code: 404
         });
      }

      if (bio && bio.length > 200) {
         return res.status(400).json({
            error: 'Bio must be less than 200 characters',
            code: 400
         });
      }

      if (!bio || bio.length < 1) {
         await User.update({
            bio: null
         }, {where: {uuid}});

         return res.status(200).json({
            message: 'Bio successfully deleted',
            code: 200
         })
      }

      await User.update({bio}, {where: {uuid}});

      return res.status(200).json({
         message: 'User bio edited',
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

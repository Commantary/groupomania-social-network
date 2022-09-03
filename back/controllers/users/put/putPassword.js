const bcrypt = require('bcrypt');
const {Post, User} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const { uuid } = req.params;
      const { password } = req.body;

      const user = await User.findOne({
         where: { uuid }
      });

      if (!user) {
         return res.status(404).json({
            error: 'User not found',
            code: 404
         });
      }

      // Hash the new password
      bcrypt.hash(password, 10, async (err, hash) => {
         if (err) {
            utils.handleError(err, res);
         }

         await User.update({password: hash}, {where: {uuid}});

         return res.status(200).json({
            message: 'User password edited',
            code: 200
         });
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

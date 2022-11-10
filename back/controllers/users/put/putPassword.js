const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const { uuid } = req.params;
      const { actual, newPassword, confirm } = req.body;

      const user = await User.findOne({
         where: { uuid }
      });

      if (!user) {
         return res.status(404).json({
            error: 'User not found',
            code: 404
         });
      }

      if (!bcrypt.compareSync(actual, user.password)) {
         return res.status(401).json({
            error: 'Password incorrect',
            code: 401
         });
      }

      if (newPassword !== confirm) {
         return res.status(400).json({
            error: 'Passwords do not match',
            code: 400
         });
      }

      if (newPassword.length < 8) {
         return res.status(400).json({
            error: 'Password must be at least 8 characters',
            code: 400
         });
      }

      // Hash the new password
      bcrypt.hash(newPassword, 10, async (err, hash) => {
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

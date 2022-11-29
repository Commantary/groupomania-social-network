const { User, UserFriend } = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const { uuid } = req.params;

      const user2 = await User.findOne({
         where: { uuid },
         include: [{
            model: UserFriend,
            as: 'friends',
            include: [{
               model: User,
               as: 'friend',
               attributes: ['uuid', 'first_name', 'last_name', 'icon_url', 'bio']
            }],
            attributes: ['friendId']
         }],
         exclude: ['email', 'uuid', 'createdAt', 'updatedAt']
      })

      if (!user2) {
         return res.status(404).json({
            error: 'User not found',
            code: 404
         });
      }

      return res.json({
         user: user2,
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = { call };

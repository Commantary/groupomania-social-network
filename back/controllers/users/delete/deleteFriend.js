const {User, UserFriend} = require('../../../models');
const {Op} = require("sequelize");
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const {type} = req.body;

      const {uuid} = req.params;

      const userTarget = await User.findOne({where: {uuid}});

      if (!userTarget) {
         return res.status(404).json({
            message: "User not found",
            code: 404
         });
      }

      // Check to see if the target is not the same user
      if (userTarget.id === req.user.id) {
         return res.status(400).json({
            message: "You cannot delete yourself as friend",
            code: 400
         });
      }

      // Check if user is already friend
      const userFriend = await UserFriend.findOne({
         where: {
            [Op.or]:
               [
                  {userId: req.user.id, friendId: userTarget.id},
                  {userId: userTarget.id, friendId: req.user.id}
               ]
         }
      });

      if (!userFriend) {
         return res.status(400).json({
            message: "You are not friend with this user",
            code: 400
         });
      }

      await userFriend.destroy();

      return res.status(200).json({
         message: "Friend deleted",
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

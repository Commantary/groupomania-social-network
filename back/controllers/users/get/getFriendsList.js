const {User, UserFriend} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const { uuid } = req.params;

      // Check if user exists
      if (!await User.findOne({where: {uuid}})) {
         return res.status(404).json({error: 'User not found'});
      }

      // Check if user is the current user
      if (req.user.uuid !== uuid) {
         return res.status(401).json({
            message: 'Unauthorized',
            code: 401
         });
      }

      // Get user with userfriends
      const user = await User.findOne({
         where: { uuid },
         include: [{
            model: UserFriend,
            as: 'friends',
            include: [{
               model: User,
               as: 'friend',
               attributes: [
                  'icon_url',
                  'first_name',
                  'last_name',
                  'uuid',
                  'bio',
                  'friends',
               ]
            }]
         }]
      })

      // Get userfriends
      const userFriends = user.friends;

      // Get only friend user objects
      const userFriendsList = userFriends.map(friend => friend.friend);

      return res.status(200).json({
         friends: userFriendsList,
         code: 200
      });

   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

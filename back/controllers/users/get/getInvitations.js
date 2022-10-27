const {User, Post, Like, Comment, Invitation} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const { uuid } = req.params;

      const user = await User.findOne({
         where: { uuid }
      });

      const userInvitations = await Invitation.findAll({
         where: { targetId: user.id },
         include: [{
            model: User,
            as: 'sender',
            attributes: [
               'icon_url',
               'first_name',
               'last_name',
               'uuid',
               'bio',
               'friends',
            ]
         }]
      })

      const userInvitationsSent = await Invitation.findAll({
         where: { senderId: user.id },
         include: [{
            model: User,
            as: 'target',
            attributes: [
               'icon_url',
               'first_name',
               'last_name',
               'uuid',
               'bio',
               'friends',
            ]
         }]
      })

      userInvitations.sort(function(a, b) {
         return a['createdAt'] - b['createdAt'];
      })

      return res.status(200).json({
         invitations: userInvitations,
         invitationsSent: userInvitationsSent,
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

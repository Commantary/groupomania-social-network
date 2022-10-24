const {User, Invitation, UserFriend} = require('../../../models');
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
            message: "You cannot send an invitation to yourself",
            code: 400
         });
      }

      switch (type) {
         case '0':
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

            if (userFriend) {
               return res.status(400).json({
                  message: "You are already friend with this user",
                  code: 400
               });
            }

            // Check if user has already received an invitation
            const invitationReceive = await Invitation.findOne({
               where: {
                  [Op.or]:
                     [
                        {targetId: req.user.id, senderId: userTarget.id},
                        {targetId: userTarget.id, senderId: req.user.id}
                     ]
               }
            })

            if (invitationReceive) {
               return res.status(400).json({
                  message: "You have already received an invitation from this user",
                  code: 400
               });
            }

            // Check if user already sent an invitation
            const invitation = await Invitation.findOne({
               where: {
                  [Op.or]:
                     [
                        {senderId: req.user.id, targetId: userTarget.id},
                        {senderId: userTarget.id, targetId: req.user.id}
                     ]
               }
            });

            if (invitation) {
               return res.status(400).json({
                  message: "You already sent an invitation to this user",
                  code: 400
               });
            }

            // Send an invitation in pending to userTarget
            await Invitation.create({
               senderId: req.user.id,
               targetId: userTarget.id,
            });

            return res.status(200).json({
               message: "Invitation sent",
               code: 200
            });
         case '1':
            // Accept an invitation in pending to userTarget
            // Check if user has an invitation in pending to userTarget
            // UserTarget is the sender of the invitation
            const invitationToAccept = await Invitation.findOne({
               where: {
                  senderId: userTarget.id,
                  targetId: req.user.id,
               }
            });

            if (!invitationToAccept) {
               return res.status(404).json({
                  message: "Invitation not found",
                  code: 404
               });
            }

            // Accept the invitation by deleting it and create an UserFriend
            await invitationToAccept.destroy();

            await UserFriend.create({
               userId: req.user.id,
               friendId: userTarget.id,
            });

            await UserFriend.create({
               userId: userTarget.id,
               friendId: req.user.id,
            });

            return res.status(200).json({
               message: "Invitation accepted",
               code: 200
            });
         case '-1':
            // Decline an invitation in pending to userTarget
            // Check if user has an invitation in pending to userTarget
            // UserTarget is the sender of the invitation
            const invitationToDecline = await Invitation.findOne({
               where: {
                  senderId: userTarget.id,
                  targetId: req.user.id,
               }
            });

            if (!invitationToDecline) {
               return res.status(404).json({
                  message: "Invitation not found",
                  code: 404
               });
            }

            // Decline the invitation by deleting it
            await invitationToDecline.destroy();

            return res.status(200).json({
               message: "Invitation declined",
               code: 200
            });
         default:
            return res.status(400).json({
               message: "Type must be -1 or 0 or 1",
               code: 400
            });
      }
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

const express = require('express');
const router = express.Router();

const {
   getUser,
   putInvitation,
   getAllPosts,
   deleteIcon,
   putIcon,
   putPassword,
   putSocialview,
   getActivities,
   getLikedPosts,
   getInvitations,
   deleteFriend
} = require('../controllers/users');

router.route('/:uuid').get(getUser);
router.route('/:uuid/invitations').put(putInvitation);
router.route('/:uuid/posts').get(getAllPosts);
router.route('/:uuid/icon').delete(deleteIcon);
router.route('/:uuid/icon').put(putIcon);
router.route('/:uuid/password').put(putPassword);
router.route('/:uuid/socialview').put(putSocialview);
router.route('/:uuid/activities').get(getActivities);
router.route('/:uuid/like-posts').get(getLikedPosts);
router.route('/:uuid/invitations').get(getInvitations);
router.route('/:uuid/friend').delete(deleteFriend);

module.exports = router;

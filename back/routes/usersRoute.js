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
   getActivities
} = require('../controllers/users');

router.route('/:uuid').get(getUser);
router.route('/:uuid/invitation').put(putInvitation);
router.route('/:uuid/posts').get(getAllPosts);
router.route('/:uuid/icon').delete(deleteIcon);
router.route('/:uuid/icon').put(putIcon);
router.route('/:uuid/password').put(putPassword);
router.route('/:uuid/socialview').put(putSocialview);
router.route('/:uuid/activities').get(getActivities);

module.exports = router;

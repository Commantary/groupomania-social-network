const getUserModule = require('./users/get/getUser');
const getAllPostsModule = require('./users/get/getAllPosts');
const getActivitiesModule = require('./users/get/getActivities');
const getLikedPostsModule = require('./users/get/getPostsLiked');
const getInvitationsModule = require('./users/get/getInvitations');

const putInvitationModule = require('./users/put/putInvitation');
const putIconModule = require('./users/put/putIcon');
const putPasswordModule = require('./users/put/putPassword');
const putSocialviewModule = require('./users/put/putSocialview');

const deleteIconModule = require('./users/delete/deleteIcon');
const deleteFriendModule = require('./users/delete/deleteFriend');

const getUser = (req, res, next) => {
   getUserModule.call(req, res, next);
}

const putInvitation = (req, res, next) => {
   putInvitationModule.call(req, res, next);
}

const getAllPosts = (req, res, next) => {
   getAllPostsModule.call(req, res, next);
}

const deleteIcon = (req, res, next) => {
   deleteIconModule.call(req, res, next);
}

const putIcon = (req, res, next) => {
   putIconModule.call(req, res, next);
}

const putPassword = (req, res, next) => {
   putPasswordModule.call(req, res, next);
}

const putSocialview = (req, res, next) => {
   putSocialviewModule.call(req, res, next);
}

const getActivities = (req, res, next) => {
   getActivitiesModule.call(req, res, next);
}

const getLikedPosts = (req, res, next) => {
   getLikedPostsModule.call(req, res, next);
}

const getInvitations = (req, res, next) => {
   getInvitationsModule.call(req, res, next);
}

const deleteFriend = (req, res, next) => {
   deleteFriendModule.call(req, res, next);
}

module.exports = {
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
};

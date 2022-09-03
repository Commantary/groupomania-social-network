const {User, Like, Comment, Post} = require('../../../models');
const utils = require("../../utils/utils");

const call = async (req, res, next) => {
   try {
      const {uuid} = req.params;

      let activities = [];

      // Get all posts / likes / comments from user and filter it by date
      const user = await User.findOne({
         where: {uuid},
         include: [{
            model: Like,
            as: 'likes',
            include: [{
               model: Post,
               as: 'post',
               include: ["comments", "user"]
            }]
         }, {
            model: Comment,
            as: 'comments',
            include: [{
               model: Post,
               as: 'post',
               include: ["comments", "user"]
            }]
         },
            {
               model: Post,
               as: 'posts',
               include: ["comments", "user"]
            }
         ],
         order: [['createdAt']]
      });

      if (!user) {
         return res.status(404).json({
            error: 'User not found',
            code: 404
         });
      }

      let userActivities = JSON.parse(JSON.stringify(user));

      if (userActivities.posts.length > 0) {
         // Add property type to each post and set it to 'post'
         userActivities.posts.forEach(post => {
            post.type = 'post';
         });

         activities.push(...userActivities.posts);
      }

      if (userActivities.likes.length > 0) {
         userActivities.likes.forEach(like => {
            like.type = 'like';
         });

         activities.push(...userActivities.likes);
      }

      if (userActivities.comments.length > 0) {
         userActivities.comments.forEach(comment => {
            comment.type = 'comment';
         });

         activities.push(...userActivities.comments);
      }

      // Sort activities by date
      activities.sort((a, b) => {
         return new Date(b.createdAt) - new Date(a.createdAt);
      });

      return res.json({
         activities,
         code: 200
      });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = {call};

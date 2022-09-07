const express = require('express');
const router = express.Router();

const permissions = require('../middlewares/permissionPost');
const requireUser = require('../middlewares/requireUser');

const {
   createPost,
   getAllPosts,
   getPostById,
   editPost,
   deletePostModule,
   postLike,
   postComment
} = require('../controllers/posts');

router.route('/').post(requireUser, createPost);
router.route('/').get(getAllPosts);
router.route('/:uuid').get(getPostById);
router.route('/:uuid').put(permissions, editPost);
router.route('/:uuid').delete(permissions, deletePostModule);
router.route('/:uuid/like').post(requireUser, postLike);
router.route('/:uuid/comment').post(requireUser, postComment);

module.exports = router;

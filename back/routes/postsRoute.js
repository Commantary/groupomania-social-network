const express = require('express');
const router = express.Router();

const permissions = require('../middlewares/permissionPost');

const {
   createPost,
   getAllPosts,
   getPostById,
   editPost,
   deletePostModule,
   postLike,
   postComment
} = require('../controllers/posts');

router.route('/').post(createPost);
router.route('/').get(getAllPosts);
router.route('/:uuid').get(getPostById);
router.route('/:uuid').put(permissions, editPost);
router.route('/:uuid').delete(permissions, deletePostModule);
router.route('/:uuid/like').post(postLike);
router.route('/:uuid/comment').post(postComment);

module.exports = router;

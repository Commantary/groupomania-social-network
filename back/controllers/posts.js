const postPostModule = require('./posts/post/postPost');
const postLikeModule = require('./posts/post/postLike');
const postCommentModule = require('./posts/post/postComment');

const editPostModule = require('./posts/put/editPost');

const getAllPostsModule = require('./posts/get/getAll');
const getPostByIdModule = require('./posts/get/getById');

const deletePost = require('./posts/delete/deletePost');

const createPost = (req, res, next) => {
   postPostModule.call(req, res, next);
}

const getAllPosts = (req, res, next) => {
   getAllPostsModule.call(req, res, next);
}

const getPostById = (req, res, next) => {
   getPostByIdModule.call(req, res, next);
}

const editPost = (req, res, next) => {
   editPostModule.call(req, res, next);
}

const deletePostModule = (req, res, next) => {
   deletePost.call(req, res, next);
}

const postLike = (req, res, next) => {
   postLikeModule.call(req, res, next);
}

const postComment = (req, res, next) => {
   postCommentModule.call(req, res, next);
}

module.exports = {
   createPost,
   getAllPosts,
   getPostById,
   editPost,
   deletePostModule,
   postLike,
   postComment
};

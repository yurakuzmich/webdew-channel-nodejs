const Post = require('../models/post');
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath('error'), { title: 'Error' });
};

const getPost = (req, res) => {
  const title = 'Post';
  Post.findById(req.params.id)
    .then((post) => {
      console.log('post fetched');
      res.render(createPath('post'), { title, post });
    })
    .catch((error) => {
      handleError(res, error);
    });
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      handleError(res, error);
    });
};

const getEditPost = (req, res) => {
  const title = 'Edit post';
  Post.findById(req.params.id)
    .then((post) => {
      console.log('post fetched');
      res.render(createPath('edit-post'), { title, post });
    })
    .catch((error) => {
      handleError(res, error);
    });
};

const editPost = (req, res) => {
  const { title, text, author } = req.body;
  const id = req.params.id;
  Post.findByIdAndUpdate(id, { title, text, author })
    .then((result) => {
      res.redirect(`/posts/${id}`);
    })
    .catch((error) => {
      handleError(res, error);
    });
};

const getPosts = (req, res) => {
  const title = 'Posts';
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      console.log('posts fetched');
      res.render(createPath('posts'), { title, posts });
    })
    .catch((error) => {
      handleError(res, error);
    });
};

const getAddPost = (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
};

const addPost = (req, res) => {};

module.exports = { 
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost,
  addPost
};
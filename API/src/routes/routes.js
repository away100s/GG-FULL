const express = require('express');
const router = express.Router();
const {
  getListVideos,
  postVideo,
  getDetailVideo,
} = require('../controllers/videoController');
const {
  getListProduct,
  postProduct,
} = require('../controllers/productController');
const {
  getListComment,
  postComment,
} = require('../controllers/commentController');
const { sseController } = require('../controllers/sseController');

// POST / - Endpoint for posting a new video
router.post('/', postVideo);

// GET / - Endpoint for getting a list of videos
router.get('/', getListVideos);

// GET /:videoID - Endpoint for getting details of a specific video
router.get('/:videoID', getDetailVideo);

// GET /:videoID/product - Endpoint for getting a list of products associated with a video
router.get('/:videoID/product', getListProduct);

// POST /:videoID/product - Endpoint for posting a new product for a video
router.post('/:videoID/product', postProduct);

// GET /:videoID/comment - Endpoint for getting a list of comments associated with a video
router.get('/:videoID/comment', getListComment);

// Comment SSE Route
router.get('/:videoID/comment/sse', sseController);

// POST /:videoID/comment - Endpoint for posting a new comment for a video
router.post('/:videoID/comment', postComment);

module.exports = router;

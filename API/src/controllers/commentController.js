const {
  getListCommentService,
  postCommentService,
} = require('../services/commentService');
const AppError = require('./AppError');
const { eventEmitter } = require('./sseController');

const getListComment = async (req, res, next) => {
  const { videoID } = req.params;
  try {
    // Get a list of comments associated with the specified videoID from the commentService
    const comments = await getListCommentService(videoID);

    // If no comments are found, throw a custom AppError with a 404 status
    if (comments.length < 1) throw new AppError('No comments', 404);

    // Send the list of comments as a JSON response
    res.status(200).json({ status: 'success', list_comments: comments });
  } catch (err) {
    // Pass the error to the error-handling middleware
    next(err);
  }
};

const postComment = async (req, res, next) => {
  const { username, comment } = req.body;
  const { videoID } = req.params;

  try {
    // Check if the required input data is provided, else throw a custom AppError with a 400 status
    if (!username) throw new AppError('Please input username!', 400);
    if (!comment) throw new AppError('Please input comment!', 400);

    // Post a new comment for the specified video using the commentService
    const newComment = await postCommentService(videoID, username, comment);

    // Emit the new comment event
    eventEmitter.emit('newComment', {
      newComment,
    });

    // Send the inserted comment as a JSON response with a 201 status (created)
    res.status(201).json({ status: 'success', inserted_comment: newComment });
  } catch (err) {
    // Pass the error to the error-handling middleware
    next(err);
  }
};

module.exports = { getListComment, postComment };

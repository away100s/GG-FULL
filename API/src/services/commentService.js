const Comment = require('../models/Comment');
const Video = require('../models/Video');

const getListCommentService = async (videoID) => {
  try {
    // Validate that the videoID is a valid MongoDB ObjectId
    const isValidVideoID = videoID.match(/^[0-9a-fA-F]{24}$/);
    if (!isValidVideoID) return null;

    // Find all comments associated with the video (excluding the 'video' field)
    const comments = await Comment.find({ video: videoID }).select('-video');

    return comments;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get user comments: ' + err.message);
  }
};

const postCommentService = async (videoID, username, comment) => {
  try {
    // Validate that the videoID is a valid MongoDB ObjectId
    const isValidVideoID = videoID.match(/^[0-9a-fA-F]{24}$/);
    if (!isValidVideoID) throw new Error('VideoID is invalid');
    if (!username) throw new Error('Username is required!');
    if (!comment) throw new Error('Comment is required!');

    // Find the video with the specified videoID
    const queriedVideo = await Video.findById(videoID);
    if (!queriedVideo) throw new Error('VideoID is not found');

    // Create a new Comment instance with the given data
    const newComment = new Comment({
      username: username,
      comment: comment,
    });
    newComment.video = videoID;

    // Save the new comment to the database
    const data = await newComment.save();

    // Update the list_comments array of the associated video by adding the new comment
    queriedVideo.list_comments.push(newComment);
    await queriedVideo.save();

    // Return the saved comment object
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to post user comment: ' + err.message);
  }
};

module.exports = { getListCommentService, postCommentService };

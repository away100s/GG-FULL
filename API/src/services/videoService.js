const Video = require('../models/Video');

const getListVideosService = async () => {
  try {
    // Retrieve a list of videos from the database, excluding detailed product and comment information
    const video = await Video.find().select('-list_products -list_comments');
    return video;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get videos: ' + err.message);
  }
};

const getDetailVideosService = async (videoID) => {
  try {
    // Validate that the videoID is a valid MongoDB ObjectId
    const isValidVideoID = videoID.match(/^[0-9a-fA-F]{24}$/);
    if (!isValidVideoID) return null;

    // Find the video with the specified videoID and populate the list_products and list_comments fields
    const video = await Video.findById(videoID).populate(
      'list_products list_comments'
    );
    return video;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get videos: ' + err.message);
  }
};

const postVideoService = async (username, title, url) => {
  try {
    // Validate input data
    if (!username) throw new Error('Username is Required');
    if (!title) throw new Error('Video title is Required');
    if (!url) throw new Error('URL thumbnail is Required');

    // Create a new video object with the given data
    const newVideo = new Video({
      username: username,
      title: title,
      url_thumbnail: url,
    });

    // Save the new video to the database
    const data = await newVideo.save();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to post videos: ' + err.message);
  }
};

module.exports = {
  getListVideosService,
  postVideoService,
  getDetailVideosService,
};

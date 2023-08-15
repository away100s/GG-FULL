const {
  getListVideosService,
  postVideoService,
  getDetailVideosService,
} = require('../services/videoService');
const AppError = require('./AppError');

const getListVideos = async (req, res, next) => {
  try {
    // Get a list of videos from the videoService
    const videos = await getListVideosService();

    // If no videos are found, throw a custom AppError with a 404 status
    if (videos.length < 1) throw new AppError('No Videos', 404);

    // Send the list of videos as a JSON response
    res.status(200).json({
      status: 'success',
      list_videos: videos,
    });
  } catch (err) {
    // Pass the error to the error-handling middleware
    next(err);
  }
};

const getDetailVideo = async (req, res, next) => {
  const { videoID } = req.params;

  try {
    // Get details of the video with the specified videoID from the videoService
    const video = await getDetailVideosService(videoID);

    // If the video is not found, throw a custom AppError with a 404 status
    if (!video) throw new AppError('No video', 404);

    // Send the video details as a JSON response
    res.status(200).json({ status: 'success', detail_video: video });
  } catch (err) {
    // Pass the error to the error-handling middleware
    next(err);
  }
};

const postVideo = async (req, res, next) => {
  const { username, title, url } = req.body;

  try {
    // Check if the required input data is provided, else throw a custom AppError with a 400 status
    if (!username) throw new AppError('Please input username!', 400);
    if (!title) throw new AppError('Please input video title!', 400);
    if (!url) throw new AppError('Please input URL thumbnail!', 400);

    // Create a new video using the videoService
    const video = await postVideoService(username, title, url);

    // Send the inserted video as a JSON response with a 201 status (created)
    res.status(201).json({ status: 'success', inserted_video: video });
  } catch (err) {
    // Pass the error to the error-handling middleware
    next(err);
  }
};

module.exports = { getListVideos, postVideo, getDetailVideo };

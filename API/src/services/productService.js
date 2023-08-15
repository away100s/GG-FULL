const Product = require('../models/Product');
const Video = require('../models/Video');

const getListProductService = async (videoID) => {
  try {
    // Validate that the videoID is a valid MongoDB ObjectId
    const isValidVideoID = videoID.match(/^[0-9a-fA-F]{24}$/);
    if (!isValidVideoID) return null;

    // Find the video with the specified videoID
    const queriedVideo = await Video.findById(videoID);
    if (!queriedVideo) throw new Error('Video not found');

    // Find all products associated with the video (excluding the 'video' field)
    const products = await Product.find({ video: videoID }).select('-video');

    return products;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get product: ' + err.message);
  }
};

const postProductService = async (videoID, title, link, price) => {
  try {
    // Validate that the videoID is a valid MongoDB ObjectId
    const isValidVideoID = videoID.match(/^[0-9a-fA-F]{24}$/);
    if (!isValidVideoID) throw new Error('VideoID is invalid');

    // Find the video with the specified videoID
    const queriedVideo = await Video.findById(videoID);
    if (!queriedVideo) throw new Error('Video not found');

    // Create a new product object with the given data
    const newProduct = await new Product({
      title: title,
      link: link,
      price_IDR: price,
    });

    // Update the list_products array of the associated video by adding the new product
    queriedVideo.list_products.push(newProduct);

    // Save the modified video with the new product
    await queriedVideo.save();

    // Set the 'video' field of the newly created product to reference the associated video
    newProduct.video = queriedVideo;

    // Save the product with the updated video reference
    return newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to post product: ' + err.message);
  }
};

module.exports = { getListProductService, postProductService };

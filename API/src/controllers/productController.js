const {
  getListProductService,
  postProductService,
} = require('../services/productService');
const AppError = require('./AppError');

const getListProduct = async (req, res, next) => {
  const { videoID } = req.params;

  try {
    // Get a list of products associated with the specified videoID from the productService
    const products = await getListProductService(videoID);

    // If no products are found, throw a custom AppError with a 404 status
    if (products.length === 0) throw new AppError('No Products', 404);

    // Send the list of products as a JSON response
    res.status(200).json({ status: 'success', list_products: products });
  } catch (err) {
    // Pass the error to the error-handling middleware
    next(err);
  }
};

const postProduct = async (req, res, next) => {
  const { title, link, price_IDR } = req.body;
  const { videoID } = req.params;

  try {
    // Check if the required input data is provided, else throw a custom AppError with a 400 status
    if (!title) throw new AppError('Please input title!', 400);
    if (!link) throw new AppError('Please input link product!', 400);
    if (!price_IDR || isNaN(price_IDR))
      throw new AppError('Please input the right price_IDR!', 400);

    // Post a new product for the specified video using the productService
    const newProduct = await postProductService(
      videoID,
      title,
      link,
      Number(price_IDR)
    );

    // Send the inserted product as a JSON response with a 201 status (created)
    res.status(201).json({ status: 'success', inserted_product: newProduct });
  } catch (err) {
    // Pass the error to the error-handling middleware
    next(err);
  }
};

module.exports = { getListProduct, postProduct };

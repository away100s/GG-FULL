// Load environment variables from the .env file (if present)
require('dotenv').config();

// Import required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT;
const router = require('./src/routes/routes');
const DATABASE_URL = process.env.MYDATABASE_URL;

//Enable all the CORS request
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://tokplay.netlify.app/'],
  })
);

// Connect to the MongoDB database using the provided URL or a default one
mongoose
  .connect(DATABASE_URL || 'mongodb://0.0.0.0:27017/tokopedia')
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((error) => {
    console.log(error);
  });

// Parse incoming request bodies as URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Use the defined routes from the 'routes' module
app.use(router);

// Error handling middleware to handle errors in the application
app.use((err, req, res, next) => {
  let { status = 500, message = 'Terjadi Kesalahan Dalam Server' } = err;
  console.log(message);
  res.status(status).json({ status: 'Failed', message: message });
});

// Start the server on the specified PORT from environment variables or use a default of 3000
app.listen(PORT || 3000, () => {
  console.log(`The server is running in ${PORT}`);
});

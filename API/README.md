# Tokopedia Play Clone API

This is the mid-term project in Generasi GIGIH 3.0. By doing this project I gained experience in designing a RESTful API, handling HTTP methods, and managing database modelling. Error handling taught me how to handle unexpected scenarios and provide meaningful error messages. Deploying the application to a production environment exposed me to live server setup. I practised organizing code and following clean code practices for maintainability. The project management aspect involved planning, setting milestones, and meeting deadlines. Problem-solving skills were honed as I tackled challenges and bugs. Writing documentation, like the README, improved my ability to communicate technical information clearly and concisely. This project provided a valuable learning opportunity, helping me grow as a developer and prepare for future endeavours in software development.

## Table of Contents

- [Database Structure](#database-structure)
- [API Structure](#api-structure)
- [API Endpoints](#api-endpoints)
- [How to Run Locally](#how-to-run-locally)
- [Deployment](#deployment)

## Database Structure

Here is the structure of the database, including the relationships between models (Video, Product, Comment, User).

- `Video` Model:
  - `url_thumbnail`: String (required) - URL of the video thumbnail.
  - `title`: String (required) - Title of the video.
  - `username`: String (required) - Username of the video creator.
  - `list_products`: Array of ObjectIds (references `Product`) - List of products associated with the video.
  - `list_comments`: Array of ObjectIds (references `Comment`) - List of comments associated with the video.

- `Product` Model:
  - `video`: ObjectId (references `Video`) - Video to which the product belongs.
  - `title`: String (required) - Title of the product.
  - `link`: String (required) - Link to the product.
  - `price_IDR`: Number (required) - Price of the product in Indonesian Rupiah (IDR).

- `Comment` Model:
  - `video`: ObjectId (references `Video`) - Video to which the comment belongs.
  - `username`: String (required) - Username of the commenter.
  - `comment`: String (required) - Comment text.
  - `timestamp`: Date (default: current timestamp) - Timestamp of when the comment was made.

## API Structure

The API follows a RESTful structure and is organized into the following components:

- `routes`: Contains the route definitions for the API endpoints.
- `controllers`: Contains the logic to handle API requests and responses.
- `services`: Contains the business logic to interact with the database and perform CRUD operations on models.
- `models`: Contains the Mongoose schema definitions for the database models.

The flow of data in the API is as follows: HTTP requests are received by the routes, which then call the corresponding controller functions. The controllers interact with the services to perform operations on the database models and retrieve data. Finally, the controllers respond with JSON data to the client.

## API Endpoints

The API provides the following endpoints:

| Endpoint                | Method | Request Body                                           | Response Body                                     | Description                   |
|-------------------------|--------|--------------------------------------------------------|---------------------------------------------------|-------------------------------|
| `/`           | GET    | N/A                                                    | `{ status: 'success', list_videos: [...] }`       | Get a list of video thumbnails |
| `/:videoID`  | GET    | N/A                                                    | `{ status: 'success', detail_video: {...} }`     | Get details of a specific video |
| `/`           | POST   | `{ username: '...', title: '...', url: '...' }`      | `{ status: 'success', inserted_video: {...} }`   | Post a new video              |
| `/:videoID/products`| GET    | N/A                                                    | `{ status: 'success', list_products: [...] }`    | Get a list of products for a video |
| `/:videoID/products`| POST   | `{ title: '...', link: '...', price_IDR: ... }`      | `{ status: 'success', inserted_product: {...} }` | Post a new product for a video |
| `/:videoID/comments`| GET    | N/A                                                    | `{ status: 'success', list_comments: [...] }`    | Get a list of comments for a video |
| `/:videoID/comments`| POST   | `{ username: '...', comment: '...' }`                | `{ status: 'success', inserted_comment: {...} }` | Post a new comment for a video |
| `/:videoID/comments/sse`| GET   | N/A                                              | `data: {"newComment":{ {...} }` | Get a realtime new comment for a video |

### Video API

- **GET /**: Get a list of all videos.
  - Request: None
  - Response:
  ```json
  {
    "status": "success",
    "list_videos": [
      {
        "_id": "video_id",
        "url_thumbnail": "thumbnail_url",
        "title": "Video Title",
        "username": "Uploader",
      },
      // ...other videos
    ]
  }
  ```

- **GET /:videoID**: Get details of a specific video.
  - Request: None
  - Response:
  ```json
  {
    "status": "success",
    "detail_video": {
      "_id": "video_id",
      "url_thumbnail": "thumbnail_url",
      "title": "Video Title",
      "username": "Uploader",
      "views": 1000,
      "list_products": [
        {
          "_id": "product_id",
          "title": "Product Title",
          "link": "product_link",
          "price_IDR": 50000
        },
        // ...other products
      ],
      "list_comments": [
        {
          "_id": "comment_id",
          "username": "Commenter",
          "comment": "This is a comment",
          "timestamp": "2023-07-27T12:34:56.789Z"
        },
        // ...other comments
      ]
    }
  }
  ```

- **POST /**: Post a new video.
  - Request:
  ```json
  {
    "username": "Uploader",
    "title": "Video Title",
    "url": "thumbnail_url"
  }
  ```
  - Response:
  ```json
  {
    "status": "success",
    "inserted_video": {
      "_id": "new_video_id",
      "username": "Uploader",
      "title": "Video Title",
      "url_thumbnail": "thumbnail_url",
      "views": 0,
      "list_products": [],
      "list_comments": []
    }
  }
  ```

### Product API

- **GET /:videoID/product**: Get a list of products associated with a video.
  - Request: None
  - Response:
  ```json
  {
    "status": "success",
    "list_products": [
      {
        "_id": "product_id",
        "title": "Product Title",
        "link": "product_link",
        "price_IDR": 50000
      },
      // ...other products
    ]
  }
  ```

- **POST /:videoID/product**: Post a new product for a video.
  - Request:
  ```json
  {
    "title": "Product Title",
    "link": "product_link",
    "price_IDR": 50000
  }
  ```
  - Response:
  ```json
  {
    "status": "success",
    "inserted_product": {
      "_id": "new_product_id",
      "title": "Product Title",
      "link": "product_link",
      "price_IDR": 50000
    }
  }
  ```

### Comment API

- **GET /:videoID/comment**: Get a list of comments associated with a video.
  - Request: None
  - Response:
  ```json
  {
    "status": "success",
    "list_comments": [
      {
        "_id": "comment_id",
        "username": "Commenter",
        "comment": "This is a comment",
        "timestamp": "2023-07-27T12:34:56.789Z"
      },
      // ...other comments
    ]
  }
  ```
- **GET /:videoID/comment/sse**: Server-Sent Events (SSE) have been implemented to provide real-time updates for comments. Clients can subscribe to the SSE endpoint to receive new comment events as they are posted.
  - Request: None
  - Response: SSE events for new comments.

- **POST /:videoID/comment**: Post a new comment for a video.
  - Request:
  ```json
  {
    "username": "Commenter",
    "comment": "This is a comment"
  }
  ```
  - Response:
  ```json
  {
    "status": "success",
    "inserted_comment": {
      "_id": "new_comment_id",
      "username": "Commenter",
      "comment": "This is a comment",
      "timestamp": "2023-07-27T12:34:56.789Z"
    }
  }
  ```

## How to Run Locally

To run the application locally on your machine, follow these steps:

1. Clone the repository to your local machine:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project folder:
   ```
   cd <project-folder>
   ```

3. Install dependencies using npm or yarn:
   ```
   npm install
   ```

4. Set up environment variables (if required) by creating a `.env` file in the root folder and defining the necessary variables (e.g., `PORT`, `MYDATABASE_URL`.).

5. Start the server:
   ```
   npm start
   ```

6. The API should now be running locally at `http://localhost:3000` or the specified `PORT`.

Note: Make sure you have Node.js and MongoDB installed on your machine before running the project locally.

## Deployment

The project is deployed and accessible at the following link:
[https://tokopedia-play-clone.cyclic.app/](https://tokopedia-play-clone.cyclic.app/)

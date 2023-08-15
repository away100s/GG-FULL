const { getListCommentService } = require('../services/commentService');
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

const sseController = async (req, res, next) => {
  try {
    const { videoID } = req.params;

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.flushHeaders();

    // Send a comment event when new comments are posted
    eventEmitter.on('newComment', (comment) => {
      res.write(`data: ${JSON.stringify(comment)}\n\n`);
    });

    // Handle SSE disconnect
    res.on('close', () => {
      console.log(`SSE client disconnected for videoID: ${videoID}`);
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { sseController, eventEmitter };

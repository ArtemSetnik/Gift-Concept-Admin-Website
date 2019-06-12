const logger = require('winston');
const server = require('./server/app');

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise ', p, reason)
});

server.timeout = 20000;

// const redis = require('./redis');
const os = require('os');
const winston = require('winston');
// require('winston-redis').Redis;

const HOST_NAME = os.hostname();
//
// const transportRedis = new winston.transports.Redis({
//   redis: redis.client,
//   length: 1000,
//   handleExceptions: true,
//   container: 'logs:api',
//   json: true
// });
//
const transportConsole = new winston.transports.Console({
  level: 'debug',
  handleExceptions: true,
  humanReadableUnhandledException: true,
  colorize: true
});

function includeServerData(level, msg, meta) {
  if(meta)
    meta.host = HOST_NAME;
  return meta;
}

function censorMetaData(level, msg, meta) {
  if (meta && meta.creditCard) {
    const suffix = meta.creditCard.toString().substr(-4);
    meta.creditCard = ('*').repeat(meta.creditCard.length-4) + suffix;
  }

  if (meta && meta.password) {
    meta.password === '********';
  }

  return meta;
}

const logger = new winston.Logger({
  transports: [
    // transportRedis,
    transportConsole
  ],
  rewriters: [censorMetaData, includeServerData],
  exitOnError: false
});

logger.rewriters.push();

module.exports = logger;

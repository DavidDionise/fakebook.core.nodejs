const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const redis = require('promise-redis')();
const config = require('config');
require('dotenv').config();

/**
 * @description - Stores a key from Redis into the config object
 * @param {string} key - Key from Redis DB
 * @param {Object} client - Redis client object
 */
const configSetter = async (key, client) => {
  const value = await client.get(key);
  const trunc_key = key.substr(7);
  config.setValue(trunc_key, value);
}

/**
 * @description - Promgrammatically runs the mocha tests, and gets
 *    system settings from the Redis database to store in the
 *    core project's config object
 */
const initTests = async () => {
  const mocha = new Mocha({ timeout : process.env.DEBUG_MODE == 'true' ? 10000000 : 10000, watch: true });
  let environment;
  switch(process.env.NODE_ENV) {
    case 'development':
    case 'test':
      environment = 'LOCAL';
      break;
    default:
      throw new Error('Invalid NODE_ENV value set.');
  }
  const redisOptions = {
    host : process.env[`REDIS_HOST_${environment}`],
    port : process.env[`REDIS_PORT_${environment}`],
    password : process.env[`REDIS_PASSWORD_${environment}`]
  };
  // ************ REDIS SETUP ************* //
  const redis_client = redis.createClient(redisOptions);

  redis_client.on('error', (err) => {
    logger.error('REDIS CONNECTION ERROR : ', err);
  });
  // ************************************** //

  // ************ CONFIG SETUP ************ //
  const config_keys = await redis_client.keys('config:*');
  await Promise.all(config_keys.map(key => configSetter(key, redis_client)));

  // ************************************** //

  const file_dir = process.env.TEST_DIR;
  if(!file_dir) {
    throw new Error(`Must pass in a 'TEST_DIR' environment variable.`)
  }

  const absolute_dir = `${path.resolve(__dirname)}${file_dir.startsWith('/') ? file_dir : `/${file_dir}`}`;
  const files = fs.readdirSync(absolute_dir);

  const excluded_files = [
    '.DS_Store'
  ];
  files.forEach(file => {
    if(excluded_files.find(ef => path.parse(file).name == ef) == null) {
      mocha.addFile(path.join(absolute_dir, file));
    }
  });

  mocha.run((err) => {
    process.on('exit', () => {
      process.exit(err)
    });
  });
}

module.exports = initTests;

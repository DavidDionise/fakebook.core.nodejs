const config = require('config');

const initConfig = (options) => {
  for(const key in options) {
    config.setValue(key, options[key]);
  }
}

module.exports = initConfig;

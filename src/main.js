const fs = require('fs');
const { initConfig } = require('utils');
const initGateways = require('gateways');

const core = (config) => {
  initConfig(config);
  initGateways();
}

module.exports = core;

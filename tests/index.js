require('babel-register');
const { initTests } = require('test-utils');
const { logger } = require('utils');

initTests().catch(ex => logger.error(ex));

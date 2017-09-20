const config = require('config');
const { resolve } = require('path');

const connect = (model) => {
  const db_service = config.getValue('db_service');
  const path = resolve(`${__dirname}/../../gateways/${db_service}/${model.name.toLowerCase()}`);
  const gateway = require(path);
  const gateway_func_config = {
    save: 'instance',
    find: 'static',
    remove: 'instance'
  };

  for(const func in gateway) {
    if(gateway_func_config[func] == 'instance') {
      model.prototype[func] = function() { return gateway[func].call(this) };
    }
    else {
      model[func] = gateway[func];
    }
  }

  return model;
}

module.exports = connect;

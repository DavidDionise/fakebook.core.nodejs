const fs = require('fs');
const path = require('path');
const config = require('config');

const postgres_connection = () => {
  const pgp = require('pg-promise')({});
  let environment = null;
  switch(process.env.NODE_ENV) {
    case 'development':
    case 'test':
      environment = 'development';
      break;
    default:
      throw new Error('Invalid NODE_ENV value');
  }
  const pg_config = {
    host: config.getValue(`db:${environment}:postgres:host`),
    port: config.getValue(`db:${environment}:postgres:port`),
    username: config.getValue(`db:${environment}:postgres:username`),
    password: config.getValue(`db:${environment}:postgres:password`),
    database: 'fakebook',
    poolSize: 100
  }
  return pgp(pg_config);
}

const init = () => {
  const db_service = config.getValue('db_service');

  let connection;
  switch(db_service) {
    case 'postgres':
      connection = postgres_connection();
      break;
    default:
      throw new Error(`Invalid 'db_service' config property : ${db_service}`);
  }

  const gateway_dir_path = path.resolve(`${__dirname}/${db_service}`)
  const gateway_files = fs.readdirSync(gateway_dir_path);
  for(const gateway of gateway_files) {
    const mod = require(`${gateway_dir_path}/${path.parse(gateway).name}`);
    for(let func in mod) {
      const function_ref = mod[func];
      mod[func] = function(...args) { return function_ref.call(this, ...args, { db: connection }) };
    }
  }
}

module.exports = init;

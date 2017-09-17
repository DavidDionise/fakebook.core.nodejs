const config = {};

const getValue = prop_name => config[prop_name];
const setValue = (prop_name, value) => config[prop_name] = value;

module.exports = {
  getValue,
  setValue
};

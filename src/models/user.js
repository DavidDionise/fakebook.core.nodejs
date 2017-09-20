const Model = require('./model');
const { connect } = require('models/utils');

class User extends Model {
  constructor(props) {
    super(props);
    const {
      first_name,
      last_name,
      email
    } = props || {};

    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}

module.exports = connect(User);

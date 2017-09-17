const model = require('./model');

class User extends Model {
  constructor(props) {
    const {
      first_name
      last_name,
      email
    } = props || {};

    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}

module.exports = User;

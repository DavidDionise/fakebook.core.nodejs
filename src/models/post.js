const Model = require('./model');
const { connect } = require('models/utils');

class Post extends Model {
  constructor(props) {
    super(props);
    const {
      user,
      body
    } = props || {};

    this.user = user;
    this.body = body;
  }
}

module.exports = connect(Post);

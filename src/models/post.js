const model = require('./model');

class Post extends Model {
  constructor(props) {
    const {
      user,
      body
    } = props || {};

    this.user = user;
    this.body = body;
  }
}

module.exports = Post;

const model = require('./model');

class Message extends Model {
  constructor(props) {
    const {
      conversation,
      user
    } = props || {};

    this.conversation = conversation;
    this.user = user;
  }
}

module.exports = Message;

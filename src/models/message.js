const Model = require('./model');
const { connect } = require('models/utils');

class Message extends Model {
  constructor(props) {
    super(props);
    const {
      conversation,
      user
    } = props || {};

    this.conversation = conversation;
    this.user = user;
  }
}

module.exports = connect(Message);

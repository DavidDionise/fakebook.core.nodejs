const Model = require('./model');
const { connect } = require('models/utils');

class Conversation extends Model {
  constructor(props) {
    super(props);
  }
}

module.exports = connect(Conversation);

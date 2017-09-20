const Model = require('./model');
const { connect } = require('models/utils');

class Event extends Model {
  constructor(props) {
    super(props);
    const {
      user,
      title,
      body,
      start_date,
      end_date
    } = props || {};

    this.user = user;
    this.title = title;
    this.body = body;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}

module.exports = connect(Event);

const model = require('./model');

class Event extends Model {
  constructor(props) {
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

module.exports = Event;

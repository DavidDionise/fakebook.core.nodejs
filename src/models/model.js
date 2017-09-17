class Model {
  constructor(props) {
    const {
      id,
      created_timestamp,
      updated_timestamp
    } = props || {};

    this.id = id;
    this.created_timestamp = created_timestamp;
    this.updated_timestamp = updated_timestamp
  }
}

module.exports = Model;

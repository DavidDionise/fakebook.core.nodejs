

module.exports = {
  save: async function() {
    try {
      // console.log('this = ', this);
    }
    catch(ex) {
      console.log(ex);
    }
  },
  find: async function() {
    try {
      console.log('arguments = ', arguments);
    }
    catch(ex) {
      console.log(ex);
    }
  },
  remove: async function() {

  }
};

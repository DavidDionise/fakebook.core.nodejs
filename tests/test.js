const config = {
  'db:postgres:host': 'localhost',
  'db:postgres:port': 5432,
  'db:postgres:username': 'fakebook_admin',
  'db:postgres:password': 'Fakebook1',
  db_service: 'postgres'
};

const core = require('../dist/main')(config);
const User = require('../dist/models/user');
const exec = async () => {
  await User.find();
  const user = new User();
  try {
    console.log(user);
  }
  catch(ex) {
    console.log(ex);
  }
}

exec();

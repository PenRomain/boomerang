const keypress = require('keypress');
const { User } = require('./db/models');
const { sequelize } = require('./db/models');

async function authenticate() {
  try {
    await sequelize.authenticate();
  } catch (e) {
    console.log(e.message);
  }
}

authenticate();

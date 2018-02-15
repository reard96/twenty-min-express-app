const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/twenty_min_app_db');

const People = conn.define('people', {
  firstName: Sequelize.STRING
});

const syncAndSeed = () => {
  return conn.sync( {force: true} )
  .then(() => {
    return Promise.all([
      People.create({ firstName: 'Tom' }),
      People.create({ firstName: 'Dick' }),
      People.create({ firstName: 'Harry' }),
    ]);
  });
};

module.exports = {
  syncAndSeed,
  models: {
    People
  }
};

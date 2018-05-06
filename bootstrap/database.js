const data = require('../data/data');
const winston = require('winston');

const db = {
  connect() {
    return data.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
      .then(function(models) {
        global.models = models;
      })
      .catch(function(err) {
        winston.error(' > ERR!', err);
        process.exit(-1);
      });
  },
};

module.exports = db;

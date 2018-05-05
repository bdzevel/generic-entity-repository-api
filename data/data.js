const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const SCHEMAS_DIR = 'schemas';

function connect(mongoUri) {
  return mongoose.connect(mongoUri, {
    auth: { authSource: 'admin' },
    server: { socketOptions: { keepAlive: 1 } },
  });
}

function loadSchemas() {
  return new Promise(function(resolve, reject) {
    fs.readdir(path.join(__dirname, SCHEMAS_DIR), function(err, files) {
      if (err) {
        return reject(err);
      }
      const models = { };
      for (const file of files) {
        const name = file.replace('.js', '');
        // eslint-disable-next-line
        const schema = require(`./${SCHEMAS_DIR}/${name}`);
        const model = mongoose.model(name, schema);
        models[name] = model;
      }
      return resolve(models);
    });
  });
}

function initialize(mongoUri) {
  // Use native promises
  mongoose.Promise = Promise;

  return connect(mongoUri)
    .then(() => loadSchemas());
}

module.exports.connect = initialize;

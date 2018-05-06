const winston = require('winston');
const cors = require('cors');

const allowedOrigins = [
  process.env.APP_SERVER_URL,
];

const config = {
  credentials: true,

  origin(reqOrigin, callback) {
    if (allowedOrigins.some(o => o === reqOrigin)) {
      return callback(null, true);
    }

    winston.debug(`Request origin ${reqOrigin} not allowed`);
    return callback(null, false);
  },
};

module.exports = {
  initialize(app) {
    app.use(cors(config));
  },
};

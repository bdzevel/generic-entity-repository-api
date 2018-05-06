const authController = require('../controllers/auth-controller');

module.exports = function(app) {
  app.post('/auth/login', authController.login);
  app.post('/auth/logout', authController.logout);
};

const mustbe = require('mustbe').routeHelpers();

const userController = require('../controllers/user-controller');
const clientController = require('../controllers/client-controller');

const { ACTIONS } = require('../resources/authorization');

module.exports = function(app) {
  app.post('/api/client', mustbe.authorized(ACTIONS.WRITE_CLIENT_PROFILE), clientController.create);

  app.post('/api/adminUser', mustbe.authorized(ACTIONS.WRITE_CLIENT_USER_PROFILE), userController.createAdmin);
  app.post('/api/user', mustbe.authorized(ACTIONS.WRITE_OWN_CLIENT_USER_PROFILE), userController.create);
  app.get('/api/user', mustbe.authorized(ACTIONS.READ_OWN_PROFILE), userController.getCurrentUser);
};

const dotenv = require('dotenv');

dotenv.config();
const database = require('../../bootstrap/database');

const { ROLES } = require('../../resources/authorization');

module.exports = {
  up(db, next) {
    database.connect()
      .then(function() {
        const Client = global.models.client;
        const system = new Client({ name: 'System', friendlyName: 'System' });
        return system.save();
      })
      .then(function(system) {
        const userService = require('../../services/user-service');
        const userInfo = {
          username: 'admin',
          password: 'Admin123!',
          client: system,
          roles: [ ROLES.FULL_ADMIN ],
        };
        return userService.createUser(userInfo);
      })
      .then(next);
  },

  down(db, next) {
    db.collection('users')
      .deleteOne({ username: 'admin' }, function() {
        db.collection('clients').deleteOne({ name: 'System' }, next);
      });
  },
};

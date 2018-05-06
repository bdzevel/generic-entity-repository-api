const bcrypt = require('bcrypt');

const User = global.models.user;

const self = {
  sanitize(user) {
    if (!user) {
      return null;
    }
    const outputFields = [ 'username', 'firstName', 'lastName' ];
    return outputFields.reduce((acc, curr) => ({ ...acc, [curr]: user[curr] }), { });
  },

  createUser(options) {
    const { username, password, client, firstName, lastName, emailAddress, roles } = options;
    return bcrypt.hash(password, 10)
      .then(function(hash) {
        const newUser = new User({ username, password: hash, client, firstName, lastName, emailAddress, roles });
        return self.saveUser(newUser);
      });
  },

  saveUser(user) {
    return user.save();
  },
};

Object.freeze(Object.assign(module.exports, self));

const winston = require('winston');

const userService = require('../services/user-service');

const User = global.models.user;
const Client = global.models.client;

const { ROLES } = require('../resources/authorization');

function createUser(req, res, role) {
  const username = req.body.username.toLowerCase();
  const { clientName, firstName, lastName, emailAddress } = req.body;
  return Promise.all([ Client.findOne({ name: clientName }), User.findOne({ username }) ])
    .then(([ client, existingUser ]) => {
      if (!client || !!existingUser) {
        return res.status(403).end();
      }
      return userService.createUser({
        username,
        password: 'Password123!',
        client,
        firstName,
        lastName,
        emailAddress,
        roles: [ role ],
      })
        .then(function(user) {
          const profile = userService.sanitize(user);
          res.status(200).json(profile);
        });
    })
    .catch(function(err) {
      winston.error('Error! ', err);
      res.status(500).end();
    });
}

const self = {
  createAdmin(req, res) {
    createUser(req, res, ROLES.CLIENT_ADMIN);
  },

  create(req, res) {
    // Set client or override it (if provided) with the current user's client
    //  Client admins are only allowed to create users under their own client
    req.body.clientName = req.user.client.name;
    createUser(req, res, ROLES.CLIENT_USER);
  },

  getCurrentUser(req, res) {
    const profile = userService.sanitize(req.user);
    const output = {
      ...profile,
      isAuthenticated: !!req.user,
      isAdmin: !!req.user && req.user.roles.includes(ROLES.FULL_ADMIN),
    };
    res.status(200).json(output);
  },
};

module.exports = self;

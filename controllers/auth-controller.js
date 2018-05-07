const passport = require('passport');

const userService = require('../services/user-service');

const { ROLES } = require('../resources/authorization');

const self = {
  login(req, res) {
    passport.authenticate('local')(req, res, function() {
      const profile = userService.sanitize(req.user);
      const output = {
        ...profile,
        isAuthenticated: !!req.user,
        isAdmin: !!req.user && req.user.roles.includes(ROLES.FULL_ADMIN),
      };
      return res.status(200).json(output);
    });
  },

  logout(req, res) {
    req.logout();
    return res.status(200).end();
  },
};

module.exports = self;

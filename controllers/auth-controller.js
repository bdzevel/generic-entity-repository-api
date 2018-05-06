const passport = require('passport');

const userService = require('../services/user-service');

const self = {
  login(req, res) {
    passport.authenticate('local')(req, res, function() {
      const profile = userService.sanitize(req.user);
      return res.status(200).json({ ...profile, isAuthenticated: !!req.user });
    });
  },

  logout(req, res) {
    req.logout();
    return res.status(200).end();
  },
};

module.exports = self;

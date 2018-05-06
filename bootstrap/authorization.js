const mustbe = require('mustbe');

const { ACTIONS, ACTIONS_PER_ROLE, ACTIONS_REQUIRE_CLIENT_PRIVILEGES } = require('../resources/authorization');

const authService = require('../services/auth-service');

const auth = {
  initialize() {
    mustbe.configure(function(config) {
      config.routeHelpers(function(rh) {
        rh.getUser(function(req, cb) {
          cb(null, req.user);
        });

        rh.notAuthorized(function(req, res) {
          const output = { status: (!req.user ? 'unauthenticated' : 'unauthorized') };
          res.status(403).send(output);
        });

        rh.parameterMaps(function(params) {
          // Map "clientName" parameter for actions that require client privileges
          //  (it will be looked up and checked when checking authorization)
          for (const action of ACTIONS_REQUIRE_CLIENT_PRIVILEGES) {
            params.map(action, req => ({ clientName: req.body.clientName }));
          }
        });
      });

      config.activities(function(activities) {
        for (const key in ACTIONS) {
          const action = ACTIONS[key];
          activities.can(action, function(identity, params, cb) {
            if (!identity.user || !identity.user.roles.some(r => ACTIONS_PER_ROLE[r].includes(action))) {
              return cb(null, false);
            }
            if (!ACTIONS_REQUIRE_CLIENT_PRIVILEGES.includes(action)) {
              return cb(null, true);
            }
            return cb(null, authService.isAuthorized(identity.user, params.clientName));
          });
        }
      });
    });
  },
};

module.exports = auth;

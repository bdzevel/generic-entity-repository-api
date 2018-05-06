const winston = require('winston');

const clientService = require('../services/client-service');

const Client = global.models.client;

const self = {
  create(req, res) {
    const name = req.body.name.toLowerCase();
    const { friendlyName } = req.body;
    Client.findOne({ name })
      .then(function(existing) {
        if (existing) {
          return res.status(403).end();
        }
        return clientService.createClient({ name, friendlyName })
          .then(function(client) {
            const clientProfile = clientService.sanitize(client);
            return res.status(200).json(clientProfile);
          });
      })
      .catch(function(err) {
        winston.error('Error! ', err);
        return res.status(500).end();
      });
  },
};

module.exports = self;

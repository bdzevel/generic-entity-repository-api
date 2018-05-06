const Client = global.models.client;

const self = {
  sanitize(client) {
    if (!client) {
      return null;
    }
    const outputFields = [ 'name', 'friendlyName' ];
    return outputFields.reduce((acc, curr) => ({ ...acc, [curr]: client[curr] }), { });
  },

  createClient(options) {
    const { name, friendlyName } = options;
    const newClient = new Client({ name: name.toLowerCase(), friendlyName });
    return self.saveClient(newClient);
  },

  saveClient(client) {
    return client.save();
  },
};

Object.freeze(Object.assign(module.exports, self));

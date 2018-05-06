const self = {
  isAuthorized(user, clientName) {
    return user.client.name === clientName;
  },
};

Object.freeze(Object.assign(module.exports, self));

const { Schema } = require('mongoose');

const ClientSchema = new Schema({
  name: { type: String, required: true },
  friendlyName: { type: String, required: true },
});

module.exports = ClientSchema;

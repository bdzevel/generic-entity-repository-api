const { Schema } = require('mongoose');

const EntityDefinitionSchema = new Schema({
  name: { type: String, required: true },
  client: { type: Schema.Types.ObjectId, ref: 'client', required: true },
});

module.exports = EntityDefinitionSchema;

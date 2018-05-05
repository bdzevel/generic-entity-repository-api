const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  roles: [ String ],
});

module.exports = UserSchema;

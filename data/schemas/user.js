const { Schema } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  emailAddress: String,
  firstName: String,
  lastName: String,
  roles: [ String ],
});

module.exports = UserSchema;

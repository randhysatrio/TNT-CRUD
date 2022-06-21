require('dotenv').config();
const { Schema, model } = require('mongoose');
const Crypto = require('crypto');

const userSchema = new Schema({
  username: {
    type: String,
    match: [/^[a-zA-Z0-9._]*$/, 'Only letters, numbers, (.), (-) is allowed and no spaces'],
    unique: true,
    required: true,
  },
  password: {
    type: String,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/,
      'Password must consist of min. 6 & max. 10 characters, at least one uppercase & lowercase letter, one number and no spaces',
    ],
    required: true,
  },
});

userSchema.pre('save', function (next) {
  this.password = Crypto.createHmac('SHA256', process.env.CRYPTO_KEY).update(this.password).digest('hex');
  next();
});

const User = model('User', userSchema);

module.exports = User;

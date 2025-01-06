const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isVerified : { type: Boolean, default: false },
  otp : { type: String},
  otpExpiry : { type: Date},
});

module.exports = mongoose.model('User', userSchema);

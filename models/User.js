const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['creator', 'investor'] },
  verified: { type: Boolean, default: false },
  profilePic: {
  type: String,
  default: 'default.jpg' // fallback image
}
});
module.exports = mongoose.model('User', userSchema);
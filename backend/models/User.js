const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  description: { type: String, required: true },
  image: { type: String, required: true },
  revealed: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String, unique: true, sparse: true },
  rewards: [RewardSchema],
});

module.exports = mongoose.model('User', UserSchema);

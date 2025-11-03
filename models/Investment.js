const mongoose = require('mongoose');
const investmentSchema = new mongoose.Schema({
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Investment', investmentSchema);
const mongoose = require('mongoose');
const campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  goalAmount: Number,
  media: [String],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  investments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investment' }],
});
module.exports = mongoose.model('Campaign', campaignSchema);
const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Investment = require('../models/Investment');

router.get('/', async (req, res) => {
  const campaigns = await Campaign.find().populate('creator');
  res.render('home', { campaigns });
});

router.post('/invest/:id', async (req, res) => {
  const { amount } = req.body;
  const campaignId = req.params.id;
  await Investment.create({
    investor: req.session.user._id,
    campaign: campaignId,
    amount
  });
  const campaign = await Campaign.findById(campaignId);
  campaign.investments.push(req.session.user._id);
  await campaign.save();
  res.redirect('/');
});

module.exports = router;
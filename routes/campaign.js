const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Investment = require('../models/Investment');
const requireLogin = require('../middleware/auth');

// GET /campaign/:id — View campaign details
router.get('/:id', requireLogin, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('creator');

    const totalFunded = await Investment.aggregate([
      { $match: { campaign: campaign._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const raisedAmount = totalFunded[0]?.total || 0;

    res.render('campaign-view', { campaign, raisedAmount });
  } catch (err) {
    console.error('Error loading campaign:', err);
    res.status(500).send('Something went wrong');
  }
});

// POST /campaign/:id/invest — Submit investment
router.post('/:id/invest', requireLogin, async (req, res) => {
  try {
    const amount = parseInt(req.body.amount);
    if (!amount || amount <= 0) {
      return res.send('Invalid investment amount');
    }

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).send('Campaign not found');
    }

    await Investment.create({
      user: req.session.user._id,
      campaign: campaign._id,
      amount
    });

    return res.redirect(`/campaign/${campaign._id}`); // ✅ Redirect to updated view
  } catch (err) {
    console.error('Error processing investment:', err);
    return res.status(500).send('Something went wrong');
  }
});

// GET /campaign/:id/analytics — View campaign analytics
router.get('/:id/analytics', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('investments');
    const totalFunded = campaign.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const stats = {
      count: campaign.investments.length,
      successRate: Math.round((totalFunded / campaign.goalAmount) * 100),
      totalFunded,
      goal: campaign.goalAmount
    };
    res.render('analytics', { stats });
  } catch (err) {
    console.error('Error loading analytics:', err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
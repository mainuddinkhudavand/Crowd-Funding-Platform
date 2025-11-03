const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.render('home', { campaigns }); // ✅ Pass campaigns to the view
  } catch (err) {
    console.error('Error loading campaigns:', err);
    res.render('home', { campaigns: [] }); // fallback to empty array
  }
});

module.exports = router;
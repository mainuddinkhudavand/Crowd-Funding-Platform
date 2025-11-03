const express = require('express');
const multer = require('multer');
const router = express.Router();
const Campaign = require('../models/Campaign');
const User = require('../models/User');
const requireLogin = require('../middleware/auth');

const upload = multer({ dest: 'public/uploads/' });

router.get('/create', (req, res) => res.render('create'));

router.post('/create', requireLogin, upload.array('media'), async (req, res) => {
  if (!req.session.user || !req.session.user._id) {
    return res.redirect('/login');
  }

  const { title, description, goalAmount } = req.body;
  const media = req.files.map(f => f.filename);

  const campaign = await Campaign.create({
    title,
    description,
    goalAmount,
    media,
    creator: req.session.user._id
  });

  res.redirect('/');
});

router.get('/badge', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  res.render('badge', { user });
});

module.exports = router;
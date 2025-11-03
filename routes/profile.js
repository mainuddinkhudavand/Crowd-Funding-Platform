const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Campaign = require('../models/Campaign');
const requireLogin = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

// GET /profile — show profile page
router.get('/', requireLogin, async (req, res) => {
  try {
    console.log('Session user:', req.session.user);

    const userId = req.session.user._id;
    const user = await User.findById(userId);
    const campaigns = await Campaign.find({ creator: userId });
    const media = campaigns.flatMap(c => c.media);

    res.render('profile', { user, media }); // ✅ Only one render
  } catch (err) {
    console.error('Error loading profile:', err);
    res.status(500).send('Something went wrong');
  }
});

// POST /profile/update-profile — update profile picture
router.post('/update-profile', requireLogin, upload.single('profilePic'), async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    if (req.file) {
      user.profilePic = req.file.filename;
      await user.save();
    }

    return res.redirect('/profile'); // ✅ Use return to prevent double response
  } catch (err) {
    console.error('Error updating profile:', err);
    return res.status(500).send('Something went wrong');
  }
});

module.exports = router;
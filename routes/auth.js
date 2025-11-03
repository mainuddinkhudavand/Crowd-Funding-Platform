const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

router.get('/signup', (req, res) => {
  res.render('signup');
});
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/signup', async (req, res) => {
  const { fullname, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.send('Email already registered. Please login or use a different email.');
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ fullname, email, password: hashed, role });
  res.redirect('/login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = {
      _id: user._id.toString(),
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      verified: user.verified
    };
    return res.redirect('/');
  }

  res.send('Invalid email or password');
});

module.exports = router;
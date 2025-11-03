require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI);

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/', require('./routes/auth'));
app.use('/creator', require('./routes/creator'));
app.use('/investor', require('./routes/investor'));
app.use('/campaign', require('./routes/campaign'));
app.use('/profile', require('./routes/profile'));
app.use('/', require('./routes/home'));

app.listen(3000, () => console.log('Server running on port 3000'));
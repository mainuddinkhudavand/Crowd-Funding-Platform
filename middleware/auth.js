module.exports = function requireLogin(req, res, next) {
  if (!req.session.user || !req.session.user._id) {
    return res.redirect('/login');
  }
  next();
};
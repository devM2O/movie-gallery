module.exports ={
  ensureAuthenticated: function (req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Please login');
    res.redirect('/users/login');
  },
  ensureNotAuthenticated: function (req, res, next) {
    if(req.isAuthenticated()){
      return res.redirect('/dashboard');
    }
    return next();
  }
}

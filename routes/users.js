const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//user model
const User = require('../models/User');

//user router get
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

//Register handle
router.post('/register', (req, res) =>{
  const {name, email, password, repassword} = req.body;
  let errors = [];

  //check null input
  if(!name || !email || !password || !repassword){
    errors.push({msg: 'Please fill in all fields'});
  }
  //check password matching
  if(password != repassword){
    errors.push({msg: 'Two passwords do not match'});
  }
  //check password length
  if(password.length < 6){
    errors.push({msg: 'Password must be at least 6 characters'});
  }
  if(errors.length > 0){
    res.render('register', {
      errors,
      name,
      email,
      password,
      repassword
    });
  }else {
    //Validation pass
    User.findOne({email: email})
      .then(user =>{
        if(user){
        errors.push({msg: 'This Email already registered'})
        //user already exists
        res.render('register', {
          errors,
          name,
          email,
          password,
          repassword
        });
      }else {
        const newUser = new User({
          name,
          email,
          password
        });
        //hash password
        bcrypt.genSalt(10, (err, salt)=>
          bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            //set password to hashed
            newUser.password = hash;
            newUser.save()
              .then(user =>{
                req.flash('success_msg', 'You are now registered');
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          }));
      }
    });
  }
});

//Login handle
router.post('/login', (req, res, next)=>{
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


//Logout handle
router.get('/logout', (req, res)=>{
  req.logout();
  req.flash('success_msg', 'You are logout');
  res.redirect('/users/login');
});

module.exports = router;

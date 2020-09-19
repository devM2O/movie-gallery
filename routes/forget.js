const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {ensureNotAuthenticated} = require('../config/auth')

//user model
const User = require('../models/User');

//for mailgun
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox1a5bc28c79c949349ab7a393c7bdd51e.mailgun.org';
const api_key = 'acb68f212b266478b0bb81d8fae69818-d5e69b0b-45ea6cd7';
const mg = mailgun({
  apiKey: api_key,
  domain: DOMAIN
});
const jwt = require('jsonwebtoken');
const RESET_PASSWORD_KEY = 'whateveritype123';
//end for mailgun


router.get("/4gotpass",ensureNotAuthenticated, function(req, res) {
  res.render("forgot-password");
});

router.post("/reset",ensureNotAuthenticated, function(req, res) {
  let email = req.body.userEmail;

  if (email == '') {
    req.flash('failure_msg', 'Please type your email');
    res.redirect('/4gotpass');
  } else {
    User.findOne({
      email: email
    }, function(err, foundItem) {
      if (!err && foundItem) {
        let id = foundItem._id;

        const token = jwt.sign({
          _id: id
        }, RESET_PASSWORD_KEY, {
          expiresIn: '20m'
        })
        const data = {
          from: 'noreply@hello.com',
          to: email,
          subject: 'Password Reset',
          html: `
                <h2>Please click on the given link to reset your password!</h2>
                <P>${"http://localhost:3000"}/resetpassword/${token}</p>
               `
        };

        User.updateOne({
          resetLink: token
        }, function(err, success) {
          mg.messages().send(data, function(error, body) {
            console.log(body);
          });
        });
      } else {
        req.flash('failure_msg', 'Your email does not exist in database');
        res.redirect('/4gotpass');
      }
    });
  }
});


router.get("/resetpassword/:token",ensureNotAuthenticated, function(req, res) {
  let token = req.params.token;
  res.render("changePass", {
    token: token
  });
});


router.post("/resetbutton",ensureNotAuthenticated, function(req, res) {
  const resetLink = req.body.token;
  const newPass = req.body.password;
  const confirmPass = req.body.repassword;
  const hashNew = bcrypt.hashSync(newPass, 10);

  if (newPass == '' || confirmPass == '') {
    req.flash('failure_msg', 'All fields are required');
    res.redirect('/resetpassword/' + resetLink);
  } else {

    if (newPass == confirmPass) {
      if (resetLink) {
        jwt.verify(resetLink, RESET_PASSWORD_KEY, function(err, decodeData) {
          if (err) {
            return res.status(401).json({
              error: "incorrect token or it is expired"
            });
          }
          User.findOne({
            resetLink
          }, function(err, user) {
            if (err || !user) {
              return res.status(400).json({
                error: "user with this token does not exist"
              });
            }
            const obj = {
              password: hashNew
            }
            user = _.extend(user, obj);
            user.save(function(err, result) {
              if (err) {
                return res.status(400).json({
                  error: "reset password error"
                });
              } else {
                res.redirect('/admin');
              }
            });
          });
        });
      } else {
        return res.status(400).json({
          error: "authentication error"
        });
      }
    } else {
      req.flash('failure_msg', 'two passwords do not match');
      res.redirect('/resetpassword/' + resetLink);
    }
  }
});



module.exports = router;

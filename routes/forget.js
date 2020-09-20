const express = require('express');
const router = express.Router();
require('dotenv').config();
const _ = require("lodash"); //require lodash
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
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
//end for mailgun

//jsonwebtoken
const jwt = require('jsonwebtoken');
const RESET_PASSWORD_KEY = 'whateveritype123';
//end jsonwebtoken



//nodemailer
//nodemailer step 1
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSWORD
  }
})
//End nodemailer


router.get("/4gotpass",ensureNotAuthenticated, function(req, res) {
  res.render("forgot-password");
});

router.post("/reset",ensureNotAuthenticated, function(req, res) {
  let email = req.body.userEmail;

  if (email == '') {
    req.flash('error_msg', 'Please type your email');
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

        //nodemailer step 2
        let mailOptions = {
          from: 'yourcinema.noreply@gmail.com',
          to: email,
          subject: 'Password Reset Link',
          html: `
                <h2>Please click on the given link to reset your password!</h2>
                <P>${"http://localhost:3000"}/resetpassword/${token}</p>
               `
        }//end nodemailer step 2

        User.updateOne({
          resetLink: token
        }, function(err, success) {
          //nodemailer step 3
          transporter.sendMail(mailOptions, function (err, data) {
            if(err){
              console.log("error occors", err);
            }else {
              console.log("Email sent!!");
              req.flash('success_msg', 'Password reset link has been sent to your email');
              res.redirect('/4gotpass');
            }
          });//close of transporter End nodemailer

        }); //close of User.updateOne
      } else {
        req.flash('error_msg', 'Your email does not exist in database');
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
    req.flash('error_msg', 'All fields are required');
    res.redirect('/resetpassword/' + resetLink);
  } else {

    if (newPass == confirmPass) {
      if (resetLink) {
        jwt.verify(resetLink, RESET_PASSWORD_KEY, function(err, decodeData) {
          if (err) {
            req.flash('error_msg', 'Oops! password does not change because link is expired');
            res.redirect('/users/login');
          }else {
            User.findOne({
              resetLink
            }, function(err, user) {
              if (err || !user) {
                req.flash('error_msg', 'Oops! password does not change because link is expired');
                res.redirect('/users/login');
              }else {
                const obj = {
                  password: hashNew
                }
                user = _.extend(user, obj);   // _.extend()  require lodash
                user.save(function(err, result) {
                  if (err) {
                    return res.status(400).json({
                      error: "reset password error"
                    });
                  } else {
                    User.updateOne({
                      resetLink: ''
                    }, function(err, success) {
                    req.flash('success_msg', 'Your password has been change');
                    res.redirect('/users/login');
                  }
                  );
                  }
                });
              }


            });
          }

        });
      } else {
        return res.status(400).json({
          error: "authentication error"
        });
      }
    } else {
      req.flash('error_msg', 'two passwords do not match');
      res.redirect('/resetpassword/' + resetLink);
    }
  }
});



module.exports = router;

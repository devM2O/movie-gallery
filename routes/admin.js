const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require('mongoose');

//declare name to call models/Enduser
const myModel = require('../models/Enduser');
//call Comment model from myModel
const Comment = myModel.comment;
//call Video model from myModel
const Video = myModel.video;

//Dashboard
router.get('/dashboard',ensureAuthenticated, (req, res)=>

  Comment.find({}, {"comment": 1, "date": 1, "vname": 1}).skip(1).sort({"date": -1})
  .then(comment => {
    if (comment) {
      res.render('dashboard',{
        name: req.user.name,
        commentDB: comment
      }); //end render
    } //end if
  }) //end then
  .catch(err => console.log(err))
);  //end get



router.get('/upload',ensureAuthenticated, (req, res)=>

Comment.find({}, {"comment": 1, "date": 1, "vname": 1}).skip(1).sort({"date": -1})
.then(comment => {
  if (comment) {
    res.render('upload',{
      name: req.user.name,
      id: req.user.id,
      commentDB: comment
    }); //end render
  } //end if
}) //end then
.catch(err => console.log(err))
); //end get

module.exports = router;

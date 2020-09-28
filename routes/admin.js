const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require('mongoose');
const cron = require("node-cron"); //cron scheduller
mongoose.set('useFindAndModify', false); //need for this `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify`

const path = require('path');
var fs = require('fs');

//declare name to call models/Enduser
const myModel = require('../models/Enduser');
//call Comment model from myModel
const Comment = myModel.comment;
//call Video model from myModel
const Video = myModel.video;

//----------------------Go to all videos page--------------------------------//

router.get('/allvideos',ensureAuthenticated, function(req, res) {
  Comment.find({flag: 'true'}).sort({"date": -1})
  .then(comment => {
    if (comment) {
      Video.find({}, function(err, foundItem) {
        if(!err && foundItem){
          res.render('allvideos',{
            name: req.user.name,
            commentDB: comment,
            video: foundItem
          }); //end render
        }
      });
    } //end if
  }) //end then
  .catch(err => console.log(err))
});  //end get

//----------------------Go to all videos page--------------------------------//

router.get('/popular',ensureAuthenticated, function(req, res) {
  Comment.find({flag: 'true'}).sort({"date": -1})
  .then(comment => {
    if (comment) {
      Video.find({popular: "popular"}, function(err, foundItem) {
        if(!err && foundItem){
          res.render('popular',{
            name: req.user.name,
            commentDB: comment,
            video: foundItem
          }); //end render
        }
      });
    } //end if
  }) //end then
  .catch(err => console.log(err))
});  //end get

//----------------------Go to upload page--------------------------------//

router.get('/dashboard',ensureAuthenticated, function(req, res) {
  Comment.find({flag: 'true'}).sort({"date": -1})
  .then(comment => {
    if (comment) {
      res.render('dashboard',{
        name: req.user.name,
        commentDB: comment
      }); //end render
    } //end if
  }) //end then
  .catch(err => console.log(err))
  });  //end get

//----------------------When Click on Clear Noti--------------------------------//

router.get('/clearNoti',ensureAuthenticated, (req, res)=>
  Comment.remove({flag : 'false'}, function(err) {
    if(!err){
        res.redirect('/dashboard');
    }
  })
);
cron.schedule("5 8 * * Mon", function() {
  Comment.remove({flag : 'false'}, function(err) {
    if(!err){
        console.log("done");
    }
  })
});

//---------------------When Click on Noti-------------------------------------//

router.get('/noti/:commentID',ensureAuthenticated, function(req, res) {
  let selectParams = req.params.commentID;
  Comment.findByIdAndUpdate(selectParams, { flag: 'false'}, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        res.redirect('/deadlink');
    }
  });
});

//----------------Go to All Comments------------------------//

router.get('/allalerts',ensureAuthenticated, (req, res)=>
    Comment.updateMany({"flag": 'true'}, {"$set":{"flag": 'false'}}, function (err, docs) {
      if(!err){
        Comment.find({}).skip(1).sort({"date": -1})
        .then(comment => {
          if (comment) {
            res.render('allcomments',{
              name: req.user.name,
              commentDB: comment
            }); //end render
          } //end if
        }) //end then
        .catch(err => console.log(err))
      }
    })
);

//----------------When Click on delete datatable------------------//

router.get('/delete/:dataID',ensureAuthenticated, function(req, res) {
   let dataID = req.params.dataID;


   Video.findOne({_id: dataID}, function (err, item) {
     let img = item.image;
     fs.unlinkSync(`./uploads/${img}`)
     Video.findByIdAndRemove(dataID, function(err) { //findByIdAndRemove from item table
       if (err) {
         console.log(err);
       }else{
         req.flash('success_msg', `successfully deleted ${item.name}`);
         res.redirect("/allvideos");
       }
     });
   })
});

//----------------When Click on remove datatable------------------//

router.get('/remove/:dataID',ensureAuthenticated, function(req, res) {
  let dataID = req.params.dataID;

  Video.findByIdAndUpdate(dataID, { popular: 'normal'}, function (err, docs) {
    if (!err){
        res.redirect('/popular');
    }
  });
});

//------------------------Export Modules--------------------------//

module.exports = router;

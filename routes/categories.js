const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); //need for this `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify`


//declare name to call models/Enduser
const myModel = require('../models/Enduser');
//call Video model from myModel
const Video = myModel.video;

//----------------------get Bollywood------------------------------//

router.get('/Bollywood', function (req, res) {
  var noMatch = null;
  var foundVd = null;
  var foundPo = null;
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Video.find({name: regex}, function (err, foundItem) {
      if(!err){

        if(foundItem.length < 1){
          noMatch = "Oops! No Videos Found, Please try again.";
        }
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundItem, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
      }
    })
  }else {
    Video.find({categorie: "Bollywood"}, function(err, foundVd) {
       //existing? give data to list.ejs
        //this else will be run bcoz of res.redirect("/")
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundVd, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
    });
  }
})

//----------------------get Animation------------------------------//

router.get('/Animation', function (req, res) {
  var noMatch = null;
  var foundVd = null;
  var foundPo = null;
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Video.find({name: regex}, function (err, foundItem) {
      if(!err){

        if(foundItem.length < 1){
          noMatch = "Oops! No Videos Found, Please try again.";
        }
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundItem, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
      }
    })
  }else {
    Video.find({categorie: "Animation"}, function(err, foundVd) {
       //existing? give data to list.ejs
        //this else will be run bcoz of res.redirect("/")
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundVd, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
    });
  }
})

//----------------------get Action------------------------------//

router.get('/Action', function (req, res) {
  var noMatch = null;
  var foundVd = null;
  var foundPo = null;
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Video.find({name: regex}, function (err, foundItem) {
      if(!err){

        if(foundItem.length < 1){
          noMatch = "Oops! No Videos Found, Please try again.";
        }
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundItem, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
      }
    })
  }else {
    Video.find({categorie: "Action"}, function(err, foundVd) {
       //existing? give data to list.ejs
        //this else will be run bcoz of res.redirect("/")
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundVd, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
    });
  }
})

//----------------------get Comedy------------------------------//

router.get('/Comedy', function (req, res) {
  var noMatch = null;
  var foundVd = null;
  var foundPo = null;
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Video.find({name: regex}, function (err, foundItem) {
      if(!err){

        if(foundItem.length < 1){
          noMatch = "Oops! No Videos Found, Please try again.";
        }
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundItem, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
      }
    })
  }else {
    Video.find({categorie: "Comedy"}, function(err, foundVd) {
       //existing? give data to list.ejs
        //this else will be run bcoz of res.redirect("/")
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundVd, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
    });
  }
})

//----------------------get Horror------------------------------//

router.get('/Horror', function (req, res) {
  var noMatch = null;
  var foundVd = null;
  var foundPo = null;
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Video.find({name: regex}, function (err, foundItem) {
      if(!err){

        if(foundItem.length < 1){
          noMatch = "Oops! No Videos Found, Please try again.";
        }
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundItem, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
      }
    })
  }else {
    Video.find({categorie: "Horror"}, function(err, foundVd) {
       //existing? give data to list.ejs
        //this else will be run bcoz of res.redirect("/")
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundVd, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
    });
  }
})

//----------------------get Drama------------------------------//

router.get('/Drama', function (req, res) {
  var noMatch = null;
  var foundVd = null;
  var foundPo = null;
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Video.find({name: regex}, function (err, foundItem) {
      if(!err){

        if(foundItem.length < 1){
          noMatch = "Oops! No Videos Found, Please try again.";
        }
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundItem, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
      }
    })
  }else {
    Video.find({categorie: "Drama"}, function(err, foundVd) {
       //existing? give data to list.ejs
        //this else will be run bcoz of res.redirect("/")
        Video.find({popular: 'popular'}, function (err, foundPo) {
          res.render('home', { //going to home.ejs file when app.get('/')
            homeVideo: foundVd, //giving data to home.ejs
            noMatch: noMatch,
            homePo: foundPo
          });
        })
    });
  }
})

//------------------------Export Modules--------------------------//

module.exports = router;

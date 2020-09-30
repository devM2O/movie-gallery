const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require('mongoose');

const User = require('../models/User');
//declare name to call models/Enduser
const myModel = require('../models/Enduser');

//call Video model from myModel
const Video = myModel.video;

//for photo upload
const multer = require('multer');
const path = require('path');
var fs = require('fs');
//set storage engine for file upload
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
//init upload
const upload = multer({
  storage: storage,
  limits: {fileSize:10000000},
  fileFilter: function (req, file, cb) {
    checkFileType(req, file, cb); //function
  }
});
//checkFileType function
function checkFileType(req,file, cb) {
  //allow ext
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null, true);
  }else{
   return cb(false);
  }
}

//----------------------------- Upload ---------------------------------------//

router.post('/dashUpload',ensureAuthenticated,upload.single('uploadImage'), function (req, res, err) {

const {categorie,rating, movieN, release, dLink, review} = req.body;

  if(!req.file){
    req.flash('error_msg', 'File type must be jpeg|jpg|png|gif')
    res.redirect('/dashboard');
  }else{
    if(!rating || !movieN || !dLink || !review || !release){
      fs.unlinkSync(`./public/uploads/${req.file.filename}`)
      req.flash('error_msg', 'All fields are required');
      res.redirect('/dashboard');
    }else {
      let imgN = req.file.filename;
      const uploadV = new Video({
        review: review,
        name: movieN,
        rating: rating,
        image: imgN,
        link: dLink,
        release: release,
        categorie: categorie
        // comment: defaultCom
      });

      uploadV.save();
      req.flash('success_msg', 'Upload Success!');
      res.redirect('/dashboard');
    }
  }
});

//----------------When Click on edit datatable------------------//

router.post('/editVideo',ensureAuthenticated,upload.single('editImage'), function(req, res) {
  let id = req.body.vdID;
  let vImg = req.body.vImg;
  const {categorie,options, rating, movieN, release, dLink, review} = req.body;


  Video.findByIdAndUpdate(id, { name: movieN, rating: rating, link: dLink, review: review, release: release, categorie: categorie, popular: options}, function (err, docs) {
    if(!err){
      console.log("success");
    }
  });
  if(!req.file){
    req.flash('success_msg', `successfully updated`);
    res.redirect("/allvideos");
  }else {
    let imgN = req.file.filename;
    fs.unlinkSync(`./public/uploads/${vImg}`);
    Video.findByIdAndUpdate(id, { image: imgN,name: movieN, rating: rating, link: dLink, review: review, release: release, categorie: categorie, popular: options}, function (err, docs) {
      if(!err){
        req.flash('success_msg', `successfully updated`);
        res.redirect("/allvideos");
      }
    });
  }

})

//----------------When Click on UpdatePPimg------------------//

router.post('/updatePPImg',ensureAuthenticated,upload.single('editPP'), function(req, res) {
  if(!req.file){
    req.flash('error_msg', 'File type must be jpeg|jpg|png|gif')
    res.redirect('/profile');
  }else {
    let imgN = req.file.filename;
    User.findOne({email: req.user.email}, function (err, foundUser) {
      let id = foundUser._id;
      let old = foundUser.profile;
      fs.unlinkSync(`./public/uploads/${old}`);
      
      var a = 'profile'
      var b = { [a]: imgN }

      User.findByIdAndUpdate(id, b, function (err, docs) {
        if (!err){
            res.redirect('/profile');
        }
      });
    })
  }
})


module.exports = router;

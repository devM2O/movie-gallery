const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//declare name to call models/Enduser
const myModel = require('../models/Enduser');
//call Comment model from myModel
const Comment = myModel.comment;
//call Video model from myModel
const Video = myModel.video;

// var dfReview = "နာမည်​ကြီးလူကြိုက်​များခဲ့တဲ့ကားလေးပဲဖြစ်​ပါတယ်​။ထူးခြားတာကတော့ဒီစီးရီဟာ Limited Series ဖြစ်​ပါတယ်​။ဒီစီးရီးကို ဖန်​တီးခဲ့တဲ့သူကတောဖြစ်​ပြီးတော့အစောပိုင်းကတော့ စပိန်​ရုပ်​သံလိုင်းတခုဖြစ်​တဲ့အတွက်ဖန်​တီးရိုက်​ကူးပေးခဲ့တာပဲ ဖြစ်​ပါတယ်​။ဒီစီးရီးမှာတော့ နာမည်​ကြီးသရုပ်​ဆောင်​တွေပါဝင်​ရိုက်​ကူးထားတာဖြစ်​လို့ သဘောကျမှာအသေအချပါပဲနောက်​ပိုင်းမှာတော့ ဒီကားဟာ စပိန်​တလွှားမှာနာမည်​ကျော်​သွားတဲ့အတွက်​ နာမည်​ကြီးNetflixကနေတာဝန်​ယူဖြန့်ချိပေးခဲ့ပါတယ်​။ဒီseriesအမျိုးအစားလေးကတော့ပေါင်းပြီးခံစားကြည့်ရှုကြရမှာဖြစ်​ပါတယ်​။ဒီseries ရsongဟာဆိုရင်​တော့My life is going onဖြစ်​ပြီးတော့ဒီသီချင်းဟာဆိုရင်​ဒီseries ကိုတစ်​ပိုင်းလောက်​စကြည့်ပြီးတာနဲ့စိတ်​ထဲမှာ ခံစားမှုတခုပေးနိုင်​လောက်​တဲ့အထိစွဲဆောင်​နိုင်​ပါလိမ့်မယ်​။ဇာတ်​လမ်းအကျဉ်း ဒီဇာတ်​လမ်းဟာ ဆိုရင်​တခြားဘဏ်​ဓားပြတိုက်​တဲ့ကားတွေနဲ့ခွဲထွက်​နေတဲ့စီးရီးဖြစ်​ပါတယ်​။ဒီSeriesမှာ ပရောဖက်​ဆာလို့ ခေါ်ကြတဲ့ အလွန်​ဉာဏ်​ကောင်းပြီးအကွက်​ကျကျစီစဉ်​ပြီးမှ လုပ်​တဲ့လူကတခြားနယ်​ပယ်​အသီးသီးကကျွမ်းကျင်​ရာဇဝတ်​သားတွေနဲ့ပူပေါင်းပြီးတော့ သမိုင်းမှာစံချိန်​ချိုးရလောက်​တဲ့အထိကြီးမားတဲ့ယူရို သန်း၂၄၀၀ကိုယူဖို့ရာဇဝတ်​မှုကျူးလွန်​ကြတာတွေရဲတွေကြားမှာဘယ်​လိုထောင့်စိအောင်​အစီအစဉ်​တကျအကွက်​ကျကျမျက်​လှည့်ပြသလိုလုပ်​ပြီးဥပဒေကိုလက်​တစ်​လုံးခြားဆောင်​ရွက်​သွားတာတွေကိုရင်​သပ်​ရှုမောဖွယ်​ စိတ်​လှုပ်​ရှားမှုအပြည့်နဲ့ကြည့်ရှုခံစားရမှာဖြစ်​ပါတယ်​​";


const defaultCom = new Comment({
  label: "yourcinema_admin_team",
  comment: "Comment here if link is not working or any suggesting",
  date: "Wed Sep 16 2020 15:50:29 GMT+0630 (Myanmar Time)",
  flag: "doNothing"
});

// const defaultItem = new Video({
//   name: "Money Heist",
//   rating: "8.7",
//   review: dfReview,
//   image: "mh2.jpg",
//   link: "www.google.com",
//   release: "2016"
//   // comment: defaultCom
// });

//------------------------------------------------------------------------//

router.get('/', function(req, res) {
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
    Video.find({}, function(err, foundVd) {
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
});

//------------------------------------------------------------------------//

router.get('/select/:vidName', function(req, res) {
  let selectParams = req.params.vidName;

  Video.findOne({
    name: selectParams
  }, function(err, foundList) {
          res.render('review', {
            name: foundList.name,
            review: foundList.review,
            img: foundList.image,
            id: foundList._id,
            comment: foundList.comment
          });
  });  //end of find
});  //end of router

//------------------------------------------------------------------------//

router.get('/request', (req,res)=> res.render('request'))

//------------------------------------------------------------------------//

router.get('/deadlink', function (req, res) {
let foundItem = null;
Comment.find({}).sort({"date": -1})
  .then(foundItem => {
      res.render('dead', {
        comment: foundItem
      });
  }) //end of then
  .catch(err => console.log(err))
});

//------------------------------------------------------------------------//

router.post("/comment", function(req, res) {
  const date = new Date();
  const comment = req.body.comment;
  const comCom = new Comment({
    comment: comment,
    date: date
  });
  comCom.save();
  res.redirect('/deadlink');
});    //end of router

//------------------------------------------------------------------------//

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;

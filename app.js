//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); //require lodash

//require jQuery
var jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;
const {
  window
} = new JSDOM();
const {
  document
} = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
//end require jQuery

//require mongoose
const mongoose = require('mongoose');

//connect flash and session and passport
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Express app
const app = express();


//config passport
require('./config/passport')(passport);
//config db
const db = require("./config/keys").MongoURI;
//connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log(err));

//View engine
app.set('view engine', 'ejs');
//Static public
app.use(express.static("public"));

//BodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

//Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//Connect Flash
app.use(flash());
//Global Vars
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/admin'));


var dfReview = "နာမည်​ကြီးလူကြိုက်​များခဲ့တဲ့ကားလေးပဲဖြစ်​ပါတယ်​။ထူးခြားတာကတော့ဒီစီးရီဟာ Limited Series ဖြစ်​ပါတယ်​။ဒီစီးရီးကို ဖန်​တီးခဲ့တဲ့သူကတောဖြစ်​ပြီးတော့အစောပိုင်းကတော့ စပိန်​ရုပ်​သံလိုင်းတခုဖြစ်​တဲ့အတွက်ဖန်​တီးရိုက်​ကူးပေးခဲ့တာပဲ ဖြစ်​ပါတယ်​။ဒီစီးရီးမှာတော့ နာမည်​ကြီးသရုပ်​ဆောင်​တွေပါဝင်​ရိုက်​ကူးထားတာဖြစ်​လို့ သဘောကျမှာအသေအချပါပဲနောက်​ပိုင်းမှာတော့ ဒီကားဟာ စပိန်​တလွှားမှာနာမည်​ကျော်​သွားတဲ့အတွက်​ နာမည်​ကြီးNetflixကနေတာဝန်​ယူဖြန့်ချိပေးခဲ့ပါတယ်​။ဒီseriesအမျိုးအစားလေးကတော့ပေါင်းပြီးခံစားကြည့်ရှုကြရမှာဖြစ်​ပါတယ်​။ဒီseries ရsongဟာဆိုရင်​တော့My life is going onဖြစ်​ပြီးတော့ဒီသီချင်းဟာဆိုရင်​ဒီseries ကိုတစ်​ပိုင်းလောက်​စကြည့်ပြီးတာနဲ့စိတ်​ထဲမှာ ခံစားမှုတခုပေးနိုင်​လောက်​တဲ့အထိစွဲဆောင်​နိုင်​ပါလိမ့်မယ်​။ဇာတ်​လမ်းအကျဉ်း ဒီဇာတ်​လမ်းဟာ ဆိုရင်​တခြားဘဏ်​ဓားပြတိုက်​တဲ့ကားတွေနဲ့ခွဲထွက်​နေတဲ့စီးရီးဖြစ်​ပါတယ်​။ဒီSeriesမှာ ပရောဖက်​ဆာလို့ ခေါ်ကြတဲ့ အလွန်​ဉာဏ်​ကောင်းပြီးအကွက်​ကျကျစီစဉ်​ပြီးမှ လုပ်​တဲ့လူကတခြားနယ်​ပယ်​အသီးသီးကကျွမ်းကျင်​ရာဇဝတ်​သားတွေနဲ့ပူပေါင်းပြီးတော့ သမိုင်းမှာစံချိန်​ချိုးရလောက်​တဲ့အထိကြီးမားတဲ့ယူရို သန်း၂၄၀၀ကိုယူဖို့ရာဇဝတ်​မှုကျူးလွန်​ကြတာတွေရဲတွေကြားမှာဘယ်​လိုထောင့်စိအောင်​အစီအစဉ်​တကျအကွက်​ကျကျမျက်​လှည့်ပြသလိုလုပ်​ပြီးဥပဒေကိုလက်​တစ်​လုံးခြားဆောင်​ရွက်​သွားတာတွေကိုရင်​သပ်​ရှုမောဖွယ်​ စိတ်​လှုပ်​ရှားမှုအပြည့်နဲ့ကြည့်ရှုခံစားရမှာဖြစ်​ပါတယ်​ …………ဒီဇတ်လမ်းတွဲကိုဘာသာပြန်ပေးသူကတော့​";



const commentSchema = new mongoose.Schema({
  label: String,
  comment: String,
  date: String,
  vname: String
});

const videoSchema = {
  name: String,
  rating: String,
  review: String,
  image: String,
  link: String,
  comment: [commentSchema]
};







//mongoose video collection
const Video = mongoose.model("video", videoSchema);

//mongoose comment collection
const Comment = mongoose.model("comment", commentSchema);


const defaultCom = new Comment({
  label: "yourcinema_admin_team",
  comment: "Comment here if link is not working or any suggesting",
  date: "Wed Sep 16 2020 15:50:29 GMT+0630 (Myanmar Time)",
  vname: "Money Heist"
});

const defaultItem = new Video({
  name: "Money Heist",
  rating: "8.7",
  review: dfReview,
  image: "/img/mh2.jpg",
  link: "www.google.com",
  comment: defaultCom
});




app.get('/', function(req, res) {

  Video.find({}, function(err, foundItem) {
    if (foundItem.length === 0) { //check default item not existing?
      //insert
      defaultItem.save();

      res.redirect("/");
    } else { //existing? give data to list.ejs
      //this else will be run bcoz of res.redirect("/")
      res.render('home', { //going to home.ejs file when app.get('/')
        homeVideo: foundItem //giving data to home.ejs
      });
    }
  });
});

app.get('/select/:vidName', function(req, res) {
  let selectParams = req.params.vidName;

  Video.findOne({
    name: selectParams
  }, function(err, foundList) {
    if (!err) {

      Comment.find({}, function(err, foundItem) {
        if (foundItem.length === 0) {
          defaultCom.save();
          res.redirect("/select/" + foundList.name);
        } else {
          res.render('review', {
            name: foundList.name,
            review: foundList.review,
            img: foundList.image,
            id: foundList._id,
            comment: foundList.comment
          });
        }
      });
    }
  });
});

app.post("/comment", function(req, res) {
  const date = new Date();
  const name = req.body.movieN;
  const comment = req.body.comment;
  const comCom = new Comment({
    comment: comment,
    date: date,
    vname: name
  });
  comCom.save();
  Video.findOne({
    name: name
  }, function(err, foundList) {
    if (!err && foundList) {
      foundList.comment.push(comCom);
      foundList.save();
    }
    res.redirect("/select/" + name);
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});

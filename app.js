//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const url = require('url');

//for photo upload
const multer = require('multer');
const path = require('path');
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
    checkFileType(file, cb); //function
  }
}).any();
//checkFileType function
function checkFileType(file, cb) {
  //allow ext
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null, true);
  }else {
    return false;
  }
}

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

//for 4gotpass
var session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// for hash
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
//end for hash

//require mongoose
const mongoose = require('mongoose');
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

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

//cookie
app.use(cookieParser('secret'));
app.use(session({
  cookie: {
    maxAge: null
  }
}));
//local session messages
app.use((req, res, next) => {
  res.locals.message = req.session.message
  delete req.session.message
  next()
});
app.use(flash());



var dfReview = "နာမည်​ကြီးလူကြိုက်​များခဲ့တဲ့ကားလေးပဲဖြစ်​ပါတယ်​။ထူးခြားတာကတော့ဒီစီးရီဟာ Limited Series ဖြစ်​ပါတယ်​။ဒီစီးရီးကို ဖန်​တီးခဲ့တဲ့သူကတောဖြစ်​ပြီးတော့အစောပိုင်းကတော့ စပိန်​ရုပ်​သံလိုင်းတခုဖြစ်​တဲ့အတွက်ဖန်​တီးရိုက်​ကူးပေးခဲ့တာပဲ ဖြစ်​ပါတယ်​။ဒီစီးရီးမှာတော့ နာမည်​ကြီးသရုပ်​ဆောင်​တွေပါဝင်​ရိုက်​ကူးထားတာဖြစ်​လို့ သဘောကျမှာအသေအချပါပဲနောက်​ပိုင်းမှာတော့ ဒီကားဟာ စပိန်​တလွှားမှာနာမည်​ကျော်​သွားတဲ့အတွက်​ နာမည်​ကြီးNetflixကနေတာဝန်​ယူဖြန့်ချိပေးခဲ့ပါတယ်​။ဒီseriesအမျိုးအစားလေးကတော့ပေါင်းပြီးခံစားကြည့်ရှုကြရမှာဖြစ်​ပါတယ်​။ဒီseries ရsongဟာဆိုရင်​တော့My life is going onဖြစ်​ပြီးတော့ဒီသီချင်းဟာဆိုရင်​ဒီseries ကိုတစ်​ပိုင်းလောက်​စကြည့်ပြီးတာနဲ့စိတ်​ထဲမှာ ခံစားမှုတခုပေးနိုင်​လောက်​တဲ့အထိစွဲဆောင်​နိုင်​ပါလိမ့်မယ်​။ဇာတ်​လမ်းအကျဉ်း ဒီဇာတ်​လမ်းဟာ ဆိုရင်​တခြားဘဏ်​ဓားပြတိုက်​တဲ့ကားတွေနဲ့ခွဲထွက်​နေတဲ့စီးရီးဖြစ်​ပါတယ်​။ဒီSeriesမှာ ပရောဖက်​ဆာလို့ ခေါ်ကြတဲ့ အလွန်​ဉာဏ်​ကောင်းပြီးအကွက်​ကျကျစီစဉ်​ပြီးမှ လုပ်​တဲ့လူကတခြားနယ်​ပယ်​အသီးသီးကကျွမ်းကျင်​ရာဇဝတ်​သားတွေနဲ့ပူပေါင်းပြီးတော့ သမိုင်းမှာစံချိန်​ချိုးရလောက်​တဲ့အထိကြီးမားတဲ့ယူရို သန်း၂၄၀၀ကိုယူဖို့ရာဇဝတ်​မှုကျူးလွန်​ကြတာတွေရဲတွေကြားမှာဘယ်​လိုထောင့်စိအောင်​အစီအစဉ်​တကျအကွက်​ကျကျမျက်​လှည့်ပြသလိုလုပ်​ပြီးဥပဒေကိုလက်​တစ်​လုံးခြားဆောင်​ရွက်​သွားတာတွေကိုရင်​သပ်​ရှုမောဖွယ်​ စိတ်​လှုပ်​ရှားမှုအပြည့်နဲ့ကြည့်ရှုခံစားရမှာဖြစ်​ပါတယ်​ …………ဒီဇတ်လမ်းတွဲကိုဘာသာပြန်ပေးသူကတော့​";

mongoose.connect("mongodb://localhost:27017/movieWeb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetLink: String
});

//hash password start
const saltRounds = 10;
const myPlaintextPassword = "test@111@";
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
//hash password end

//mongoose user collection
const User = mongoose.model("user", userSchema);

//mongoose video collection
const Video = mongoose.model("video", videoSchema);

//mongoose comment collection
const Comment = mongoose.model("comment", commentSchema);

const defaultUser = new User({
  email: "minmawoo.ucsm@gmail.com",
  password: hash,
  resetLink: ''
});

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
      res.redirect("/select/" + name);
    }
  });
});



app.get("/admin", function(req, res) {
  User.find({}, function(err, foundItem) {
    if (foundItem.length === 0) { //check default item not existing?
      //insert
      defaultUser.save();
    } else { //existing? give data to list.ejs
      //this else will be run bcoz of res.redirect("/")
      res.render("login");
    }
  });
});

app.get("/4gotpass", function(req, res) {
  res.render("forgot-password");
});

app.get("/changepass", function(req, res) {
  res.render("changePass");
});

app.get("/error_404", function(req, res) {
  res.render("404");
});

app.get("/admin/dashboard/:userID", function(req, res) {
  const id = req.params.userID;
  User.findOne({
    _id: id
  }, function(err, foundItem) {
    if (!err && foundItem) {

      Comment.find({}, {
        "comment": 1,
        "date": 1,
        "vname": 1,
        "_id": 0
      }).sort({
        "date": -1
      }).exec(function(err, foundList) {
        if (!err && foundList) {
          res.render("index", {
            id: id,
            userName: foundItem.email,
            commentNoti: foundList
          });
        }
      });
    } else {
      res.redirect("/error_404");
    }
  });
});

app.get("/upload/:userID", function(req, res) {
  const id = req.params.userID;
  User.findOne({
    _id: id
  }, function(err, foundItem) {
    if (!err && foundItem) {

      Comment.find({}, {
        "comment": 1,
        "date": 1,
        "vname": 1,
        "_id": 0
      }).sort({
        "date": -1
      }).exec(function(err, foundList) {
        if (!err && foundList) {
          res.render("upload", {
            id: id,
            userName: foundItem.email,
            commentNoti: foundList
          });
        }
      });
    } else {
      res.redirect("/error_404");
    }
  });
});

app.post('/upload', function (req, res, err) {



upload(req, res, (err)=>{
  const id = req.body.adminID;
  if(err){
    req.session.message = {
      type: 'danger',
      intro: 'ERROR!',
      message: err
    }
    console.log(id);
  }else {

  }
})


});


app.post("/admin", function(req, res) {

  let email = req.body.emailInput;
  let password = req.body.passwordInput;

  if (email == '' || password == '') {
    req.session.message = {
      type: 'danger',
      intro: 'ERROR!',
      message: 'all fields are required'
    }
    res.redirect('/admin');
  } else {
    User.findOne({
      email: email
    }, function(err, foundItem) {

      if (!err && foundItem) {
        const foundPass = foundItem.password;

        bcrypt.compare(password, foundPass, function(err, isMatch) {
          if (err) {
            throw err
          } else if (!isMatch) {
            req.session.message = {
              type: 'danger',
              intro: 'ERROR!',
              message: 'incorrect password'
            }
            res.redirect('/admin');
          } else {
            res.redirect("/admin/dashboard/" + foundItem._id);
          }
        });
      } else {
        req.session.message = {
          type: 'danger',
          intro: 'ERROR!',
          message: 'incorrect email'
        }
        res.redirect('/admin');
      }
    });
  }
});


app.post("/reset", function(req, res) {
  let email = req.body.userEmail;

  if (email == '') {
    req.session.message = {
      type: 'danger',
      intro: 'ERROR!',
      message: 'please type your email'
    }
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
        req.session.message = {
          type: 'danger',
          intro: 'ERROR!',
          message: 'your email does not exist in database'
        }
        res.redirect('/4gotpass');
      }
    });
  }
});

app.get("/resetpassword/:token", function(req, res) {
  let token = req.params.token;
  res.render("changePass", {
    token: token
  });
});


app.post("/resetbutton", function(req, res) {
  const resetLink = req.body.token;
  const newPass = req.body.password;
  const confirmPass = req.body.repassword;
  const hashNew = bcrypt.hashSync(newPass, salt);

  if (newPass == '' || confirmPass == '') {
    req.session.message = {
      type: 'danger',
      intro: 'ERROR!',
      message: 'all fields are required'
    }
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
      req.session.message = {
        type: 'danger',
        intro: 'ERROR!',
        message: 'two passwords do not match'
      }
      res.redirect('/resetpassword/' + resetLink);
    }
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

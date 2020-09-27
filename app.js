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
  resave: false,
  saveUninitialized: false
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
app.use('/', require('./routes/enduser'));
app.use('/', require('./routes/forget'));
app.use('/', require('./routes/photoUpload'));
app.use('/', require('./routes/categories'));


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});

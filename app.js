var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username }, function (err, user) {
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })}));
  
require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carRouter = require('./routes/car');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');
var car = require("./models/car");
var resourceRouter=require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/car', carRouter);
app.use('/board', boardRouter);
app.use('/selector', selectorRouter);
app.use('/resource',resourceRouter);

var Account =require('./models/Account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function recreateDB(){
  // Delete everything
  await car.deleteMany();
  let instance1 = new
  car({car_name:"BMW",Count:3,Car_type:"Sedan" });
  

  instance1.save().then( () => {
    console.log('Everything went well');
  }).catch( (e) => {
    console.log('There was an error', e.message);
  });


  let instance2 = new
  car({car_name:"Subaru",Count:5,Car_type:"Hatchback" });


  instance2.save().then( () => {
    console.log('Everything went well');
  }).catch( (e) => {
    console.log('There was an error', e.message);
  });
  let instance3 = new
  car({car_name:"Honda",Count:4,Car_type:"MUV" });
  instance3.save().then( () => {
    console.log('Everything went well');
  }).catch( (e) => {
    console.log('There was an error', e.message);
  });
  }

  let reseed = true;
  if (reseed) { recreateDB();}

module.exports = app;

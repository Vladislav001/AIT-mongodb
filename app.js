var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var dbConfig = require('./config').database;
var mongoose = require('mongoose');

// Connect to DB
mongoose.connect(dbConfig.url);


var app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', require('ejs-locals'));

// view engine setup
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public/systemImages', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Конфигурация Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());


// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use(flash());
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404'); // добавил сам(в костяке не было)
  next(err);
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


//var Application = require('./models/application');

// Application.find({"name": "MoneyGame", "tests.first": "1"}).exec(function(err, application) { , settings: { $in: ["5ae09fdd7f0513193049b939"] }
//   console.log(application + ' application'); // [0] т.к массив возвращает мб ключ массива делать не сразу idpid, а id:idpid{...}
// });

 //  тащить все данные(плохо!), да еще структура такая(надо бы без pid_ID)    "settings": { "pid_ID": {  "5b33c950a39dce246490ef83": {
//   Application.find({name: "MoneyGame"}).exec(function(err, application) {
//   console.log(application[0].settings[0].pid_ID["5b33c950a39dce246490ef83"].like + ' application'); // [0] т.к массив возвращает мб ключ массива делать не сразу idpid, а id:idpid{...}
//   console.log(Array(JSON.stringify ((application[0].settings[0].pid_ID["5b33c950a39dce246490ef83"]))));
// } );



module.exports = app;

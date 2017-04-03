var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var csrf = require('csurf');
// const winston = require('winston');
const logger = require('./services/logger/logger');
var index = require('./routes/index');
var agreement = require('./routes/agreement');



var app = express();


//make morgan logger for http request logs into file throught winston
app.use(morgan("combined", { "stream": logger.stream }));


app.use(session({
  secret: 'WIWe@m$RMMWtzOi4QkZslgafJodWa!',
  resave: false,
  saveUninitialized: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust_proxy', 1);
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));//change the logger (previous reference to morgan) to morgan variable
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(csrf());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/agree', agreement);

// catch 404 and forward to error handler
app.use(function (req, res, next) {

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  logger.log('error',err.message, {error: err, request:{
    url: req.originalUrl,
    params: req.params,
    body: req.body,
    query: req.query
  }});

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
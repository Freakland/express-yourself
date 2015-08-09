var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressify = require('expressify');

var events = require(__dirname + '/app/events/default.js');

var app = express();

var app = expressify.init({
    basepath: __dirname,
    express: express
});

process.chdir(__dirname);

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV != 'production') {
    var stylus = require('stylus'),
        nib = require('nib');
    var compile = function(str, path) {
        return stylus(str)
            .set('filename', path)
            .use(nib())
    };
    app.use(stylus.middleware({
        src: __dirname + '/app/assets',
        dest: __dirname + '/public',
        compile: compile,
        force: true
    }));

    //Static resource for development
    app.use('/app/assets', express.static(__dirname + '/app/assets'));
}

//Public static resources initialization
app.use('/public', express.static(__dirname + '/public'));

// Start events binding
events.bind(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

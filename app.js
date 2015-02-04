var express = require('express.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');

var config;

if(fs.existsSync('./config/nodes.js')){
    config = require('./config/nodes');
} else {
    config = require('./config/nodes.default');
}
console.log(config);
// var config = require('./config/nodes');
var Node = require('./models/node');

var app = express();
app.http().io();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var nodes = [],
    nodeStatus = [],
    nodeInterval;

for(i in config) {
    nodes[i] = new Node(config[i], i);
    console.log(nodes[i]);
    nodeStatus[i] = nodes[i].update();
}

nodeInterval = setInterval(function(){
    for(i in nodes){
        app.io.broadcast('update', nodes[i].update());
    }
}, 10000);

app.get('/', function(req, res) {
  res.render('index', { title: 'Ethereum Network Status' });
});

app.io.route('ready', function(req) {
    req.io.emit('init', {
        nodes: nodeStatus
    });
    console.log('emited');
});

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

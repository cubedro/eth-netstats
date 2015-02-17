var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var Primus = require('primus'),
    api,
    client;

var Collection = require('./models/collection');
var Nodes = new Collection();

var server = require('http').createServer(app);

api = new Primus(server, {
    transformer: 'websockets',
    pathname: '/api',
    parser: 'JSON'
});

api.use('emit', require('primus-emit'));

var client = new Primus(server, {
    transformer: 'websockets',
    pathname: '/primus',
    parser: 'JSON'
});

client.use('emit', require('primus-emit'));

api.on('connection', function(spark) {
    console.log(spark.id);
    console.log(spark.address);
    console.log(spark.query);

    spark.on('hello', function(data) {
        console.log('got hello data from ', spark.id);
        console.log(data);

        if(typeof data.id !== 'undefined' && typeof data.info !== 'undefined')
        {
            data.ip = spark.address.ip;

            var info = Nodes.add(data);
            spark.emit('ready');

            client.write({action: 'add', data: info});
        }
    });

    spark.on('update', function(data) {
        console.log('got update from ' + spark.id);
        console.log(data);

        if(typeof data.id !== 'undefined' && typeof data.stats !== 'undefined')
        {
            var stats = Nodes.update(data.id, data.stats);

            client.write({action: 'update', data: stats});
        }
    });

    spark.on('end', function(data) {
        //
    });
});

client.on('connection', function(spark) {
    console.log(spark.id);
    console.log(spark.address);
    console.log(spark.query);

    spark.on('ready', function(data){
        console.log('got hello data from ' + spark.id);
        console.log(data);

        spark.emit('init', {nodes: Nodes.all()});
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', { title: 'Ethereum Network Status' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
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
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

server.listen(process.env.PORT || 3000);

module.exports = app;

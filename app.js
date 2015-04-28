var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var Primus = require('primus'),
    api,
    client;

var WS_SECRET = process.env.WS_SECRET || "eth-net-stats-has-a-secret";

var Collection = require('./models/collection');
var Nodes = new Collection();

var server = require('http').createServer(app);

api = new Primus(server, {
    transformer: 'websockets',
    pathname: '/api',
    parser: 'JSON'
});

api.use('emit', require('primus-emit'));
api.use('spark-latency', require('primus-spark-latency'));

var client = new Primus(server, {
    transformer: 'websockets',
    pathname: '/primus',
    parser: 'JSON'
});

var clientLatency = 0;

client.use('emit', require('primus-emit'));

api.on('connection', function(spark) {
    console.log('Latency: ', spark.latency);
    console.log(spark.id);
    console.log(spark.address);
    console.log(spark.query);

    spark.on('hello', function(data)
    {
        console.log('Latency: ', spark.latency);
        console.log('Got hello data from ', spark.id);
        console.log(data);

        if(typeof data.secret === 'undefined' || data.secret !== WS_SECRET)
        {
            spark.end(undefined, { reconnect: false });

            return false;
        }

        if(typeof data.id !== 'undefined' && typeof data.info !== 'undefined')
        {
            data.ip = spark.address.ip;
            data.spark = spark.id;
            data.latency = spark.latency;

            var info = Nodes.add(data);
            spark.emit('ready');

            client.write({action: 'add', data: info});

            var blockPropagationChart = Nodes.blockPropagationChart();
            client.write({action: 'blockPropagationChart', data: blockPropagationChart});

            var uncleCount = Nodes.getUncleCount();
            client.write({action: 'uncleCount', data: uncleCount});
        }
    });

    spark.on('update', function(data)
    {
        console.log('Latency: ', spark.latency);
        console.log('Got update from ' + spark.id);

        if(typeof data.id !== 'undefined' && typeof data.stats !== 'undefined')
        {
            data.stats.latency = spark.latency;

            var stats = Nodes.update(data.id, data.stats);
            if(stats !== false)
            {
                client.write({action: 'update', data: stats});

                var blockPropagationChart = Nodes.blockPropagationChart();
                client.write({action: 'blockPropagationChart', data: blockPropagationChart});

                var uncleCount = Nodes.getUncleCount();
                client.write({action: 'uncleCount', data: uncleCount});
            }
        }
    });

    spark.on('node-ping', function(data){
        spark.emit('node-pong');
    });

    spark.on('latency', function(data)
    {
        if(typeof data.id !== 'undefined')
        {
            var stats = Nodes.updateLatency(data.id, data.latency);

            client.write({action: 'latency', data: stats});
        }
    });

    spark.on('end', function(data)
    {
        var stats = Nodes.inactive(spark.id);

        client.write({action: 'inactive', data: stats});
    });
});

client.on('connection', function(spark) {
    console.log(spark.id);
    console.log(spark.address);
    console.log(spark.query);

    spark.on('ready', function(data){
        spark.emit('init', {nodes: Nodes.all()});

        var blockPropagationChart = Nodes.blockPropagationChart();
        spark.write({action: 'blockPropagationChart', data: blockPropagationChart});

        var uncleCount = Nodes.getUncleCount();
        spark.write({action: 'uncleCount', data: uncleCount});
    });

    spark.on('client-pong', function(data) {
        var latency = Math.ceil(((new Date()).getTime() - clientLatency)/2);
        spark.emit('client-latency', { latency: latency });
    });
});

var latencyTimeout = setInterval(function(){
    clientLatency = (new Date()).getTime();
    client.write({action: 'client-ping'});
}, 5000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, '/public/images/favicon.png')));
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

var _ = require('lodash');
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var askedForHistory = false;
var askedForHistoryTime = 0;

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

		if( _.isUndefined(data.secret) || data.secret !== WS_SECRET )
		{
			spark.end(undefined, { reconnect: false });

			return false;
		}

		if( !_.isUndefined(data.id) && !_.isUndefined(data.info) )
		{
			data.ip = spark.address.ip;
			data.spark = spark.id;
			data.latency = spark.latency;

			var info = Nodes.add( data );
			spark.emit('ready');

			client.write({
				action: 'add',
				data: info
			});

			client.write({
				action: 'charts',
				data: Nodes.getCharts()
			});
		}
	});

	spark.on('update', function(data)
	{
		if( !_.isUndefined(data.id) && !_.isUndefined(data.stats) )
		{
			data.stats.latency = spark.latency;

			var stats = Nodes.update(data.id, data.stats);

			if(stats !== false)
			{
				client.write({
					action: 'update',
					data: stats
				});

				client.write({
					action: 'charts',
					data: Nodes.getCharts()
				});
			}
		}
	});

	spark.on('history', function(data)
	{
		console.log("got history from " + data.id);

		client.write({
			action: 'charts',
			data: Nodes.addHistory(data.id, data.history)
		});

		askedForHistory = false;

		client.write({
			action: 'charts',
			data: Nodes.getCharts()
		});
	});

	spark.on('node-ping', function(data)
	{
		spark.emit('node-pong');
	});

	spark.on('latency', function(data)
	{
		if( !_.isUndefined(data.id) )
		{
			var stats = Nodes.updateLatency(data.id, data.latency);

			client.write({
				action: 'latency',
				data: stats
			});

			if( Nodes.requiresUpdate(data.id) && (!askedForHistory || _.now() - askedForHistoryTime > 200000) )
			{
				var range = Nodes.getHistory().getHistoryRequestRange();

				console.log("asked " + data.id + " for history");
				console.log('interval', range.max + " - " + range.min);

				spark.emit('history', range);

				askedForHistory = true;
				askedForHistoryTime = _.now();
			}
		}
	});

	spark.on('end', function(data)
	{
		var stats = Nodes.inactive(spark.id);

		client.write({
			action: 'inactive',
			data: stats
		});
	});
});

client.on('connection', function(clientSpark)
{
	clientSpark.on('ready', function(data)
	{
		clientSpark.emit('init', { nodes: Nodes.all() });

		clientSpark.write({
			action: 'charts',
			data: Nodes.getCharts()
		});
	});

	clientSpark.on('client-pong', function(data)
	{
		var latency = Math.ceil( (_.now() - clientLatency) / 2 );

		clientSpark.emit('client-latency', { latency: latency });
	});
});

var latencyTimeout = setInterval( function ()
{
	clientLatency = _.now();

	client.write({ action: 'client-ping' });
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

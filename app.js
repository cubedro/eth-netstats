var _ = require('lodash');
var logger = require('./lib/utils/logger');
var chalk = require('chalk');

var askedForHistory = false;
var askedForHistoryTime = 0;

var Primus = require('primus'),
	api,
	client;

var WS_SECRET = process.env.WS_SECRET || "eth-net-stats-has-a-secret";

var Collection = require('./lib/collection');
var Nodes = new Collection();

var server;
var env = 'production';

if( process.env.NODE_ENV !== 'production' )
{
	var express = require('express');
	var app = express();
	var path = require('path');
	var bodyParser = require('body-parser');

	// view engine setup
	app.set('views', path.join(__dirname, 'src/views'));
	app.set('view engine', 'jade');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(express.static(path.join(__dirname, 'dist')));

	app.get('/', function(req, res) {
	  res.render('index');
	});

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handlers
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});

	// production error handler
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});

	server = require('http').createServer(app);
}
else
{
	server = require('http').createServer();
}

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

api.on('connection', function (spark)
{
	console.info('API', 'CON', 'Open:', spark.address.ip);


	spark.on('hello', function (data)
	{
		console.info('API', 'CON', 'Hello', data['id']);

		if( _.isUndefined(data.secret) || data.secret !== WS_SECRET )
		{
			spark.end(undefined, { reconnect: false });
			console.error('API', 'CON', 'Closed - wrong auth', data);

			return false;
		}

		if( !_.isUndefined(data.id) && !_.isUndefined(data.info) )
		{
			data.ip = spark.address.ip;
			data.spark = spark.id;
			data.latency = spark.latency || 0;

			var info = Nodes.add( data );
			spark.emit('ready');

			console.success('API', 'CON', 'Connected', data.id);

			client.write({
				action: 'add',
				data: info
			});

			var time = chalk.reset.cyan((new Date()).toJSON()) + " ";
			console.time(time, 'COL', 'CHR', 'Got charts in');

			client.write({
				action: 'charts',
				data: Nodes.getCharts()
			});

			console.timeEnd(time, 'COL', 'CHR', 'Got charts in');
		}
	});


	spark.on('update', function (data)
	{
		if( !_.isUndefined(data.id) && !_.isUndefined(data.stats) )
		{
			var stats = Nodes.update(data.id, data.stats);

			if(stats !== false)
			{
				client.write({
					action: 'update',
					data: stats
				});

				console.info('API', 'UPD', 'Update from:', data.id, 'for:', data.stats);

				var time = chalk.reset.cyan((new Date()).toJSON()) + " ";
				console.time(time, 'COL', 'CHR', 'Got charts in');

				client.write({
					action: 'charts',
					data: Nodes.getCharts()
				});

				console.timeEnd(time, 'COL', 'CHR', 'Got charts in');
			}

		}
		else
		{
			console.error('API', 'UPD', 'Update error:', data);
		}
	});


	spark.on('block', function (data)
	{
		if( !_.isUndefined(data.id) && !_.isUndefined(data.block) )
		{
			var stats = Nodes.addBlock(data.id, data.block);

			if(stats !== false)
			{
				client.write({
					action: 'block',
					data: stats
				});

				console.success('API', 'BLK', 'Block:', data.block['number'], 'from:', data.id);

				var time = chalk.reset.cyan((new Date()).toJSON()) + " ";
				console.time(time, 'COL', 'CHR', 'Got charts in');

				client.write({
					action: 'charts',
					data: Nodes.getCharts()
				});

				console.timeEnd(time, 'COL', 'CHR', 'Got charts in');
			}
		}
		else
		{
			console.error('API', 'BLK', 'Block error:', data);
		}
	});


	spark.on('pending', function (data)
	{
		if( !_.isUndefined(data.id) && !_.isUndefined(data.stats) )
		{
			var stats = Nodes.updatePending(data.id, data.stats);

			if(stats !== false)
			{
				client.write({
					action: 'pending',
					data: stats
				});
			}

			console.success('API', 'TXS', 'Pending:', data.stats['pending'], 'from:', data.id);
		}
		else
		{
			console.error('API', 'TXS', 'Pending error:', data);
		}
	});


	spark.on('stats', function (data)
	{
		if( !_.isUndefined(data.id) && !_.isUndefined(data.stats) )
		{

			var stats = Nodes.updateStats(data.id, data.stats);

			if(stats !== false)
			{
				client.write({
					action: 'stats',
					data: stats
				});
			}

			console.success('API', 'STA', 'Stats from:', data.id);
		}
		else
		{
			console.error('API', 'STA', 'Stats error:', data);
		}
	});


	spark.on('history', function (data)
	{
		console.success('API', 'HIS', 'Got from:', data.id);

			var time = chalk.reset.cyan((new Date()).toJSON()) + " ";
			console.time(time, 'COL', 'CHR', 'Got charts in');

		client.write({
			action: 'charts',
			data: Nodes.addHistory(data.id, data.history)
		});

		console.timeEnd(time, 'COL', 'CHR', 'Got charts in');

		askedForHistory = false;

	});


	spark.on('node-ping', function (data)
	{
		var start = (!_.isUndefined(data) && !_.isUndefined(data.clientTime) ? data.clientTime : null);

		spark.emit('node-pong', {
			clientTime: start,
			serverTime: _.now()
		});

		console.info('API', 'PIN', 'Ping from:', data['id']);
	});


	spark.on('latency', function (data)
	{
		if( !_.isUndefined(data.id) )
		{
			var latency = Nodes.updateLatency(data.id, data.latency);

			if(latency)
			{
				client.write({
					action: 'latency',
					data: latency
				});
			}

			console.info('API', 'PIN', 'Latency:', latency, 'from:', data.id);

			if( Nodes.requiresUpdate(data.id) && (!askedForHistory || _.now() - askedForHistoryTime > 200000) )
			{
				var range = Nodes.getHistory().getHistoryRequestRange();

				spark.emit('history', range);
				console.info('API', 'HIS', 'Asked:', data.id, 'for history:', range.min, '-', range.max);

				askedForHistory = true;
				askedForHistoryTime = _.now();
			}
		}
	});


	spark.on('end', function (data)
	{
		var stats = Nodes.inactive(spark.id);

		client.write({
			action: 'inactive',
			data: stats
		});

		console.warn('API', 'CON', 'Connection with:', spark.id, 'ended:', data);
	});
});



client.on('connection', function (clientSpark)
{
	clientSpark.on('ready', function (data)
	{
		clientSpark.emit('init', { nodes: Nodes.all() });

		clientSpark.write({
			action: 'charts',
			data: Nodes.getCharts()
		});
	});

	clientSpark.on('client-pong', function (data)
	{
		var start = (!_.isUndefined(data) && !_.isUndefined(data.serverTime) ? data.serverTime : clientLatency);
		var latency = Math.ceil( (_.now() - start) / 2 );

		clientSpark.emit('client-latency', { latency: latency });
	});
});

var latencyTimeout = setInterval( function ()
{
	clientLatency = _.now();

	client.write({
		action: 'client-ping',
		data: {
			serverTime: clientLatency
		}
	});
}, 5000);


// Cleanup old inactive nodes
var nodeCleanupTimeout = setInterval( function ()
{
	client.write({
		action: 'init',
		data: Nodes.all()
	});

	client.write({
		action: 'charts',
		data: Nodes.getCharts()
	});
}, 1000*60*60);

server.listen(process.env.PORT || 3000);

module.exports = server;

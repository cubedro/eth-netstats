'use strict';

var util = require('util');
var chalk = require('chalk');

var sections = [
	'API',
	'COL',
	'SYS'
];

var types = [
	'CON',
	'CHR',
	'UPD',
	'BLK',
	'TXS',
	'STA',
	'HIS',
	'PIN'
];

var typeColors = {
	'CON': chalk.reset.bold.yellow,
	'CHR': chalk.reset.bold.red,
	'UPD': chalk.reset.bold.green,
	'BLK': chalk.reset.bold.blue,
	'TXS': chalk.reset.bold.cyan,
	'STA': chalk.reset.bold.red,
	'HIS': chalk.reset.bold.magenta,
	'PIN': chalk.reset.bold.yellow,
};

var verbosity = [
	[],
	['error'],
	['error', 'warn', 'success'],
	['info', 'error', 'warn', 'success', 'time', 'timeEnd']
];

var ENV_VERBOSITY = process.env.VERBOSITY || 2;

[
	{
		name: "info",
		sign: '=i=',
		signColor: chalk.blue,
		messageColor: chalk.bold,
		formatter: function (sign, message)
		{
			return [sign, message];
		}
	},
	{
		name: "success",
		inherit: 'log',
		sign: '=✓=',
		signColor: chalk.green,
		messageColor: chalk.bold.green,
		formatter: function (sign, message)
		{
			return [sign, message];
		}
	},
	{
		name: "warn",
		sign: '=!=',
		signColor: chalk.yellow,
		messageColor: chalk.bold.yellow,
		formatter: function (sign, message)
		{
			return [sign, message];
		}
	},
	{
		name: "error",
		sign: '=✘=',
		signColor: chalk.red,
		messageColor: chalk.bold.red,
		formatter: function (sign, message)
		{
			return [sign, message];
		}
	},
	{
		name: "time",
		sign: '=T=',
		signColor: chalk.cyan,
		messageColor: chalk.bold,
		formatter: function (sign, message)
		{
			return [util.format.apply(util, [sign, message])];
		}
	},
	{
		name: "timeEnd",
		sign: '=T=',
		signColor: chalk.cyan,
		messageColor: chalk.bold,
		formatter: function (sign, message)
		{
			return [util.format.apply(util, [sign, message])];
		}
	}
].forEach( function (item)
{
	if(item.inherit !== undefined)
		console[item.name] = console[item.inherit];

	var fn = console[item.name];

	console[item.name] = function ()
	{
		if(verbosity[ENV_VERBOSITY].indexOf(item.name) === -1)
			return false;

		var args = Array.prototype.slice.call(arguments);
		var type = null,
			sign,
			time;
		var section = 'API';
		var message = '';

		if (args[0].indexOf(new Date().getFullYear()) >= 0)
		{
			time = args.splice(0, 1);
		}

		if (sections.indexOf(args[0]) >= 0)
		{
			section = args.splice(0, 1);
		}

		if (types.indexOf(args[0]) >= 0)
		{
			type = args.splice(0, 1);
		}

		sign = item.signColor.bold( '[' ) + chalk.reset.bold.white( section ) + item.signColor.bold( ']' );

		if(type !== null)
			sign = sign + " " + item.signColor.bold( '[' ) + typeColors[type](type) + item.signColor.bold( ']' );

		if(item.name !== "time" && item.name !== "timeEnd")
		{
			time = (new Date()).toJSON().replace("T", " ").replace("Z", " ");
		}
		else
		{
			time = time.toString().replace("T", " ").replace("Z", "");
		}

		sign = chalk.reset.magenta(time) + sign;

		if (typeof args[0] === 'object')
		{
			message = util.inspect( args[0], { depth: null, colors: true } );
		}
		else {
			message = item.messageColor( util.format.apply(util, args) );
		}

		return fn.apply( this, item.formatter(sign, message) );
	}
});

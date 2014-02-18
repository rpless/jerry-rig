var fs = require('fs'),
	_ = require('underscore'),
	cwd = process.cwd(),
	argv = require('optimist').argv,
	target = argv._[0] || './output/',
	jerryfile = argv.jerry || 'jerry.json',
	builder = require('./lib/builder.js');

if (!fs.existsSync(cwd + '/' + jerryfile)) {
	console.error("No jerry.json file supplied or existing in this directory.");
	return;
}

var data = JSON.parse(fs.readFileSync(jerryfile));

if (!fs.exists(target)) {
	console.log('Making Target Directory');
	fs.mkdirSync(target);
}
console.log('Compiling');
builder(data, target);
console.log('Done');
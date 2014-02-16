var fs = require('fs'),
	_ = require('underscore'),
	cwd = process.cwd(),
	templates = require('./bin/templates.js'),
	argv = require('optimist').argv,
	target = argv._[0] || './output/',
	jerryfile = argv.jerry || 'jerry.json',
	data;
console.log(cwd + '/' + jerryfile);
if (!fs.existsSync(cwd + '/' + jerryfile)) {
	console.error("No jerry.json file supplied or existing in this directory.");
	return;
}

data = JSON.parse(fs.readFileSync(jerryfile));

if (!fs.exists(target)) {
	console.log('Making Directory');
	fs.mkdirSync(target);
}
console.log('Compiling');
fs.writeFileSync(target + 'foo.txt', templates.package(data));
console.log('Done');
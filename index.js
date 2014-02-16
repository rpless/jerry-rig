var fs = require('fs'),
	_ = require('underscore'),
	templates = require('./bin/templates.js'),
	target = process.cwd() + '/output/',
	optimist = require('optimist');

if (!fs.exists(target)) {
	console.log('Making Directory');
	fs.mkdirSync(target);
}
console.log('Compiling');
fs.writeFileSync(target + 'foo.txt', templates.package({}));
console.log('Done');
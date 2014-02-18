var fs = require('fs'),
    _ = require('underscore'),
    cwd = process.cwd();

module.exports = function(data, target) {
    var potentialPackages = helpers.readPackages();
    _(potentialPackages).each(function(pack) {
        if (_(data).has(pack)) {
            var module = require(cwd + '/lib/packages/' + pack + '/' + pack + '-builder.js');
            module.load(data, target);
        }
    });
};

var helpers = {
    readPackages: function() {
        var rootPath = './lib/packages/',
            contents = fs.readdirSync(rootPath);
        return _(contents).filter(function(content) { return fs.lstatSync(rootPath + content).isDirectory(); });
    }
};
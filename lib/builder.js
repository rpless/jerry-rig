var fs = require('fs'),
    _ = require('underscore'),
    cwd = process.cwd(),
    moduleBundles = ['structure']

module.exports = function(data, target) {
    _(moduleBundles).each(function(bundle) {
        if (_(data).has(bundle)) {
            var builder = require('./' + bundle + '/' + bundle + '-builder');
            builder.load(data[bundle], target);
        }
    });
};

var helpers = {

    readPackages: function(directory) {
        var rootPath = './lib/' + directory + '/',
            contents = fs.readdirSync(rootPath);
        return _(contents).filter(function(content) { return fs.lstatSync(rootPath + content).isDirectory(); });
    }
};
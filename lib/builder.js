/**
New Build Strategy:
--> Parse in all used Modules
--> Write project structure
--> Gather Dependencies
--> Write out dependency files
--> Create Buildfile(s)
 */

var fs = require('fs'),
    _ = require('underscore'),
    cwd = process.cwd(),
    metaDataKeys = ['projectName', 'version'];

module.exports = function(data, target) {
    var metadata = helpers.getMetaData(data),
        dependencies = helpers.load(data, 'dependencies'),
        //build = helpers.load(data, 'build')
        structure = helpers.createStructure(data);
        console.info(structure)
    helpers.generate(target, structure, dependencies);
};

var helpers = {
    getMetaData: function(data) {
        return _(data).pick(metaDataKeys);
    },

    load: function(data, container) {
        var object = data[container];
        return _(object).map(function(value, key) {
            var path = cwd + '/lib/' + container + '/' + key + '/' + key + '-builder';
            return require(path)(value, data);
        });
    },

    createStructure: function(data) {
        return require(cwd + '/lib/structure/structure-builder.js')(data.structure, data);
    },

    generate: function(target, structure, dependencies, buildInformation) {
        structure.execute(target);
        _(_(dependencies).pluck('execute')).each(function(execute) { execute(target); });
    },

    readPackages: function(directory) {
        var rootPath = './lib/' + directory + '/',
            contents = fs.readdirSync(rootPath);
        return _(contents).filter(function(content) { return fs.lstatSync(rootPath + content).isDirectory(); });
    }
};
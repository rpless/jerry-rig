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
    metaDataKeys = ['projectName', 'version'],
    moduleContainers = ['structure', 'build', 'dependencies'];

module.exports = function(data, target) {
    var metadata = helpers.getMetaData(data),
        modules = helpers.getModules(data);
    console.info(modules);
    //    structure = helpers.createStructure(modules),
    //    dependencies = helpers.createDependencies(modules),
    //    buildInformation = helpers.createBuildInformation(modules);
    //helpers.generate(structure, dependencies, buildInformation);
};

var helpers = {
    getMetaData: function(data) {
        return _(data).pick(metaDataKeys);
    },

    getModules: function(data) {
        var moduleData = {};
        if (_(data).has('structure')) {
            moduleData['structure'] = require(cwd + '/lib/structure/structure-builder.js').load(data);
        }
        _(['build', 'dependencies']).each(function(container) {
            _(data[container]).each(function(config, name) {
                var requirePath = cwd + '/lib/' + container + '/' + name + '/' + name + '-builder.js';
                moduleData[name] = require(requirePath).load(config);
            });
        });
        return moduleData;
    },

    createStructure: function(modules) {
        return [];
    },

    createDependencies: function(modules) {
        return [];
    },

    generate: function(structure, dependencies, buildInformation) {

    },

    readPackages: function(directory) {
        var rootPath = './lib/' + directory + '/',
            contents = fs.readdirSync(rootPath);
        return _(contents).filter(function(content) { return fs.lstatSync(rootPath + content).isDirectory(); });
    }
};
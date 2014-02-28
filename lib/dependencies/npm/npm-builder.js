var fs = require('fs'),
	_ = require('underscore'),
    Handlebars = require('handlebars'),
    template = require('./npm.template.js');

module.exports = {
    load: function(npmData, data) {
        Handlebars.registerHelper('commaIfNotLast', function(index, list) {
            return (index != list.length) ? '' : ',';
        });
        return this;
       // fs.writeFileSync(target + '/package.json', template.package(data));
    },

    execute: function() {}
};
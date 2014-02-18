var fs = require('fs'),
	_ = require('underscore'),
    Handlebars = require('handlebars'),
    template = require('./npm.template.js');

module.exports = {
    load: function(data, target) {
        var derivedData = {
                dependsLength: (data.npm.depends) ? data.npm.depends.length : 0,
                devDependsLength: (data.npm.devDepends) ? data.npm.devDepends.length : 0,
            },
            modifiedData = _.extend(derivedData, data);
        Handlebars.registerHelper('commaIfNotLast', function(index, list) {
            console.log(index);
            console.log(list)
            return (index != list.length) ? '' : ',';
        });
        fs.writeFileSync(target + '/package.json', template.package(modifiedData));
    }
};
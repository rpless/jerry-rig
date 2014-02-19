var fs = require('fs'),
    _ = require('underscore'),
    helpers = {
        buildFileStructure: function(data, currentDirectory) {
            if (_.isObject(data)) {
                _(data).each(function(value, key) {
                    if (key === '.') {
                        _(value).each(function(file) { helpers.touch(file, currentDirectory); });
                    } else if (!fs.existsSync(currentDirectory + '/' + key)) {
                        fs.mkdirSync(currentDirectory + '/' + key);
                        _(value).each(function(subdir) { helpers.buildFileStructure(value, currentDirectory + '/' + key); });
                    }
                });
            }
        },
        touch: function(fileName, target) {
            fs.openSync(target + '/' + fileName, 'w');
        }
    };

module.exports = {
    load: function(data, target) {
        helpers.buildFileStructure(data, target);
    }
}
var fs = require('fs'),
    _ = require('underscore'),
    helpers = {
        generateCompileObject: function(target) {
            var templates = {},
            contents = fs.readdirSync('./lib/' + target),
            directories = _(contents).filter(function(content) { return fs.lstatSync('./lib/' + target + '/' + content).isDirectory(); });
            _(directories).each(function(directory) {
               var templateDir = './lib/' + target + '/' + directory;
                templates[templateDir + '/' + directory + '.template.js'] = templateDir + '/templates/*.hbs';
            });
            return templates;
        }
    };

module.exports = function(grunt) {
    grunt.initConfig({
        clean: ['./output'],
    	handlebars: {
    		compile: {
    			options: {
    				node: true,
    				processName: function(filePath) {
                        return filePath.substring(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf('.'));
                    },

    			},
    			files: _.extend(helpers.generateCompileObject('build'), 
                                helpers.generateCompileObject('dependency'),
                                helpers.generateCompileObject('structure'))
    		}
    	}
    });
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'handlebars']);
}
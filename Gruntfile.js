module.exports = function(grunt) {
    grunt.initConfig({
        clean: ['./output'],
        execute: {
            target: { src: ['index.js'] }
        },
    	handlebars: {
    		compile: {
    			options: {
    				node: true,
    				processName: function(filePath) {
                        return filePath.substring(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf('.'));
                    },

    			},
    			files: {
    				'./bin/templates.js': ['./templates/*.hbs', './templates/grunt/*.hbs']
    			}
    		}
    	}
    });
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'handlebars', 'execute']);
}
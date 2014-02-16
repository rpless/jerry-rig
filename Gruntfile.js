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
    			files: {
    				'./bin/templates.js': ['./templates/*.hbs', './templates/grunt/*.hbs']
    			}
    		}
    	}
    });
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('run', function() {
        grunt.util.spawn({
            cmd: 'node',
            args: ['index.js', '--jerry', 'bin/jerry.json']
        });
    });

    grunt.registerTask('default', ['clean', 'handlebars', 'run']);
}
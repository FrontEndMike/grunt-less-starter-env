'use strict';

module.exports = function(grunt){

  /* Configure
  ============================ */
  var configs = {   
    
    css_combine_files : [
      'public_html/css/bootstrap.min.css',
      'public_html/css/combined.css'],
    
    js_combine_files : [
      'public_html/vendor/js/jquery-1.10.1.min.js',
      'public_html/vendor/js/modernizr-2.6.2-respond-1.1.0.min.js',
      'public_html/vendor/js/bootstrap.min.js',
      'public_html/js/main.js'],
    
    js_hint_files : [
      'public_html/js/main.js'],

    watch_files : [
      'public_html/css/*',
      'public_html/js/*',
      'public_html/css/*',
      'public_html/js/vendor/*']
  }

  /* Init
  ============================ */
  grunt.initConfig({
    less: {
      production: {
        files: {
          'public_html/css/styles.css':'public_html/css/styles.less'
        }
      }
    },
    jshint: {
      beforeconcat: configs.js_hint_files
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: configs.js_combine_files,
        dest: 'public_html/js/compiled.js',
      },
    },
    uglify: {
        my_target: {
          files: {
            'public_html/js/compiled.min.js' : 'public_html/js/compiled.js'
          }
        }
    },
    cssmin: {
      combine: {
        files: {
          'public_html/css/main.min.css' : configs.css_combine_files
        }
      }
    },
    watch: {
      src: {
        files: configs.watch_files,
        tasks: ['build']
      }
    }
  });

  // Add plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Register tasks
  grunt.registerTask('build', ['less','cssmin','concat','uglify','jshint','watch']);
  grunt.registerTask('default', ['less','cssmin','concat','uglify','jshint','watch']);

  // grunt.event.on('watch', function(action, filepath) {
  //   grunt.log.writeln(filepath + ' has ' + action);
  // });

};

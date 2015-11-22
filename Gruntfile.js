'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    simplemocha: {
      options: {
      globals: ['should'],
      timeout: 3000,
      ignoreLeaks: false,
      ui: 'bdd',
      reporter: 'tap'
    },
    all: {
      src: ['test/**/*.js']
    }
  },

    jshint: {
      dev: {
        src: ['*.js', 'test/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'lib/**/*.js']
      },
      options: {
        node: true,
        globals: {
          describe: true,
          it: true,
          before: true,
          after: true,
          beforeEach: true,
          afterEach: true
        }
      }
    },

    watch: {

      gruntfile: {
        files: ['Gruntfile.js'],
        options: {
          reload: true,
          event: ['added', 'deleted', 'changed']
        }
      },

      scripts: {
        files: ['*.js', 'models/**/*.js', 'app/**/*.js', 'routes/**/*.js'],
        tasks: ['default'],
        options: {
          event: ['added', 'deleted', 'changed']
        }
      }
    },

    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          file: 'bundle.js'
        },
        module: {
          loaders: [
          { test: /\.css$/, loader: "style-loader!css-loader" },
          { test: /\.(gif|jpg)$/, loader: "file-loader" },
          { test: /\.(ico)$/, loader: "file-loader?name=favicon.ico" },
          { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
          { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
          { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
          ]
        }
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    }
  });

  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('default', ['build:dev']);
};
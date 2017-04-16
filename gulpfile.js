/**
 * Created by pomy on 08/03/2017.
 */

'use strict';

let gulp = require('gulp');
let del = require('del');
let gutil = require('gulp-util');
let opn = require('opn');
let rev = require('gulp-rev');
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');

let webpackDevConfig = require('./build/webpack.dev.config.js');
let config = require('./config/index');

let env = process.env.NODE_ENV || 'development';
let url = `http://localhost:${config.dev.serverPort}`;
let browserIsOpen = false;

gulp.task('assets', () =>
    gulp.src(['./client/images/**/*'], {base: './client'})
        .pipe(gulp.dest('./public/dist'))
        .pipe(rev())
        .pipe(gulp.dest('./public/dist'))
        .pipe(rev.manifest('manifest.json',{
            base: './',
            merge: true  // merge with the existing manifest if one exists
        }))
        .pipe(gulp.dest('./public/dist'))
);

// clean static resource
gulp.task('clean', () =>
    del(['./public/**/*'],{read: false, force: true})
);

gulp.task('dev', ['assets'], () => {
    let compiler = webpack(webpackDevConfig);
    let server = new WebpackDevServer(compiler, webpackDevConfig.devServer);

    server.listen(config.dev.clientPort, 'localhost', function(err) {
        if(err) {
            throw new gutil.PluginError('[webpack-dev-server err]', err)
        }
    });

    //compiled success
    compiler.plugin('done', (stats) => {

        // gutil.log('[webpack]',stats.toString({
        //     colors: true,
        //     modules: false,
        //     children: false,
        //     chunks: false,
        //     chunkModules: false
        // }) + '\n\n');

        if(!browserIsOpen && env === 'development'){
            browserIsOpen = true;
            opn(url);
        }
    });

    //compiled failure
    compiler.plugin('failed', (err) => {
        throw new gutil.PluginError("[webpack build err]", err);
    });

    //listening file changed
    compiler.plugin("compilation", function(compilation) {

    });
});

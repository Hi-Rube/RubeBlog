/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const less = require('gulp-less');
const minifycss = require('gulp-minify-css');
const concat = require('gulp-concat');
const webpack = require('gulp-webpack');

//Server
gulp.task('babel', ()=> {

    return gulp.src('src/**/*.js', {base: 'src'})
        .pipe(babel({
            presets: ['nodejs-lts']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', ()=> {
    "use strict";
    return gulp.src('./public/css/**/*.css')
        .pipe(less())
        .pipe(concat('./main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('js', ()=> {
    "use strict";
    return gulp.src(['./public/js/**/*.js', './public/js/**/*.vue'])
        .pipe(webpack(require('./webpack.base.config.js')))
        .pipe(gulp.dest('./public/dist/'));
});

gulp.task('server', ['babel', 'css', 'js'], ()=> {
    nodemon({
        watch: ['./src'],
        script: './dist/index.js',
        ext: '.js,.ejs',
        env: {'NODE_ENV': 'dev'},
        cwd: __dirname
    });

    gulp.watch('./src/**/*.js', ['babel']);
    gulp.watch('./public/css/**/*.css', ['css']);
    gulp.watch('./public/js/**/*.js', ['js']);
    gulp.watch('./public/js/vue/**/*.vue', ['js']);
});

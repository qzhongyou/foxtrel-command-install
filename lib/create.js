/**
 * @authors       qzhongyou
 * @date          2017-10-18 15:41:18
 * @description   生成项目
 */
'use strict';

var gulp = require("gulp");
var gulpRename = require("gulp-rename");
var gulpInstall = require("gulp-install");
var gulpTemplate = require('gulp-template');
var findUp = require("find-up");
var path = require("path");
var co = require("co");


module.exports.dir = function (projectName) {
    var root = path.join(process.cwd(), projectName);
    if (foxtrel.util.isDir(root)) {
        foxtrel.log.error(`${root} already exists`);
    }
    //创建项目目录
    foxtrel.util.mkdir(root);
    return root;
};


module.exports.bulid = function () {
    var me = this;
    var copyFiles = Array.prototype.slice(this.copyFiles, 0);
    for (var i = copyFiles.length; i > 0; i--) {
        gulp.src(copyFiles[i].entryFile)
            .pipe(gulpTemplate(me.props))
            .pipe(gulpRename(
                function (path) {
                    var {basename, ext} =copyFiles[i].outputFile;
                    basename && (path.basename = basename);
                    ext && (path.extname = ext);
                }))
            .pipe(gulp.dest(copyFiles[i].outputFile.dirname))
    }
}



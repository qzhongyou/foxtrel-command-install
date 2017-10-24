/**
 * @authors       qzhongyou
 * @date          2017-10-18 15:41:18
 * @description   生成项目
 */
'use strict';

var gulp = require("gulp");
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
};






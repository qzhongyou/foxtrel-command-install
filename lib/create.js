/**
 * @authors       qzhongyou
 * @date          2017-10-18 15:41:18
 * @description   生成项目
 */
'use strict';

var gulp = require("gulp");
var gulpTemplate = require('gulp-template');
var findUp = require("find-up");
var inquirer = require("./inquirer");
var path = require("path");
var co = require("co");

//fs.readdirSync

/**
 * @description 默认配置
 * @returns {{author: *, authorEmail: *, projectName: *}}
 */
function defaultInfo() {
    var homeDir, gitConfig, user, projectName;
    if (foxtrel.util.isWin) {
        homeDir = process.env.USERPROFILE;
    } else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
    }
    gitConfig = foxtrel.util.realpath(path.join(homeDir, '.gitconfig'));
    if (gitConfig) {
        user = require('iniparser').parseSync(gitConfig).user;
    }
    projectName = path.basename(process.cwd());
    return {
        author: user.name,
        authorEmail: user.email,
        projectName: projectName
    }
}


var configInfo = defaultInfo();

module.exports = function (next) {
    var root = path.join(process.cwd(), configInfo.projectName);
    if (foxtrel.util.isDir(root)) {
        foxtrel.log.error(`${root} already exists`);
    }
    //创建项目目录
    foxtrel.util.mkdir(root);

    //模板目录
    var template = findUp.sync(name, {cwd: __dirname});
    require(template)(me);
}





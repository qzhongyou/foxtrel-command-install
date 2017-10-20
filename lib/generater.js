/**
 * @authors       qzhongyou
 * @date          2017-10-17 17:41:18
 * @description   generater 获取生成
 */
'use strict';

var co = require("co");
var gulp = require("gulp");


var Generater = moudle.exports = function (setting) {
    /**
     * @description 默认配置
     * @type {any}
     */
    this.props = Generater._defaultprops();
    this.setting = foxtrel.util.clone(setting);
    this.is = Generater._is(this.setting.path);
    this.templateName = "app";

    var me = this;

    co(function *() {
        //执行安装
        if (yield Generater._install.bind(this)()) {
            //提问
            gulp.task("props", me.prompting.bind(this));
            //构建
            gulp.task("create", ["props"], Generater._create.bind(this));
        }
    })
};


/**
 * @description 默认配置
 * @returns {{author: *, authorEmail: *, projectName: *}}
 * @private
 */
Generater._defaultprops = function () {
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


/**
 * @description 是否为Generater
 * @param name
 * @returns {boolean}
 * @private
 */
Generater._is = function (name) {
    return name.indexOf(foxtrel.cli.name + '-generater') === 0;
}


/**
 * @description 安装
 */
Generater._install = require("./install");


/**
 * @description 构建
 */
Generater._create = require("./create");


/**
 * @description 提问
 */
Generater.prototype.prompting = require("./inquirer");


/**
 * @description generater模板目录
 */

Generater.prototype.destinationPath = function () {

}


/**
 * @description 配置参数
 */
Generater.prototype.writing = function () {

}

/**
 *
 */
Generater.prototype.copy = function () {

}


/**
 * @description 创建目录
 */

Generater.prototype.mkdir = function () {

}

module.exports = Generater;
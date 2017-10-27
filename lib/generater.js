/**
 * @authors       qzhongyou
 * @date          2017-10-17 17:41:18
 * @description   generater 获取生成
 */
'use strict';

var co = require("co");
var gulp = require("gulp");
var findUp = require("find-up");
var path = require("path");


var Generater = moudle.exports = function (setting) {
    /**
     * @description 默认配置,模块初始化配置
     * @type {any}
     */
    this.props = Generater._defaultprops();
    /**
     * @description 命令入参
     * @type {any}
     */
    this.setting = foxtrel.util.clone(setting);
    /**
     * @description 是否gennerater
     * @type {boolean}
     */
    this.is = Generater._is(this.setting.filePath);
    /**
     * @description 模板目录
     * @type {string}
     */
    this.templateName = "app";

    //项目目录
    this.projectRoot = null;

    //模板路径
    this.generaterRealPath = null;

    //copy文件
    this.copyFiles = [];


    var me = this;

    co(function *() {
        //执行安装
        if (yield Generater._install.bind(this)()) {
            //初始化,执行模块
            gulp.task("init", Generater._init.bind(this));

            // 提问
            gulp.task("props", ['init'], Generater.base.prompting.bind(this));

            //构建
            gulp.task("create", ['init', "props"], Generater._create.bind(this));
        }
    })
};


/**
 * @description 模板基础工具
 */
Generater.base = require("./base");


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
 * @description 初始化,执行Generater
 * @private
 */
Generater._init = function () {
    //获取模块地址
    this.generaterRealPath = findUp.sync(me.setting.filePath, {cwd: __dirname});
    //继承
    try {
        Generater.base = new this.extends(require(generaterRealPath));
    } catch (err) {
        process.stdout.write(err.toString().red);
        Generater.base = new Generater.base();
    }
}


/**
 * @description 构建
 */
Generater._create = function (next) {
    var me = this;
    var create = require("./create");
    //创建项目根目录
    me.projectRoot = create.dir(me.props.projectName);
    //创建文件等
    Generater.base.writing.bind(this);
    //构建
    create.build.bind(this)();
}


/**
 * @description generater模板目录
 */
Generater.prototype.templatePath = function (path) {
    var me = this;
    var ph = path.join(me.generaterRealPath, me.templateName, path);
    return foxtrel.util.realpathSafe(ph);
}


/**
 * @description 项目目录
 */
Generater.prototype.destinationPath = function (path) {
    var ph = path.join(projectRoot, path);
    return foxtrel.util.realpathSafe(ph);
}


/**
 * @description 输入输出
 * @param entryFile
 * @param outputFile
 */
Generater.prototype.copy = function (entryFile, outputFile) {
    var {ext, basename, dirname} = foxtrel.util.pathInfo(outputFile);
    this.copyFiles.push({
        entryFile: entryFile,
        outputFile: {ext, basename, dirname}
    });
};


/**
 * @description 继承
 * @returns {*}
 */
Generater.prototype.extends = function () {
    var args = [].slice.call(arguments, 0);
    if (Object.prototype.toString.call(args[0]) === "[object Function]") {
        var fn = args[0];
        //继承后函数
        var newBase = function () {
            Generater.base.call(this);
            fn.call(this);
        }
        //临时函数
        var tmp = function () {
        };
        //合并
        foxtrel.util.merge(tmp.prototype, Generater.base.prototype);
        foxtrel.util.merge(tmp.prototype, fn.prototype);
        newBase.prototype = new tmp();
        newBase.prototype.constructor = newBase;
        return newBase;
    } else {
        foxtrel.log.warn(`${args[0]} is not function`);
        return Generater.base;
    }
}

module.exports = Generater;

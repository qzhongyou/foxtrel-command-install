/**
 * @authors       qzhongyou
 * @date          2017-10-24 16:58:49
 * @description   generater 获取生成
 */
'use strict';

var Base = function () {
};

/**
 * @description 提问
 */
Base.prototype.prompting = require("./inquirer");


/**
 * @description 配置参数
 */
Base.prototype.writing = function () {
    var me = this;
    //拷贝整个文件
    me.copy(me.templatePath("**"), me.destinationPath("/"));

}


module.exports = Base;
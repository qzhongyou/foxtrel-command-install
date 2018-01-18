/**
 * @authors       qzhongyou
 * @date          2017-10-17 11:28:29
 * @description   install
 */

'use strict';

exports.name = "install <file>"

exports.usage = '<file> [options]';

exports.desc = 'install components';


exports.register = function (commander) {
    commander
        .option('-y,--yo', 'use yeoman generator', Boolean, false)
        .option('-r, --root <path>', 'set project root', String, process.cwd())
        .action(function (path, options) {
            /**
             * @description 基础配置信息
             * @type {{filePath: *, useYeoman: *, root: (any)}}
             */
            var setting = {
                filePath: path,
                useYeoman: options.yo,
                root: options.root
            };

            if (setting.useYeoman) {

            } else {
                let Generater = require("./lib/generater");
                var co = require("co");
                var gulp = require("gulp");
                var generater = new Generater(setting);

                co(function *() {
                    // 执行安装
                    if (yield generater.install.bind(generater)()) {
                        // 初始化,执行模块
                        gulp.task("init", generater.init.bind(generater));

                        // 提问
                        gulp.task("props", ['init'], function (next) {
                            Generater.base.prompting.bind(generater)(next);
                        });

                        // 构建
                        gulp.task("create", ['init', "props"], function (next) {
                            generater.create.bind(generater)(next);
                        });

                        gulp.start(['init', "props", "create"]);
                    }
                })
            }
        })
}


/**
 * @authors       qzhongyou
 * @date          2017-10-17 11:28:29
 * @description   install
 */

'use strict';

exports.name = "install <file>"

exports.usage = '[options] <file>';

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
                new Generater(setting);
            }
        })
}


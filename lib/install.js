/**
 * @authors       qzhongyou
 * @date          2017-10-17 17:41:18
 * @description   安装generater
 */
var child_process = require('child_process');


/**
 * @description install前检测
 * @param options
 * @private
 */

function _beforeInstall() {
    // is gennerater
    var flag = true;
    if (!this.is) {
        foxtrel.log.error(`${this.setting.filePath} not is generater`);
        flag = false;
    }

    return flag;
}


/**
 * @description 安装
 * @returns {Promise}
 */
module.exports = function () {
    var me = this;

    return new Promise((resolve, reject)=> {
        //install前检测
        if (!_beforeInstall.bind(me)()) {
            resolve(false);
        } else {
            process.stdout.write(['\n', 'installing ...'.green, '\n'].join(''));


            var child = child_process.spawn('npm', ['install', '-g', me.setting.filePath], {stdio: 'inherit'});
            /**
             * @description 子进程关闭
             */
            child.on("close", function (code, signal) {
                if (code == 0) {
                    process.stdout.write(['\n',
                        'installed a generator by running:\n',
                        ('npm install -g ' + me.setting.filePath).green,
                        '\n'
                    ].join(''));
                    resolve(true);
                } else {
                    foxtrel.log.error('Failed to installed a generator.\n'.red);
                }
            });
            /**
             * @description 子进程报错,不是io报错
             */
            child.on("error", function (err) {
                foxtrel.log.error('Failed to installed a generator.\n'.red);
            });

            process.on("exit", function () {
                child.kill();
            });
        }
    });
}



/**
 * @authors       qzhongyou
 * @date          2017-10-17 17:41:18
 * @description   安装generater
 */
const child_process = require('child_process');
const ph = require('path');
const packageJson = require('package-json');
const co = require("co");

/**
 * @description 检测是否需要安装模块
 * @returns {Promise}
 * @private
 */

function _beforeInstall() {
    return new Promise((resolve, reject)=> {
        // is it gennerater ?
        if (!this.is) {
            foxtrel.log.error(`${this.setting.filePath} not is generater`);
        } else {
            if (this.generaterRealPath) {
                 //获取远程模块详情
                packageJson(this.setting.filePath).then((data)=> {
                    let curVersion = require(ph.join(this.setting.filePath, 'package.json')).version;
                    // up-to-date
                    if (data.version == curVersion) {
                        foxtrel.log.debug("generater already had been installed && generater is up-to-date");
                        resolve(false);
                    } else {
                        foxtrel.log.debug("generater update version: " + data.version);
                        resolve(true);
                    }
                }).catch(err=> {
                    foxtrel.log.error(err);
                })
            } else {
                resolve(true);
            }
        }
    })
}


/**
 * @description 安装
 * @returns {Promise}
 */
module.exports = function () {
    var me = this;

    return new Promise((resolve, reject)=> {
        //install前检测
        co(function *() {
            if (yield _beforeInstall.bind(me)()) {
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
            } else {
                resolve(true);
            }
        })
    });
}



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
function _beforeInstall(options) {
    // is gennerater
    if (!options.is()) {
        foxtrel.log.error(`${options.filePath} not is generater`);
    }

    typeof options.beforeInstall == "function" ?
        options.beforeInstall() :
        options.beforeInstall ?
            foxtrel.log.warn("options.beforeAction is not a function") : "";

}

/**
 * @description install后,模板生成操作
 * @param afterAction
 * @private
 */

function _afterInstall(options) {


    typeof options.afterAction == "function" ?
        options.afterInstall() :
        options.afterInstall ?
            foxtrel.log.warn("options.beforeAction is not a function") : "";
}


module.exports = function (generater, options) {
    //install前检测
    if (!_beforeInstall(options))return;


    process.stdout.write(['\n', 'installing ...'.green, '\n'].join(''));

    var child = child_process.spawn('npm', ['install', '-g', generater], {stdio: 'inherit'});

    child.on("close", function (code, signal) {
        if (code == 0) {
            process.stdout.write(['\n',
                'installed a generator by running:\n',
                ('npm install -g ' + generater).green,
                '\n'
            ].join(''));
            _afterInstall(options);
        } else {
            foxtrel.log.error('Failed to installed a generator.\n'.red);
        }
    });

    child.on("error", function (err) {
        foxtrel.log.error('Failed to installed a generator.\n'.red);
    });

    process.on("exit", function () {
        child.kill();
    });

};





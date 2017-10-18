/**
 * @authors       qzhongyou
 * @date          2017-10-17 17:41:18
 * @description   generater 获取生成
 */
'use strict';

class Generater {

    constructor(option) {
        foxtrel.util.merge(this, option);
    }

    is() {
        var me = this;
        return me.filePath.indexOf(foxtrel.cli.name + '-generater') === 0;
    }

    afterInstall() {

    }

    beforeInstall() {

    }
}
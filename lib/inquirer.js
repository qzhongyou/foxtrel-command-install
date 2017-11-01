/**
 * @authors       qzhongyou
 * @date          2017-10-17 17:41:18
 * @description   提问
 */

'use strict';

var inquirer = require('inquirer');

module.exports = function (next) {
    var me = this, prompts = [];
    prompts.push({
        type: 'input',
        name: 'projectName',
        message: 'Project Name:',
        default: me.props.projectName
    });
    if (!me.props.author) {
        prompts.push({
            type: 'input',
            name: 'author',
            message: 'author Name:'
        })
    }
    if (!me.props.authorEmail) {
        prompts.push({
            type: 'input',
            name: 'authorEmail',
            message: 'your email:'
        })
    }

    inquirer.prompt(prompts).then(function (answers) {
        foxtrel.util.merge(me.props, answers);
        next();
    })
}
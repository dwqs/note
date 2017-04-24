/**
 * Created by pomy on 23/04/2017.
 * login
 */

'use strict';

let jwt = require('jsonwebtoken');

let admin = require('../admin/users.json');
let helper = require('../lib/index');

let status = function (ctx) {
    let token = ctx.cookies.get('token');
    ctx.response.set('content-type', 'application/json;charset=utf-8');

    ctx.body = {
        code: 0,
        data: {
            loginStatus: token ? true : false
        }
    };
};

let sign = function (ctx) {
    ctx.response.set('content-type', 'application/json;charset=utf-8');

    let res = {};
    let reqInfo = ctx.request.body;

    if(admin.username === reqInfo.username && admin.pwd === reqInfo.pwd){
        let token = jwt.sign(admin.token, admin.privateKey);
        ctx.state.userInfo = {
            login: true
        };
        res = {
            code: 0,
            data: {
                loginStatus: true
            }
        };
        ctx.cookies.set('token', token);
    } else {
        res = {
            code: 2000,
            data: {
                message: helper.getTypeByCode(2000)
            }
        }
    }

    ctx.body = res;
};

module.exports.register = function (router) {
    router.get('/login/status', status);
    router.post('/sign/in', sign);
};

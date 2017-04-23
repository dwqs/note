/**
 * Created by pomy on 23/04/2017.
 */

'use strict';

let jwt = require('jsonwebtoken');

let admin = require('../admin/users.json');
let pathHelper = require('../lib/index');

module.exports = async function (ctx, next) {
    if(!pathHelper.isNeedAuth(ctx.path)){
        await next();
    } else if(pathHelper.isNeedAuth(ctx.path)) {
        let token = ctx.cookies.get('token');
        let decoded = jwt.verify(token, admin.privateKey);

        if (decoded !== admin.token) {
            ctx.throw(401, '缺少认证数据, 需重新登录');
        }
        await next();
    }
};

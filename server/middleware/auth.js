/**
 * Created by pomy on 23/04/2017.
 */

'use strict';

let pathHelper = require('../lib/index');

module.exports = async function (ctx, next) {
    if(ctx.request.method === 'GET' || !pathHelper.isNeedAuth(ctx.path)){
        await next();
    } else if(pathHelper.isNeedAuth(ctx.path)) {
        let token = ctx.cookies.get('token');
        if (!token) {
            ctx.throw(401, '缺少认证数据, 需重新登录');
        }
        await next();
    }
};

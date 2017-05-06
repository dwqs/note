/**
 * Created by pomy on 23/04/2017.
 */

'use strict';

let jwt = require('jsonwebtoken');

let admin = require('../admin/users.json');
let helper = require('../lib/index');

module.exports = async function (ctx, next) {
    if(!helper.isNeedAuth(ctx.path)){
        await next();
    } else if(helper.isNeedAuth(ctx.path)) {
        let token = ctx.cookies.get('token');

        if (!token) {
            ctx.throw(401, helper.getTypeByCode(401));
        } else {
            let decoded = jwt.verify(token, admin.privateKey);

            if(decoded !== admin.token){
                ctx.throw(2001, helper.getTypeByCode(2001));
            }
        }
        await next();
    }
};

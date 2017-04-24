/**
 * Created by pomy on 21/03/2017.
 */

'use strict';

let helper = require('../lib/index');

module.exports = async function (ctx, next) {
    try{
        await next();
        if(ctx.response.status === 404){
            ctx.throw(helper.getTypeByCode(404), 404);
        }
    } catch (err) {
        let errorCode = err.status || 500;

        if(errorCode === 401 || errorCode === 2001){
            ctx.redirect('/login');
        }

        ctx.response.body = {
            code: errorCode,
            data: {
                message: err.message || helper.getTypeByCode(errorCode)
            }
        };
    }
};

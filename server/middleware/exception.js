/**
 * Created by pomy on 21/03/2017.
 */

'use strict';

module.exports = async function (ctx, next) {
    try{
        await next();
        if(ctx.response.status === 404){
            ctx.throw('请求的路径不存在', 404);
        }
    } catch (err) {
        let errorCode = err.status || 500;

        if(errorCode === 401){
            ctx.redirect('/login');
        }

        ctx.response.body = {
            code: errorCode,
            data: {
                message: err.message
            }
        };
    }
};

/**
 * Created by pomy on 21/03/2017.
 */

'use strict';

module.exports = async function (ctx, next) {
    try{
        await next();
        // if(ctx.response.status === 404){
        //     ctx.throw('请求的路径不存在', 404);
        // }
    } catch (err) {
        ctx.response.set('content-type', 'application/json;charset=utf-8');
        console.log('error',err.statusCode,err.status,err.message);
        // ctx.response.body = JSON.stringify({
        //     rescode: err.statusCode,
        //     data:{
        //         message: err.message
        //     }
        // })
    }
};

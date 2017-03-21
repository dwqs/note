/**
 * Created by pomy on 21/03/2017.
 */

'use strict';

module.exports = async function (ctx, next) {
    try{
        await next();
        if(ctx.response.status === 404){
            ctx.response.redirect('/index');
        }
    } catch (err) {

    }
}
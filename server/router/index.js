/**
 * Created by pomy on 08/03/2017.
 */

'use strict';

let Router = require('koa-router');
let router = new Router();

require('./home').register(router);
module.exports.register = function (app) {
    app.use(router.routes()).use(router.allowedMethods());
};
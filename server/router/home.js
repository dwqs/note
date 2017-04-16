/**
 * Created by pomy on 08/03/2017.
 */

'use strict';

let config = require('../../config/index');
let env = process.env.NODE_ENV || 'development';

let renderOnline = async function (projectName, bundleUrl,title, tpl) {

    this.body = await this.render(tpl, {
        scripts:['/dist/common.js',bundleUrl],
        styles: ['/dist/styles.css'],
        title: title
    });
};

let renderPage = async function (projectName, bundleUrl, title, tpl) {
    tpl = tpl || 'index';
    if (env === 'development') {
        this.body = await this.render(tpl, {
            scripts: [
                `http://127.0.0.1:${config.dev.clientPort}/dist/common.js`,
                `http://127.0.0.1:${config.dev.clientPort}${bundleUrl}`
            ],
            styles: [],
            title: title
        });
    } else {
        await renderOnline.call(this, projectName, bundleUrl,title, tpl);
    }
};

let index = async function (ctx,next) {
    await renderPage.call(ctx, 'note', '/dist/app.js', 'Note-Write what you want','index');
};

module.exports.register = function (router) {
    router.all('/', index);
    router.all('/index', index);

    //404
    router.get('*', index);
};

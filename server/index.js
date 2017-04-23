/**
 * Created by pomy on 08/03/2017.
 */

'use strict';
let path = require('path');

let compress = require('koa-compress');
let logger = require('koa-logger');
let serve = require('koa-static');
let Koa = require('koa');
let json = require('koa-json');
let bodyParser = require('koa-bodyparser');
let co = require('co');
let render = require('koa-swig');

let config = require('../config/index');
let port = process.env.NODE_ENV != 'production' ? config.dev.serverPort : config.build.serverPort;
let controller = require('./router');

let exception = require('./middleware/exception');
let auth = require('./middleware/auth');

let app = new Koa();

app.context.render = co.wrap(render({
    root: path.resolve(__dirname, './views'),
    autoescape: true,
    cache: process.env.NODE_ENV != 'production' ? false : 'memory',
    ext: 'html',
    writeBody: false
}));

app.use(exception);
app.use(auth);
app.use(bodyParser());
app.use(json());
// Serve static files
app.use(serve(path.resolve(__dirname, '../public')));
// Compress
app.use(compress());
// Logger
app.use(logger());

controller.register(app);

app.listen(`${port}`,'127.0.0.1',  () => {
    console.log(process.env.NODE_ENV,`listening on port ${port}...`);
});

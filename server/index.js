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
let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');
let Promise = require("bluebird");

let config = require('../config/index');
let port = process.env.NODE_ENV != 'production' ? config.dev.serverPort : config.build.serverPort;
let controller = require('./router');

let exception = require('./middleware/exception');
let auth = require('./middleware/auth');
let dbConfig = require('./db/config');
let NoteSchema = require('./db/note');

let app = new Koa();

Promise.promisifyAll(mongoose);

mongoose.connect(dbConfig.uri, dbConfig.options);
mongoose.connection.on("connected", () => {
    console.log("------db connected success！------");
    autoIncrement.initialize(mongoose.connection);
    NoteSchema.plugin(autoIncrement.plugin, {
        model: 'Note',
        field: 'noteId',
        startAt: 1,
        incrementBy: 1
    });
    let NoteModel = mongoose.model('Note', NoteSchema);
    Promise.promisifyAll(NoteModel);
    app.context.NoteModel = NoteModel;
});

mongoose.connection.on("error", () => {
    console.log("------db connect error！------");
});

mongoose.connection.on('disconnected', () => {
    console.log("------db disconnected！------");
});

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

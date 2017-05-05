/**
 * Created by pomy on 02/05/2017.
 */

'use strict';

let helper = require('../lib/index');

let saveNote = async function (ctx,next) {
    ctx.response.set('content-type', 'application/json;charset=utf-8');

    let {title, content, isPublic} = ctx.request.body;

    try{
        let res = await ctx.NoteModel.create({
            title: title,
            content: content,
            isPublic: isPublic,
            created_time: Date.now(),
            updated_time: Date.now()
        });

        ctx.body = {
            code: 0,
            data: {
                id: res.noteId
            }
        }
    } catch (err) {
        ctx.body = {
            code: 2002,
            data: {
                message: err.message || helper.getTypeByCode(2002)
            }
        }
    }
};

let updateNote = async function (ctx) {
    ctx.response.set('content-type', 'application/json;charset=utf-8');
};

let deleteNote = async function (ctx) {
    ctx.response.set('content-type', 'application/json;charset=utf-8');

    let {noteId} = ctx.request.body;

    try {
        let res = await ctx.NoteModel.deleteOne({noteId: noteId});

        ctx.body = {
            code: 0,
            data: {
                isDelete: res.result.ok
            }
        }
    } catch (err) {
        ctx.body = {
            code: 2005,
            data: {
                message: err.message || helper.getTypeByCode(2005)
            }
        }
    }
};

let getLatestList = async function (ctx) {
    ctx.response.set('content-type', 'application/json;charset=utf-8');

    let token = ctx.cookies.get('token');
    let {latestListSize} = ctx.request.query;

    let res = [];

    try{
        if(token && helper.isAdmin(token)) {
            res = await ctx.NoteModel.find({},{
                noteId: 1,
                title: 1,
                _id: 0
            }).sort({noteId: -1}).limit(parseInt(latestListSize));
        } else {
            res = await ctx.NoteModel.find({isPublic: true},{
                noteId: 1,
                title: 1,
                _id: 0
            }).sort({noteId: -1}).limit(parseInt(latestListSize));
        }

        ctx.body = {
            code: 0,
            data: {
                list: res
            }
        }
    } catch (err) {
        ctx.body = {
            code: 2003,
            data: {
                message: err.message || helper.getTypeByCode(2003)
            }
        }
    }
};

let getNotesList = async function (ctx) {
    ctx.response.set('content-type', 'application/json;charset=utf-8');

    let token = ctx.cookies.get('token');
    let {curPage, pageSize} = ctx.request.query;
    let res = [];

    try{
        if(token && helper.isAdmin(token)) {
            res = await ctx.NoteModel.find({},{
                _id: 0
            }).sort({noteId: -1}).limit(parseInt(pageSize)).skip(parseInt((curPage - 1) * pageSize));
        } else {
            res = await ctx.NoteModel.find({isPublic: true},{
                _id: 0
            }).sort({noteId: -1}).limit(parseInt(pageSize)).skip(parseInt((curPage - 1) * pageSize));
        }

        ctx.body = {
            code: 0,
            data: {
                list: res
            }
        }
    } catch (err) {
        ctx.body = {
            code: 2003,
            data: {
                message: err.message || helper.getTypeByCode(2004)
            }
        }
    }
};

module.exports.register = function (router) {
    router.get('/note/latest', getLatestList);
    router.get('/note/list', getNotesList);
    router.post('/note/save', saveNote);
    router.post('/note/update', updateNote);
    router.post('/note/delete', deleteNote);
};

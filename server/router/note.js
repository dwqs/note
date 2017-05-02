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

let updateNote = async function (ctx,next) {
    ctx.response.set('content-type', 'application/json;charset=utf-8');
};

let deleteNote = async function (ctx,next) {
    ctx.response.set('content-type', 'application/json;charset=utf-8');
};

module.exports.register = function (router) {
    router.post('/note/save', saveNote);
    router.post('/note/update', updateNote);
    router.delete('/note/delete', deleteNote);
};

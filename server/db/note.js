/**
 * Created by pomy on 02/05/2017.
 */

'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
    title: { type: String, required: true},              //标题
    content: { type: String},                            //内容
    created_time: { type: Date, default: Date.now},      // 创建时间
    updated_time: { type: Date, default: Date.now},      // 更新日期
    isPublic: { type: Boolean, default: true}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// let NoteModel = mongoose.model('Note', NoteSchema);
// Promise.promisifyAll(NoteModel);

module.exports = NoteSchema;

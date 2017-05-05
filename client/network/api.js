
/**
 * Created by pomy on 2017/4/12.
 * api 封装
 */

'use strict';

import network from './index';

export default {
    async getLoginStatus(){
        let res = await network.get({
            url: '/login/status',
            data: {}
        });
        return res;
    },

    async login(data){
        let res = await network.post({
            url: '/sign/in',
            data: data
        });
        return res;
    },

    async savaNote(data){
        let res = await network.post({
            url: '/note/save',
            data: data
        });
        return res;
    },

    async updateNote(data){
        let res = await network.post({
            url: '/note/update',
            data: data
        });
        return res;
    },

    async getLatestNotes(data){
        let res = await network.get({
            url: '/note/latest',
            data: data
        });
        return res;
    },

    async getNotesList(data){
        let res = await network.get({
            url: '/note/list',
            data: data
        });
        return res;
    },

    async deleteNote(data){
        let res = await network.post({
            url: '/note/delete',
            data: data
        });
        return res;
    },

    async getNoteDetailById(data){
        let res = await network.get({
            url: '/note/detail',
            data: data
        });
        return res;
    }
};

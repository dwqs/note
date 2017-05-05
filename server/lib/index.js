/**
 * Created by pomy on 23/04/2017.
 */

'use strict';

let jwt = require('jsonwebtoken');

let admin = require('../admin/users.json');

let ignoreAuthPaths = [/\/new\/?/, /\/edit\/\d+\/?/, /\/note\/(save|delete|update)\/?/];
let code2type = [{
    code: 2000,
    type: '用户名或者密码错误'
},{
    code: 2001,
    type: 'token 无效'
},{
    code: 2002,
    type: '日记保存失败'
},{
    code: 2003,
    type: '获取最新日记列表失败'
},{
    code: 2004,
    type: '获取日记列表失败'
},{
    code: 2005,
    type: '删除日记失败'
},{
    code: 404,
    type: '请求的路径不存在'
},{
    code: 500,
    type: '服务端错误'
},{
    code: 401,
    type: '认证错误'
}];

module.exports = {
    isNeedAuth: (path) => {
        for(let item in ignoreAuthPaths){
            if(ignoreAuthPaths[item].test(path)){
                return true;
            }
        }
        return false;
    },

    getTypeByCode: (code) => {
        for(let index in code2type ){
            if(code2type[index].code === code){
                return code2type[index].type;
            }
        }
        return 'unknown type';
    },

    isAdmin: (token) => {
        let decoded = jwt.verify(token, admin.privateKey);
        return decoded === admin.token;
    }
};

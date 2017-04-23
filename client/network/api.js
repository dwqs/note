
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
    }
};

/**
 * Created by pomy on 2017/4/12.
 * 网络请求封装
 */

'use strict';

export default {
    get (obj) {
        return Promise.resolve(
            $.ajax({
                method: 'GET',
                url: `${obj.url}`,
                data: obj.data
            })
        );
    },

    post (obj) {
        return Promise.resolve(
            $.ajax({
                url: `${obj.url}`,
                method: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(obj.data)
            })
        );
    },

    delete (obj) {
        return Promise.resolve(
            $.ajax({
                url: `${obj.url}`,
                method: 'DELETE',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(obj.data)
            })
        );
    }
};

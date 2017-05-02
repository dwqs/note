/**
 * Created by pomy on 23/04/2017.
 * 状态
 */

'use strict';

import {observable, action, useStrict} from 'mobx';
import {message} from 'antd';

useStrict(true);

import api from '../network/api';

class UserStatus {
    @observable
    loginStatus = false;

    @action
    queryLoginStatus(){
        api.getLoginStatus().then((res) => {
            if(!res.code){
                 this.changeStatus(res.data.loginStatus);
            } else {
                this.changeStatus(false);
            }
        }, (err) => {
            this.changeStatus(false);
            message.error('获取登录状态错误');
        })
    }

    @action
    changeStatus(status){
        this.loginStatus = status;
    }

    @action
    userLogin(data){
        return api.login(data);
    }
}

let userStatus = new UserStatus();

export default userStatus;

/**
 * Created by pomy on 23/04/2017.
 * 状态
 */

'use strict';

import {observable, action, useStrict} from 'mobx';

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
            console.log('getLoginStatus err', err.status);
        })
    }

    @action
    changeStatus(status){
        this.loginStatus = status;
    }

    @action
    userLogin(data){
        api.login(data).then((res) => {
            console.log('user login',res)
            if(!res.code){
                this.changeStatus(res.data.loginStatus);
            } else {
                this.changeStatus(false);
            }
        }, (err) => {
            this.changeStatus(false);
            console.log('userLogin err', err.status);
        })
    }
}

let userStatus = new UserStatus();

export default userStatus;

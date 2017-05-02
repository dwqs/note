/**
 * Created by pomy on 23/04/2017.
 * login
 */

'use strict';

import './index.css';

import React, {Component} from 'react';
import { Input, Icon , Button, message} from 'antd';
import {observer,inject} from 'mobx-react';

@inject('userStatus')
@observer
export  default  class Hello extends Component{

    constructor (){
        super();
        this.state = {
            username: '',
            pwd: '',
            loading: false
        }
    }

    login = () => {
        if(!this.state.username){
            message.warning('请输入用户名');
            return;
        }
        if(!this.state.pwd){
            message.warning('请输入密码');
            return;
        }
        this.setState({
            loading: true
        });
        this.props.userStatus.userLogin({
            username: this.state.username,
            pwd: this.state.pwd
        }).then((res) => {
            if(res.code){
                message.error(res.data.message);
                this.setState({
                    loading: false
                });
            } else {
                this.props.userStatus.changeStatus(true);
                window.location = '/index';
            }
        }, (err) => {
            message.error('登录出错');
            this.setState({
                loading: false
            });
        })
    };

    usernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    };

    pwdChange = (e) => {
        this.setState({
            pwd: e.target.value
        })
    };

    emitEmpty(type){
        if(type === 1){
            this.setState({
                username: ''
            })
        } else {
            this.setState({
                pwd: ''
            })
        }
    }

    render(){
        const { username, pwd } = this.state;
        const userNameSuffix = username ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this, 1)} /> : null;
        const pwdSuffix = pwd ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this, 2)} /> : null;

        return (
            <div className="login">
                <div className="username">
                    <Input
                        suffix={userNameSuffix}
                        value={username}
                        onChange={this.usernameChange}
                        prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                        placeholder="用户名" />
                </div>
                <div className="pwd">
                    <Input
                        suffix={pwdSuffix}
                        prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                        type="password"
                        value={pwd}
                        onChange={this.pwdChange}
                        placeholder="密码" />
                </div>
                <Button type="primary" loading={this.state.loading} onClick={this.login}>
                    登录
                </Button>
            </div>
        )
    }
}

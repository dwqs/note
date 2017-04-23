/**
 * Created by pomy on 23/04/2017.
 * login
 */

'use strict';

import './index.css';

import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';

//
@inject('userStatus')
@observer
export  default  class Hello extends Component{

    constructor (){
        super();
        this.state = {
            username: '',
            pwd: ''
        }
    }

    componentWillReact() {
        console.log("I will re-render, since the todo has changed!");
    }

    login = () => {
        this.props.userStatus.userLogin({
            username: this.state.username,
            pwd: this.state.pwd
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

    render(){
        return (
            <div className="login">
                <input type="text" placeholder="用户名" onInput={this.usernameChange}/>
                <input type="password" placeholder="密码" onInput={this.pwdChange}/>
                <button onClick={this.login}> 登录</button>
            </div>
        )
    }

    componentDidMount(){
        if(this.props.userStatus.loginStatus){
            window.location = '/index';
        }
    }

    componentDidUpdate(){
        if(this.props.userStatus.loginStatus){
            window.location = '/index';
        }
    }
}

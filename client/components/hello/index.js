/**
 * Created by pomy on 08/02/2017.
 */

'use strict';

import './index.css';

import React, {Component} from 'react';
import { Link} from 'react-router';
import {observer,inject} from 'mobx-react';

@inject('list', 'userStatus')
@observer
export  default  class Hello extends Component{
    constructor (){
        super();
    }

    add = () => {
        console.log('add');
        this.props.list.syncAddTodo('test');
    }

    delete = (index) => {
        return () => {
            console.log('delete',index);
            this.props.list.deleteTodo(index);
        }
    }

    asyncAdd = () => {
        console.log('async add');
        this.props.list.asyncAddTodo('async').then((data)=> console.log(data));
    }

    render(){
        console.log('status', this.props.userStatus.loginStatus);
        console.log('length',this.props.list.todos.length);
        return (
            <div className="desc">
                <p>A simple template webpack 2 + react 15 + Koa 2 setup for projects</p>
                <p><img src='/dist/images/logo.png' alt="logo"/></p>
                <p>doc: <a href="https://github.com/dwqs/react-koa">react-koa</a></p>
                {
                    this.props.userStatus.loginStatus ? <p><Link to="/new">新建日志</Link></p> : null
                }
                <button onClick={this.add}>添加</button>
                <button onClick={this.asyncAdd}>异步添加</button>
                <ul>
                    {
                        this.props.list.todos.map((item,index) => {
                            return <li key={index} onClick={this.delete(index)}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

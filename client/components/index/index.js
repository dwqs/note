/**
 * Created by pomy on 08/02/2017.
 */

'use strict';

import './index.css';

import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';

import Header from '@components/header/index';

@inject('list', 'userStatus')
@observer
export  default  class Hello extends Component{
    constructor (){
        super();
    }

    render(){
        console.log('length',this.props.list.todos.length);
        return (
            <div className="note-main-wrap">
                <Header loginStatus={this.props.userStatus.loginStatus}></Header>
                <div className="note-main">
                    <div className="note-main-loading">
                        <img src="http://onasvjoyz.bkt.clouddn.com/loading.gif" />
                    </div>
                </div>
            </div>
        )
    }
}

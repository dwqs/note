/**
 * Created by pomy on 09/03/2017.
 */

'use strict';

import './reset.css';

import React, {Component,PropTypes} from 'react';
import {observer,inject} from 'mobx-react';

@inject('userStatus')
@observer
export  default  class Hello extends Component{
    constructor (){
        super();
    }

    componentWillMount(){
        this.props.userStatus.queryLoginStatus();
    }

    render(){
        return (
            <div className="note-container">
                {this.props.children}
            </div>
        )
    }
}

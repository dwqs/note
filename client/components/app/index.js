/**
 * Created by pomy on 09/03/2017.
 */

'use strict';

import 'antd/dist/antd.css';
import './markdown.css';

import React, {Component,PropTypes} from 'react';
import {observer,inject} from 'mobx-react';

@inject('status', 'list')
@observer
export  default  class Hello extends Component{
    constructor (){
        super();
    }

    componentWillMount(){
        this.props.status.queryLoginStatus();
        this.props.list.getLatestNotes();
        this.props.list.getNoteList();
    }

    render(){
        return (
            <div className="note-container">
                {this.props.children}
            </div>
        )
    }
}

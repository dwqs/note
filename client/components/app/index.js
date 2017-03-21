/**
 * Created by pomy on 09/03/2017.
 */

'use strict';

import './reset.css';

import React, {Component,PropTypes} from 'react';

export  default  class Hello extends Component{
    constructor (){
        super();
    }

    render(){
        return (
            <div className="note-container">
                {this.props.children}
            </div>
        )
    }
}
/**
 * Created by pomy on 09/03/2017.
 */

'use strict';

import React, {Component,PropTypes} from 'react';
import { Link} from 'react-router';

export  default  class Hello extends Component{
    constructor (){
        super();
    }

    static propTypes = {
        desc: PropTypes.string
    };

    static defaultProps = {
        desc: 'A simple template webpack 2 + react 15 + Koa 2 setup for projects'
    };

    render(){
        return (
            <div className="note-container">
                {this.props.children}
            </div>
        )
    }
}
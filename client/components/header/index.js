/**
 * Created by pomy on 04/05/2017.
 */

'use strict';

import './index.css';

import React, {Component} from 'react';
import { Link} from 'react-router';

export default class Header extends Component {
    constructor (){
        super ();
    }

    render (){

        let status = this.props.loginStatus;

        return (
            <header>
                <div>
                    <div className="note-header">
                        <Link to="/index" className="logo-text">Note</Link>
                        <span className="logo-text-desc">write what you want</span>
                    </div>
                    <div className="star-me">
                        <a href="https://github.com/dwqs/note" target="_blank">Star Me</a>
                    </div>
                    <Link to="/new" className="note-new-anction" style={{display: status ? 'block' : 'none'}}>新建</Link>
                </div>
            </header>
        );
    }
}

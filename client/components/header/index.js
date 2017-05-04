/**
 * Created by pomy on 04/05/2017.
 */

'use strict';

import './index.css';

import React, {Component} from 'react';

export default class Header extends Component {
    constructor (){
        super ();
    }

    render (){
        return (
            <header>
                <div>
                    <div className="note-header">
                        <span className="logo-text">Note</span>
                        <span className="logo-text-desc">write what you want</span>
                    </div>
                    <div className="star-me">
                        <a href="https://github.com/dwqs/note" target="_blank">Star Me</a>
                    </div>
                </div>
            </header>
        );
    }
}

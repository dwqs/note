/**
 * Created by pomy on 21/03/2017.
 */

'use strict';

import './index.css';

import React, {Component} from 'react';
import { Link} from 'react-router';

export  default  class NotFound extends Component{
    constructor (){
        super();
    }

    render(){
        return (
            <div className="not-found">
                <div className="box">
                    <div className="clearfix">
                        <figure className="figure">
                            <img src="/images/404.png" alt="杯具啊" />
                        </figure>
                        <h1>杯具啊！</h1>
                        <div className="p">HTTP 404……<br />可能这个页面已经飞走了</div>
                        <div className="p">
                            <Link to="/">回首页</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

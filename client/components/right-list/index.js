/**
 * Created by pomy on 05/05/2017.
 */

'use strict';

import './index.css';

import React, {Component} from 'react';
import { Link} from 'react-router';

export default class RightList extends Component{

    constructor() {
        super();
    }

    renderLatestList(data) {
        const {latestLoading} = this.props;
        let list = data.map((item) => {
            return (
                <li className="right-list-item" key={item.noteId}>
                    <Link to={`/detail/${item.noteId}`} className="text-clamp">{item.title}</Link>
                </li>
            )
        });

        return (
            <ul className="note-list" style={{display: latestLoading ? 'none' : 'block', marginBottom: "10px"}}>
                {list.length ? list : <p>暂无数据</p>}
            </ul>
        );
    }

    render(){
        const {latestLoading, latestList} = this.props;
        let latestNoteList = this.renderLatestList(latestList);

        return (
            <div className="note-main-right">
                <h2 className="right-title">最新日记</h2>
                {latestNoteList}
                <div className="note-main-loading" style={{display: latestLoading ? 'block' : 'none'}}>
                    <img src="http://onasvjoyz.bkt.clouddn.com/loading.gif" />
                </div>
            </div>
        )
    }
}

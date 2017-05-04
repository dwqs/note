/**
 * Created by pomy on 08/02/2017.
 */

'use strict';

import './index.css';

import React, {Component} from 'react';
import { Link} from 'react-router';
import marked from 'marked';
import hljs from 'highlight.js';
import {observer,inject} from 'mobx-react';
import {observable} from 'mobx';
import {message, Modal} from 'antd';

import Header from '@components/header/index';

const EXP = /(<h[1-6].*>\.*.*<\/h[1-6]>|<p.*>\.*.*<\/p>)/g;

@inject('list', 'userStatus')
@observer
export  default  class Hello extends Component{
    constructor (){
        super();
        this.state = {
            visible: false
        };
    }

    componentWillMount(){
        this.props.list.getLatestNotes();
        this.props.list.getNoteList();
    }

    cutSumary = (html) =>{
        let matchedArr = html.match(EXP);
        if(!matchedArr){
            return '<p>没有摘要</p>';
        }

        return matchedArr.length > 5 ? matchedArr.slice(0, 5).join('') : matchedArr.join('');
    };

    renderLatestList(data) {
        const {latestLoading} = this.props.list;
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

    renderNoteList(data){
        const {loginStatus} = this.props.userStatus;
        const {noteListLoading} = this.props.list;

        let list = data.map((item) => {
            return (
                <li className="list-item" key={item.noteId}>
                    <h3 className="item-title">
                        <Link to={`/detail/${item.noteId}`} className="text-clamp">
                            {item.title}
                        </Link>
                    </h3>
                    <div className="item-summary" dangerouslySetInnerHTML={{__html: this.cutSumary(marked(item.content))}}></div>
                    <div className="item-meta">
                        <span className="item-time"> 时间</span>
                        <ul className="item-action-list">
                            <li>
                                <Link to={`/detail/${item.noteId}`} style={{display: loginStatus ? 'inline-block' : 'none'}}>编辑</Link>
                            </li>
                            <li>
                                <Link to="javascript:void 0;" style={{display: loginStatus ? 'inline-block' : 'none'}}>删除</Link>
                            </li>
                            <li>
                                <Link to={`/detail/${item.noteId}`}>阅读全文</Link>
                            </li>
                        </ul>
                    </div>
                </li>
            )
        });

        return (
            <ul className="note-list" style={{display: noteListLoading ? 'none' : 'block'}}>
                {list.length ? list : <p>暂无数据</p>}
            </ul>
        );
    }

    render(){

        const {noteList, latestList, noteListLoading, latestLoading} = this.props.list;

        let latestNoteList = this.renderLatestList(observable(latestList).slice());
        let notesList = this.renderNoteList(observable(noteList).slice());

        return (
            <div className="note-main-wrap">
                <Header loginStatus={this.props.userStatus.loginStatus}></Header>
                <div className="note-main">
                    <div className="note-main-left">
                        <div className="note-list-wrap" style={{display: noteListLoading ? 'none' : 'block'}}>
                            {notesList}
                        </div>
                        <div className="note-main-loading" style={{display: noteListLoading ? 'block' : 'none'}}>
                            <img src="http://onasvjoyz.bkt.clouddn.com/loading.gif" />
                        </div>
                    </div>
                    <div className="note-main-right">
                        <h2 className="right-title">最新日记</h2>
                        {latestNoteList}
                        <div className="note-main-loading" style={{display: latestLoading ? 'block' : 'none'}}>
                            <img src="http://onasvjoyz.bkt.clouddn.com/loading.gif" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        let renderer = new marked.Renderer();

        renderer.codespan = (code) => {
            return `<code class="note-span-code">${code}</code>`
        };

        hljs.configure({
            tabReplace: '    ',
            classPrefix: 'note-code-',
            useBR: true
        });

        marked.setOptions({
            renderer: renderer,
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: (code) => {
                return hljs.highlightAuto(code).value;
            }
        });
    }
}

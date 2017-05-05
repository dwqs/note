/**
 * Created by pomy on 05/05/2017.
 */

'use strict';

import './index.css';

import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import marked from 'marked';
import { Link} from 'react-router';
import hljs from 'highlight.js';
import {message} from 'antd';
import {observable} from 'mobx';

import Header from '@components/header/index';
import RightList from '@components/right-list/index';

import {dateHelper} from '../../lib/index';

@inject('status', 'list')
@observer
export  default  class NoteDetail extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            note: null
        };
    }

    componentWillMount(){
        let noteId = parseInt(this.props.params.noteId);
        this.props.list.getNoteDetail(noteId)
            .then((res) => {
                if(res.code){
                    message.error(res.data.message);
                    this.setState({
                        loading: false,
                        note: null
                    })
                } else {
                    this.setState({
                        loading: false,
                        note: res.data.note
                    })
                }
            }, (err) => {
                let msg = err.message || (err.data && err.data.message) || '获取日志详情失败';
                message.error(msg);
                this.setState({
                    loading: false,
                    note: null
                })
            }).catch((err) => {
                let msg = err.message || (err.data && err.data.message) || '获取日志详情失败';
                message.error(msg);
                this.setState({
                    loading: false,
                    note: null
                })
            })
    }

    render() {

        const { latestList, latestLoading} = this.props.list;
        const item = this.state.note;
        const loginStatus = this.props.status.loginStatus;

        return (
            <div className="note-detail-wrap">
                <Header loginStatus={loginStatus}></Header>
                <div className="detail-main">
                    <div className="detail-main-left">
                        <div className="detail-content-wrap" style={{display: this.state.loading ? 'none' : 'block'}}>
                            <h3 className="detail-title">
                                <Link to={`/detail/${item && item.noteId}`}>
                                    {item && item.title}
                                </Link>
                            </h3>
                            <div className="note-markdown-body detail-content" dangerouslySetInnerHTML={{__html: item && marked(item.content)}}></div>
                            <div className="detail-meta">
                                <span className="detail-time">最后更新于: {dateHelper(item && item.updated_at)}</span>
                                <ul className="detail-action-list">
                                    <li>
                                        <Link to={`/detail/${item && item.noteId}`} style={{display: loginStatus ? 'inline-block' : 'none'}}>编辑</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="note-main-loading" style={{display: this.state.loading ? 'block' : 'none'}}>
                            <img src="http://onasvjoyz.bkt.clouddn.com/loading.gif" />
                        </div>
                    </div>
                    <RightList latestLoading={latestLoading} latestList={observable(latestList).slice()}></RightList>
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

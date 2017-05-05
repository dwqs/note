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
import {message, Modal, Button} from 'antd';

import Header from '@components/header/index';
import RightList from '@components/right-list/index';

import {dateHelper} from '../../lib/index';

const EXP = /(<h[1-6].*>\.*.*<\/h[1-6]>|<p.*>\.*.*<\/p>)/g;

@inject('list', 'status')
@observer
export  default  class Index extends Component{
    constructor (){
        super();
        this.state = {
            visible: false,
            modalContent: '',
            noteId: -1,
            loading: false
        };
    }

    componentWillMount(){

    }

    cutSumary = (html) =>{
        let matchedArr = html.match(EXP);
        if(!matchedArr){
            return '<p>没有摘要</p>';
        }

        if(matchedArr.length > 5){
            matchedArr[4] = matchedArr[4] + '...';
        }

        return matchedArr.length > 5 ? matchedArr.slice(0, 5).join('') : matchedArr.join('');
    };

    deleteNote(noteId, title) {
        return () => {
            this.setState({
                visible: true,
                modalContent: title,
                noteId: noteId
            })
        }
    }

    renderNoteList(data){
        const {loginStatus} = this.props.status;
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
                        <span className="item-time">{dateHelper(item.created_at)}</span>
                        <ul className="item-action-list">
                            <li>
                                <Link to={`/detail/${item.noteId}`} style={{display: loginStatus ? 'inline-block' : 'none'}}>编辑</Link>
                            </li>
                            <li>
                                <span onClick={this.deleteNote(item.noteId, item.title)} style={{display: loginStatus ? 'inline-block' : 'none'}}>删除</span>
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

    handleOk = (e) => {
        this.setState({
            loading: true
        });
        this.props.list.deleteNoteById(this.state.noteId)
            .then((res) => {
                if(res.data.isDelete){
                    this.props.list.updateNotesList(this.state.noteId);
                    this.setState({
                        visible: false,
                        modalContent: '',
                        noteId: -1,
                        loading: false
                    });
                } else {
                    let msg = '删除日记出错';
                    message.error(msg);
                    this.setState({
                        loading: false
                    });
                }
            }, (err) => {
                let msg = err.message || (err.data && err.data.message) || '删除日记出错';
                message.error(msg);
                this.setState({
                    loading: false
                });
            })
            .catch((err) => {
                let msg = err.message || (err.data && err.data.message) || '删除日记出错';
                message.error(msg);
                this.setState({
                    loading: false
                });
            });
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
            modalContent: '',
            noteId: -1
        });
    };

    render(){

        const {noteList, latestList, noteListLoading, latestLoading} = this.props.list;
        let notesList = this.renderNoteList(observable(noteList).slice());

        return (
            <div className="note-main-wrap">
                <Header loginStatus={this.props.status.loginStatus}></Header>
                <Modal title="删除日记"
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                       footer={[
                           <Button key="back" size="large" onClick={this.handleCancel}>取消删除</Button>,
                           <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                               确认删除
                           </Button>,
                       ]}
                >
                    <p>{`确定删除「${this.state.modalContent}」?`}</p>
                </Modal>
                <div className="note-main">
                    <div className="note-main-left">
                        <div className="note-list-wrap" style={{display: noteListLoading ? 'none' : 'block'}}>
                            {notesList}
                        </div>
                        <div className="note-main-loading" style={{display: noteListLoading ? 'block' : 'none'}}>
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

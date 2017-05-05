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

import Header from '@components/header/index';

import {dateHelper} from '../../lib/index';

@inject('status', 'list')
@observer
export  default  class NoteDetail extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
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

        return (
            <div className="note-detail-wrap">
                <Header loginStatus={this.props.status.loginStatus}></Header>
                <div className="detail-main">
                    <div className="detail-main-left"></div>
                    <div className="detail-main-right"></div>
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

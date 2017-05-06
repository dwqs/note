/**
 * Created by pomy on 11/03/2017.
 */

'use strict';

import './index.css';

import React, {Component,PropTypes} from 'react';
import { browserHistory } from 'react-router';
import { Button, message, Input, Icon, Radio, Modal} from 'antd';
import {observer,inject} from 'mobx-react';
import marked from 'marked';
import hljs from 'highlight.js';

const RadioGroup = Radio.Group;

@inject('note', 'status', 'list')
@observer
export default class NewNote extends Component{
    constructor (){
        super();
        this.state = {
            __html: '',
            text: '',
            loading: false,
            title: '',
            isPublic: true,
            visible: false
        };

        this.top = 0;
        this.areaInput = null;
        this.areaScroll = null;
        this.resDom = null;
        this.maxScroll = 0;
    }

    componentWillMount(){
        if(!this.props.status.loginStatus){
            window.location.href = '/login';
        }

        //编辑
        if(/^\d+$/.test(this.props.params.noteId)) {
            this.props.list.getNoteDetail(parseInt(this.props.params.noteId))
                .then((res) => {
                    if(res.code){
                        message.error(res.data.message);
                    } else {
                        this.setState({
                            __html: marked(res.data.note.content),
                            text: res.data.note.content,
                            title: res.data.note.title,
                            isPublic: res.data.note.isPublic
                        })
                    }
                }, (err) => {
                    let msg = err.message || (err.data && err.data.message) || '获取日志详情失败';
                    message.error(msg);
                }).catch((err) => {
                    let msg = err.message || (err.data && err.data.message) || '获取日志详情失败';
                    message.error(msg);
            })
        }
    }

    valChange(e){
        this.top = e.currentTarget.scrollTop;
        this.maxScroll = e.target.scrollHeight - e.target.clientHeight;
        this.resDom.dispatchEvent(this.areaInput);
        this.setState({
            __html: marked(e.target.value),
            text: e.target.value
        })
    }

    titleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    };

    handleAreaScroll(e){
        this.maxScroll = e.target.scrollHeight - e.target.clientHeight;
        this.top = e.currentTarget.scrollTop;
        this.resDom.dispatchEvent(this.areaScroll);
    }

    handleSectionScroll(e){

    }

    saveNote = () => {
        if(!this.state.title){
            message.warning('请输入标题');
            return;
        }
        if(!this.state.__html || !this.state.text){
            message.warning('请输入文本');
            return;
        }
        this.setState({
            loading: true
        });

        if(!this.props.params.noteId){
            this.props.note.saveNote({
                title: this.state.title,
                content: this.state.text,
                isPublic: this.state.isPublic
            }).then((res) => {
                if(res.code){
                    if(res.code === 401 || res.code === 2001){
                        message.error('认证出错或者 token 失效, 请登录', 2000);
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 2000)
                    } else {
                        message.error(res.data.message);
                    }
                } else {
                    this.setState({
                        loading: false,
                        __html: '',
                        text: '',
                        title: '',
                        isPublic: true,
                        visible: false
                    });
                    message.success('日记保存成功');
                    this.props.list.addNewNoteToList(0,res.data.item);
                    browserHistory.replace(`/detail/${res.data.item.noteId}`);
                }
            }, (err) => {
                let msg = err.message || (err.data && err.data.message) || '保存日记错误';
                message.error(msg);
                this.setState({
                    loading: false
                });
            }).catch((err) => {
                let msg = err.message || (err.data && err.data.message) || '保存日记错误';
                message.error(msg);
                this.setState({
                    loading: false
                });
            })
        } else {
            this.props.note.updateNote({
                noteId: parseInt(this.props.params.noteId),
                title: this.state.title,
                content: this.state.text,
                isPublic: this.state.isPublic
            }).then((res) => {
                if(res.code){
                    if(res.code === 401 || res.code === 2001){
                        message.error('认证出错或者 token 失效, 请登录', 2000);
                        setTimeout(() => {
                            window.location.href = '/login';
                        }, 2000)
                    } else {
                        message.error(res.data.message);
                    }
                } else {
                    this.setState({
                        loading: false,
                        __html: '',
                        text: '',
                        title: '',
                        isPublic: true,
                        visible: false
                    });
                    message.success('日记更新成功');
                    this.props.list.addNewNoteToList(1, res.data.item);
                    browserHistory.replace(`/detail/${this.props.params.noteId}`);
                }
            }, (err) => {
                let msg = err.message || (err.data && err.data.message) || '更新日记错误';
                message.error(msg);
                this.setState({
                    loading: false
                });
            }).catch((err) => {
                let msg = err.message || (err.data && err.data.message) || '更新日记错误';
                message.error(msg);
                this.setState({
                    loading: false
                });
            })
        }
    };

    cancelSaveNote = () => {
        this.setState({
            visible: true
        });
    };

    emitEmpty = () => {
        this.setState({
            title: ''
        })
    };

    onRadioChange = (e) => {
        this.setState({
            isPublic: e.target.value
        });
    };

    handleOk = (e) => {
        this.setState({
            title: '',
            __html: '',
            visible: false,
            text: ''
        });
        browserHistory.push('/index');
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        browserHistory.push('/index');
    };

    render() {

        const suffix = this.state.title ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const options = [
            { label: '公开', value: true },
            { label: '不公开', value: false }
        ];

        let m = this.props.params.noteId ? '取消更新日记' : '取消保存日记';

        return (
            <div className="new-note full-height">
                <div className="new-note-body full-height">
                    <Modal title={m} visible={this.state.visible}
                           onOk={this.handleOk} onCancel={this.handleCancel}
                    >
                        <p>
                            {this.props.params.noteId ? '确定取消更新日记吗？' : '确定取消保存日记吗？'}</p>
                    </Modal>
                    <div className="note-title">
                        <Input
                            suffix={suffix}
                            value={this.state.title}
                            onChange={this.titleChange}
                            placeholder="输入标题" />
                    </div>
                    <div className="row full-height">
                        <div className="cols full-height">
                            <textarea value={this.state.text} onInput={this.valChange.bind(this)} onScroll={this.handleAreaScroll.bind(this)} className="source full-height" placeholder="输入markdown文本"></textarea>
                        </div>
                        <section ref="result" className="cols result-html full-height" onScroll={this.handleSectionScroll.bind(this)}>
                            <div className="note-markdown-body" dangerouslySetInnerHTML={this.state}></div>
                        </section>
                    </div>
                    <div className="note-public-check">
                        <RadioGroup options={options} onChange={this.onRadioChange} value={this.state.isPublic} />
                    </div>
                    <div className="note-action">
                        <Button type="primary" loading={this.state.loading} onClick={this.saveNote}>
                            {this.props.params.noteId ? '更新' : '保存'}
                        </Button>
                        <Button onClick={this.cancelSaveNote} className="note-cancel">
                            {this.props.params.noteId ? '取消更新' : '取消保存'}
                        </Button>
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

        this.resDom = this.refs.result;

        this.areaInput = new CustomEvent("areaInput", {
            detail: {

            },
            bubbles: true,
            cancelable: true
        });

        //https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
        this.areaScroll = new CustomEvent("areaScroll", {
            detail: {

            },
            bubbles: true,
            cancelable: true
        });

        this.resDom.addEventListener('areaInput',(e) => {
            if(e.target.scrollHeight !== e.target.clientHeight){
                let diff = e.target.scrollHeight - e.target.clientHeight;
                e.target.scrollTop = diff > this.top ? diff:this.top;
            }
        },false);

        this.resDom.addEventListener('areaScroll',(e) => {
            if(e.target.scrollHeight !== e.target.clientHeight){
                let diff = e.target.scrollHeight - e.target.clientHeight;
                e.target.scrollTop = diff - (this.maxScroll - this.top)
            }
        },false);
    }

    componentWillUnmount(){
        //remove all event listener
        this.resDom.parentNode.removeChild(this.resDom);

        this.top = null;
        this.areaInput = null;
        this.areaScroll = null;
        this.resDom = null;
        this.maxScroll = null;
    }
}

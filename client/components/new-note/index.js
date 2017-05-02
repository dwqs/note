/**
 * Created by pomy on 11/03/2017.
 */

'use strict';

import './index.css';

import React, {Component,PropTypes} from 'react';
import { Button, message, Input, Icon, Radio} from 'antd';
import {observer,inject} from 'mobx-react';
import marked from 'marked';
import hljs from 'highlight.js';

const RadioGroup = Radio.Group;

@inject('note')
@observer
export default class NewNote extends Component{
    constructor (){
        super();
        this.state = {
            __html: '',
            loading: false,
            title: '',
            isPublic: true
        };

        this.top = 0;
        this.areaInput = null;
        this.areaScroll = null;
        this.resDom = null;
        this.maxScroll = 0;
    }

    valChange(e){
        this.top = e.currentTarget.scrollTop;
        this.maxScroll = e.target.scrollHeight - e.target.clientHeight;
        this.resDom.dispatchEvent(this.areaInput);
        this.setState({
            __html: marked(e.target.value)
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
        if(!this.state.__html){
            message.warning('请输入文本');
            return;
        }
        this.setState({
            loading: true
        });
    };

    cancelSaveNote = () => {
        this.setState({
            title: '',
            __html: ''
        });

        window.location = '/index';
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

    render() {

        const suffix = this.state.title ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const options = [
            { label: '公开', value: true },
            { label: '不公开', value: false }
        ];

        return (
            <div className="new-note full-height">
                <div className="new-note-body full-height">
                    <div className="note-title">
                        <Input
                            suffix={suffix}
                            value={this.state.title}
                            onChange={this.titleChange}
                            placeholder="输入标题" />
                    </div>
                    <div className="row full-height">
                        <div className="cols full-height">
                            <textarea onInput={this.valChange.bind(this)} onScroll={this.handleAreaScroll.bind(this)} className="source full-height" placeholder="输入markdown文本"></textarea>
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
                            保存
                        </Button>
                        <Button onClick={this.cancelSaveNote} className="note-cancel">
                            取消保存
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

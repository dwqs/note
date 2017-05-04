/**
 * Created by pomy on 2017/4/16.
 * 列表数据
 */

'use strict';

import {observable, computed, action, useStrict} from 'mobx';
import {message} from 'antd';

useStrict(true);

import api from '../network/api';

class List {
    @observable noteList = [];
    @observable latestList = [];
    @observable latestLoading = true;
    @observable noteListLoading: true;
    curPage = 0;
    pageSize = 0;
    latestListSize = 0;

    constructor(curPage, pageSize, latestListSize){
        this.curPage = curPage;
        this.pageSize = pageSize;
        this.latestListSize = latestListSize;
    }

    @action
    getLatestNotes(){
        api.getLatestNotes({
            latestListSize: this.latestListSize
        }).then((res) => {
                if(res.code){
                    message.error(res.data.message);
                } else {
                    this.dataChange(1, res.data.list, false);
                }
            }, (err) => {
                let msg = err.message || (err.data && err.data.message) || '获取最新日记列表失败';
                message.error(msg);
                this.dataChange(1, [], false);
            }).catch((err) => {
                let msg = err.message || (err.data && err.data.message) || '获取最新日记列表失败';
                message.error(msg);
                this.dataChange(1, [], false);
            });
    }

    @action
    getNoteList(){
        api.getNotesList({
            curPage: this.curPage,
            pageSize: this.pageSize
        }).then((res) => {
            if(res.code){
                message.error(res.data.message);
            } else {
                this.dataChange(0, res.data.list, false);
            }
        }, (err) => {
            let msg = err.message || (err.data && err.data.message) || '获取日记列表失败';
            message.error(msg);
            this.dataChange(0, [], false);
        }).catch((err) => {
            let msg = err.message || (err.data && err.data.message) || '获取日记列表失败';
            message.error(msg);
            this.dataChange(0, [], false);
        });
    }

    @action
    dataChange(type, list, status){
        if(type) {
            this.latestList = list;
            this.latestLoading = status;
        } else {
            this.noteList = list;
            this.noteListLoading = status;
        }
    }
}

let list = new List(1, 15, 5);

export default list;

/**
 * Created by pomy on 2017/4/16.
 * 列表数据
 */

'use strict';

import {observable, computed, action, useStrict} from 'mobx';

useStrict(true);

class List {
    @observable
    todos = [];

    constructor(initList){
        this.todos = initList;
    }

    @computed get listCount() {
        return this.todos.length;
    }

    @action
    syncAddTodo(item){
        console.log('sync');
        this.todos.push(item);
    }

    @action
    asyncAddTodo(item){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('async');
                this.todos.push(item);
                resolve('success');
            },2000)
        })
    }

    @action
    deleteTodo(i){
        this.todos = this.todos.filter((item, index) => {
            return index !== i
        });
    }
}

let list = new List([]);

export default list;

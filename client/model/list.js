/**
 * Created by pomy on 2017/4/16.
 */

'use strict';

import {observable, computed, action} from 'mobx';

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

let list = new List(['init1','init2']);

export default list;

/**
 * Created by pomy on 02/05/2017.
 */

'use strict';

import {observable, action, useStrict, computed} from 'mobx';
import {message} from 'antd';

useStrict(true);

import api from '../network/api';

class Note {
    @observable
    id = -1;

    @computed get getId(){
        return this.id;
    }

    @action
    saveNote(data){
        return api.savaNote(data);
    }

    @action
    changeId(noteId) {
        this.id = noteId;
    }
}

const note = new Note();

export default note;

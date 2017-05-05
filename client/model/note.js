/**
 * Created by pomy on 02/05/2017.
 */

'use strict';

import {observable, action, useStrict, computed} from 'mobx';
import {message} from 'antd';

useStrict(true);

import api from '../network/api';

class Note {

    @action
    saveNote(data){
        return api.savaNote(data);
    }

    @action
    updateNote(data){
        return api.updateNote(data);
    }
}

const note = new Note();

export default note;

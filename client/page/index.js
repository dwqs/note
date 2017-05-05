/**
 * Created by pomy on 07/02/2017.
 */

'use strict';

import 'babel-polyfill';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory,IndexRoute} from 'react-router';
import {Provider} from 'mobx-react';

import list from '../model/list';
import status from '../model/status';
import note from '../model/note';

import App from '@components/app';
import NewNote from '@components/new-note';
import Index from '@components/index/';
import NotFound from '@components/not-found';
import Login from '@components/login';
import NoteDetail from '@components/detail';

window.onload = function () {
    ReactDOM.render(
        <Provider
            list = {list}
            status = {status}
            note = {note}
        >
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Index}/>
                    <Route path="index" component={Index}/>
                    <Route path="login" component={Login}/>
                    <Route path="detail/:noteId" component={NoteDetail}/>
                    <Route path="edit/:noteId" component={NewNote}/>
                    <Route path="new" component={NewNote}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        </Provider>,
        document.getElementById('app')
    )
};


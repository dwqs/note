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

import App from '@components/app';
import NewNote from '@components/new-note';
import Hello from '@components/hello';
import NotFound from '@components/not-found';

window.onload = function () {
    ReactDOM.render(
        <Provider
            list = {list}
        >
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Hello}/>
                    <Route path="index" component={Hello}/>
                    <Route path="new" component={NewNote}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        </Provider>,
        document.getElementById('app')
    )
};


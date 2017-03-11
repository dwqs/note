/**
 * Created by pomy on 07/02/2017.
 */

'use strict';

import 'babel-polyfill';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory,IndexRoute} from 'react-router';

import App from '@components/app';
import NewNote from '@components/new-note';
import Hello from '@components/hello';

window.onload = function () {
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Hello}/>
                <Route path="index" component={Hello}/>
                <Route path="new" component={NewNote}/>
            </Route>
        </Router>,
        document.getElementById('app')
    )
};


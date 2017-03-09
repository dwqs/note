/**
 * Created by pomy on 07/02/2017.
 */

'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import 'babel-polyfill';

import { Router, Route, browserHistory} from 'react-router';
import Info from '@components/info';
import Hello from '@components/hello';

window.onload = function () {
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={Hello} />
            <Route path="/info" component={Info}/>
        </Router>,
        document.getElementById('app')
    )
};


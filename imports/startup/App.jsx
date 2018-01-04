import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import MainLayout from '/imports/layouts/MainLayout'
import AdminLayout from '/imports/layouts/AdminLayout'

export default class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/admin" component={AdminLayout} />
                    <Route path="*" component={MainLayout} />
                </Switch>
            </Router>
        );
    }
}
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import AdminPages from '/imports/pages/admin/AdminPages';
import NotFound from '/imports/pages/general/NotFound';


export default class AdminLayout extends Component {

    render() {
        return (
            <Switch>
                <Route path="/admin/pages" component={AdminPages} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}


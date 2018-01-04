import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import NotFound from '/imports/pages/general/NotFound';

export class NotFoundAdmin extends Component {

    render() {
        return (
            <h1>Page admin non trouvée</h1>
        );
    }
}

export default class AdminLayout extends Component {

    render() {
        return (
            <Switch>
                <Route path="*" component={NotFoundAdmin} />
            </Switch>
        );
    }
}


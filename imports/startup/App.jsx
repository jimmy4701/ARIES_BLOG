import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Landing from '/imports/pages/general/Landing';
import NotFound from '/imports/pages/general/NotFound';

export default class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Router>
        );
    }
}
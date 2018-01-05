import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import {Grid} from 'semantic-ui-react';

// Pages
import Landing from '/imports/pages/general/Landing';
import NotFound from '/imports/pages/general/NotFound';

// Components
import Navbar from '/imports/components/navigation/Navbar';

export default class MainLayout extends Component {

    render() {
        return (
            <Grid stackable>
                <Grid.Column width={16}>
                    <Navbar />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Grid.Column>
            </Grid>
        );
    }
}

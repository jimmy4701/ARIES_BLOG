import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

// Pages
import AdminPages from '/imports/pages/admin/AdminPages';
import NotFound from '/imports/pages/general/NotFound';

// Components
import Navbar from '/imports/components/navigation/Navbar';


export default class AdminLayout extends Component {

    render() {
        return (
            <Grid stackable>
                <Grid.Column width={16}>
                    <Navbar admin={true} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Switch>
                        <Route path="/admin/pages" component={AdminPages} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Grid.Column>
            </Grid>
        );
    }
}


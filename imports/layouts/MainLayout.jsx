import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import {Grid, Container} from 'semantic-ui-react';

// Pages
import Landing from '/imports/pages/general/Landing';
import SigninPage from '/imports/pages/general/SigninPage';
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
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/sign_in" component={SigninPage} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </Container>
                </Grid.Column>
            </Grid>
        );
    }
}

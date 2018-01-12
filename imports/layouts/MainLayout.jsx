import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import {Grid, Container} from 'semantic-ui-react';

// Pages
import Landing from '/imports/pages/Landing';
import SigninPage from '/imports/pages/SigninPage';
import PageDisplayer from '/imports/pages/PageDisplayer';
import NotFound from '/imports/pages/NotFound';

// Components
import Navbar from '/imports/components/Navbar';

export default class MainLayout extends Component {

    componentDidMount(){
        new WOW().init()
    }

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
                            <Route exact path="/page/:page_id" component={PageDisplayer} />
                            <Route exact path="/sign_in" component={SigninPage} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </Container>
                </Grid.Column>
            </Grid>
        );
    }
}

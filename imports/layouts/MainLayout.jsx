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
import PageDisplayer from '/imports/pages/dynamic_pages/PageDisplayer';
import NotFound from '/imports/pages/general/NotFound';

// Components
import Navbar from '/imports/components/navigation/Navbar';

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

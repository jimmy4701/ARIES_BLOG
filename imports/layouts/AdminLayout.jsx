import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { Grid, Container } from 'semantic-ui-react';

// Pages
import AdminPages from '/imports/pages/admin/AdminPages';
import NotFound from '/imports/pages/general/NotFound';

// Components
import Navbar from '/imports/components/navigation/Navbar';


export default class AdminLayout extends Component {


    // componentWillMount() {
    //     if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
    //         Bert.alert({
    //            title: "Vous n'êtes pas administrateur",
    //            message: "Mais bien essayé quand même ;)",
    //            type: 'danger',
    //            style: 'growl-bottom-left'
    //         })
    //         this.props.history.push('/')
    //     }
    // }

    render() {
        return (
            <Grid stackable>
                <Grid.Column width={16}>
                    <Navbar admin={true} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Container>
                        <Switch>
                            <Route path="/admin/pages" component={AdminPages} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </Container>
                </Grid.Column>
            </Grid>
        );
    }
}


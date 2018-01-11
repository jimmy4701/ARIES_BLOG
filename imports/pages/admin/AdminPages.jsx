import React, { Component } from 'react';
import { Grid, Header, Loader, Image, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { DynamicPages } from '/imports/api/dynamic_pages/dynamic_pages';
import DynamicPageForm from '/imports/components/dynamic_pages/DynamicPageForm';
import DynamicPagePartial from '/imports/components/dynamic_pages/DynamicPagePartial';

export class AdminPages extends Component {

    render() {
        const { loading, dynamic_pages } = this.props

        if (!loading) {
            return (
                <Grid stackable>
                    <Grid.Column width={16}>
                        <Header as="h1">Administration des pages dynamiques</Header>
                        <DynamicPageForm />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Card.Group>
                            {dynamic_pages.map((page, index) => {
                                return (
                                    <DynamicPagePartial key={page._id} page={page} />
                                )
                            })}
                        </Card.Group>
                    </Grid.Column>
                </Grid>
            );
        } else {
            return <Loader>Chargement des pages</Loader>
        }
    }
}

export default AdminPagesContainer = withTracker(() => {
    const dynamicPagesPublication = Meteor.subscribe('dynamic_pages.all')
    const loading = !dynamicPagesPublication.ready()
    const dynamic_pages = DynamicPages.find({}).fetch()
    return {
        loading,
        dynamic_pages
    }
})(AdminPages)
import React, { Component } from 'react';
import { Grid, Header, Loader, Image, Card, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { DynamicPages } from '/imports/api/dynamic_pages/dynamic_pages';
import DynamicPageForm from '/imports/components/DynamicPageForm';
import DynamicPagePartial from '/imports/components/DynamicPagePartial';

export class AdminPages extends Component {

    state={
        display_form: false,
        editing_page: null
    }

    toggleForm = (e) => {
        this.setState({
            display_form: !this.state.display_form,
            editing_page: null
        })
    }

    onFormSubmit = (e) => {
        this.setState({display_form: false})
    }

    editPage = (editing_page) => {
        this.setState({editing_page, display_form: true})
    }

    render() {
        const { loading, dynamic_pages } = this.props
        const { display_form, editing_page } = this.state

        if (!loading) {
            return (
                <Grid stackable>
                    <Grid.Column width={16}>
                        <Header as="h1">Administration des pages dynamiques</Header>
                        <Button onClick={this.toggleForm} name="display_form">
                            {display_form ? "Annuler" : "Créer une page"}
                        </Button>
                        {display_form && <DynamicPageForm page={editing_page} onSubmitForm={this.onFormSubmit}/>}
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Card.Group>
                            {dynamic_pages.map((page, index) => {
                                return (
                                    <DynamicPagePartial 
                                        key={page._id} 
                                        page={page} 
                                        onEditClick={this.editPage}
                                    />
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
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { DynamicPages } from '/imports/api/dynamic_pages/dynamic_pages';
import SignUpForm from '/imports/components/accounts/SignUpForm';
import SignInForm from '/imports/components/accounts/SignInForm';

import { Grid, Header, Loader, Label, Form, Input, Button } from 'semantic-ui-react';

export class Landing extends Component {

    state = {
        title: '',
        description: ''
    }

    handleChange = (attr, e) => {
        let state = this.state
        state[attr] = e.target.value
        this.setState(state)
    }


    create_page = (event) => {
        event.preventDefault();
        Meteor.call('dynamic_pages.insert', this.state, (error, result) => {
            if (error) {
                alert('ERREUR DE CREATION DE PAGE : ' + error);
            } else {
                console.log('NOUVELLE PAGE AJOUTÉE');
                this.setState({ title: '', description: '' })
            }
        });

    }

    remove_page = (page_id) => {
        Meteor.call('dynamic_pages.remove', page_id, (error, result) => {
            if (error) {
                alert('ERROR REMOVE : ' + error);
            }
        })
    }

    on_connected_user = () => {
        alert('Vous etes bien connecté')
    }

    render() {
        const { title, description } = this.state
        const { loading, dynamic_pages, user_id } = this.props

        if (loading) {
            return <Loader>LOADING</Loader>
        } else {
            return (
                <Grid stackable>
                    <Grid.Column width={8} color="red">
                        <Header as="h1">MON BLOG</Header>
                        <Form onSubmit={this.create_page}>
                            <Input type="text" value={title} onChange={(e) => this.handleChange('title', e)} placeholder="Title" />
                            <Input type="text" value={description} onChange={(e) => this.handleChange('description', e)} placeholder="Description" />
                            <Button>Créer une page</Button>
                        </Form>

                    </Grid.Column>
                    <Grid.Column width={8} color="green">
                        {dynamic_pages.map((page, index) => {
                            return <p key={page._id} onClick={() => this.remove_page(page._id)} >{page.title} - {page.description}</p>
                        })}
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {!user_id &&
                            <Grid stackable>
                                <Grid.Column width={8}>
                                    <SignUpForm />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <SignInForm onSignedIn={this.on_connected_user} />
                                </Grid.Column>
                            </Grid>
                        }
                    </Grid.Column>
                </Grid>
            );
        }
    }
}

export default LandingContainer = withTracker(() => {
    const dynamicPagesPublication = Meteor.subscribe('dynamic_pages.all')
    const loading = !dynamicPagesPublication.ready()
    const dynamic_pages = DynamicPages.find({}).fetch()
    const user_id = Meteor.userId()
    return {
        loading,
        dynamic_pages,
        user_id
    }
})(Landing)



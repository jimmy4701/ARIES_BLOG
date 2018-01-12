import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { DynamicPages } from '/imports/api/dynamic_pages/dynamic_pages';
import SignUpForm from '/imports/components/accounts/SignUpForm';
import SignInForm from '/imports/components/accounts/SignInForm';
import DynamicPagePartial from '/imports/components/dynamic_pages/DynamicPagePartial'
import { Link } from 'react-router-dom';

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
                    <Header as='h1'>LANDING</Header>
                    {dynamic_pages.map((page) => {
                        return (
                            <Link to={"/page/" + page._id}>
                                <DynamicPagePartial page={page} key={page._id} displayMode={true} />
                            </Link>
                        )
                    })}
                </Grid>
            );
        }
    }
}

export default LandingContainer = withTracker(() => {
    const dynamicPagesPublication = Meteor.subscribe('dynamic_pages.active')
    const loading = !dynamicPagesPublication.ready()
    const dynamic_pages = DynamicPages.find({}).fetch()
    const user_id = Meteor.userId()
    return {
        loading,
        dynamic_pages,
        user_id
    }
})(Landing)



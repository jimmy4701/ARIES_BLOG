import React, { Component } from 'react';
import { Grid, Header, Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { DynamicPages } from '/imports/api/dynamic_pages/dynamic_pages';
import DynamicPageForm from '/imports/components/dynamic_pages/DynamicPageForm';

export class AdminPages extends Component {

    remove_page = (page_id) => {
        Meteor.call('dynamic_pages.remove', page_id , (error, result) => {
            if(error){
              console.log(error)
              Bert.alert({
                title: "Erreur lors de la suppression de la page",
                message: error.reason,
                type: 'danger',
                style: 'growl-bottom-left',
              })
            }else{
              Bert.alert({
                title: 'Page supprimée',
                message: 'BYE BYE !',
                type: 'success',
                style: 'growl-bottom-left',
              })
            }
          });
    }

    render() {
        const {loading, dynamic_pages} = this.props

        if(!loading){
            return (
                <Grid stackable>
                    <Grid.Column width={16}>
                        <Header as="h1">Administration des pages dynamiques</Header>
                        <DynamicPageForm />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {dynamic_pages.map((page, index) => {
                            return (
                                <div key={page._id} onClick={() => this.remove_page(page._id)}>
                                    {page.image_url && <Image src={page.image_url} size="small"/>}
                                    <p>{page.title} - {page.description}</p>
                                </div>
                            )
                        })}
                    </Grid.Column>
                </Grid>
            );
        }else{
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
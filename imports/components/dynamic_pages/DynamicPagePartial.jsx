import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

export default class DynamicPagePartial extends Component {

    remove_page = () => {
        Meteor.call('dynamic_pages.remove', this.props.page._id, (error, result) => {
            if (error) {
                console.log(error)
                Bert.alert({
                    title: "Erreur lors de la suppression de la page",
                    message: error.reason,
                    type: 'danger',
                    style: 'growl-bottom-left',
                })
            } else {
                Bert.alert({
                    title: 'Page supprimée',
                    message: 'BYE BYE !',
                    type: 'success',
                    style: 'growl-bottom-left',
                });
            }
        });
    }

    edit_page = () => this.props.onEditClick(this.props.page)

    render() {
        const { page, displayMode } = this.props

        return (
            <Card {...this.props}>
                <Image src={page.image_url ? page.image_url : "https://i.ytimg.com/vi/g7ZnOq-o7rc/hqdefault.jpg"} />
                <Card.Content>
                    <Card.Header>
                        {page.title}
                    </Card.Header>
                    <Card.Description>
                        {page.description}
                    </Card.Description>
                </Card.Content>
                {!displayMode &&
                    <Card.Content extra>
                        <Button onClick={this.edit_page} icon="edit" content="Editer" />
                        <Button color="red" onClick={this.remove_page} icon="remove" content="Supprimer" />
                    </Card.Content>
                }
            </Card>
        )
    }
}
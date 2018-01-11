import React, {Component} from 'react';
import { Form, Input, Button } from 'semantic-ui-react';

export default class DynamicPageForm extends Component{

    state = {
        title: '',
        description: '',
        image_url: ''
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })       
    }

    submit_form = (e) => {
        e.preventDefault();
        Meteor.call('dynamic_pages.insert', this.state, (error, result) => {
            if(error){
                Bert.alert({
                   title: "Erreur de création",
                   message: error,
                   type: 'danger',
                   style: 'growl-bottom-right'
                })
            }else{
                Bert.alert({
                   title: "Page créée",
                   type: 'success',
                   style: 'growl-bottom-left'
                })
                this.setState({title: '', description: '', image_url: ''})
                this.props.onSubmitForm && this.props.onSubmitForm()
            }
        });
    }
    

    render(){
        const {title, description, image_url} = this.state

        return(
            <Form onSubmit={this.submit_form}>
                <Form.Field>
                    <label>Titre de la page</label>
                    <Input type="text" onChange={this.handleChange} name="title" value={title} required/>
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <Input type="text" onChange={this.handleChange} name="description" value={description} />
                </Form.Field>
                <Form.Field>
                    <label>URL d'image</label>
                    <Input type="text" onChange={this.handleChange} name="image_url" value={image_url} label="http://" />
                </Form.Field>
                <Form.Field>
                   <Button color="green">Créer la page</Button>
                </Form.Field>
            </Form>
        )
    }
}
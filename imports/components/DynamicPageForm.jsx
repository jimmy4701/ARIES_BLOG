import React, {Component} from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import TinyMCE from 'react-tinymce';

export default class DynamicPageForm extends Component{

    state = {
        page: {}
    }


    handleChange = (event) => {
        let { page } = this.state
        page[event.target.name] = event.target.value
        this.setState({ page })       
    }

    handleContent = (e) => {
        let {page} = this.state
        page.content = e.target.getContent()
        this.setState({page})
    }

    componentDidMount(){
        if(this.props.page){
            this.setState({page: this.props.page})
        }
    }

    componentWillReceiveProps(new_props){
        if(new_props.page){
            this.setState({page: new_props.page})
        }
    }

    submit_form = (e) => {
        e.preventDefault()
        const method = this.props.page ? "update" : "insert"
        Meteor.call('dynamic_pages.' + method, this.state.page, (error, result) => {
            if(error){
                Bert.alert({
                   title: "Erreur",
                   message: error.reason,
                   type: 'danger',
                   style: 'growl-bottom-left'
                })
            }else{
                Bert.alert({
                   title: this.props.page ? "Page modifiée" : "Page créée",
                   type: 'success',
                   style: 'growl-bottom-left'
                })
                this.props.onSubmitForm && this.props.onSubmitForm()
            }
        })
    }

    render(){
        const { page } = this.state
        const { title, description, image_url, content } = page
        return(
            <Form onSubmit={this.submit_form}>
                <Form.Field>
                    <label>Titre de la page</label>
                    <Input type="text" onChange={this.handleChange} name="title" value={title}/>
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
                    <label>Contenu de la page</label>
                    {content &&
                        <TinyMCE onChange={this.handleContent} content={content} />
                    }
                </Form.Field>
                <Form.Field>
                   <Button color="green">{this.props.page ? "Modifier la page" : "Créer la page"}</Button>
                </Form.Field>
            </Form>
        )
    }
}
import React, {Component} from 'react';
import { Form, Input, Button } from 'semantic-ui-react';

export default class SignUpForm extends Component{

    state={
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })       
    }

    submitForm = (event) => {
        event.preventDefault()
        Meteor.call('accounts.signup', this.state, (error, result) => {
            if(error){
                alert("ERREUR LORS DE L'INSCRIPTION : " + error);
            }else{
                Meteor.loginWithPassword(this.state.email, this.state.password, (error, result) => {
                    if(error){
                        console.log('Erreur lors de la connexion', error);
                    }else{
                        this.setState({})
                    }
                })
            }
        })
    }

    render(){
        const {username, email, password, password_confirmation} = this.state
        const form_valid = password && (password == password_confirmation) && username.length > 5
        return(
            <Form onSubmit={this.submitForm}>
                <Form.Field>
                    <label>Username</label>
                    <Input type="text" value={username} onChange={this.handleChange} name="username" />
                    {username.length < 5 && <label>Username doit avoir au moins 5 caractères</label>}
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <Input type="email" value={email} onChange={this.handleChange} name="email" />
                </Form.Field>
                <Form.Field>
                    <label>Mot de passe</label>
                    <Input type="password" value={password} onChange={this.handleChange} name="password" />
                </Form.Field>
                <Form.Field>
                    <label>Confirmation de mot de passe</label>
                    <Input type="password" value={password_confirmation} onChange={this.handleChange} name="password_confirmation" />
                    {password != password_confirmation && <label>Mot de passe et confirmation différents</label>}
                </Form.Field>
                <Form.Field>
                    <Button disabled={!form_valid} color="green">S'inscrire</Button>
                </Form.Field>
            </Form>
        
        )
    }
}
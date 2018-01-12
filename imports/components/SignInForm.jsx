import React, {Component} from 'react';
import { Form, Input, Button } from 'semantic-ui-react';

export default class SignInForm extends Component {

    state = {
        email: '',
        password: ''
    }

    submit_form = (e) => {
        e.preventDefault()
        Meteor.loginWithPassword(this.state.email, this.state.password, (error, result) => {
            if(error){
                console.log('ERREUR DE CONNEXION', error)
            }else{
                this.props.onSignedIn()
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        const {email, password} = this.state

        return(
            <Form onSubmit={this.submit_form}>
               <Form.Field>
                   <label>Email</label>
                  <Input type='text' onChange={this.handleChange} value={email} name="email" />
               </Form.Field>
               <Form.Field>
               <label>Password</label>
                  <Input type='password' onChange={this.handleChange} value={password} name="password" />
               </Form.Field>
               <Form.Field>
                   <Button color='green' content='Envoyer'/>
               </Form.Field>
            </Form>
        );
    }
}
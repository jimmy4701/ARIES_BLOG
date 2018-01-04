import React, {Component} from 'react';

export default class Landing extends Component {

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
            if(error){
                alert('ERREUR DE CREATION DE PAGE : ' + error);
            }else{
                console.log('NOUVELLE PAGE AJOUTÉE');
            }
        });
        
    }

    render(){
        const {title, description} = this.state
        return(
            <div>
                <h1>MON BLOG</h1>
                <form onSubmit={this.create_page}>
                    <input type="text" value={title}  onChange={(e) => this.handleChange('title', e)} placeholder="Title"/>
                    <input type="text" value={description}  onChange={(e) => this.handleChange('description', e)} placeholder="Description"/>
                    <button>Créer une page</button>
                </form>
            </div>
        );
    }
}

import React, {Component} from 'react';

export default class Landing extends Component {


    create_page = () => {
        
        const new_page = {
            title: "Ma première page",
            description: "Une super page qui devrait entrer dans la BDD",
            active: true,
            created_at: new Date()
        }

        Meteor.call('dynamic_pages.insert', new_page);
    }

    render(){
        return(
            <div>
                <h1>MON BLOG</h1>
                <button onClick={this.create_page}>Créer une page</button>
            </div>
        );
    }
}
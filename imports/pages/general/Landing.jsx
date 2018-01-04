import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { DynamicPages } from '/imports/api/dynamic_pages/dynamic_pages';

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
            if(error){
                alert('ERREUR DE CREATION DE PAGE : ' + error);
            }else{
                console.log('NOUVELLE PAGE AJOUTÉE');
                this.setState({title: '', description: ''})
            }
        });
        
    }

    remove_page = (page_id) => {
        Meteor.call('dynamic_pages.remove', page_id, (error, result) => {
            if(error){
                alert('ERROR REMOVE : ' + error);
            }
        })
    }

    render(){
        const {title, description} = this.state
        const {loading, dynamic_pages} = this.props
        
        if(loading){
            return <div>LOADING</div>
        }else{
            console.log('pages', dynamic_pages)
            return(
                <div>
                    <h1>MON BLOG</h1>
                    <form onSubmit={this.create_page}>
                        <input type="text" value={title}  onChange={(e) => this.handleChange('title', e)} placeholder="Title"/>
                        <input type="text" value={description}  onChange={(e) => this.handleChange('description', e)} placeholder="Description"/>
                        <button>Créer une page</button>
                    </form>
                    {dynamic_pages.map((page, index) => {
                        return <p key={page._id} onClick={() => this.remove_page(page._id)} >{page.title} - {page.description}</p>
                    })}
                </div>
            );
        }
    }
}

export default LandingContainer = withTracker(() => {
  const dynamicPagesPublication = Meteor.subscribe('dynamic_pages.all')
  const loading = !dynamicPagesPublication.ready()
  const dynamic_pages = DynamicPages.find({}).fetch()
  return {
      loading,
      dynamic_pages
  }
})(Landing)
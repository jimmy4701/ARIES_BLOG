import React, {Component} from 'react';
import { DynamicPages } from '/imports/api/dynamic_pages/dynamic_pages'
import { Comments } from '/imports/api/comments/comments'
import { withTracker } from 'meteor/react-meteor-data'
import { Grid, Header, Form, Input } from 'semantic-ui-react';

export class PageDisplayer extends Component {
    state = {
        comment:""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    postComment = () => {
        const {comment} = this.state
        const {page} = this.props
        Meteor.call('comments.insert', {comment, page_id: page._id}, (error, result) => {
            if(error){
                Bert.alert({
                   title: "Erreur",
                   message: error.reason,
                   type: 'danger',
                   style: 'growl-bottom-left'
                })
            }else{
                Bert.alert({
                   title: "Votre commentaire est bien publié",
                   type: 'success',
                   style: 'growl-bottom-left'
                })
                
                this.setState({comment:""})
            }
        })
    }

    render(){
        const{comment} = this.state
        const {loading, page, comments} = this.props

        if(!loading){
            return (
                <Grid stackable>
                    <Grid.Column 
                        width={16} 
                        style={{backgroundImage: "url(" + (page.image_url ? page.image_url : 'https://i.ytimg.com/vi/g7ZnOq-o7rc/hqdefault.jpg') + ")"}}
                        className="page-header wow bounceIn"
                    >
                    </Grid.Column>
                    <Grid.Column width={16} className="center-align">
                        <Header as='h1' className="wow fadeInUp">{page.title}</Header>
                        <p className="wow fadeInUp">{page.description}</p>
                        <div dangerouslySetInnerHTML={{__html: page.content}}></div>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Header as='h3'>Commentaires</Header>
                        <Form onSubmit={this.postComment}>
                            <Input
                                type="text"
                                onChange={this.handleChange}
                                name="comment"
                                value={comment}
                            />
                        </Form>
                    </Grid.Column>
                    
                    <Grid.Column>
                    {comments.map((commentaire) => {
                        return(
                            <p>{commentaire.content}</p>
                        )
                    })}
                    </Grid.Column>
                </Grid>
            )
        }else{
            return <div>loading</div>
        }
    }
}

export default PageDisplayerContainer = withTracker(({match}) => {
    const {page_id} = match.params
    const pagePublication = Meteor.subscribe('dynamic_pages.by_id', page_id)
    const commentPublication = Meteor.subscribe('comments.by_page', page_id)
    const loading = !pagePublication.ready() || !commentPublication.ready()
    const page = DynamicPages.findOne({_id: page_id})
    const comments = Comments.find({page: page_id}).fetch()
    return {
        loading,
        page,
        comments
        
    }
})(PageDisplayer)
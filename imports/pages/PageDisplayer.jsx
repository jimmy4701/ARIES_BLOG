import React, {Component} from 'react';
import { DynamicPages } from '/imports/api/dynamic_pages/dynamic_pages'
import { Comments } from '/imports/api/comments/comments'
import { withTracker } from 'meteor/react-meteor-data'
import { Grid, Header, Form, Input, Button } from 'semantic-ui-react';

export class PageDisplayer extends Component {

    state= {
        comment: {
         article: this.props.match.params.page_id,
         content: ""
        }
    }

    handleChange = (event) => {
        let { comment } = this.state;
        comment[event.target.name] = event.target.value;

        this.setState({ comment })
    }
    submit_form = (e) => {
        Meteor.call('comment.insert', this.state.comment, (error, log) => {
            if(error){
                Bert.alert({
                    title: "Erreur",
                    message: error.reason,
                    type: 'danger',
                    style: 'growl-bottom-left'
                })
            }else{
                Bert.alert({
                    title: 'commentaire crée',
                    type: 'success',
                    style: 'growl-bottom-left'
                })

            }

        })
    }


    render(){
        const {loading, page, comments} = this.props
        const { comment: { content } } = this.state;

        if(!loading){
            return (
                <div>
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
                        <h1>Commentaire</h1>
                        {
                            comments.length ? comments.map((com) => {
                                return (
                                    <div>
                                    <h4>{com.author}</h4>
                                    <p>{com.content}</p>
                                    </div>
                                )})
                                : <p>pas de commentaire sur cette article</p>
                        }

                    </Grid.Column>
                </Grid>
                    <Form onSubmit={this.submit_form}>
                        <p>Commentaire</p>
                        <Input name="content" type="text" onChange={this.handleChange} value={content}/>
                        <Button content={"Ajout commentaire"}/>
                    </Form>
                </div>

            )
        }else{
            return <div>loading</div>
        }
    }
}

export default PageDisplayerContainer = withTracker(({match}) => {
    const {page_id} = match.params
    const pagePublication = Meteor.subscribe('dynamic_pages.by_id', page_id)
    const loading = !pagePublication.ready();
    const page = DynamicPages.findOne({_id: page_id});
    const user = Meteor.userId();
    const commentsPulication = Meteor.subscribe('comment.all');
    const loadingComments = !pagePublication.ready(commentsPulication);
    const comments = Comments.find({}).fetch();
    return {
        loading,
        page,
        loadingComments,
        comments
    }
})(PageDisplayer)
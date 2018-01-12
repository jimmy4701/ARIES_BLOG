import React, {Component} from 'react';
import { DynamicPages } from '/imports/api/dynamic_pages/dynamic_pages'
import { Comments } from '/imports/api/comments/comments'
import CommentForm from '/imports/components/CommentForm';
import CommentPartial from '/imports/components/CommentPartial';
import { withTracker } from 'meteor/react-meteor-data'
import { Grid, Header } from 'semantic-ui-react';

export class PageDisplayer extends Component {

  state={
      display_form: true
  }

  toggleForm = (e) => {
      this.setState({
          display_form: !this.state.display_form
      })
  }

  onFormSubmit = (e) => {
      this.setState({display_form: false})
  }

  render(){
    const { loading, page, comments} = this.props
    const { display_form } = this.state

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
                  <div dangerouslySetInnerHTML={{__html: page.content }}></div>
              </Grid.Column>
              <Grid.Column width={16}>
                  <Header as="h1">Ajouter un commentaire :</Header>
                  {display_form && <CommentForm onSubmitForm={this.onFormSubmit}/>}
              </Grid.Column>
              <Grid.Column width={16} className="center-align">
                  <Header as='h1' className="wow fadeInUp">Liste de commentaires :</Header>
                  {comments.map((comment) => {
                      return (
                          <CommentPartial comment={comment} key={comment._id} />
                      )
                  })}
              </Grid.Column>
          </Grid>
        )
    } else {
      return <div>loading</div>
    }
  }
}

export default PageDisplayerContainer = withTracker(({match}) => {
    const {page_id} = match.params
    const pagePublication = Meteor.subscribe('dynamic_pages.by_id', page_id);
    const commentPublication = Meteor.subscribe('comments.by_page', page_id);
    const loading = !pagePublication.ready() || !commentPublication.ready();
    const page = DynamicPages.findOne({_id: page_id})
    const comments = Comments.find({page: page_id}).fetch()

    /* @TODO: Add comment */
    return {
        loading,
        page,
        comments
    }
})(PageDisplayer)

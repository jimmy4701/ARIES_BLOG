import React, { Component } from "react";
import { DynamicPages } from "/imports/api/dynamic_pages/dynamic_pages";
import { Comments } from "/imports/api/comments/comments";
import CommentPageForm from "/imports/components/CommentPageForm";
import CommentDisplayer from "/imports/components/CommentDisplayer";
import { withTracker } from "meteor/react-meteor-data";
import { Grid, Header } from "semantic-ui-react";

export class PageDisplayer extends Component {
  render() {
    const { loading, page, comments } = this.props;
    if (!loading) {
      return (
        <Grid stackable>
          <Grid.Column
            width={16}
            style={{
              backgroundImage:
                "url(" +
                (page.image_url
                  ? page.image_url
                  : "https://i.ytimg.com/vi/g7ZnOq-o7rc/hqdefault.jpg") +
                ")"
            }}
            className="page-header wow bounceIn"
          />
          <Grid.Column width={16} className="center-align">
            <Header as="h1" className="wow fadeInUp">
              {page.title}
            </Header>
            <p className="wow fadeInUp">{page.description}</p>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </Grid.Column>
          <Grid.Column width={16}>
            <Header as="h2" dividing>
              Comments
            </Header>
            {comments.length
              ? comments.map(comment => [
                  <CommentDisplayer key={comment._id} comment={comment} />,
                  <hr key={comment._id + Math.random()} />
                ])
              : "No comments yet."}
            <CommentPageForm pageId={page._id} />
          </Grid.Column>
        </Grid>
      );
    } else {
      return <div>loading</div>;
    }
  }
}

export default (PageDisplayerContainer = withTracker(({ match }) => {
  const { page_id } = match.params;
  const pagePublication = Meteor.subscribe("dynamic_pages.by_id", page_id);
  const commentsPublication = Meteor.subscribe("comments.by_page", page_id);
  const loading = !pagePublication.ready() || !commentsPublication.ready();
  const page = DynamicPages.findOne({ _id: page_id });
  const comments = Comments.find({ page: page_id }).fetch();
  return {
    loading,
    page,
    comments
  };
})(PageDisplayer));

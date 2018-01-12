import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Grid, Comment, Button, Icon } from "semantic-ui-react";

export class CommentDisplayer extends Component {
  state = { author: "" };
  componentWillMount = () => {
    this.setState({
      author: Meteor.user({ _id: this.props.comment.author }).username
    });
  };
  handleRemoveComment = () => {
    Meteor.call(
      "comments.remove_one",
      this.props.comment,
      (error, response) => {
        if (error) {
          Bert.alert({
            title: error.reason,
            type: "danger",
            style: "growl-bottom-right"
          });
        } else {
          Bert.alert({
            title: "Comment removed",
            type: "success",
            style: "growl-bottom-right"
          });
        }
      }
    );
  };
  render() {
    const { comment } = this.props;
    console.log(Meteor.userId(), comment.author);
    return (
      <Comment>
        <Comment.Content>
          <Comment.Author>By {this.state.author} :</Comment.Author>
          <Comment.Text>
            <div dangerouslySetInnerHTML={{ __html: comment.content }} />
          </Comment.Text>
          {(Roles.userIsInRole(Meteor.userId(), "admin") ||
            Meteor.userId() === comment.author) && (
            <Button basic color="red" onClick={this.handleRemoveComment}>
              <Icon name="remove" />Remove
            </Button>
          )}
        </Comment.Content>
      </Comment>
    );
  }
}

export default (CommentDisplayerContainer = withTracker(params => {
  const commentDisplayerPublication = Meteor.subscribe(
    "user.get_one",
    params.comment.author
  );
  const loading = !commentDisplayerPublication.ready();
  const commentAuthor = Meteor.users.findOne({ _id: params.comment.author });
  console.log(commentAuthor);
  return { loading };
})(CommentDisplayer));

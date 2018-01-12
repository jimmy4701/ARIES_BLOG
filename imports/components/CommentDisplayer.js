import React, { Component } from "react";
import { Grid, Comment, Button, Icon } from "semantic-ui-react";

export default class CommentDisplayer extends Component {
  state = { author: "" };
  componentWillMount = () => {
    this.setState({ author: Meteor.user(this.props.author).username });
  };
  handleRemoveComment = () => {
    Meteor.call(
      "comments.remove_one",
      this.props.comment._id,
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
    return (
      <Comment>
        <Comment.Content>
          <Comment.Author>By {this.state.author} :</Comment.Author>
          <Comment.Text>
            <div dangerouslySetInnerHTML={{ __html: comment.content }} />
          </Comment.Text>
          {Roles.userIsInRole(Meteor.userId(), "admin") && (
            <Button basic color="red" onClick={this.handleRemoveComment}>
              <Icon name="remove" />Remove
            </Button>
          )}
        </Comment.Content>
      </Comment>
    );
  }
}

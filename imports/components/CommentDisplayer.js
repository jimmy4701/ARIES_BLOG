import React, { Component } from "react";
import { Grid, Comment } from "semantic-ui-react";

export default class CommentDisplayer extends Component {
  state = { author: "" };
  componentWillMount = () => {
    this.setState({ author: Meteor.user(this.props.author).username });
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
        </Comment.Content>
      </Comment>
    );
  }
}

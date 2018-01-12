import React, { Component } from "react";
import { Grid, Form, Header, Button } from "semantic-ui-react";
import TinyMCE from "react-tinymce";

export default class ContactPageForm extends Component {
  state = {
    comment: ""
  };

  handleChange = event => {
    this.setState({ comment: event.target.getContent() });
  };

  handleFormSubmit = () => {
    Meteor.call(
      "comments.insert",
      this.state.comment,
      this.props.pageId,
      (error, result) => {
        if (error) {
          Bert.alert({
            title: error.reason,
            type: "danger",
            style: "growl-bottom-right"
          });
        } else {
          Bert.alert({
            title: "Comment added !",
            type: "success",
            style: "growl-bottom-right"
          });
        }
      }
    );
  };
  render() {
    const { comment } = this.state;
    return (
      <Grid.Column width={16}>
        <Header as="h2">Comments</Header>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <label>Enter your comment below :</label>
            <TinyMCE onChange={this.handleChange} content={comment} />
          </Form.Field>
          <Button type="submit" color="green" basic>
            Send
          </Button>
        </Form>
      </Grid.Column>
    );
  }
}

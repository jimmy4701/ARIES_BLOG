import React from "react"
import { v4 } from "uuid"
import { Comment, Header, Form, Button } from "semantic-ui-react"

export default class extends React.PureComponent {
  state = {
    content: ""
  }
  onChange = evt => this.setState({ [evt.target.name]: evt.target.value })
  render() {
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          Commentaire
        </Header>

        {this.props.comments.map(comment => (
          <Comment key={v4()}>
            {/* <Comment.Avatar src="" /> */}
            <Comment.Content>
              <Comment.Author as="p">
                {/* {Meteor.call("users.by_id", comment.user_id)} */}
                {comment.user_id}
              </Comment.Author>
              <Comment.Metadata>
                <div>{comment.created_at.toString()}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.content}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}

        <Form
          reply
          onSubmit={() => this.props.onCommentSubmit(this.state.content)}
        >
          <Form.TextArea name="content" onChange={this.onChange} />
          <Button content="Commenter" primary />
        </Form>
      </Comment.Group>
    )
  }
}

import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

export default class CommentPartial extends Component {

    render() {
        const { comment } = this.props

        return (
          <div>
            <h2>{comment.created_at}</h2>
            <p>{comment.content}</p>
          </div>
        )
    }
}

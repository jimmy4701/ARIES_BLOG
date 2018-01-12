import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

export default class CommentPartial extends Component {

    render() {
        const { comment } = this.props

        return (
            <Card {...this.props}>
                <Card.Content>
                    <Card.Header>
                        {comment.created_at}
                    </Card.Header>
                    <Card.Description>
                        {comment.content}
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

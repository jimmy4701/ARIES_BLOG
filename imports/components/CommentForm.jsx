import React, {Component} from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import TinyMCE from 'react-tinymce';

export default class CommentForm extends Component{

    state = {
      comment: {comment}
    }
    //
    // handleChange = (event) => {
    //     let { comment } = this.state
    //     comment[event.target.name] = event.target.value
    //     this.setState({ comment })
    // }

    handleContent = (e) => {
        let {comment} = this.state
        comment.content = e.target.getContent()
        this.setState({comment})
    }

    componentDidMount(){
        if(this.props.comment){
            this.setState({comment: this.props.comment})
        }
    }

    componentWillReceiveProps(new_props){
        if(new_props.comment){
            this.setState({comment: new_props.comment})
        }
    }

    submit_form = (e) => {
        e.preventDefault()
        Meteor.call('comments.insert', this.state.comment, (error, result) => {
            if(error){
                Bert.alert({
                   title: "Commentaire non ajouté",
                   message: error.reason,
                   type: 'danger',
                   style: 'growl-bottom-left'
                })
            }else{
                Bert.alert({
                   title: "Commentaire ajouté !",
                   type: 'success',
                   style: 'growl-bottom-left'
                })
                this.props.onSubmitForm && this.props.onSubmitForm()
            }
        })
    }

    render(){
        const { comment } = this.state
        const { content } = comment
        return(
            <Form onSubmit={this.submit_form}>
                <Form.Field>
                    <label>Votre message :</label>
                    {
                        <TinyMCE onChange={this.handleContent} content={content} />
                    }
                </Form.Field>
                <Form.Field>
                   <Button color="green">Commenter</Button>
                </Form.Field>
            </Form>
        )
    }
}

import { Meteor } from 'meteor/meteor'
import { Comments } from '../comments'

Meteor.methods({
    'comments.insert'(comment) {
        console.log('comment insert')
        page.created_at = new Date()
        page.author = this.userId
        Comments.insert(comment)
    },
})

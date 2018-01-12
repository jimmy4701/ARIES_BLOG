import { Meteor } from 'meteor/meteor'
import { Comments } from '../comments'
import {DynamicPages} from '/imports/api/dynamic_pages/dynamic_pages'

Meteor.methods({
    'comments.insert'(comments) {
        const new_comment = {
            created_at: new Date(),
            author: this.userId,
        }
        Comments.insert(new_comment)    
    },
})
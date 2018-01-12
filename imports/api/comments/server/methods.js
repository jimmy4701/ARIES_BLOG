import { Meteor } from 'meteor/meteor'
import { Comments } from '../comments'
import {DynamicPages} from '/imports/api/dynamic_pages/dynamic_pages'

Meteor.methods({
    'comments.insert'({comment, page_id}) {

        const new_comment = {
            created_at: new Date(),
            author: this.userId,
            page: page_id,
            content: comment
        }
        Comments.insert(new_comment)    
    },
})
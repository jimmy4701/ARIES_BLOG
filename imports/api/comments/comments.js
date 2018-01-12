import {Mongo} from 'meteor/mongo';

export const Comments = new Mongo.Collection('comments');

const CommentsSchema = new SimpleSchema({
    content: {
        type: String,
    },
    page: {
        type: String
    },
    created_at: {
        type: Date
    }, 
    author: {
        type: String
    }
})

Comments.attachSchema(CommentsSchema);
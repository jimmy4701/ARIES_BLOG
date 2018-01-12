import {Mongo} from 'meteor/mongo';

export const Comments = new Mongo.Collection('Comments');

// Article / created_at / user_id /content
// comment.insert(comment, page_id) {
//     comment.author = this.userId
//     create_at = new Date ()
//     suscribe("comment.by_page", page_id)
//     Comments.find({page: page_id})
// }

const CommentsSchema = new SimpleSchema({
    author: {
        type: String
    },
    created_at: {
      type: Date
    },
    article: {
      type: String
    },
    content: {
        type: String
    }
})

Comments.attachSchema(CommentsSchema);
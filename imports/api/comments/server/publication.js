import { Meteor } from 'meteor/meteor'
import { Comments } from '../comments'

// Article / created_at / user_id /content
// comment.insert(comment, page_id) {
//     comment.author = this.userId
//     create_at = new Date ()
//     suscribe("comment.by_page", page_id)
//     Comments.find({page: page_id})
// }

Meteor.publish('comment.all', function () {
    return Comments.find({})
})

Meteor.publish('comment.by_article', function ({article_id}) {
    return Comments.find({article: article_id})
})


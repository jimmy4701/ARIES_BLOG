import { Meteor } from 'meteor/meteor'
import { Comments } from '../comments'

Meteor.publish('comments.all', function () {
  return Comments.find({})
})

Meteor.publish('comments.by_page', function (page_id) {
  return Comments.find({page: page_id })
})

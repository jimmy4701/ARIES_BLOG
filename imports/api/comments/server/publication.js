import { Meteor } from 'meteor/meteor'
import { Comments } from '../comments'

Meteor.publish('comments.all', function () {
  if(Roles.userIsInRole(this.userId, 'admin')){
    return Comments.find({})
  }else{
    return Comments.find({author: this.userId})
  }
})


Meteor.publish('comments.by_page', function (page_id) {
  return Comments.find({ page: page_id })
})
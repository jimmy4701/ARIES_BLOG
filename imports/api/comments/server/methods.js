import { Meteor } from 'meteor/meteor'
import { Comments  } from '../comments'

Meteor.methods({
    'comment.insert'(comment) {
        console.log('COMMENT INSERT');
      if(this.userId) {
        comment.created_at = new Date();
          comment.author = this.userId;
          Comments.insert(comment)
      }else {
        console.log('non');
      }
    },
})
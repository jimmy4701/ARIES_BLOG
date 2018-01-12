import {Mongo} from 'meteor/mongo';

export const Comments = new Mongo.Collection('comments');

const CommentsSchema = new SimpleSchema({
  author: {
    type: String
  },

  content: {
    type: String
  },
  created_at: {
      type: Date,
      defaultValue: new Date()
  },
  page: {
    type: String,
  }
})

Comments.attachSchema(CommentsSchema);

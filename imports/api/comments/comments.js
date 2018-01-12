import { Mongo } from "meteor/mongo";

export const Comments = new Mongo.Collection("comments");

const CommentsSchema = new SimpleSchema({
  content: {
    type: String
  },
  author: {
    type: String
  },
  page: {
    type: String
  }
});

Comments.attachSchema(CommentsSchema);

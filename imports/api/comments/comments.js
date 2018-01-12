import { Mongo } from "meteor/mongo"

export const Comments = new Mongo.Collection("comments")

const CommentsSchema = new SimpleSchema({
  page_id: {
    type: String
  },
  content: {
    type: String
  },
  user_id: {
    type: String
  },
  created_at: {
    type: Date
  }
})

Comments.attachSchema(CommentsSchema)

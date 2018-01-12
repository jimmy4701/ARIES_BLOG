import { Mongo } from "meteor/mongo"

export const CommentsModel = new Mongo.Collection("comments")

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

CommentsModel.attachSchema(CommentsSchema)

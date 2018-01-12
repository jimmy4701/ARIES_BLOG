import { Meteor } from "meteor/meteor"
import { CommentsModel } from "../comments"

Meteor.methods({
  "comments.insert"(page_id, content) {
    const user_id = this.userId
    const created_at = new Date()
    CommentsModel.insert({ page_id, content, user_id, created_at })
  }
})

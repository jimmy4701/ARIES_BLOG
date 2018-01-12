import { Meteor } from "meteor/meteor"
import { Comments } from "../comments"

Meteor.methods({
  "comments.insert"(...args) {
    Comments.insert(...args)
  }
})

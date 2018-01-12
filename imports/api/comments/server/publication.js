import { Meteor } from "meteor/meteor"
import { CommentsModel } from "../comments"

// Meteor.publish("comments.all", () => CommentsModel.find())

Meteor.publish("comments.by_id", page_id => CommentsModel.find({ page_id }))

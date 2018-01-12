import { Meteor } from "meteor/meteor"
import { Comments } from "../comments"

Meteor.publish("comments.by_id", page_id => Comments.find({ page_id }))

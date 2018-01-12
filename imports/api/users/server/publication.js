import { Meteor } from "meteor/meteor"
import { Users } from "../users"

Meteor.publish("users.by_id", _id => ({ username } = User.find({ _id })))

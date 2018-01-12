import { Meteor } from "meteor/meteor";

Meteor.publish("user.get_one", user_id => {
  return Meteor.users.find({ user_id });
});

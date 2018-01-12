import { Meteor } from "meteor/meteor";
import { Comments } from "../comments";
import { DynamicPages } from "../../dynamic_pages/dynamic_pages";

Meteor.methods({
  "comments.insert"(comment, page_id) {
    if (!this.userId) {
      const page_exist = DynamicPages.findOne(page_id);
      if (page_exist) {
        const new_comment = {
          content: comment,
          author: this.userId,
          page: page_exist._id
        };
        Comments.insert(new_comment);
      } else {
        throw new Meteor.Error("404", "Page not found");
      }
    } else {
      throw new Meteor.Error("not-connected", "You are not connected");
    }
  }
});

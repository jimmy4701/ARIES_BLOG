import { Meteor } from "meteor/meteor"
import { DynamicPages } from "../dynamic_pages"

Meteor.methods({
  "dynamic_pages.insert"(page) {
    console.log("DYNAMIC PAGES INSERT")
    page.created_at = new Date()
    DynamicPages.insert(page)
  },
  "dynamic_pages.update"(page) {
    const found_page = DynamicPages.findOne({ _id: page._id })
    if (
      Roles.userIsInRole(this.userId, "admin") ||
      found_page.author === this.userId
    )
      DynamicPages.update({ _id: page._id }, { $set: page })
  },
  "dynamic_pages.remove"(page_id) {
    const found_page = DynamicPages.findOne({ _id: page_id })
    if (
      Roles.userIsInRole(this.userId, "admin") ||
      found_page.author === this.userId
    )
      DynamicPages.remove(page_id)
  }
})

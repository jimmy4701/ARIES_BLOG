import { Meteor } from 'meteor/meteor'
import { DynamicPages } from '../dynamic_pages'

Meteor.publish('dynamic_pages.all', function () {
  return DynamicPages.find({})
})

Meteor.publish('dynamic_pages.by_id', function (page_id) {
  return DynamicPages.find({ _id: page_id })
})
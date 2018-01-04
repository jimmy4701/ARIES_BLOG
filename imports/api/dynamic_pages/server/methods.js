import { Meteor } from 'meteor/meteor'
import { DynamicPages } from '../dynamic_pages'

Meteor.methods({
    'dynamic_pages.insert'(data) {
        console.log('DYNAMIC PAGES INSERT')
        DynamicPages.insert(data)
    },
    'dynamic_pages.remove'(page_id) {
        console.log('DYNAMIC PAGES REMOVE')
        DynamicPages.remove({_id: page_id})
    }
})
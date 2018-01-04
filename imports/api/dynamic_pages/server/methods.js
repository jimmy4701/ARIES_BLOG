import { Meteor } from 'meteor/meteor'
import { DynamicPages } from '../dynamic_pages'

Meteor.methods({
    'dynamic_pages.insert'(page) {
        console.log('DYNAMIC PAGES INSERT')
        page.created_at = new Date()
        DynamicPages.insert(page)
    },
    'dynamic_pages.remove'(page_id){
        console.log('DYNAMIC PAGES REMOVE')
        DynamicPages.remove(page_id)
    }
})
import { Meteor } from 'meteor/meteor'
import { DynamicPages } from '../dynamic_pages'

Meteor.methods({
    'dynamic_pages.insert'(data) {
        console.log('DYNAMIC PAGES INSERT')
        DynamicPages.insert(data)
    }
})
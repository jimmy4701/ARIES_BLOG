import { Meteor } from 'meteor/meteor'
import { DynamicPages } from '../dynamic_pages'

// Article / created_at / user_id /content
// comment.insert(comment, page_id) {
//     comment.author = this.userId
//     create_at = new Date ()
//     suscribe("comment.by_page", page_id)
//     Comments.find({page: page_id})
// }

Meteor.methods({
    'dynamic_pages.insert'(page) {
        console.log('DYNAMIC PAGES INSERT')
        page.created_at = new Date()
        page.author = this.userId
        DynamicPages.insert(page)
    },
    'dynamic_pages.update'(page) {
        const found_page = DynamicPages.findOne({_id: page._id})
        if(roles.userIsInRole(this.userId, 'admin') || found_page.author === this.user) {
            console.log('DYNAMIC PAGES UPDATE')
            DynamicPages.update({_id: page._id}, {$set: page})
        }else {
            console.log("Tentative de piratage pas possible")
        }

    },
    'dynamic_pages.remove'(page_id){
        console.log('DYNAMIC PAGES REMOVE')
        if(roles.userIsInRole(this.userId, 'admin') || found_page.author === this.user){
            console.log('DYNAMIC PAGES UPDATE')
            DynamicPages.remove(page_id)
        }else {
            console.log("Tentative de piratage pas possible")
        }
    }
})
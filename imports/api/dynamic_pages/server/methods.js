import { Meteor } from 'meteor/meteor'
import { DynamicPages } from '../dynamic_pages'

Meteor.methods({
    'dynamic_pages.insert'(page) {
        console.log('DYNAMIC PAGES INSERT')
        page.created_at = new Date()
        page.author = this.userId
        DynamicPages.insert(page)
    },
    'dynamic_pages.update'(page) {
        const found_page = DynamicPages.findOne({_id: page._id})
        if(Roles.userIsInRole(this.userId, 'admin') || found_page.author == this.userId){
            console.log('DYNAMIC PAGES UPDATE')
            DynamicPages.update({_id: page._id}, {$set: page})
        }else{
            console.log('TENTATIVE POSSIBLE DE PIRATAGE')
        }
    },
    'dynamic_pages.remove'(page_id){
        const found_page = DynamicPages.findOne({_id: page_id})
        if(Roles.userIsInRole(this.userId, 'admin') || found_page.author == this.userId){
            console.log('DYNAMIC PAGES UPDATE')
            DynamicPages.remove(page_id)
        }else{
            console.log('TENTATIVE POSSIBLE DE PIRATAGE')
        }
        
    }
})